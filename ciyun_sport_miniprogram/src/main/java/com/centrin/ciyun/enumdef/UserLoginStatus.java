package com.centrin.ciyun.enumdef;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 
 * 
 * @author
 * 
 */
public class UserLoginStatus {
	public static Map<Integer, String> ENUMMAP = new LinkedHashMap<Integer, String>();

	public enum ELoginStatus {

		REGISTER_FIRST(0, "首次注册登录"), 
		YES_REGISTER_NO_LOGIN(1, "已注册但未登录小程序");
		
		public String value;
		public int key;

		/**
		 * 构造方法
		 * 
		 * @param value
		 * @param key
		 */
		private ELoginStatus(int key, String value) {
			this.key = key;
			this.value = value;
		}
	}

	static {
		for (ELoginStatus ect : ELoginStatus.values()) {
			ENUMMAP.put(ect.key, ect.value);
		}
	}
}