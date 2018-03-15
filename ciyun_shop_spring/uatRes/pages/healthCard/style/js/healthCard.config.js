(function(win,doc){
    //接口地址配置
	 var host="http://newshop.love-health.com.cn";	 
	 var app = {
	    version:"3.2.0",//升级请修改
	    wxShareMpNum:"gh_a88da45c1fae",//慈云研发中心 正式环境记得修改mpNum
        api:host+"/api/",
        apiWxLogin:host+"/towx/",
        apiLogin:host+"/doLogin/",
        apiError:"接口地址配置故障，请联系管理员",
        formError:"请勿输入特殊字符",
        apiLocalstorage:"Cookie和Localstorage均不支持，悲剧了...",
        serviceName:"/healthCard/",
        showHead:false,
        shopIndexUrl:"",
        shopOrderUrl:"",
        //源配置
        source:[
            'css!healthCard',
            'healthCardInit',
            'healthCardSystem'
        ],
        strTobool:function(str){
            return (str && typeof str == 'string') ? (str.toLowerCase() == 'true' || str == '1') : (str == true);
        },
        //获取长度
        getLength : function (str) {
            var realLength = 0, len = str.length, charCode = -1;
            for (var i = 0; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128) realLength += 1;
                else realLength += 2;
            }
            return realLength;
        },
        //截取长度
        cutstr: function(str, len) {
            var str_length = 0;
            var str_len = 0;
            str_cut = new String();
            str_len = str.length;
            for (var i = 0; i < str_len; i++) {
                a = str.charAt(i);
                str_length++;
                if (escape(a).length > 4) {
                    str_length++;
                }
                str_cut = str_cut.concat(a);
                if (str_length >= len) {
                    str_cut = str_cut.concat("...");
                    return str_cut;
                }
            }
            if (str_length < len) {
                return str;
            }
        },
        //获取地址 避免地址混乱
        getRootPath:function(){
            //point根据项目目录自己设定
            var location = win.location.href,
                path = location.split(app.serviceName)[0] + app.serviceName;
            return path;
        },
        //随机数
        random:function( length, upper, lower, number ){
            if( !upper && !lower && !number ){
                upper = lower = number = true;
            }
            var a = [
                ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
                ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
                ["0","1","2","3","4","5","6","7","8","9"]
            ];
            var b = [];
            var c = "";
            b = upper ? b.concat(a[0]) : b;
            b = lower ? b.concat(a[1]) : b;
            b = number ? b.concat(a[2]) : b;
            for (var i=0;i<length;i++){ 
                c += b[ Math.round(Math.random()*(b.length-1)) ];
            }
            return c; 
        },
        //获取URL参数 key 参数名称 url URL链接，默认为当前URL
        getUrlKey:function( key, url ){
          var url = url ? url : location.href;    
          var v = '';
          var o = url.indexOf( key + "=" );
          if (o != -1){
              o += key.length + 1 ;
              e = url.indexOf("&", o);
              if (e == -1){
                  e = url.length;
              }
              //v = decodeURIComponent(url.substring(o, e));
              v = url.substring(o, e);
          }
          return v;
        },
        loadPopPage:function(title,url){
            var popupHTML = '<div class="popup">'+
                    '<header class="bar bar-nav">'+
                        '<a class="icon pull-left close-popup" href="javascript:;"><span class="icon-item">关闭</span></a>'+
                        '<h1 class="title-popupDyn">'+title+'</h1>'+
                    '</header>'+
                    '<div class="content">'+
                    '<iframe class="content-iframe" src="'+url+'">'+
                    '</iframe>'+
                    '</div>'+
                  '</div>'
            $.popup(popupHTML);
        },
        //load page
        loadPage:function(url, fromtag) {
            var fromtag = fromtag || 0;
            if (fromtag == "closepanel") {
                $.closePanel()
            }
            $.router.loadPage(url)
        },
        //获取pageId
        getPageId:function() {
            var $page = $(".page-current");
            if (!$page[0]) {
                $page = $(".page").addClass("page-current")
            }
            return $page[0].id;
        },
        //miniAlert
        miniAlert:function(txt, fun) {
            if (fun) {
                $.modal({
                    title: "",
                    text: txt,
                    buttons: [{
                        text: "Ok",
                        onClick: eval(fun)
                    }]
                })
            } else {
                $.modal({
                    title: "",
                    text: txt,
                    buttons: [{
                        text: "确认"
                    }]
                })
            }
        },
        loadH5Error:function(){
            var loadH5ErrorHtml = '<div class="popup popup-eror"><div class="content-error">'+
                            '<p>请在慈云健康APP上进行购买</p>'+
                            '<p class="imgQcode"><img src="style/images/qcode/erweima-img.jpg" alt="" /></p>'+
                            '<p><a class="external" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ciyun.lovehealth&g_f=991653">下载慈云APP</a></p>'+
                            '</div></div>';
          $.popup(loadH5ErrorHtml);
        },
        loadError:function(){
          var loadErrorHtml = '<div class="popup popup-h5"><div class="content-error">'+
                            '<p>系统错误，请联系管理员！</p>'+
                            '</div></div>';
          $.popup(loadErrorHtml);
        },
        intShopLoad:function(tplTo){
            var html = '<div class="shop-loading-overlay shop-loading-pre"></div>'+
            '<div class="shop-loading shop-loading-pre">'+
                '<span class="preloader loading preloader-white"></span>'+
            '</div>';
            $(tplTo).append(html);
        },
        getAllCookies:function(){
            if(document.cookie) {
                var aCookie = document.cookie.split(";");  
                var re="";  
                for (var i = 0; i < aCookie.length; i++) {
                        var aCrumb = aCookie[i].split("=");  
                        re += (aCrumb[0] + ":" + aCrumb[1] + '\n');  
                }
                return re;  
            }else{
               return "无cookie"
            }
        },
        isCookie:function(){
            if(window.navigator.cookieEnabled) {
                return true;  
            }else{  
                return false;
            }
        },
        isLocalStorage:function(){
            if(window.localStorage) {
                return true;  
            }else{  
                return false;
            }
        },
        isAppLogin: function(){
            if(typeof window.ciyun!= "undefined" && typeof window.ciyun.isInApp != "undefined"){//android 
                window.ciyun.clickFromJs("1");//传1调登录
            }else if(typeof isInApp!= "undefined" && typeof(isInApp) == "function"){//ios
                    webFunFromIosWithOperateType("1");
            }else{//h5无登录
                app.loadH5Error();
            }
        },
        isWxLogin: function(){
            var url = window.location.href;
            $.ajax({
              type: 'POST',
              url: app.apiWxLogin,
              dataType: 'json',
              data: JSON.stringify({"url":url}),
              async:false,
              contentType: 'application/json',
              timeout: 30000,
              success: function(data){
                var code = data.retCode;
                if(code=="0"){
                    window.location.href = data.item.redirectUrl;
                }else{
                    $.toast("登录跳转失败",5000);
                }
              },
              error: function(xhr, type){
                //接口异常
                $.toast(app.apiError,5000);
                $(".shop-loading-pre").remove();
              }
            })
        },
        getAppPersonId :function(){
            if(typeof window.ciyun!= "undefined" && typeof window.ciyun.isInApp != "undefined"){//android 
                window.ciyun.isInApp();
            }else if(typeof isInApp!= "undefined" && typeof(isInApp) == "function"){//ios
                isInApp();
            }
        },
        wxShare:function (title,linkUrl,imgUrl,desc,type,dataUrl){
            var curUrl = window.location.href;
            var  mpNum=app.wxShareMpNum;
            var reqUrl = curUrl.split('#')[0];
            reqUrl = reqUrl.replace(/&/g,"@^^^");
            var reqParam = '{"apiName":"loadjssdkconfig","reqData":{"mp_num":"'+mpNum+'"}}';
            $.ajax({
                type: "POST",
                async: false,
                url: "http://www.centrinwx.com/gateway/mp.gateway.inf?curUrl="+reqUrl+"&reqData="+reqParam+"&time="+new Date().getTime(),
                dataType: "jsonp",
                contentType: 'application/json',
                jsonp: "jsonpShare",
                jsonpCallback:"jsonpShare",
                success: function(paramsJson){
                    if(paramsJson != null && paramsJson.reCode=="0000"){
                        var configParam = paramsJson.reData;
                        wx.config({
                            debug: false,
                            appId: configParam.appId, 
                            timestamp: configParam.timestamp,
                            nonceStr: configParam.nonceStr, 
                            signature: configParam.signature,
                            jsApiList: ['hideMenuItems','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone','closeWindow','hideOptionMenu']
                        });
                        wx.ready(function(){  
                                //分享到朋友圈
                                wx.onMenuShareTimeline({
                                    title: title,
                                    link: linkUrl,
                                    imgUrl: imgUrl,
                                    success: function () {
                                        console.log("成功 -分享到朋友圈");
                                    },
                                    cancel: function () {
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
                                    success: function () { 
                                        console.log("成功 -分享给朋友");
                                    },
                                    cancel: function () { 
                                        console.log("取消 - 分享给朋友");
                                    }
                                });
                                //分享到QQ
                                wx.onMenuShareQQ({
                                    title: title,
                                    desc: desc,
                                    link: linkUrl,
                                    imgUrl: imgUrl,
                                    success: function () { 
                                        console.log("成功 -分享到QQ");
                                    },
                                    cancel: function () { 
                                        console.log("取消 - 分享到QQ");
                                    }
                                });
                                //分享到微博
                                wx.onMenuShareWeibo({
                                    title: title,
                                    desc: desc,
                                    link: linkUrl,
                                    imgUrl: imgUrl,
                                    success: function () { 
                                        console.log("成功 -分享到QQ");
                                    },
                                    cancel: function () { 
                                        console.log("取消 - 分享到QQ");
                                    }
                                });
                                //分享到Qzone
                                wx.onMenuShareQZone({
                                    title: title,
                                    desc: desc,
                                    link: linkUrl,
                                    imgUrl: imgUrl,
                                    success: function () { 
                                        console.log("成功 -分享到QQ");
                                    },
                                    cancel: function () { 
                                        console.log("取消 - 分享到QQ");
                                    }
                                });
                        });
                        wx.error(function(res){
                            console.log("config信息验证失败："+res.errMsg);
                        });
                    }else{
                        console.log("获取config配置参数失败！");
                    }
                }
            });
        },
        wxGetTitle : function(title){//微信无法修改title hack
            var $body = $('body');
            document.title = title;
            var $iframe = $("<iframe style='display:none;' class='title-iframe' src='/favicon.ico'></iframe>");
            $iframe.on('load',function() {
            setTimeout(function() {
               $iframe.off('load').hide().remove();
            }, 0);
            }).appendTo($body);
        },
        //获取模板数据
        getTplData : function(type,tplForm,tplTo,fn){
            app.intShopLoad(tplTo);
            var template = $(tplForm).html();
            var compiledTemplate = Template7.compile(template);
            var location = window.location.href;
            var goodsId =app.getUrlKey("goodsId",location);
            var healthCardId =app.getUrlKey("healthCardId",location);       
            var serviceItemId =app.getUrlKey("serviceItemId",location);       
            //type 数据模板请求类型
            switch(type) {
                case "healthcard":
                    datas = JSON.stringify({
                        uri:"healthcard/exam_detail",
                        requestBody:{
                            goodsId:goodsId,
                            serviceItemId:Number(serviceItemId),
                            healthCardId:healthCardId
                        }
                    });
                break;
            }
            $.ajax({
              type: 'POST',
              url: app.api,
              dataType: 'json',
              data: datas,
              contentType: 'application/json',
              timeout: 30000,
              beforeSend:function(){
                //app.getAppPersonId();
              },
              success: function(data){
                if(data!=null){
                    var code = data.retCode;
                    var msg = data.msg;
                    var os = data.os;
                    if(code=="001"){//需要登录                       
                        if(os=="wx"){
                            app.isWxLogin();
                        }else{
                            app.isAppLogin();
                        }
                    }else if(code=="002"){//微信获取支付OpenId
                        if(os=="wx"){
                             window.location.href = data.item.redirectUrl;
                        }
                    }else if(code=="0"){//返回接口信息
                        var htmlStr = compiledTemplate(data);
                        var title = app.cutstr(data.title,25);
                        $(tplTo).html(htmlStr);
                        if(os=="wx"){
                            var sharetitle = $("#shareShop").attr("data-title");
                            var sharelinkUrl = $("#shareShop").attr("data-linkUrl");
                            var shareimgUrl = $("#shareShop").attr("data-imgUrl");
                            var sharedesc = $("#shareShop").attr("data-desc");
                            var sharetype = $("#shareShop").attr("data-type");
                            var sharedataUrl = $("#shareShop").attr("data-dataUrl");
                            app.wxShare(sharetitle,sharelinkUrl,shareimgUrl,sharedesc,sharetype,sharedataUrl);
                        }
                        setTimeout(function () {
                            $(".shop-loading-pre").remove();
                        }, 750);
                        if($("img.lazy").length>0){
                            $("img.lazy").lazyload({
                                threshold :5,
                                event:"load",
                                container: $(".content")
                            })
                        }
                        $("title,.title").text(title);
                        app.wxGetTitle(title);
                        if(fn != "" && $.isFunction(fn)) fn();
                    }else{
                        $.toast(msg,3500);
                        return false;
                    }
                }else{
                    app.loadError();
                }
              },
              error: function(xhr, type){
                $.toast(app.apiError,5000);
                $(".shop-loading-pre").remove();
                app.loadError();
              }
            })
        }
    };
win.app = app;
}(window,document));
    //app获取PersonId
    function getPersonIdCallback(str){        
        //回调返回personId,web根据personId进行登录
        $.ajax({
            url: app.apiLogin,
            type: "POST",
            data:  JSON.stringify({"personId":str}),
            dataType: "json",
            contentType: "application/json",
            async :false,
            success: function(data) {},
            error: function(xhr, type){
                alert("getPersonIdCallback回调错误");
            }
        });
    }   
    //在app中，由app回调通知
    function getIsInAppCallback(isIn){
        if(isIn){
            //在app中web通知app需要获取personId
            if(typeof window.ciyun!= "undefined" && typeof window.ciyun.getPersonId != "undefined"){
                window.ciyun.getPersonId();
            }else if(typeof getPersonId != "undefined"){               
                getPersonId();
            }
        }
    }
    //在app中，捕捉登录状态
    function loginStatusCallBack(status){
        var len = status.length;
        if(len>1){
            type = status.split("-")[0],pid = status.split("-")[1];
            switch (type){
               case "1":
               var gender = app.getUrlKey("gender",window.location.href);
                window.location.href="returnBuy.html?gender="+gender;
               break;
               case "2":
                var gender = app.getUrlKey("gender",window.location.href);
                window.location.href="returnBuy.html?gender="+gender;
               break;
               case "3":
                var gender = app.getUrlKey("gender",window.location.href);
                window.location.href="returnBuy.html?gender="+gender;
               break;
            }
        }else{
            switch (status){
               case "1":
               var gender = app.getUrlKey("gender",window.location.href);
                window.location.href="returnBuy.html?gender="+gender;
               break;
               case "2":
               var gender = app.getUrlKey("gender",window.location.href);
                window.location.href="returnBuy.html?gender="+gender;
               break;
               case "3":
                var gender = app.getUrlKey("gender",window.location.href);
                window.location.href="returnBuy.html?gender="+gender;
               break;
            }

        }
    }

    
//配置文件
requirejs.config({
    urlArgs: "v="+app.version,
    baseUrl:app.getRootPath(),
    waitSeconds: 0,
    paths:{
        css:"style/js/require/css",
        healthCard:"style/css/healthCard",
        healthCardInit:"style/js/healthCard.init",
        healthCardSystem:'style/js/healthCard.system'
    }
});

//加载源
require(app.source, function() {
    app.getAppPersonId();
});