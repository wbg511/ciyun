package com.centrin.ciyun.step.controller;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.centrin.ciyun.common.constant.ReturnCode;
import com.centrin.ciyun.step.domain.req.WeixinStepParam.WeixinStepSaveParam;
import com.centrin.ciyun.step.domain.req.WeixinStepParam.WeixinStepViewParam;
import com.centrin.ciyun.step.domain.resp.HttpResponse;
import com.centrin.ciyun.step.service.WeixinStepService;

@RestController
@RequestMapping(value = "/step")
public class WeixinStepApi {

	private static final Logger LOGGER = LoggerFactory.getLogger(WeixinStepApi.class);
	
	@Autowired
	private WeixinStepService weixinStepService;
	/**
	 * 保存微信30天的计步数据
	 * @param weixinStepParam 请求参数封装类
	 * @return
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public HttpResponse saveStepOfThirtyDay(@RequestBody WeixinStepSaveParam weixinStepSaveParam, HttpSession session){
		HttpResponse res = new HttpResponse();
		LOGGER.info("WeixinStepApi >> saveStepOfThirtyDay >> 从前端请求的参数：{}", weixinStepSaveParam.toString());
		
		if(weixinStepSaveParam == null || StringUtils.isEmpty(weixinStepSaveParam.getThirdSession()) ||
				StringUtils.isEmpty(weixinStepSaveParam.getEncryptedData()) || StringUtils.isEmpty(weixinStepSaveParam.getIv())){
			LOGGER.error("WeixinStepApi >> saveStepOfThirtyDay >> 请求参数为空");
			res.setMessage(ReturnCode.EReturnCode.PARAM_IS_NULL.value);
			res.setResult(ReturnCode.EReturnCode.PARAM_IS_NULL.key.intValue());
			return res;
		}
		
		try{
			res = weixinStepService.saveStepOfThirdthDay(weixinStepSaveParam, session);
		}catch(Exception ex){
			LOGGER.error("", ex);
			res.setMessage(ReturnCode.EReturnCode.SYSTEM_BUSY.value);
			res.setResult(ReturnCode.EReturnCode.SYSTEM_BUSY.key.intValue());
		}
		
		LOGGER.info("WeixinStepApi >> saveStepOfThirtyDay >> 返回给前端的结果：  {}", res);
		return res;
	}
	
	
	/**
	 * 查询用户的计步数据信息
	 * @param weixinStepParam 请求参数封装类
	 * @return
	 */
	@RequestMapping(value = "/queryStepInfoOfPersonId", method = RequestMethod.POST)
	public HttpResponse queryStepInfoOfPersonId(@RequestBody WeixinStepViewParam weixinStepViewParam){
		HttpResponse res = new HttpResponse();
		LOGGER.info("WeixinStepApi >> queryStepOfPersonId >> 从前端请求的参数：{}", weixinStepViewParam.toString());
		
		if(weixinStepViewParam == null || StringUtils.isEmpty(weixinStepViewParam.getPersonId()) ||
				weixinStepViewParam.getBeginTimestamp() == null || weixinStepViewParam.getEndTimestamp() == null){
			LOGGER.error("WeixinStepApi >> queryStepOfPersonId >> 请求参数为空");
			res.setMessage(ReturnCode.EReturnCode.PARAM_IS_NULL.value);
			res.setResult(ReturnCode.EReturnCode.PARAM_IS_NULL.key.intValue());
			return res;
		}
		
		try{
			res = weixinStepService.queryStepInfoOfPersonId(weixinStepViewParam);
		}catch(Exception ex){
			LOGGER.error("", ex);
			res.setMessage(ReturnCode.EReturnCode.SYSTEM_BUSY.value);
			res.setResult(ReturnCode.EReturnCode.SYSTEM_BUSY.key.intValue());
		}
		
		LOGGER.info("WeixinStepApi >> queryStepOfPersonId >> 返回给前端的结果：  {}", res);
		return res;
	}
}
