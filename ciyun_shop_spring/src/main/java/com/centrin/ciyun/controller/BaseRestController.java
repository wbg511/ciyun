package com.centrin.ciyun.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ModelAttribute;

import com.alibaba.fastjson.JSONObject;
import com.centrin.ciyun.common.Constant;
import com.centrin.ciyun.common.utils.MobileBrowserCheck;
import com.centrin.ciyun.common.utils.MobileBrowserCheck.BrowserType;

public abstract class BaseRestController extends BaseController {

	/**
	 * 请求拦截，将所有request请求信息转换成JsonObject对象存入request作用域的reqMsg属性中
	 * 
	 * @param requestStream
	 * @param request
	 * @return ReqMsg
	 * @throws UnsupportedEncodingException
	 * @throws IOException
	 *             JSONObject
	 */
	@ModelAttribute("requestBodyStr")
	protected String initReqest(InputStream requestStream,
			HttpServletRequest request) {
		// 解析HTTP请求BODY
		String requestBodyStr = null;
		BufferedReader br = null;
		try {
			// 将传过来的json数据打包成一个bufferedReader
			br = new BufferedReader(new InputStreamReader(requestStream,
					"UTF-8"));
			String line = null;
			StringBuilder sb = new StringBuilder();
			while ((line = br.readLine()) != null) {
				sb.append(line);
				sb.append("\r\n");
			}
			br.close();
			if (sb.length() == 0) {
				sb.append("{}");
			}
			requestBodyStr = sb.toString();
			String ua = request.getHeader("user-agent").toLowerCase();
			BrowserType browserType=MobileBrowserCheck.getMobilOS(ua);
			String os ="";
			if(null!=browserType){
				os=browserType.getOsType();
			}
			if (ua.indexOf("micromessenger") >= 0){
				os="wx";
			}
			getSession().setAttribute(Constant.SESSION_OS,os);
			logger.info("\r\n请求url:" + request.getRequestURI()
						+ "\r\n请求body:" + requestBodyStr+",请求UA:"+ua+"请求OS:"+os);
			
		} catch (Exception e) {
			logger.error("获取请求参数异常", e);
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					logger.error("获取请求参数异常", e);
				}
			}
		}
		return requestBodyStr;
	}
	
	protected  JSONObject toJSONObject(String  requestBodyStr){
		JSONObject requestBody = null;
		try{
			if( requestBodyStr != null)
				requestBody = JSONObject.parseObject(requestBodyStr);			
		}catch(Exception e){
			logger.error("json转换异常", e);
		}		
		return requestBody;		
	}
	
	protected static  String toJSONString(Object  object){
		String jsonStr = null;
		try{
			if( object != null)
				jsonStr = JSONObject.toJSONString(object);			
		}catch(Exception e){
			logger.error("json转换异常", e);
		}		
		return jsonStr;		
	}

}
