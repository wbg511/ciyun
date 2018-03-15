package com.centrin.ciyun.common.utils;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class Utils {
	
	private static final Log LOG = LogFactory.getLog(Utils.class);

	
	public static Long decyptToLong(String encryptStr) {
		long fromMpId = 0L;
		if (StringUtils.isNotEmpty(encryptStr)) {
			try {
				DesPlus dp = new DesPlus();
				fromMpId = Long.valueOf(dp.decrypt(encryptStr));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return fromMpId;
	}

	public static String decyptToString(String encryptStr) {
		String decypt = "";
		if (StringUtils.isNotEmpty(encryptStr)) {
			try {
				DesPlus dp = new DesPlus();
				decypt = dp.decrypt(encryptStr);
			} catch (Exception e) {
				decypt = encryptStr;
			}
		}
		return decypt;
	}

	public static String encryptToString(String str) {
		String encrypt = "";
		if (StringUtils.isNotEmpty(str)) {
			try {
				DesPlus dp = new DesPlus();
				encrypt = dp.encrypt(str);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return encrypt;
	}

	public static String constructUrl(HttpServletRequest request) {
		return constructUrl(request,null);
	}
	/**
	 * 获取当前访问路径和参数
	 * 
	 * @作者： lwh
	 * @日期：2015-6-15 下午03:45:07
	 * @param request
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String constructUrl(HttpServletRequest request,List<String> ignores) {
		String curUrl = request.getRequestURL().toString();
		Map<String, String[]> reqParams = request.getParameterMap();
		Map<String, String> params = new HashMap<String, String>();
		for (Iterator<String> it = reqParams.keySet().iterator(); it.hasNext();) {
			String name = (String) it.next();
			if(ignores!=null&&ignores.contains(name)){
				//组装的时候忽略掉这个参数，因为放到session里面了
				continue;
			}
			String[] values = reqParams.get(name);
			String value = "";
			for (int i = 0; i < values.length; i++) {
				value = (i == values.length - 1) ? value + values[i] : value
						+ values[i] + ",";
			}
			try {
				value = new String(value.getBytes("ISO-8859-1"), "utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			params.put(name, value);
		}

		Iterator<String> it = params.keySet().iterator();
		while (it.hasNext()) {
			String paraName = it.next();
			if (curUrl.indexOf("?") > 0) {
				curUrl += "&" + paraName + "=" + params.get(paraName);
			} else {
				curUrl += "?" + paraName + "=" + params.get(paraName);
			}
		}

		return curUrl;
	}

	public static Long generateOrderCode(Long id) {
		int randCode = 10;
		while (true) {
			randCode = (int) (Math.random() * 100);
			if (randCode != 0) {
				break;
			}
		}
		String strCode = randCode + "" + id;
		return Long.valueOf(strCode);
	}

	public static String getServerName(HttpServletRequest request) {
		String servername = request.getServerName();
		if (StringUtils.isEmpty(servername))
			servername = request.getHeader("x-host");
		if (StringUtils.isEmpty(servername))
			servername = request.getHeader("Host");
		return servername;
	}

//	public static String getSmsPrefix(String fmpNum) {
//		String prefix=sigmap.get(fmpNum);
//		if(prefix==null||prefix.equals(""))
//			prefix="【中金慈云健康】";
//		
//		return prefix;
//		
//		
//		
//	}

//	public static HostMpnum getHostMpnum(String serverName) {
//		//aabc.wx.ciyun.cn
//		//aabc.shop.ciyun.cn
//		//aabc.wx.lovelealth.com.cn
//		
//		String[] domainsplit=serverName.split("\\.");
//		LOG.debug("获取fmpNum对象：" + serverName+","+domainsplit.length);
//		if(domainsplit.length==4||domainsplit.length==5){
//			String prefix =domainsplit[0]; 
//			HostMpnum hm = map.get(prefix);
//			return hm;
//		}
//		return null;
//	}
	
	/**
	 * beidajiankang.shop.ciyun.cn
	 * beidajiankang.wx.ciyun.cn
	 * @param serverName
	 * @return
	 */
	public static String getDomainPrefix(String serverName){
		String[] domainsplit=serverName.split("\\.");
		LOG.debug("获取fmpNum对象：" + serverName+","+domainsplit.length);
		if(domainsplit.length==4||domainsplit.length==5){
			return domainsplit[0];  
		}
		return "";
	}

//	private static Map<String, HostMpnum> map;
//	private static Map<String, String> sigmap=new HashMap<String,String>();
//	static {
//		map = (Map<String, HostMpnum>) CommonData.getDictValue("hostMpnum");
//		java.util.Iterator<HostMpnum> values=map.values().iterator();
//		while(values.hasNext()){
//			HostMpnum hm=(HostMpnum)values.next();
//			sigmap.put(hm.getMpnum(), hm.getSmssig());
//		}
//		
//		
//		
//	}

}
