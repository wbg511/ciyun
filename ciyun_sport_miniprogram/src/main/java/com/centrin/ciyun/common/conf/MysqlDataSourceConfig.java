package com.centrin.ciyun.common.conf;

import java.io.IOException;
import java.util.Properties;

import javax.sql.DataSource;

import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.github.pagehelper.PageHelper;

@Configuration
@MapperScan(basePackages = {MysqlDataSourceConfig.STEP_PACKAGE}, sqlSessionFactoryRef = "mysqlSqlSessionFactory")
public class MysqlDataSourceConfig {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	static final String STEP_PACKAGE = "com.centrin.ciyun.step.mapper";

	@Bean(name = "mysqlDataSource")
	@Primary
	@ConfigurationProperties(prefix="datasource_mysql")
	public DataSource mysqlDataSource() {
		DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
		dataSourceBuilder.type(com.alibaba.druid.pool.DruidDataSource.class);
		return dataSourceBuilder.build();
	}

	@Bean(name = "mysqlSqlSessionFactory")
	@Primary
	public SqlSessionFactory mysqlSqlSessionFactory() {
		SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
		bean.setDataSource(mysqlDataSource());
		
		StringBuilder sb = new StringBuilder();
		sb.append("com.centrin.ciyun.step.entity");
		bean.setTypeAliasesPackage(sb.toString());

		// 分页插件
		PageHelper pageHelper = new PageHelper();
		Properties properties = new Properties();
		properties.setProperty("reasonable", "true");
		properties.setProperty("supportMethodsArguments", "true");
		properties.setProperty("returnPageInfo", "check");
		properties.setProperty("params", "count=countSql");
		pageHelper.setProperties(properties);
		bean.setPlugins(new Interceptor[] { pageHelper });

		// 添加mybatis配置文件
		PathMatchingResourcePatternResolver resourceResolver = new PathMatchingResourcePatternResolver();
		try {
			bean.setMapperLocations(resourceResolver.getResources("classpath:mapper/mysql/**/*.xml"));
			SqlSessionFactory sqlSessionFactory = bean.getObject();
			org.apache.ibatis.session.Configuration configuration = sqlSessionFactory.getConfiguration();
			// 设置支持字段对应实体属性驼峰格式
			configuration.setMapUnderscoreToCamelCase(true);

			return bean.getObject();
		} catch (IOException e) {
			logger.error("获取mapper资源出现异常", e);
			throw new RuntimeException("获取mapper资源出现异常", e);
		} catch (Exception e) {
			logger.error("初始化sqlSessionFactory时出现异常", e);
			throw new RuntimeException("初始化sqlSessionFactory时出现异常", e);
		}
	}

	/**
	 * 因为当前项目中有
	 * 
	 * @return
	 */
	@Bean(name = "mysqlTransactionManager")
	@Primary
	public DataSourceTransactionManager mysqlTransactionManager() {
		DataSourceTransactionManager manager = new DataSourceTransactionManager(mysqlDataSource());
		return manager;
	}
}