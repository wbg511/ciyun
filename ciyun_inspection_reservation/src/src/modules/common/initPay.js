import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import axios from "./httpAjax";
import phyInit from "./phy.init";
import qs from "qs";
import $ from "jquery";
import { Toast,Modal } from 'antd-mobile';



let Pay = {};
let payCallback;
Pay.done = function (payType,recordId) {
    if (typeof _callback === "function") {
        payCallback = _callback;
    }
    axios({
      url: "/record/getPayParam.json",
      data:{
        "personId":window.localStorage.getItem("personId"),
        "recordId":recordId,
        "payType":payType,
        "payOpenId":window.localStorage.getItem("payOpenId")//"oGC2oswVdhLatHs57lXLi8sEHsnI"
      },
      method: "post"
    }).then((response) => {
      this.doneResponse(payType,response,recordId);
    });
};

//支付完成
Pay.doneResponse = function (payType,response,recordId) {
  if(response.data.code==0){
      if(payType==1){//app支付宝
        var prePayId_ali = response.data.result.aliApp;
          if(typeof appAliPay !== 'undefined'){
            appAliPay(JSON.stringify(prePayId_ali));
          }else if(typeof window.ciyun!== 'undefined' && typeof window.ciyun.appAliPay !== 'undefined'){
            window.ciyun.appAliPay(JSON.stringify(prePayId_ali));
          }else{
            console.log("非APP支付宝支付");
          }
      }else if(payType==2){//app微信
        var prePayId_wx = response.data.result.wxApp.prePayId;
          if(typeof appWXPay !== 'undefined'){
            appWXPay(prePayId_wx);
          }else if(typeof window.ciyun!== 'undefined' && typeof window.ciyun.appWXPay !== 'undefined'){
            window.ciyun.appWXPay(prePayId_wx);
          }else{
            console.log("非APP微信支付");
          }
      }else if(payType==3){//微信JSSDK支付
            if (typeof WeixinJSBridge === "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', this.jsApiCall);
                    document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
                }
            } else {
                window.Pay.wxApiCall(response,recordId);
            }
      }
  }else{
    Toast.fail(response.data.code+"--"+response.data.msg, 3, '', true);
  }
}




export {Pay as default}
