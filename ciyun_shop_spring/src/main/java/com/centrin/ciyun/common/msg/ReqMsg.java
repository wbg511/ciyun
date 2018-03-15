package com.centrin.ciyun.common.msg;

import java.io.Serializable;

import com.centrin.ciyun.common.bean.WxUserInfo;


/**
 * http请求接收对象统一格式，接收时将会被转换成json格式
 * 
 * @author Guey
 * @since 1.0
 */
public class ReqMsg implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private String ver;
	
	private String os;
	
	private String token;
	
	private String requestBody;
	
	private String ip;
	
	private WxUserInfo wxUserInfo;

	public ReqMsg() {
		super();
	}

	public ReqMsg(String ver, String os, String token,String ip, String requestBody) {
		super();
		this.ver = ver;
		this.os = os;
		this.token = token;
		this.ip = ip;
		this.requestBody = requestBody;
	}

	public String getVer() {
		return ver;
	}

	public void setVer(String ver) {
		this.ver = ver;
	}

	public String getOs() {
		return os;
	}

	public void setOs(String os) {
		this.os = os;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getRequestBody() {
		return requestBody;
	}

	public void setRequestBody(String requestBody) {
		this.requestBody = requestBody;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public WxUserInfo getWxUserInfo() {
		return wxUserInfo;
	}

	public void setWxUserInfo(WxUserInfo wxUserInfo) {
		this.wxUserInfo = wxUserInfo;
	}
	

}
