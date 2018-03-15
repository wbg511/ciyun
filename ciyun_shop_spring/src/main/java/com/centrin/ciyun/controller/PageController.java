package com.centrin.ciyun.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.centrin.ciyun.common.Constant;
import com.centrin.ciyun.common.Global;
import com.centrin.ciyun.common.utils.DesPlus;

@Controller
public class PageController extends BaseController{
	
	  @RequestMapping(value="/")
	    public String index(HttpServletRequest request,
				HttpServletResponse response) throws Exception{
		  logger.info("进入首页");
		  request.getSession().removeAttribute(Constant.SESSION_ORGCHANNEL);
		  return "index.html";
	    }
	  
	  
	  @RequestMapping(value="/pay/{orgId}")
	    public String pay(HttpServletRequest request,
				HttpServletResponse response,@PathVariable("orgId") String orgId,String type) throws Exception{
		  String alipayUrl=Global.getConfig("alipay_uri");
		  String wxpayUrl=Global.getConfig("wxpay_uri");
		  String ua = request.getHeader("user-agent").toLowerCase();
		  try{
			  DesPlus des = new DesPlus();
			  orgId = des.decrypt(orgId);
		  }catch(Exception e){
			  logger.error("解密失败:"+e.getMessage());
		  }
		  request.getSession().setAttribute(Constant.ORG_ID, orgId);
		  if(null!=type){
			  if("1".equals(type)){
				  return "redirect:/"+alipayUrl;
			  }else{
				  return "redirect:/"+wxpayUrl;
			  }
		  }else{
			  if(StringUtils.isNoneBlank(ua) && ua.indexOf("micromessenger") >= 0){
				  return "redirect:/"+wxpayUrl;
			  }else{
				  return "redirect:/"+alipayUrl;
			  }
		  }
	    }
}
