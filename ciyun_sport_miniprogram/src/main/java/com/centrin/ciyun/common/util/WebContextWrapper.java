package com.centrin.ciyun.common.util;

import java.util.Iterator;
import java.util.Map;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class WebContextWrapper implements ApplicationContextAware {

	private static ApplicationContext applicationContext;

	public  WebContextWrapper(){};
	
	public WebContextWrapper(ApplicationContext applicationContext){
		WebContextWrapper.applicationContext = applicationContext;
	}
	/**
	 * 实现ApplicationContextAware接口的context注入函数, 将其存入静态变量.
	 */
	public void setApplicationContext(ApplicationContext applicationContext) {
		WebContextWrapper.applicationContext = applicationContext; // NOSONAR
	}

	/**
	 * 取得存储在静态变量中的ApplicationContext.
	 */
	public static ApplicationContext getApplicationContext() {
		checkApplicationContext();
		return applicationContext;
	}

	/**
	 * 从静态变量ApplicationContext中取得Bean, 自动转型为所赋值对象的类型.
	 */
	@SuppressWarnings("unchecked")
	public static <T> T getBean(String name) {
		checkApplicationContext();
		return (T) applicationContext.getBean(name);
	}

	/**
	 * 从静态变量ApplicationContext中取得Bean, 自动转型为所赋值对象的类型.
	 */
	public static <T> T getBean(Class<T> clazz) {
		checkApplicationContext();
		Map<String, T> map = applicationContext.getBeansOfType(clazz);
		Iterator<String> iterator = map.keySet().iterator();
		int i = 1;
		T temp = null;
		while (i == 1 && iterator.hasNext()) {
			temp = map.get(iterator.next());
			i++;
		}
		return temp;
	}

	/**
	 * 清除applicationContext静态变量.
	 */
	public static void cleanApplicationContext() {
		applicationContext = null;
	}

	private static void checkApplicationContext() {
		if (applicationContext == null) {
			throw new IllegalStateException(
					"applicaitonContext is null,please defined bean ContextHolder in applicationContext.xml");
		}
	}
}