package com.centrin.ciyun.common;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.centrin.ciyun.common.bean.WxUserInfo;
import com.centrin.ciyun.common.utils.PrettyDateFormat;
import com.centrin.ciyun.common.utils.StringUtils;
import com.centrin.ciyun.common.utils.Utils;
import com.centrin.ciyun.service.interfaces.shop.IHmoCorpService;

/**
 * 使用注解标注过滤器
 * @WebFilter将一个实现了javax.servlet.Filter接口的类定义为过滤器
 * 属性filterName声明过滤器的名称,可选
 * 属性urlPatterns指定要过滤 的URL模式,也可使用属性value来声明.(指定要过滤的URL模式是必选属性)
 * 
 */
@WebFilter(filterName="myWebFilter",urlPatterns={"*.html"})
public class MyWebFilter implements Filter {

	private static Log logger = LogFactory.getLog(MyWebFilter.class);
	public static Map<String, String> pendingUrl = new HashMap<String, String>();
	public static Map<String, HashMap<String, String[]>> pendingParams = new HashMap<String, HashMap<String, String[]>>();

	private String url;

	public static Map<String, HttpSession> OPENID_SESSION_MAP = new LinkedHashMap<String, HttpSession>();

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req=(HttpServletRequest)request;
        HttpServletResponse resp = (HttpServletResponse) response;
		url = req.getRequestURI();
		String ip = StringUtils.getIpAddr(req);
		logger.info("开始处理请求:"
				+ url
				+ ",IP:"
				+ ip
				+ ",时间:"
				+ PrettyDateFormat.dateToString(Calendar.getInstance()
						.getTime(), "yyyy-MM-dd HH:mm:ss"));
		req.getSession().setAttribute(Constant.SESSION_IP, ip);
		//获取会话中的微信用户信息
		WxUserInfo wxUserInfo = null;
		Object obj = req.getSession()
				.getAttribute(Constant.SESSION_SHOPUSER);
		if(obj != null){
			wxUserInfo = (WxUserInfo) obj;
		}else{
			wxUserInfo = new WxUserInfo();
		}
		
		//推荐渠道和推荐人
		String refParam = (request.getParameter("refParam") == null ? ""
				: request.getParameter("refParam")).replace(" ", "");
		
		//有推荐标识参数进来，存到会话中，在提交订单的时候获取推荐参数
		if(!StringUtils.isBlank(refParam)){
			req.getSession().setAttribute(Constant.SESSION_REFPARAM, refParam);
		}else if(url.equals("/index.html") || url.equals("/goods.html")
				|| url.equals("/order.phyPay.html") || url.equals("/order.html")){
			req.getSession().removeAttribute(Constant.SESSION_REFPARAM); //进到商品页时清掉推荐信息
		}
		
		String personId = (request.getParameter("personId") == null ? ""
				: request.getParameter("personId")).replace(" ", "");
		String fromMpNum = request.getParameter("fromMpNum") == null ? ""
				: request.getParameter("fromMpNum");
		String fromOpenId = request.getParameter("fromOpenId") == null ? ""
				: request.getParameter("fromOpenId");
		String orgChannel  = request.getParameter("orgChannel") == null ? ""
				: request.getParameter("orgChannel");
		
		logger.info("进入："+url+"------refParam="+refParam+"----personId="+personId+"------fromMpNum="+fromMpNum+"--------fromOpenId="+fromOpenId+"----orgChannel="+orgChannel);
		String ua = req.getHeader("user-agent").toLowerCase();
		boolean wx = false;
		if (ua.indexOf("micromessenger") >= 0){
			wx = true;  
		}
		if(wx && url.indexOf("answerFlow") != -1){
			request.getRequestDispatcher("/flow/index.html").forward(request, response);
			return;
		}
		if(StringUtils.isNotBlank(orgChannel)){
			String oldOrgChannel = (String)req.getSession().getAttribute(Constant.SESSION_ORGCHANNEL);
			if(!StringUtils.equals(oldOrgChannel, orgChannel)){
				resp.addHeader("Last-Modified",new Date()+"");
			}
			logger.info("保存:orgChannel="+orgChannel);
			req.getSession().setAttribute(Constant.SESSION_ORGCHANNEL, orgChannel);
		}else if(url.equals("/index.html") || url.equals("/goods.share.html")){
			req.getSession().removeAttribute(Constant.SESSION_ORGCHANNEL);
		}
		if(wx && url.indexOf("org.payMsg") == -1){
			if(!StringUtils.isBlank(personId)){
				wxUserInfo.setPersonId(personId);
				req.getSession().setAttribute(Constant.SESSION_TOKEN, personId);
			}
			boolean paypage = false;
			boolean orgPay = false;
			String payOpenId = "";
			if (url.indexOf("pay") != -1
					|| url.indexOf("order.des") != -1) {
				paypage = true;// 进入到了支付界面,这里的person_id一定来自于参数。还有之前的fromOpenId和fromMpNum这3个参数一定需要。
			}
			if(url.indexOf("wxPay") != -1 || url.indexOf("phyPay")!=-1){
				orgPay = true;
			}
			String ownMpnum = ""; // 哪个公众号登录来的，这个实际就是fromMpNum
			String payMpNum = "";
			if (paypage) { // 进入了支付界面
				if (url.indexOf("pay") != -1
						|| url.indexOf("order.des") != -1 ) {// 入口地址
					String state = request.getParameter("state") == null ? ""
							: request.getParameter("state");

					payMpNum = request.getParameter("payMpNum") == null ? ""
							: request.getParameter("payMpNum");// 付款的来源MPNUM

					logger.info("认证中心返回的state:::" + state);
					if (wxUserInfo != null
							&& !StringUtils.isEmpty(wxUserInfo.getPayOpenId())) {
						payOpenId = wxUserInfo.getPayOpenId();
					} else {
						// 否则需要跳转了，只拿openid
						if (StringUtils.isNotEmpty(state)&&!"state".equals(state)) // 提交订单进来
						{// 是认证中心过来的,数据做一些调整
							String[] s = Utils.decyptToString(state).split("\\|");
							// Utils.encryptToString(personId+"|"+fromOpenId+"|"+fromMpnum)
							personId = s[0];
							fromOpenId = s[1];
							fromMpNum = s[2];
							payOpenId = request.getParameter("fromOpenId");
							payMpNum = request.getParameter("fromMpNum");
						}else{
							String redirectUrl = (Global.redirect2weixinPayOpenid(req, resp,
									wxUserInfo.getPayMpNum(), wxUserInfo.getPersonId(), wxUserInfo.getFromOpenId(), wxUserInfo.getMpnum(),
									"baseType",null));
							req.getSession().setAttribute(Constant.SESSION_REDIRECT, redirectUrl);
						}
					}
				}
			}else if(orgPay){
				if(StringUtils.isBlank(fromOpenId)){
					String redirectUrl = (Global.redirect2weixinPayOpenid(req, resp,
							Global.getConfig("default_mpnum"), wxUserInfo.getPersonId(), wxUserInfo.getFromOpenId(), wxUserInfo.getMpnum(),
							"baseType",null));
					resp.sendRedirect(redirectUrl);
				}
				payOpenId = request.getParameter("fromOpenId");
				payMpNum = request.getParameter("fromMpNum");
			}
			else { // 仅仅是商城界面
				// 登录过滤检查
				ownMpnum = Global.getConfig("default_mpnum");
				payMpNum = Global.getConfig("default_mpnum");
				if(StringUtils.isBlank(orgChannel)){
					orgChannel = (String) req.getSession().getAttribute(Constant.SESSION_ORGCHANNEL);
				}
				if(StringUtils.isNotBlank(orgChannel)){
					IHmoCorpService hmoCorpService=WebContextWrapper.getBean("hmoCorpService");
					Map<String, String> resultMap = hmoCorpService.getHmoConfigByDomainprefix(orgChannel);
					if(!resultMap.isEmpty()){
						ownMpnum = resultMap.get("mpNum");
						if ("2".equals(resultMap.get("payflag"))) {
							payMpNum = ownMpnum;
						}
					}
				}
				fromMpNum = ownMpnum;
			}
			
			logger.info("fromOpenId:"+fromOpenId+"------------------------------------payOpenId:"+payOpenId);
			
			if(!StringUtils.isEmpty(fromMpNum)){
				wxUserInfo.setMpnum(fromMpNum);
			}
			
			if(!StringUtils.isEmpty(payMpNum)){
				wxUserInfo.setPayMpNum(payMpNum);
			}
			
			//当前访问fromOpenId不为空，且会话中的fromOpenId为空或者会话中的fromOpenId不等于当前fromOpenId（会话中的openId与当前访问openId不一样说明更换了渠道）
			if(!StringUtils.isEmpty(fromOpenId) && (StringUtils.isEmpty(wxUserInfo.getFromOpenId()) || !wxUserInfo.getFromOpenId().equals(fromOpenId))){
				wxUserInfo.setFromOpenId(fromOpenId);
				
			}
			//当前payOpenId不为空，且会话中的支付openid为空或者会话payOpenId不等于当前payOpenId
			if(!StringUtils.isEmpty(payOpenId) && (StringUtils.isEmpty(wxUserInfo.getPayOpenId()) || !wxUserInfo.getPayOpenId().equals(payOpenId))){
				wxUserInfo.setPayOpenId(payOpenId);
			}
			
			req.getSession().setAttribute(Constant.SESSION_SHOPUSER,
					wxUserInfo); // 放到会话里面去
			
			System.out.println("当前URL:"+url+"的会话信息：");
			System.out.println("访问OpenId："+wxUserInfo.getFromOpenId()+",访问MpNum："+wxUserInfo.getMpnum()+",访问PersonId："+wxUserInfo.getPersonId());
			System.out.println("支付OpenId："+wxUserInfo.getPayOpenId()+",支付MpNum："+wxUserInfo.getPayMpNum());
			//判断旧的会话与新的会话是否相同
			if (!StringUtils.isEmpty(wxUserInfo.getFromOpenId())) {
				String s = wxUserInfo.getMpnum() + wxUserInfo.getFromOpenId();
				HttpSession olds = OPENID_SESSION_MAP.get(s);
				// 对于商城，1个openid会对应2个会话
				if (olds == null
						|| !olds.getId().equals(req.getSession().getId()))
					OPENID_SESSION_MAP.put(s, req.getSession());
			}

		}
		//app进入商城任何连接，一定要先给一个会话，不然会存在问题。
		req.getSession().setAttribute(Constant.SESSION_SHOPUSER,
				wxUserInfo); // 放到会话里面去
		
        chain.doFilter(req, resp);
    }

    @Override
    public void init(FilterConfig config) throws ServletException {
    }

	@Override
	public void destroy() {
		
	}
	

}