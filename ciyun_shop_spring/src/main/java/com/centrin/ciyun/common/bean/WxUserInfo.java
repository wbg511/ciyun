package com.centrin.ciyun.common.bean;


public class WxUserInfo {
	
	private String personId;
	private String mpnum;
	private String fromOpenId;
	private String payOpenId;
	private String payMpNum;
	private int age=20;
	private String userName;
	private int gender=1;
	private String pic;
	private String email;
	private String mobile;
	private String nickName;

	
	public WxUserInfo() {
		
	}
	
	
	public String getPersonId() {
		return personId;
	}
	public void setPersonId(String personId) {
		this.personId = personId;
	} 
	
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getGender() {
		return gender;
	}
	public void setGender(int gender) {
		this.gender = gender;
	}
	public String getPic() {
		return pic;
	}
	public void setPic(String pic) {
		this.pic = pic;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getMpnum() {
		return mpnum;
	}

	public void setMpnum(String mpnum) {
		this.mpnum = mpnum;
	}

	public String getFromOpenId() {
		return fromOpenId;
	}

	public void setFromOpenId(String fromOpenId) {
		this.fromOpenId = fromOpenId;
	}

 
	
	public String getPayOpenId() {
		return payOpenId;
	}

	public void setPayOpenId(String payOpenId) {
		this.payOpenId = payOpenId;
	}

	public String getPayMpNum() {
		return payMpNum;
	}

	public void setPayMpNum(String payMpNum) {
		this.payMpNum = payMpNum;
	}


}
