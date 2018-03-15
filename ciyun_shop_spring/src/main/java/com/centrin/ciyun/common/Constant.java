package com.centrin.ciyun.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Constant {
	public static String SESSION_ORGCHANNEL= "SESSION_ORGCHANNEL";
	public static String SESSION_TOKEN = "SESSION_TOKEN";
	public static String SESSION_VER = "SESSION_VER";
	public static String SESSION_OS = "SESSION_OS";
	public static String SESSION_IP = "SESSION_IP";
	public static String SESSION_CONFIGPARAM = "SESSION_CONFIGPARAM";
	public static String SESSION_REDIRECT = "SESSION_REDIRECT";
	
	//session中保存商城登录的用户
	public static String SESSION_SHOPUSER = "SESSION_SHOPUSER";
	
	//用户推荐参数会话
	public static String SESSION_REFPARAM = "session_refparam";
	
	public static String SESSION_TPART_WX = "SESSION_TPART_WX";
	
	public static String PAY_QRCODE_DIR = "payqrcode";
	
	//redis中保存用户选择的商品详情
	public static String REDIS_SHOPGOODS = "REDIS_SHOPGOODS";
	
	public static String ORG_ID="org_id";
	
	public static Object obj = new Object();
	
	private static SimpleDateFormat sff = new SimpleDateFormat("yyyyMMddhhmmss");
	
	public static String tradeTime(){
		
		return sff.format(new Date());
	}
	
	

}
