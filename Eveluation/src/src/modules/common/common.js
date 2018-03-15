import React, {Component} from "react";
import axios from "./httpAjax";
import qs from "qs";
import $ from "jquery";
import {Toast} from 'antd-mobile';

var common = {
  title: function(title) {
    document.title = title;
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'display: none; width: 0; height: 0;';
    iframe.src = 'about:blank';
    const listener = () => {
      setTimeout(() => {
        iframe.removeEventListener('load', listener);
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 0);
      }, 0);
    };
    iframe.addEventListener('load', listener);
    document.body.appendChild(iframe);
  },
  wxShareInfo: {
    gateway: "love-health.com.cn", //正式 centrinwx.ciyun.cn 开发 love-health.com.cn
    mpNum: "gh_0af25594cabd", //正式 gh_a88da45c1fae 开发 gh_0af25594cabd
    shareimage: "http://www.love-health.com.cn/uiue/eveluation/shareLogo.png", //开发 http://devweixin.love-health.com.cn 正式 https://wx.ciyun.cn
    sharename: "个人健康风险评估",
    shareurl: "http://evaluation.love-health.com.cn/evaluation/personHealthRisk/start?isWx=true",
    sharedesc: "全面评估个人健康风险，获得有效改善建议和医学干预",
    shareremark: "全面评估个人健康风险，获得有效改善建议和医学干预"
  },
  //APP分享
  appShare:function(gender){
    return(
      <div class="none">
        <input type="hidden" id="share" name="share" value="1"/>
        <input type="hidden" name="sharename" id="sharename" value={gender==1?common.wxShareInfo.sharename+"(男)":common.wxShareInfo.sharename+"(女)"} />
        <input type="hidden" name="shareimage" id="shareimage" value={common.wxShareInfo.shareimage}/>
        <input type="hidden" name="shareurl" id="shareurl" value={common.wxShareInfo.shareurl}/>
        <input type="hidden" name="sharedesc" id="sharedesc" value={common.wxShareInfo.sharedesc}/>
        <input type="hidden" name="shareremark" id="shareremark" value={common.wxShareInfo.shareremark}/>
      </div>
    )
  },
  //微信分享
  wxShare: function(title, linkUrl, imgUrl, desc, type, dataUrl) {
    var ishttps = (
      ("https:" == document.location.protocol)
      ? " https://"
      : " http://");
    var wxhost = ishttps + "centrinwx."+common.wxShareInfo.gateway;
    var curUrl = window.location.href;
    var reqUrl = curUrl.split('#')[0];
    reqUrl = reqUrl.replace(/&/g, "@^^^");
    var reqParam = '{"apiName":"loadjssdkconfig","reqData":{"mp_num":"' + common.wxShareInfo.mpNum + '"}}';
    $.ajax({
      type: "POST",
      async: false,
      crossDomain: true,
      url: wxhost + "/gateway/mp.gateway.inf?curUrl=" + reqUrl + "&reqData=" + reqParam + "&time=" + new Date().getTime(),
      dataType: "jsonp",
      contentType: 'application/json',
      jsonp: "jsonpShare",
      jsonpCallback: "jsonpShare",
      success: function(paramsJson) {
        if (paramsJson != null && paramsJson.reCode == "0000") {
          var configParam = paramsJson.reData;
          wx.config({
            debug: false,
            appId: configParam.appId,
            timestamp: configParam.timestamp,
            nonceStr: configParam.nonceStr,
            signature: configParam.signature,
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'hideOptionMenu'
            ]
          });
          wx.ready(function() {
            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: title,
              link: linkUrl,
              imgUrl: imgUrl,
              success: function() {
                console.log("成功 -分享到朋友圈"+linkUrl);
              },
              cancel: function() {
                console.log("取消 - 分享到朋友圈成功");
              }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: title,
              desc: desc,
              link: linkUrl,
              imgUrl: imgUrl,
              type: type,
              dataUrl: dataUrl,
              success: function() {
                console.log("成功 -分享给朋友"+linkUrl);
              },
              cancel: function() {
                console.log("取消 - 分享给朋友");
              }
            });
            //隐藏右上角分享
            // wx.ready(function() {
            //   wx.hideOptionMenu();
            // });
          });
          wx.error(function(res) {
            console.log("config信息验证失败：" + res.errMsg);
          });
        } else {
          console.log("获取config配置参数失败！");
        }
      }
    })
  },
  reportShare:function(gender){
    var gender = gender||window.localStorage.getItem("gender");
    var sharetitle =gender==1?common.wxShareInfo.sharename+"(男)":common.wxShareInfo.sharename+"(女)";
    var sharelinkUrl = common.wxShareInfo.shareurl;
    var shareimgUrl = common.wxShareInfo.shareimage;
    var sharedesc = common.wxShareInfo.sharedesc;
    common.wxShare(sharetitle, sharelinkUrl, shareimgUrl, sharedesc, "", "");
  },
  //通用get请求处理
  getAxios:function(url,data,callback){
    axios({
      url: url,
      method: "get",
      params: data
    }).then((response) => {
      var result = response.data.data;
      if (response.data.code == 0) {
        callback(result);
      } else {
        Toast.fail(response.data.msg, 3, null, true);
      }
    })
  },
}
export default common;
