package com.centrin.ciyun.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;

import com.centrin.ciyun.common.Constant;
import com.centrin.ciyun.common.bean.WxUserInfo;
import com.centrin.ciyun.common.msg.RespMsg;
import com.centrin.ciyun.common.utils.JsonMapper;

/**
 * 
 * 描述：基础的Controller类
 *
 * @since 1.0
 */
public abstract  class BaseController {

	
	/**
	 * 日志对象
	 */
	protected static Log logger = LogFactory.getLog(BaseController.class);
	
	/**
	 *统一的异常返回格式
	 *getResponseMsg_failed  
	 *@param returnCode
	 *@param returnInfo
	 *@return
	 */
	protected RespMsg getResponseMsg_failed(String code, String message) {
		String os= (String) getSession().getAttribute(Constant.SESSION_OS);
		String ver= (String) getSession().getAttribute(Constant.SESSION_VER);
		RespMsg resMsg = new RespMsg(ver,os);
		resMsg.setRetCode(code);
		resMsg.setMsg(message);
		if (logger.isDebugEnabled()) {
			logger.debug("\r\n响应body:" + JsonMapper.getInstance().toJson(resMsg));
		}
		return resMsg;
	}
	
	/**
	 * 统一的成功返回格式
	 *getResponseMsg_success  
	 *@param object
	 *@return
	 */
	protected RespMsg getResponseMsg_success() {
		String os= (String) getSession().getAttribute(Constant.SESSION_OS);
		String ver= (String) getSession().getAttribute(Constant.SESSION_VER);
		RespMsg resMsg = new RespMsg(ver,os);
		if (logger.isDebugEnabled()) {
			logger.debug("\r\n响应body:" + JsonMapper.getInstance().toJson(resMsg));
		}
		return resMsg;
	}
	
	/**
	 * 统一的成功返回格式
	 *getResponseMsg_success  
	 *@param object
	 *@return
	 */
	protected RespMsg getResponseMsg_success(Object object) {
		String os= (String) getSession().getAttribute(Constant.SESSION_OS);
		String ver= (String) getSession().getAttribute(Constant.SESSION_VER);
		RespMsg resMsg = new RespMsg(ver,os);
		resMsg.setItem(object);
		if (logger.isDebugEnabled()) {
			logger.debug("\r\n响应body:" + JsonMapper.getInstance().toJson(resMsg));
		}
		logger.info("\r\n响应body:" + JsonMapper.getInstance().toJson(resMsg));
		return resMsg;
	}
	
	
	protected   HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }
	
	protected   HttpServletResponse getResponse() {
		return ((ServletWebRequest)RequestContextHolder.getRequestAttributes()).getResponse();
    }
	
	protected   HttpSession getSession(){
		HttpServletRequest request = getRequest();
		if(request==null)
			return null;
		return request.getSession();
	}
	
	protected   void setSessionAttribute(String name,Object obj){
		HttpSession session = getSession();
		if(session!=null){
			session.setAttribute(name, obj);
		}
	}
	
	protected   void removeSessionAttribute(String name){
		HttpSession session = getSession();
		if(session!=null){
			session.removeAttribute(name);
		}
	}
	
	protected  String getIpAddress(){
		return (String)getSession().getAttribute(Constant.SESSION_IP);
	}
	
	protected  String getToken(){
		Object obj=getSession().getAttribute(Constant.SESSION_TOKEN);
		if(null!=obj){
			return (String)getSession().getAttribute(Constant.SESSION_TOKEN);
		}
		return null;
	}
	
	protected  String getOrgChannel(){
		Object obj=getSession().getAttribute(Constant.SESSION_ORGCHANNEL);
		if(null!=obj){
			return (String)getSession().getAttribute(Constant.SESSION_ORGCHANNEL);
		}
		return null;
	}
	
	protected  void saveOrgChannel(String orgChannel){
		getSession().setAttribute(Constant.SESSION_ORGCHANNEL,orgChannel);
	}
	
	
	protected String getPersonId(){
		return getUserInfo().getPersonId();
	}
	
	protected   String getOs(){
		return (String) getSession().getAttribute(Constant.SESSION_OS);
	}
	
	protected   String getVer(){
		return (String) getSession().getAttribute(Constant.SESSION_VER);
	}
	
	protected   WxUserInfo getUserInfo(){
		return (WxUserInfo) getSession().getAttribute(Constant.SESSION_SHOPUSER);
	}
}
