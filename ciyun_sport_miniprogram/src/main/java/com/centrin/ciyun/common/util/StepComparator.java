package com.centrin.ciyun.common.util;

import java.util.Comparator;

import com.centrin.ciyun.step.domain.vo.StepInfoVo;

public class StepComparator implements Comparator<StepInfoVo> {

	/**
	 * 排序标识 1-日期由低到高，2-日期由高到低
	 */
	private int sortFlag;


	/**
	 * 
	 * @param sortFlag 排序标识 1-日期由低到高，2-日期由高到低
	 */
	public StepComparator(int sortFlag) {
		this.sortFlag = sortFlag;
	}

	
	/**
	 * 通过日期排序
	 * @param step1
	 * @param step2
	 * @param flag 1-由低到高，2- 由高到低
	 */
	private int sortByTime(StepInfoVo step1, StepInfoVo step2, int flag) {
		Long timestamp1 = step1.getTimestamp();
		Long timestamp2 = step2.getTimestamp();
		
		int result = 1;
		if (timestamp1 != null && timestamp2 != null) {
			result = timestamp1.compareTo(timestamp2);
		}
		if (flag == 2) {
			result = result * -1;
		}
		return result;
	}


	@Override
	public int compare(StepInfoVo step1, StepInfoVo step2) {

		switch (sortFlag) {
		case 1:
			return this.sortByTime(step1, step2, 1);
		case 2:
			return this.sortByTime(step1, step2, 2);
		}

		return 0;
	}
}
