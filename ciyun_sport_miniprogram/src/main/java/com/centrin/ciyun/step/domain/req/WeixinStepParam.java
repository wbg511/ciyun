package com.centrin.ciyun.step.domain.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public class WeixinStepParam {

	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	//添加时候的参数
	public static class WeixinStepSaveParam extends BaseEntity {
		private String encryptedData;//包括敏感数据在内的完整用户信息的加密数据
		private String iv;//加密算法的初始向量
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	//查询时候的参数
	public static class WeixinStepViewParam extends BaseEntity {
		private String personId;//用户ID
		private Long beginTimestamp;//开始日期时间戳
		private Long endTimestamp;//结束日期时间戳
	}
}
