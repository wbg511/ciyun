(function(win,doc){
	var ishttps = (("https:" == document.location.protocol) ? " https://" : " http://");
    var host=ishttps + "newshop.ciyun.cn";
    var app = {
        version:"3.5",
        api:host+"/api/",
        apiWxLogin:host+"/towx/",
        apiLogin:host+"/doLogin/",
        apiError:"接口地址配置故障，请联系管理员",
        formError:"请勿输入特殊字符",
        apiLocalstorage:"Cookie和Localstorage均不支持，悲剧了...",
        serviceName:"/app/",
        showHead:false,
        shopIndexUrl:"",
        shopOrderUrl:"",
        //源配置
        source:[
            'css!appService',
            'appServiceInit',
            'appServiceSystem'
        ],
        strTobool:function(str){
            return (str && typeof str == 'string') ? (str.toLowerCase() == 'true' || str == '1') : (str == true);
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
            console.log(url);
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
                }else if(code=="001"){
                    app.loadH5Error();
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
                window.ciyun.isInApp();//传1调登录
            }else if(typeof isInApp!= "undefined" && typeof(isInApp) == "function"){//ios
                isInApp();
            }
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
            //type 数据模板请求类型
            switch(type) {
                case "appService":
                    datas = JSON.stringify({
                        uri:"sku/querySku",
                        requestBody:{
                             skuId:app.getUrlKey("skuId",location),
                             itemId:Number(app.getUrlKey("itemId",location))
                        }
                    });
                break;
            }
            console.log("getTplData=="+type+"\nDatas===="+datas);
            $.ajax({
              type: 'POST',
              url: app.api,
              dataType: 'json',
              data: datas,
              contentType: 'application/json',
              timeout: 30000,
              success: function(data){
                if(data!=null){
                    var code = data.retCode;
                    var msg = data.msg;
                    var os = data.os;
                    var title = data.title;
                    if(code=="0"){//返回接口信息
                        var htmlStr = compiledTemplate(data);
                        $(tplTo).html(htmlStr);
                        setTimeout(function () {
                            $(".shop-loading-pre").remove();
                        }, 750);
                        if($("img.lazy").length>0){
                            $("img.lazy").lazyload({
                                threshold :10,
                                event:"load",
                                container: $(".page")
                            })
                        }
                        $("title,.title").html(title);
                        app.wxGetTitle(title);
                        if(fn != "" && $.isFunction(fn)) fn();
                    }else{
                        $.toast(msg,3500);
                        $(".shop-loading-pre").remove();
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
            }else if(typeof getPersonId != "undefined"){//IOS调                
                getPersonId();
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
        appService:"style/css/appService",
        appServiceInit:"style/js/appService.init",
        appServiceSystem:'style/js/appService.system'
    }
});

//加载源
require(app.source, function() {
   app.getAppPersonId();
});