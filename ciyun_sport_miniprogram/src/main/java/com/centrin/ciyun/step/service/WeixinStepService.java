package com.centrin.ciyun.step.service;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.centrin.ciyun.common.constant.ReturnCode.EReturnCode;
import com.centrin.ciyun.common.util.AES;
import com.centrin.ciyun.common.util.HttpUtil;
import com.centrin.ciyun.common.util.SessionValidateUtil;
import com.centrin.ciyun.common.util.StepComparator;
import com.centrin.ciyun.entity.step.WeixinStep;
import com.centrin.ciyun.step.domain.req.WeixinStepParam.WeixinStepSaveParam;
import com.centrin.ciyun.step.domain.req.WeixinStepParam.WeixinStepViewParam;
import com.centrin.ciyun.step.domain.resp.HttpResponse;
import com.centrin.ciyun.step.domain.vo.PerPersonVo;
import com.centrin.ciyun.step.domain.vo.StepInfoVo;
import com.centrin.ciyun.step.mapper.WeixinStepMapper;


@Service
public class WeixinStepService {

	private static final Logger LOGGER = LoggerFactory.getLogger( WeixinStepService.class);
	
	@Autowired
	private  WeixinStepMapper weixinStepMapper;
	
	@Value("${ciyun.signApiUrl}")
	private String signApiUrl; //体征服务系统接口地址
	
	@Transactional(rollbackFor=Exception.class)
	public HttpResponse saveStepOfThirdthDay(WeixinStepSaveParam weixinStepSaveParam, HttpSession session){
		HttpResponse res = new HttpResponse();
		res.setResult(EReturnCode.OK.key);    
		res.setMessage(EReturnCode.OK.value);
		
		// step1: 校验用户会话：校验通过，返回用户信息对象；校验不通过，返回null
		PerPersonVo personVo = SessionValidateUtil.getKeyAndOpenIdStr(session, weixinStepSaveParam.getThirdSession());
		if(null == personVo){
			LOGGER.error("慈云平台生成的sessionkey已失效");
			res.setResult(EReturnCode.THIRD_SESSION_KEY.key.intValue());
			res.setMessage(EReturnCode.THIRD_SESSION_KEY.value);
			return res;
		}
		
		//要注释掉Begin
		/*PerPersonVo personVo = new PerPersonVo();
		personVo.setPersonId("p1231231231");
		personVo.setSessionKey("tiihtNczf5v6AKRyjwEUhQ==");*/
		//要注释掉End
		
		// step2: 解密微信运动数据
		String userInfo = null;
		try{
			byte[] resultByte  = AES.decrypt(Base64.decodeBase64(weixinStepSaveParam.getEncryptedData()),    
		            Base64.decodeBase64(personVo.getSessionKey()),  
		            Base64.decodeBase64(weixinStepSaveParam.getIv()));    
            if(null == resultByte || resultByte.length == 0){    
            	res.setResult(EReturnCode.DECODE_DATA_IS_NULL.key);    
            	res.setMessage(EReturnCode.DECODE_DATA_IS_NULL.value);    
            	return res;
            }   
            
            userInfo = new String(resultByte, "UTF-8");  
            LOGGER.error("解密后的数据：{}", userInfo);
        }catch (InvalidAlgorithmParameterException e) {    
            e.printStackTrace(); 
            res.setResult(EReturnCode.DECODE_FAIL.key);    
        	res.setMessage(EReturnCode.DECODE_FAIL.value);    
        	return res;
        } catch (UnsupportedEncodingException e) {    
            e.printStackTrace();
            res.setResult(EReturnCode.DECODE_FAIL.key);    
        	res.setMessage(EReturnCode.DECODE_FAIL.value);    
        	return res;
        } 
		
        JSONObject userInfoJson = JSONObject.parseObject(userInfo);
        List<StepInfoVo> stepInfoVoList = new ArrayList<>();
        //解密后的数据转换为list
        if(userInfoJson != null){
        	JSONArray stepInfoListJsonArray = userInfoJson.getJSONArray("stepInfoList");
        	if(stepInfoListJsonArray != null && stepInfoListJsonArray.size() > 0){
        		stepInfoVoList = JSONObject.parseArray(stepInfoListJsonArray.toJSONString(), StepInfoVo.class);
        	}
        	if(!stepInfoVoList.isEmpty()){
        		//正排序
        		Collections.sort(stepInfoVoList, new StepComparator(1));
        	}
        }
        
        //要注释掉Begin
  		/*for(int i = 1; i <= 30 ; i++){
  			StepInfoVo vo = new StepInfoVo();
  			if(i < 10){
  				vo.setTimestamp(DateHelper.convertStringToDate("2018-03-0"+i, DateHelper.sdf).getTime()/1000);
  			}else{
  				vo.setTimestamp(DateHelper.convertStringToDate("2018-03-"+i, DateHelper.sdf).getTime()/1000);
  			}
  			vo.setStep((int)(1000*Math.random()));
  			stepInfoVoList.add(vo);
  		}*/
        //要注释点End
        
        // step3: 根据personId查询用户步数记录，取最后一条记录的时间戳
        WeixinStepViewParam param = new WeixinStepViewParam();
        param.setPersonId(personVo.getPersonId());
        List<WeixinStep> weixinStepListResult = weixinStepMapper.getWeixinStepList(param);
        WeixinStep weixinStepResult = null;
        if(weixinStepListResult != null && !weixinStepListResult.isEmpty()){
        	weixinStepResult = weixinStepListResult.get(0);
        }
        
        // step4: 保存微信运动数据
        List<WeixinStep> weixinStepList = saveWeixinStepData(weixinStepResult, personVo.getPersonId(), stepInfoVoList);
        
        // step5: 取最近7天的数据返回给前端
        if(!stepInfoVoList.isEmpty()){
        	List<StepInfoVo> stepInfoVoListReturn = new ArrayList<>();
        	int size = stepInfoVoList.size();
        	for(int i = size - 7 ; i < size; i++){
        		stepInfoVoListReturn.add(stepInfoVoList.get(i));
        	}
    		res.setDatas(stepInfoVoListReturn);
    	}
		
        // step6: 将微信运动数据异步上报到慈云体征服务系统
        // 这里不能将weixinStepList传给体征系统，会有遗漏数据的场景出现
        HttpUtil.sendRequestAsynch(signApiUrl + "miniapp/pullData", fillRequestParam(stepInfoVoList, personVo.getPersonId()), "POST");
        
		return res;
	}
	
	/**
	 * 保存微信运动数据
	 * @param weixinStepResult 用户库里最后一条步数记录对象
	 * @param personId 慈云用户ID
	 * @param stepInfoVoList 微信运动拉取到的数据集合
	 */
	public List<WeixinStep> saveWeixinStepData(WeixinStep weixinStepResult, String personId, List<StepInfoVo> stepInfoVoList){
		 List<WeixinStep> weixinStepList = new ArrayList<>();
		
		// step1: 用户数据库中的步数记录为空，保存所有数据源的步数
        if(weixinStepResult == null){
        	if(!stepInfoVoList.isEmpty()){
        		for(StepInfoVo vo : stepInfoVoList){
        			fillWeixinStepLIst(weixinStepList, personId, vo);
        		}
        	}
        }else{// step2: 当用户步数记录不为空，循环判断
         	  // 最后一条记录的时间戳等于数据源的某一天时，先删除当天的步数再保存
         	  // 最后一条记录的时间戳小于数据源的日期，保存当前天的步数
        	
        	if(!stepInfoVoList.isEmpty()){
        		for(StepInfoVo vo : stepInfoVoList){
        			//时间戳等于数据源的某一天时，更新当前天的步数
        			if(weixinStepResult.getEveryTimestamp().intValue() == vo.getTimestamp().intValue()){
        				weixinStepMapper.deleteWeixinStepById(weixinStepResult.getId());
        				fillWeixinStepLIst(weixinStepList, personId, vo);
        			}else if(weixinStepResult.getEveryTimestamp().intValue() < vo.getTimestamp().intValue()){ //时间戳小于数据源的日期，保存当前天的步数
        				fillWeixinStepLIst(weixinStepList, personId, vo);
        			}
        		}
        	}
        }
        
        //保存微信运动数据
        if(!weixinStepList.isEmpty()){
			weixinStepMapper.saveWeixinStepList(weixinStepList);
		}
        
        return weixinStepList;
	}
	
	/**
	 * 填充WeixinStep对象
	 * @param weixinStepList
	 * @param personId
	 * @param vo
	 */
	public void fillWeixinStepLIst(List<WeixinStep> weixinStepList, String personId, StepInfoVo vo){
		WeixinStep weixinStep = new WeixinStep();
		weixinStep.setPersonId(personId);
		weixinStep.setEveryTimestamp(vo.getTimestamp());
		weixinStep.setEveryStep(vo.getStep());
		weixinStepList.add(weixinStep);
	}
	
	/**
	 * 填充请求参数
	 * @param weixinStepList
	 * @param personId
	 * @return
	 */
	public String fillRequestParam(List<StepInfoVo> stepInfoVoList, String personId){
		JSONObject reqJson = new JSONObject();
		reqJson.put("personId", personId);
		List<WeixinStep> datas = new ArrayList<>();
		for(StepInfoVo vo : stepInfoVoList){
			fillWeixinStepLIst(datas, personId, vo);
		}
		reqJson.put("datas", datas);
		return reqJson.toJSONString();
	}
	
	
	/**
	 * 查询用户的计步数据信息
	 * @param weixinStepSaveParam
	 * @return
	 */
	public HttpResponse queryStepInfoOfPersonId(WeixinStepViewParam weixinStepViewParam){
		HttpResponse res = new HttpResponse();
		res.setResult(EReturnCode.OK.key);    
		res.setMessage(EReturnCode.OK.value);
		List<WeixinStep> weixinStepList = weixinStepMapper.getWeixinStepList(weixinStepViewParam);
		res.setDatas(weixinStepList);
		return res;
	}
	
}
