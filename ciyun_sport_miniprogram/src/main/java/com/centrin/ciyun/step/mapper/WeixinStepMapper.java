package com.centrin.ciyun.step.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.centrin.ciyun.entity.step.WeixinStep;
import com.centrin.ciyun.step.domain.req.PersonBaseInfoParam;
import com.centrin.ciyun.step.domain.req.WeixinStepParam.WeixinStepViewParam;

/**
 * 微信计步数据映射mybatis
 * Created by jacky on 2018/2/23.
 */
@Mapper
public interface WeixinStepMapper {

    public List<WeixinStep> getWeixinStepList(WeixinStepViewParam weixinStepViewParam);
    
    public void updateWeixinStep(WeixinStep weixinStep);
    		
    public void saveWeixinStepList(@Param("weixinStepList") List<WeixinStep> weixinStepList);
    
    public void deleteWeixinStepById(@Param("id") int id);

}
