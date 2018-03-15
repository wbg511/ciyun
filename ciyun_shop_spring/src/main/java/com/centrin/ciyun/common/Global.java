/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.centrin.ciyun.common;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.centrin.ciyun.common.utils.PropertiesLoader;
import com.centrin.ciyun.common.utils.StringUtils;
import com.centrin.ciyun.common.utils.Utils;

/**
 * 全局配置类
 * @author ThinkGem
 * @version 2014-06-25
 */
public class Global {
	private static Log logger = LogFactory.getLog(Global.class);

	/**
	 * 当前对象实例
	 */
	private static Global global = new Global();
	
	/**
	 * 保存全局属性值
	 */
	private static Map<String, String> map = new HashMap<String, String>();
	
	/**
	 * 属性文件加载对象
	 */
	private static PropertiesLoader loader = new PropertiesLoader("ciyun.properties");

	/**
	 * 显示/隐藏
	 */
	public static final String SHOW = "1";
	public static final String HIDE = "0";

	/**
	 * 是/否
	 */
	public static final String YES = "1";
	public static final String NO = "0";
	
	/**
	 * 对/错
	 */
	public static final String TRUE = "true";
	public static final String FALSE = "false";
	
	
	/**
	 * 获取当前对象实例
	 */
	public static Global getInstance() {
		return global;
	}
	
	/**
	 * 获取配置
	 * @see ${fns:getConfig('adminPath')}
	 */
	public static String getConfig(String key) {
		String value = map.get(key);
		if (value == null){
			value = loader.getProperty(key);
			map.put(key, value != null ? value : StringUtils.EMPTY);
		}
		return value;
	}
	
	
	public static  String redirect2weixinLogin(HttpServletRequest request,
			HttpServletResponse response, String mpnum, String type,String curUrl) {
		return  redirect2weixinPayOpenid(request, response, mpnum, null, null,
				null, type,curUrl);
	}
	
	public static  String redirect2weixinPayOpenid(HttpServletRequest request,
			HttpServletResponse response, String mpnum, String personId,
			String fromOpenId, String fromMpnum, String type,String curUrl) {
		try {
			List<String> list = new ArrayList<String>();
			list.add("personId");
			list.add("fromOpenId");
			list.add("fromMpNum");
			list.add("state");
			String state = "state";
			if (!StringUtils.isEmpty(personId)
					&& !StringUtils.isEmpty(fromOpenId)
					&& !StringUtils.isEmpty(fromMpnum))
				state = Utils.encryptToString(personId + "|" + fromOpenId + "|"
						+ fromMpnum); //
			if(null==curUrl){
				curUrl = Utils.constructUrl(request, list); // 这几个参数不带到用户中心去
			}
			String authaddr = Global.getConfig("ciyun_auth");
			String sig = "?";
			if (authaddr.endsWith("?"))
				sig = "&";
			String params = "mpnumType=1&mpNum=" + mpnum + "&returnUrl="
					+ URLEncoder.encode(curUrl, "utf-8") + "&scopeType=" + type
					+ "&state=" + state + "&hint=0&choicehmo=1";
			String redirectUrl = authaddr + sig + params;
			logger.info("用户跳转到认证中心:" + request.getRequestURI() + "," + redirectUrl);
			return redirectUrl;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	
}
