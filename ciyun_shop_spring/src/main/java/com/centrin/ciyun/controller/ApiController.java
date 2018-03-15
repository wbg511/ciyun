package com.centrin.ciyun.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.centrin.ciyun.common.Constant;
import com.centrin.ciyun.common.Global;
import com.centrin.ciyun.common.MyWebFilter;
import com.centrin.ciyun.common.WebContextWrapper;
import com.centrin.ciyun.common.bean.WxUserInfo;
import com.centrin.ciyun.common.msg.ReqMsg;
import com.centrin.ciyun.common.msg.RespMsg;
import com.centrin.ciyun.common.utils.DesPlus;
import com.centrin.ciyun.common.utils.HttpUtils;
import com.centrin.ciyun.common.utils.StringUtils;
import com.centrin.ciyun.service.interfaces.shop.IHmoCorpService;


@RestController
public class ApiController extends BaseRestController{
    
    private static final Log log = LogFactory.getLog(ApiController.class);
    
    @Autowired
    private IHmoCorpService hmoCorpService;
	
//	private static String apiUrl = "http://172.16.1.38:8080/";
	private static String apiUrl = Global.getConfig("api_url");
	
    @RequestMapping(value="/api",method=RequestMethod.POST)
    public RespMsg api(@ModelAttribute("requestBodyStr")String requestBodyStr){
    	RespMsg  result = null; 
		JSONObject jsonObject = toJSONObject(requestBodyStr);
		if(null!=jsonObject){
			String uri = (String) jsonObject.get("uri");
			String orgChannel=jsonObject.getString("orgChannel");
			String os= (String) getSession().getAttribute(Constant.SESSION_OS);
			String ip= getIpAddress();
			String postUrl = apiUrl + uri;
			Object  redirect= getSession().getAttribute(Constant.SESSION_REDIRECT);
			if(null!=redirect){//支付页面二次跳转
				String redirectUrl = (String)redirect;
				result = new RespMsg("",os);
				Map<String, String> map = new HashMap<String, String>();
				map.put("redirectUrl", redirectUrl);
				result.setRetCode("002");
				result.setItem(map);
				getSession().removeAttribute(Constant.SESSION_REDIRECT);
				return result;
			}
			Object obj = getSession().getAttribute(Constant.SESSION_REFPARAM);
			if(null!=obj){
				String refParam = (String)obj;
				if(postUrl.indexOf("?")>0){
					postUrl = postUrl + "&refParam="+refParam;
				}else{
					postUrl = postUrl + "?refParam="+refParam;
				}
			}
			if(postUrl.indexOf("?")>0){
				postUrl = postUrl + "&os="+os+"&ver="+"3.0";
			}else{
				postUrl = postUrl + "?os="+os+"&ver="+"3.0";
			}
			String token = getToken();
			if(StringUtils.isBlank(token)){
				String personId = jsonObject.getString("personId");
				if(StringUtils.isNotBlank(personId)){
					try {
						DesPlus desPlus = new DesPlus();
						token = desPlus.encrypt(personId);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
			JSONObject requestBody = (JSONObject) jsonObject.get("requestBody");
			ReqMsg reqMsg=new ReqMsg("3.0", os, token, ip,
					toJSONString(requestBody));
			if(StringUtils.isNotBlank(token)){
				if(postUrl.indexOf("?")>0){
					postUrl = postUrl + "&token="+token;
				}else{
					postUrl = postUrl + "?token="+token;
				}
				if(null!=os&&"wx".equals(os)){
					reqMsg.setWxUserInfo(getUserInfo());
				}
			}
			if(StringUtils.isBlank(orgChannel)){
				orgChannel = getOrgChannel();
			}else{
				saveOrgChannel(orgChannel);
			}
			if(StringUtils.isNotBlank(orgChannel)){
				if(postUrl.indexOf("?")>0){
					postUrl = postUrl + "&orgChannel="+orgChannel;
				}else{
					postUrl = postUrl + "?orgChannel="+orgChannel;
				}
			}
			String resultStr = HttpUtils.sendHttpPost(postUrl,
					toJSONString(reqMsg));
			if(StringUtils.isNotBlank(resultStr)){
				result = JSONObject.parseObject(resultStr, RespMsg.class);
			}
			
			try {
                Map<String, Object> map = new HashMap<>();
                map.put("apiUrl", uri);
                map.put("personId", getUserInfo()!=null?getPersonId():"");
                map.put("goodsId", requestBody!=null?requestBody.getString("goodsId"):"");
                map.put("ip", ip);
                map.put("requestbody", requestBody!=null?requestBody.toJSONString():"");
                if(null!=os&&"wx".equals(os)){
                	WxUserInfo user = getUserInfo();
                	if(null!=user){
                		map.put("os", user.getMpnum());
                	}else{
                		map.put("os", os);
                	}
				}else{
					map.put("os", os);
				}
                hmoCorpService.logShop(map);
            } catch (Exception e) {
            	e.printStackTrace();
                log.error(e);
            }
		}
    	return result;
    }
    
    
    @RequestMapping(value="/orgapi",method=RequestMethod.POST)
    public RespMsg orgapi(@ModelAttribute("requestBodyStr")String requestBodyStr){
    	RespMsg  result = null; 
		JSONObject jsonObject = toJSONObject(requestBodyStr);
		if(null!=jsonObject){
			String uri = (String) jsonObject.get("uri");
			String os= (String) getSession().getAttribute(Constant.SESSION_OS);
			String ip= getIpAddress();
			String postUrl = apiUrl + uri;
			Object obj = getSession().getAttribute(Constant.SESSION_REFPARAM);
			if(null!=obj){
				String refParam = (String)obj;
				if(postUrl.indexOf("?")>0){
					postUrl = postUrl + "&refParam="+refParam;
				}else{
					postUrl = postUrl + "?refParam="+refParam;
				}
			}
			if(postUrl.indexOf("?")>0){
				postUrl = postUrl + "&os="+os+"&ver="+"3.0";
			}else{
				postUrl = postUrl + "?os="+os+"&ver="+"3.0";
			}
			JSONObject requestBody = (JSONObject) jsonObject.get("requestBody");
			Object orgId= getSession().getAttribute(Constant.ORG_ID);
			if(null!=orgId){
				requestBody.put("orgId", (String)orgId);
			}
			if(null!=os&&"wx".equals(os)){
				requestBody.put("openId", getUserInfo().getFromOpenId());
			}
			ReqMsg reqMsg=new ReqMsg("3.0", os, null, ip,
					toJSONString(requestBody));
			String resultStr = HttpUtils.sendHttpPost(postUrl,
					toJSONString(reqMsg));
			if(StringUtils.isNotBlank(resultStr)){
				result = JSONObject.parseObject(resultStr, RespMsg.class);
			}
		}
    	return result;
    }
    
    
    @RequestMapping(value="/towx",method=RequestMethod.POST)
    public RespMsg towx(HttpServletRequest request,
			HttpServletResponse response,@ModelAttribute("requestBodyStr")String requestBodyStr){
    	Map<String,String> result = new HashMap<String, String>();
    	JSONObject jsonObject = toJSONObject(requestBodyStr);
    	String type="baseType";
    	 WxUserInfo wxUserInfo = getUserInfo();
		if(wxUserInfo  == null || StringUtils.isEmpty(wxUserInfo.getPersonId())){
			type="loginType";
    	}
		if(null!=jsonObject){
			String mpNum =Global.getConfig("default_mpnum");
			String url =  jsonObject.getString("url");
			String orgChannel = getOrgChannel()==null?jsonObject.getString("orgChannel"):getOrgChannel();
			logger.info("获取:orgChannel="+orgChannel);
			if(StringUtils.isNotBlank(orgChannel)){
				IHmoCorpService hmoCorpService=WebContextWrapper.getBean("hmoCorpService");
				Map<String, String> resultMap = hmoCorpService.getHmoConfigByDomainprefix(orgChannel);
				if(!resultMap.isEmpty()){
					mpNum = resultMap.get("mpNum");
				}
			}
			result.put("redirectUrl", Global.redirect2weixinLogin(request, response,mpNum ,type, url));
		}
    	return getResponseMsg_success(result);
    }
    
    
    @RequestMapping(value="/doLogin",method=RequestMethod.POST)
    public RespMsg doLogin(HttpServletRequest request,
			HttpServletResponse response,@ModelAttribute("requestBodyStr")String requestBodyStr) throws Exception{
    	logger.info("进入登录方法");
    	JSONObject jsonObject = toJSONObject(requestBodyStr);
    	String postUrl = apiUrl + "login/doLogin";
		if(null!=jsonObject){
			String personId = jsonObject.getString("personId");
			logger.info("登录用户ID为=========="+personId);
			if(StringUtils.isNotBlank(personId) && personId.indexOf("null")<0){
				String token = getToken();
				DesPlus desPlus = new DesPlus();
				String newToken = desPlus.encrypt(personId);
				ReqMsg reqMsg=new ReqMsg("3.0", getOs(), token, getIpAddress(),
						"{\"personId\":\""+personId+"\"}");
				//用户已经登录过
				if(StringUtils.isNotBlank(token)&&token.equals(newToken)){
					return getResponseMsg_success();
				}else{//未登录,或切换用户登录
					String resultStr = HttpUtils.sendHttpPost(postUrl,
							toJSONString(reqMsg));
					if(StringUtils.isNotBlank(resultStr)){
						RespMsg result = JSONObject.parseObject(resultStr, RespMsg.class);
						if("0".equals(result.getRetCode())){
							getSession().setAttribute(Constant.SESSION_TOKEN, newToken);
						}else{
							return getResponseMsg_failed("-1", result.getMsg());
						}
					}
					return getResponseMsg_success();
				}
			}else if(StringUtils.isNotBlank(personId) && personId.indexOf("null")!=-1){
				logger.info("====注销登录===");
				getSession().removeAttribute(Constant.SESSION_TOKEN);
				getSession().removeAttribute(Constant.SESSION_SHOPUSER);
				return getResponseMsg_success();
			}else{
				logger.info("====注销登录===");
				getSession().removeAttribute(Constant.SESSION_TOKEN);
				getSession().removeAttribute(Constant.SESSION_SHOPUSER);
				return getResponseMsg_success();
			}
		}else{
			return getResponseMsg_failed("-1", "参数不能为空");
		}
    }
    
    @RequestMapping(value="/testLogin",method=RequestMethod.GET)
    public void testLogin(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
    	logger.info("进入登录方法");
		DesPlus desPlus = new DesPlus();
		String newToken = desPlus.encrypt("p160505222410006");
		getSession().setAttribute(Constant.SESSION_TOKEN, newToken);
    }
    
    
    @RequestMapping(value="/cleanSession",method=RequestMethod.POST)
    public RespMsg cleanSession(HttpServletRequest request,
			HttpServletResponse response,@ModelAttribute("requestBodyStr")String requestBodyStr) throws Exception{
    	logger.info("清除session");
    	JSONObject jsonObject = toJSONObject(requestBodyStr);
		if(null!=jsonObject){
			String mpNum = jsonObject.getString("mpNum");
			String openId = jsonObject.getString("openId");
			if (StringUtils.isEmpty(openId))
				return getResponseMsg_failed("-1", "openid不能为空");
			HttpSession session = MyWebFilter.OPENID_SESSION_MAP.get(mpNum
					+ openId);
			if (session != null) {
					session.removeAttribute(Constant.SESSION_TOKEN);
					session.removeAttribute(Constant.SESSION_SHOPUSER);
			} else {
				logger.info("不存在该会话信息：：" + openId);
			}

			MyWebFilter.OPENID_SESSION_MAP.remove(mpNum + openId);
			return getResponseMsg_success();
		}else{
			return getResponseMsg_failed("-1", "参数不能为空");
		}
    	
    }
 
}
