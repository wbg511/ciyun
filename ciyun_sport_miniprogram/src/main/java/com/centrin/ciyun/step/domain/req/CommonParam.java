package com.centrin.ciyun.step.domain.req;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonParam extends BaseEntity{

	private String code; //小程序的登录凭证code
	private String telephone;//用户登录手机号码
	private String smscode;//短信验证码
	private Object rawData;//用户数据
	private String signature;//签名
	private String medCorpId;//体检中心ID
	
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.DEFAULT_STYLE);
	}
}
