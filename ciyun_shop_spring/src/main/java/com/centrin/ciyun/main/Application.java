package com.centrin.ciyun.main;

import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import com.centrin.ciyun.common.AlipayServlet;
import com.centrin.ciyun.common.WebContextWrapper;
import com.centrin.ciyun.common.utils.JsonMapper;

@EnableAutoConfiguration
@SpringBootApplication
@ServletComponentScan("com.centrin.ciyun.*")
@ComponentScan("com.centrin.ciyun.*")
@ImportResource(locations={"classpath:spring-dubbo.xml","classpath:spring-mvc.xml"})
public class Application  extends SpringBootServletInitializer{
	private static Logger logger = Logger.getLogger(Application.class);
	 private static Class<Application> applicationClass = Application.class;
	
	@Bean
    public MappingJackson2HttpMessageConverter customJackson2HttpMessageConverter() {
        MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
        jsonConverter.setObjectMapper(new JsonMapper());
        return jsonConverter;
    }
	
	@Bean
    public AlipayServlet alipayServlet(){
        return new AlipayServlet();
    }
	
	@Bean
	public WebContextWrapper webContextWrapperBean(){
		return new WebContextWrapper();
	}
    
    @Bean
    public ServletRegistrationBean testServletRegistrationBean(AlipayServlet alipayServlet){
        ServletRegistrationBean registration = new ServletRegistrationBean(alipayServlet);
        registration.setEnabled(true);
        registration.addUrlMappings("/toali");
        return registration;
    }

	/**
	 * Main Start
	 */
	public static void main(String[] args) {
		SpringApplication springApplication = new SpringApplication(applicationClass);
		springApplication.run(args);
		logger.info("============= SpringBoot Start Success =============");
	}


    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(applicationClass);
    }



}