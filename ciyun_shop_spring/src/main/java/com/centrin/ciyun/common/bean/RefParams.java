package com.centrin.ciyun.common.bean;

import com.centrin.ciyun.common.utils.StringUtils;


/**
 * @名称: RefParams.java
 * @包名： com.centrin.common.bean
 * @描述: TODO
 * @作者： lwh
 * @日期：2016-3-18 上午10:36:31
 */
public class RefParams {
	
	private String refParam;//refuser-refchannel 或者 refuser
	private String refChannel;
	private String refUser;
	private String refServiceId = "0";
	
	
	public String getRefServiceId() {
		if(!StringUtils.isEmpty(refParam)){
			String[] params = refParam.split("-");
			if(params != null && params.length>2){
				return params[2];
			}
		}
		return refServiceId;
	}
	
	public void setRefServiceId(String refServiceId) {
		this.refServiceId = refServiceId;
	}
	public String getRefParam() {
		return refParam;
	}
	public void setRefParam(String refParam) {
		this.refParam = refParam;
	}
	public String getRefChannel() {
		
		if(!StringUtils.isEmpty(refParam)){
			String[] params = refParam.split("-");
			if(params != null && params.length>1){
				return params[1];
			}
			
		}

		return refChannel;
	}
	public void setRefChannel(String refChannel) {
		this.refChannel = refChannel;
	}
	public String getRefUser() {
		
		if(!StringUtils.isEmpty(refParam)){
			String[] params = refParam.split("-");
			if(params != null && params.length>0){
				return params[0];
			}
		}
		
		return refUser;
	}
	public void setRefUser(String refUser) {
		this.refUser = refUser;
	}
	
}
