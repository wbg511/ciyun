package com.centrin.ciyun.common;

import java.util.Calendar;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.centrin.ciyun.common.utils.DesPlus;
import com.centrin.ciyun.common.utils.PrettyDateFormat;
import com.centrin.ciyun.common.utils.StringUtils;

public class UserInterceptor implements HandlerInterceptor {
	
	private static Logger logger = Logger.getLogger(UserInterceptor.class);
	public static Map<String, String> pendingUrl = new HashMap<String, String>();
	public static Map<String, HashMap<String, String[]>> pendingParams = new HashMap<String, HashMap<String, String[]>>();

	private long beginTime;

	private String url;

	public static Map<String, HttpSession> OPENID_SESSION_MAP = new LinkedHashMap<String, HttpSession>();

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		
		beginTime = System.currentTimeMillis();
		url = request.getRequestURI();
		logger.info("开始处理请求:"
				+ url
				+ ",IP:"
				+ StringUtils.getIpAddr(request)
				+ ",时间:"
				+ PrettyDateFormat.dateToString(Calendar.getInstance()
						.getTime(), "yyyy-MM-dd HH:mm:ss"));
		
		//推荐渠道和推荐人
		String refParam = (request.getParameter("refParam") == null ? ""
				: request.getParameter("refParam")).replace(" ", "");
		
		String personId = (request.getParameter("personId") == null ? ""
				: request.getParameter("personId")).replace(" ", "");
		logger.info("进入："+url+"------refParam="+refParam+"----personId="+personId);
		if(!StringUtils.isBlank(personId)){
			DesPlus desPlus = new DesPlus();
			String token = desPlus.encrypt(personId);
			request.getSession().setAttribute(Constant.SESSION_TOKEN, token);
		}
		
		//有推荐标识参数进来，存到会话中，在提交订单的时候获取推荐参数
		if(!StringUtils.isBlank(refParam)){
			request.getSession().setAttribute(Constant.SESSION_REFPARAM, refParam);
		}
		
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		url = request.getRequestURI();
		logger.info("完成处理请求:" + url + " 使用时间:"
				+ (System.currentTimeMillis() - beginTime) + " ms.");
	}
	
	

}
