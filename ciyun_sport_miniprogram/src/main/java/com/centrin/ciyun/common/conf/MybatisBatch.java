package com.centrin.ciyun.common.conf;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.centrin.ciyun.common.util.WebContextWrapper;


public class MybatisBatch {
	private static final Log logger = LogFactory.getLog(MybatisBatch.class);
	
	public static <T> void batchUpdateCommit(String mybatisSQLId, List<T> list) {
		SqlSessionFactory sqlSessionFactory = (SqlSessionFactory) WebContextWrapper.getBean("mysqlSqlSessionFactory");
		SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH, false);
		int perCommit = 1000;
		int commitCount = (int) Math.ceil(list.size() / (double) perCommit);
		List<T> tempList = new ArrayList<T>(perCommit);
		int start, stop;
		Long startTime = System.currentTimeMillis();
		for (int i = 0; i < commitCount; i++) {
			tempList.clear();
			start = i * perCommit;
			stop = Math.min(i * perCommit + perCommit - 1, list.size() - 1);
			for (int j = start; j <= stop; j++) {
				session.update(mybatisSQLId, list.get(j));
			}
		}
		Long endTime = System.currentTimeMillis();
		logger.debug("batchCommit耗时：" + (endTime - startTime) + "毫秒");
	}
	

}
