package com.centrin.ciyun.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @名称: MobileBrowserCheck.java
 * @包名： com.centrin.common.util
 * @描述: TODO
 * @作者： lwh
 * @日期：2014-12-15 下午04:20:48
 */
public class MobileBrowserCheck {
	
	//判断手机浏览器的正则
	private static String phoneReg = "\\b(ip(hone|od)|android|opera m(ob|in)i"    
            +"|windows (phone|ce)|blackberry"    
            +"|s(ymbian|eries60|amsung)|p(laybook|alm|rofile/midp"    
            +"|laystation portable)|nokia|fennec|htc[-_])"; 
	
	//判断平板电脑浏览器的正则
	private static String tableReg = "\\b(ipad|tablet|(Nexus 7)|up.browser"    
            +"|[1-4][0-9]{2}x[1-4][0-9]{2})\\b";
	
	//移动设备正则匹配：手机端、平板  
	private static Pattern phonePat = Pattern.compile(phoneReg, Pattern.CASE_INSENSITIVE);    
	private static Pattern tablePat = Pattern.compile(tableReg, Pattern.CASE_INSENSITIVE);    

	
	
	/**
	 * 根据userAgent判断浏览器
	 * @作者： lwh
	 * @日期：2014-12-15 下午04:24:16
	 * @param userAgent
	 * @return phone表示手机浏览器访问，table表示平板电脑访问，other表示其他浏览器访问
	 */
	public static String check(String userAgent){
		
		if(userAgent == null){
			userAgent = "";
		}
		
		Matcher phoneMatch = phonePat.matcher(userAgent);//手机匹配
		Matcher tableMatch = tablePat.matcher(userAgent);//平板匹配
		
		if(phoneMatch.find()){
			return "phone";
		}else if(tableMatch.find()){
			return "table";
		}else{
			return "other";
		}
		
	}
	
	/**
	 * 得到当前访问设备的操作系统类型，版本号，设备类型
	 * ios-iphone-9.3
	 * @作者： lwh
	 * @日期：2016-3-31 上午11:04:53
	 * @param ua
	 * @return
	 */
	public static BrowserType getMobilOS(String ua) {  
        ua = ua.toUpperCase();  
        if (ua == null) {  
            return null;  
        }  
        
        //操作系统类型
        String osType = "none";
        //设备类型
        String deviceType = "none";
        //操作系统版本
        String osVersion = "none";
        
        // 存放正则表达式  
        String rex = "";  
        
        // IOS 判断字符串  
        String iosString = " LIKE MAC OS X";  
        if (ua.indexOf(iosString) != -1) {  
        	
        	osType = "ios";
        	
            if(isMatch(ua, "\\([\\s]*iPhone[\\s]*;", Pattern.CASE_INSENSITIVE)){  
            	deviceType = "phone";
            }else if(isMatch(ua, "\\([\\s]*iPad[\\s]*;", Pattern.CASE_INSENSITIVE)){  
            	deviceType = "pad";
            }  
            rex = ".*" + "[\\s]+(\\d[_\\d]*)" + iosString;  
            Pattern p = Pattern.compile(rex, Pattern.CASE_INSENSITIVE);  
            Matcher m = p.matcher(ua);  
           
            
            boolean rs = m.find();  
            if (rs) {  
            	osVersion = m.group(1).replace("_", "."); 
            }else{
            	osVersion = osType;
            }  
            
           return new BrowserType(osType,osVersion,deviceType); 
        }  
        // Android 判断  
        String androidString = "ANDROID";  
        if (ua.indexOf(androidString) != -1) {  
        	osType = "android";
            if(isMatch(ua, "\\bMobi", Pattern.CASE_INSENSITIVE)){  
            	deviceType = "phone";
            }else {  
            	deviceType = "pad";
            }  
            rex = ".*" + androidString + "[\\s]*(\\d*[\\._\\d]*)";  
            Pattern p = Pattern.compile(rex, Pattern.CASE_INSENSITIVE);  
            Matcher m = p.matcher(ua);  
            boolean rs = m.find();  
            if (rs) {  
                osVersion =m.group(1).replace("_", ".");  
            }else{
            	osVersion = osType;
            }   
            
            return new BrowserType(osType,osVersion,deviceType); 
        }
        
        // windows phone 判断  
        String wpString = "WINDOWS PHONE";  
        if (ua.indexOf(wpString) != -1) {  
        	osType = "windows";
            rex = ".*" + wpString + "[\\s]*[OS\\s]*([\\d][\\.\\d]*)";  
            Pattern p = Pattern.compile(rex, Pattern.CASE_INSENSITIVE);  
            Matcher m = p.matcher(ua);  
            boolean rs = m.find();  
            if (rs) {  
                osVersion=m.group(1);  
            }  
            
            return new BrowserType(osType,osVersion,deviceType); 
        }  
        // BlackBerry 黑莓系统判断  
        String bbString = "BLACKBERRY";  
        if (ua.indexOf(bbString) != -1) { 
        	osType = "blackberry";
            rex = ".*" + bbString + "[\\s]*([\\d]*)";  
            Pattern p = Pattern.compile(rex, Pattern.CASE_INSENSITIVE);  
            Matcher m = p.matcher(ua);  
            boolean rs = m.find();  
            if (rs) {  
            	 osVersion=m.group(1); 
            }  
            
            return new BrowserType(osType,osVersion,deviceType); 
        }  
        
        if(ua.contains("LINUX")){//android  
        	osType = "android";
            if(isMatch(ua, "\\bMobi", Pattern.CASE_INSENSITIVE)){  
            	deviceType = "phone";  
            }else {  
            	deviceType = "pad"; 
            }  
              
             Pattern p = Pattern.compile("U;\\s*(Adr[\\s]*)?(\\d[\\.\\d]*\\d)[\\s]*;",Pattern.CASE_INSENSITIVE);  
            Matcher m = p.matcher(ua);  
            boolean result = m.find();  
            String find_result = null;  
            if (result)  
            {  
                find_result = m.group(2);  
            }  
            if(!StringUtils.isEmpty(find_result)){  
           	 	osVersion = find_result;  
            }else{
            	osVersion = osType;
            }
            
            return new BrowserType(osType,osVersion,deviceType); 
        }  
          
        //UCWEB/2.0 (iOS; U; iPh OS 4_3_2; zh-CN; iPh4)  
        if(ua.matches(".*((IOS)|(iPAD)).*(IPH).*")){  
        	
        	osType = "ios";
        	
            if(isMatch(ua, "[\\s]*iPh[\\s]*", Pattern.CASE_INSENSITIVE)){  
            	deviceType = "phone"; 
            }else {  
            	deviceType = "pad";   
            }  
             Pattern p = Pattern.compile("U;\\s*(IPH[\\s]*)?(OS[\\s]*)?(\\d[\\._\\d]*\\d)[\\s]*;",Pattern.CASE_INSENSITIVE);  
            Matcher m = p.matcher(ua);  
            boolean result = m.find();  
            String find_result = null;  
            if (result)  
            {  
                find_result = m.group(3);  
            } 
            
            if(!StringUtils.isEmpty(find_result)){
            	String version=find_result.replace("_", ".");  
           	 	osVersion = version;  
           }else{
           		osVersion = osType;
           }
            return new BrowserType(osType,osVersion,deviceType); 
        }
        return new BrowserType(osType,osVersion,deviceType); 
    } 
	
	
	/**
	 * 判断ua是否符合正则表达式reg
	 * @作者： lwh
	 * @日期：2016-3-31 上午10:48:19
	 * @param ua
	 * @param reg
	 * @param pattern
	 * @return
	 */
	private static boolean isMatch(String ua,String reg,int pattern){
		
		Pattern p = Pattern.compile(reg,pattern);  
        Matcher m = p.matcher(ua);  
        boolean result = m.find();
        
        if(result){
        	return true;
        }
		return false;
	}

	public static class BrowserType{
		
		private String osType;
		private String osVersion;
		private String deviceType;
		
		public BrowserType(){
			
		}
		
		public BrowserType(String os,String version,String device){
			this.osType=os;
			this.osVersion=version;
			this.deviceType=device;
		}

		public String getOsType() {
			return osType;
		}

		public void setOsType(String osType) {
			this.osType = osType;
		}

		public String getOsVersion() {
			return osVersion;
		}

		public void setOsVersion(String osVersion) {
			this.osVersion = osVersion;
		}

		public String getDeviceType() {
			return deviceType;
		}

		public void setDeviceType(String deviceType) {
			this.deviceType = deviceType;
		}
		
		
	}
}
