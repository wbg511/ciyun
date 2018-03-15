import axios from "./httpAjax";
import qs from "qs";
import $ from "jquery";

var phyInit = {
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
  host: {
    url: "",
  },
  wxShareInfo: {
    mpNum: "gh_a88da45c1fae", //正式 gh_a88da45c1fae 开发 gh_0af25594cabd
    shareLogo: "", //开发 http://devweixin.love-health.com.cn 正式 https://wx.ciyun.cn
    title: "体检预约",
    linkUrl: window.location.href.split('#')[0],
    desc: "体检预约"
  },
  wxShare: function(mpNum, title, linkUrl, imgUrl, desc, type, dataUrl) {
    var ishttps = (
      ("https:" == document.location.protocol)
      ? " https://"
      : " http://");
    var wxhost = ishttps + "centrinwx.ciyun.cn"; //正式 centrinwx.ciyun.cn 开发 love-health.com.cn
    var curUrl = window.location.href;
    var reqUrl = curUrl.split('#')[0];
    reqUrl = reqUrl.replace(/&/g, "@^^^");
    var reqParam = '{"apiName":"loadjssdkconfig","reqData":{"mp_num":"' + mpNum + '"}}';
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
              'hideMenuItems',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone',
              'closeWindow',
              'hideOptionMenu',
              'getLocation',
              'openLocation'
            ]
          });
          wx.ready(function() {
            // wx.getLocation({
            //     success: function (res) {
            //        var lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            //        var lng = res.longitude ; // 经度，浮点数，范围为180 ~ -180。
            //        window.localStorage.setItem('lat',lat)
            //        window.localStorage.setItem('lng',lng)
            //     },
            //     cancel: function (res) {
            //       alert('用户拒绝授权获取地理位置');
            //     }
            // });
            //隐藏右上角分享
            wx.ready(function() {
              wx.hideOptionMenu();
            });
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
}
export default phyInit;
