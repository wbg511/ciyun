package com.centrin.ciyun.common;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.AlipayConstants;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradeWapPayRequest;
import com.centrin.ciyun.common.msg.ReqMsg;
import com.centrin.ciyun.common.msg.RespMsg;
import com.centrin.ciyun.common.utils.HttpUtils;
import com.centrin.ciyun.common.utils.StringUtils;

public class AlipayServlet extends HttpServlet {

	private static final long serialVersionUID = -4619665430596950563L;
	protected static Logger logger = Logger.getLogger(HttpServlet.class);

	protected JSONObject toJSONObject(String requestBodyStr) {
		JSONObject requestBody = null;
		try {
			if (requestBodyStr != null)
				requestBody = JSONObject.parseObject(requestBodyStr);
		} catch (Exception e) {
			logger.error("json转换异常", e);
		}
		return requestBody;
	}

	protected static String toJSONString(Object object) {
		String jsonStr = null;
		try {
			if (object != null)
				jsonStr = JSONObject.toJSONString(object);
		} catch (Exception e) {
			logger.error("json转换异常", e);
		}
		return jsonStr;
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest httpRequest,
			HttpServletResponse httpResponse) throws ServletException,
			IOException {
		String price = httpRequest.getParameter("price");
		String os = (String) httpRequest.getSession().getAttribute(
				Constant.SESSION_OS);
		String ip = (String) httpRequest.getSession().getAttribute(
				Constant.SESSION_IP);
		String postUrl = Global.getConfig("api_url") + "orgpay/alipay";
		Object obj = httpRequest.getSession().getAttribute(
				Constant.SESSION_REFPARAM);
		if (null != obj) {
			String refParam = (String) obj;
			if (postUrl.indexOf("?") > 0) {
				postUrl = postUrl + "&refParam=" + refParam;
			} else {
				postUrl = postUrl + "?refParam=" + refParam;
			}
		}
		if (postUrl.indexOf("?") > 0) {
			postUrl = postUrl + "&os=" + os + "&ver=" + "3.0";
		} else {
			postUrl = postUrl + "?os=" + os + "&ver=" + "3.0";
		}
		JSONObject requestBody = new JSONObject();
		requestBody.put("price", price);
		Object orgId = httpRequest.getSession().getAttribute(Constant.ORG_ID);
		if (null != orgId) {
			requestBody.put("orgId", (String) orgId);
		}
		ReqMsg reqMsg = new ReqMsg("3.0", os, null, ip,
				toJSONString(requestBody));
		String resultStr = HttpUtils
				.sendHttpPost(postUrl, toJSONString(reqMsg));
		if (StringUtils.isNotBlank(resultStr)) {
			RespMsg result = JSONObject.parseObject(resultStr, RespMsg.class);
			Map<String, String> item = (Map<String, String>) result.getItem();
			String retCode = result.getRetCode();
			if(null!=retCode && "0".equals(retCode)){
				String appId = item.get("appId");
				String privateKey = item.get("privateKey");
				String inputCharset = item.get("inputCharset");
				String publicKey = item.get("publicKey");
				String notifyUrl = item.get("notifyUrl");
				String partner = item.get("partner");
				String orderId = item.get("orderId");
				String alipayNo = item.get("alipayNo");
				String returnUrl = item.get("returnUrl");
				AlipayClient alipayClient = new DefaultAlipayClient("https://openapi.alipay.com/gateway.do",appId,privateKey,"json",inputCharset,publicKey); //获得初始化的AlipayClient
				AlipayTradeWapPayRequest alipayRequest = new AlipayTradeWapPayRequest();//创建API对应的request
				alipayRequest.setReturnUrl(returnUrl);
				alipayRequest.setNotifyUrl(notifyUrl);//在公共参数中设置回跳和通知地址
				alipayRequest.setBizContent("{" +
						"    \"out_trade_no\":\""+alipayNo+"\"," +
						"    \"total_amount\":"+price+"," +
						"    \"subject\":\"支付宝扫码支付\"," +
						"    \"seller_id\":\""+partner+"\"," +
						"    \"product_code\":\"QUICK_WAP_PAY\"" +
						"  }");//填充业务参数
				String form = "";
				try {
					form = alipayClient.pageExecute(alipayRequest).getBody();
				} catch (AlipayApiException e) {
					e.printStackTrace();
				} //调用SDK生成表单
				httpResponse.setContentType("text/html;charset=" + AlipayConstants.CHARSET_UTF8);
				httpResponse.getWriter().write(form);//直接将完整的表单html输出到页面
				httpResponse.getWriter().flush();
			}
		}
	}

}