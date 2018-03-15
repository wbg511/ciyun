package com.centrin.ciyun.common.msg;

import java.io.Serializable;

/**
 * http请求响应对象统一格式，响应时将会被转换成json格式返回
 * 
 * @author Guey
 * @since 1.0
 */
public class RespMsg implements Serializable {

	/**  */
	private static final long serialVersionUID = 1L;

	/**
	 * 版本号
	 */
	private String ver;

	/**
	 * os类型
	 */
	private String os;

	private boolean isUpdate;
	/**
	 * 时间戳
	 */
	private long timestamp ;

	private String updateInfo ;

	private String itemInfo;

	/**
	 * 当前页面title
	 */
	private String title;

	/**
	 * 访问令牌
	 */
	private String token;

	/**
	 * copyright
	 */
	private String copyright;

	/**
	 * 返回编码
	 */
	private String retCode = "0";

	/**
	 * 返回信息
	 */
	private String msg = "成功";

	/**
	 * 响应对象
	 */
	private Object item;
	
	private WeixinConfigParam configParam;
	
	public RespMsg() {
		super();
	}
	
	
	public RespMsg(String ver, String os){
		super();
		this.ver = ver;
		this.os = os;
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

	public boolean getIsUpdate() {
		return isUpdate;
	}

	public void setIsUpdate(boolean isUpdate) {
		this.isUpdate = isUpdate;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	public String getUpdateInfo() {
		return updateInfo;
	}

	public void setUpdateInfo(String updateInfo) {
		this.updateInfo = updateInfo;
	}

	public String getItemInfo() {
		return itemInfo;
	}

	public void setItemInfo(String itemInfo) {
		this.itemInfo = itemInfo;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getCopyright() {
		return copyright;
	}

	public void setCopyright(String copyright) {
		this.copyright = copyright;
	}

	public String getRetCode() {
		return retCode;
	}

	public void setRetCode(String retCode) {
		this.retCode = retCode;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}


	public Object getItem() {
		return item;
	}

	public void setItem(Object item) {
		this.item = item;
	}


	public WeixinConfigParam getConfigParam() {
		return configParam;
	}


	public void setConfigParam(WeixinConfigParam configParam) {
		this.configParam = configParam;
	}
	

}
