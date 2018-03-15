package com.centrin.ciyun.entity.step;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeixinStep implements java.io.Serializable {

	private static final long serialVersionUID = -7877782402265062703L;
	private int id;//自增ID
	private String personId;//用户ID
	private Long everyTimestamp;//每天步数记录的时间戳
	private Integer everyStep;//每天步数
}
