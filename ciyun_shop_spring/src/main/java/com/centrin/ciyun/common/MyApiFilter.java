package com.centrin.ciyun.common;

import java.io.IOException;
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

/**
 * 使用注解标注过滤器
 * @WebFilter将一个实现了javax.servlet.Filter接口的类定义为过滤器
 * 属性filterName声明过滤器的名称,可选
 * 属性urlPatterns指定要过滤 的URL模式,也可使用属性value来声明.(指定要过滤的URL模式是必选属性)
 * 
 */
@WebFilter(filterName="myApiFilter",urlPatterns={"/api"})
public class MyApiFilter implements Filter {

	public static Map<String, String> pendingUrl = new HashMap<String, String>();
	public static Map<String, HashMap<String, String[]>> pendingParams = new HashMap<String, HashMap<String, String[]>>();
	public static Map<String, HttpSession> OPENID_SESSION_MAP = new LinkedHashMap<String, HttpSession>();

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
			HttpServletRequest req=(HttpServletRequest)request;
	        HttpServletResponse resp = (HttpServletResponse) response;
	        resp.setHeader("Access-Control-Allow-Origin", req.getHeader("origin"));   //允许跨域
	        resp.setHeader("Access-Control-Allow-Credentials", "true");
        	resp.setHeader("Access-Control-Allow-Methods", "POST");
        	resp.setHeader("Access-Control-Max-Age", "3600");
        	resp.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	        req.getSession().removeAttribute(Constant.SESSION_REFPARAM); 
	        chain.doFilter(req, resp);		
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

 
	

}