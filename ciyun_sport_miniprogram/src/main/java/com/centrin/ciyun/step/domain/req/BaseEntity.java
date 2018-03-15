package com.centrin.ciyun.step.domain.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseEntity implements java.io.Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String thirdSession;//第三方服务器会话key
}
