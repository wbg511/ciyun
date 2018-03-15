(function(win,doc){
    //接口地址配置
 var regEx ={
        Strs:/^[\u0391-\uFFE5\w]+$/, //中文字、英文字母、数字和下划线
        Tel:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,//更新最新手机验证
        SpecialWord:/^[`\\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:\"\<\>\?\/\.\,\;\'\[\]\\]+$/,//检查特殊字符
    };
	 var ishttps = (("https:" == document.location.protocol) ? " https://" : " http://");
	 var host=ishttps + "newshop.ciyun.cn";
	 var wxhost=ishttps +"centrinwx.ciyun.cn";
	 var app = {
	    version:"3.5",
	    wxShareMpNum:"gh_a88da45c1fae",
        api:host+"/api/",
        apiWxLogin:host+"/towx/",
        apiLogin:host+"/doLogin/",
        apiError:"接口地址配置故障，请联系管理员",
        formError:"请勿输入特殊字符",
        apiLocalstorage:"Cookie和Localstorage均不支持，悲剧了...",
        serviceName:"/addressAdm/",
        showHead:false,
        shopIndexUrl:"",
        shopOrderUrl:"",
        //源配置
        source:[
            'css!addressAdm',
            'addressAdmInit',
            'addressAdmSystem'
        ],
        browser: function() {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weChat: u.indexOf('MicroMessenger') > -1
            };
        },
        //简写为空判断
        isEmpty:function(str){
            return (str === ''|| str === null )? false : true;
        },
        htmlReplace:function(str){  
            str = str.replace(/&/g, '＆');  
            str = str.replace(/</g, '＜');  
            str = str.replace(/>/g, '＞');  
            str = str.replace(/\!/g, '！');  
            str = str.replace(/\|/g, '｜');  
            str = str.replace(/\./g, '．');  
            str = str.replace(/\^/g, '＾');  
            str = str.replace(/\$/g, '＄');  
            str = str.replace(/\&/g, '＆');  
            str = str.replace(/\*/g, '＊');  
            str = str.replace(/=/g, '＝');  
            return str;  
        }, 
        checkStr:function(str) {
            var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]")
                var rs = "";
            for (var i = 0; i < str.length; i++) {
                rs = rs + str.substr(i, 1).replace(pattern, '');
            }
            return rs;
        },
        chkSpcWord:function (str){
            if(regEx.SpecialWord.test(str)){
                return true;
            }else{
                return false;
            }
        },
        //检查手机号
        chkTel:function (str){
            if(regEx.Tel.test(str)){
                return false;
            }else{
                return true;
            }
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
                            '<p><a class="external" href="'+host+'">网络不给力！点击返回首页</a></p>'+
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
                url: wxhost +"/gateway/mp.gateway.inf?curUrl="+reqUrl+"&reqData="+reqParam+"&time="+new Date().getTime(),
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
            //type 数据模板请求类型
            switch(type) {
                //新增编辑地址
                case "healthcardGetAddress":
                    datas = JSON.stringify({
                        uri:"healthcard/device/getAddress",
                        requestBody:{}
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
              },
              success: function(data){
                if(data!=null){
                    var code = data.retCode;
                    var msg = data.msg;
                    var os = data.os;
                    if(code=="001"){//需要登录                       
                        if(os=="wx"){//微信用不到
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
                        switch (type){
                            case "goodsDesShare":
                                var titleShare =app.cutstr(data.item.goodsName,25);
                                var goodNameShare =data.item.goodsName;
                                if(goodNameShare){
                                    $("title").html(goodNameShare);
                                }
                                if(titleShare){
                                    $(".title-share").text(titleShare);
                                }
                            break;
                            case "getAddressById":
                                $(".title-popup").text(title);
                            break;
                           
                            default:
                                setTimeout(function(){
                                    app.wxGetTitle(title)
                                },1);
                               $("title,.title").text(title);
                        }
                        //通知android 数据加载完毕 回调title机制
                        if(typeof window.ciyun!= "undefined" && typeof window.ciyun.isInApp != "undefined"){
                            if(typeof window.ciyun.h5loadFinish!= "undefined"){
                                window.ciyun.h5loadFinish();
                            }
                        }
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
        },
        //头图设置处理
        initSwiperImg : function(o,ratio) {
            $(o).width($(window).width()).height(($(window).width() / ratio));
        },
        //热门头图
        hotImginit : function(){
            $(".hot-goods-0 img").width($(window).width()/2).height(($(window).width() / 2.2));
            $(".hot-goods-1 img").width($(window).width()/2).height(($(window).width() / 4.4));
            $(".hot-goods-2 img").width($(window).width()/2).height(($(window).width() / 4.4));
        },
        //PhotoBrowserPopup bug待纠正
        initImgView : function(o){
            items= [];
            $(o).each(function(i, o) {
                items[i] = {
                    url: $(o).attr("src"),
                    caption:$(o).attr("alt")
                }
            });
            var myPhotoBrowserPopup = $.photoBrowser({
              photos : items,
              theme: 'dark',
              type: 'popup'
            });
            myPhotoBrowserPopup.open();
        },
        //zepto checkbox radio
        zeptoChk :function(name){
            $items = $("[name='"+name+"']");
            var strVal="";
            $items.each(function(){
                if($(this).prop("checked")){
                    strVal+=$(this).attr("value");
                }
            });
            return strVal;
        },
        //点击除非加载分页 未验证
        getNextPage : function(o,tplForm,tplTo,url,currPage, pageSize) {
            $(o).html("加载中...");
            var template = $(tplForm).html();
                $.ajax({  
                    type: 'POST',  
                    url: app.api,  
                    timeout: 3000,
                    dataType: 'json',
                    async: false,
                    data: JSON.stringify({uri:url,requestBody:{pageNo: currPage, pageSize: pageSize}}), 
                    contentType: 'application/json',
                    success: function (data) {  
                        var json = data.item;
                        $(o).html("点击展开更多商品...");
                        var compiledTemplate = Template7.compile(template);
                        var htmlStr = compiledTemplate(data.item); 
                        $(tplTo).append(htmlStr); 
                        $("img.lazy").lazyload({
                            threshold :10,
                            event:"load",
                            container: $(".page")
                        });
                        $(".page-val").attr('data-pagenum', parseInt(json.pageNo));  
                        $(".page-val").attr('data-pagesize', parseInt(json.pageSize));  
                        $(".page-val").attr('data-totalpage', parseInt(json.last));  
                    }
              
                });  
        },
        //检查设备OS
        checkDevice : function(o){
            return false;
            var type = $.device.os;
            if(o){
                switch(type) {
                    case "ios":
                        $(".page-headhand .bar-nav").show();
                    break;
                    case "android":
                        $(".page-headhand .bar-nav").show();
                    break;
                    case "isWeixin":
                        $(".page-headhand .bar-nav").show();
                    break;
                    default:
                        $(".page-headhand .bar-nav").show();
                    break;
                }
                $("body").addClass('showHead')
            }else{
                switch(type) {
                    case "ios":
                        $(".page-headhand .bar-nav").remove();
                    break;
                    case "android":
                        $(".page-headhand .bar-nav").remove();
                    break;
                    case "isWeixin":
                        $(".page-headhand .bar-nav").remove();
                    break;
                    default:
                        $(".page-headhand .bar-nav").remove();
                    break;
                }
                $("body").removeClass('showHead')
            }
        },
        //省市区联动
        loadChildArea:function(o,v,level){
            if(level==1){
                $("#userCity").empty();
                $("#userArea").empty();
                $("#userArea").html('<option value="-1" selected="selected">请选择</option>');
            }else if(level==2){
                $("#userArea").empty();
            }
            var parentId = $(o).val();
            var pId =$(o).attr("id");
            datas = JSON.stringify({ 
                uri:"order/childArea",
                requestBody:{
                    parentId:Number(parentId)
                }
            });
            $.ajax({
              type: 'POST',
              url: app.api,
              dataType: 'json',
              data: datas,
              contentType: 'application/json',
              timeout: 30000,
              beforeSend:function(){
                 $.showIndicator();
              },
              success: function(data){
                var options = '<option value="-1" >请选择</option>';
                var json = data.item;
                if(json.len!=0){
                    var childAreas = json.childAreas;
                    for(var i=0;i<json.len;i++){
                        var tarea = childAreas[i];
                        options = options + '<option value="'+tarea.id+'" >'+tarea.areaName+'</option>';
                    }
                }
                $(v).empty();
                $(v).html(options);
                if(pId=="userProvince"&&parentId==-1){
                    $("#userCity").empty();
                    $("#userCity").html('<option value="-1" selected="selected">请选择</option>');
                }
                if(pId=="userCity"&&parentId==-1){
                    $("#userArea").empty();
                    $("#userArea").html('<option value="-1" selected="selected">请选择</option>');
                }
                $.hideIndicator();
              }
            })
        },
        //省市加载联动
        initChildArea:function(parentId,v,childArea){
            datas = JSON.stringify({ 
                uri:"order/childArea",
                requestBody:{
                    parentId:Number(parentId)
                }
            });
            $.ajax({
                type: 'POST',
                url: app.api,
                dataType: 'json',
                data: datas,
                contentType: 'application/json',
                timeout: 30000,
                beforeSend:function(){
                 $.showIndicator();
                },
                success:function(data){
                    var options = '<option value="-1" >请选择</option>';
                    var json = data.item;
                    if(json.len!=0){
                        var childAreas = json.childAreas;
                        for(var i=0;i<json.len;i++){
                            var tarea = childAreas[i];
                            if(childArea==tarea.id){
                                options = options + '<option value="'+tarea.id+'" selected="selected">'+tarea.areaName+'</option>';
                            }else{
                                options = options + '<option value="'+tarea.id+'" >'+tarea.areaName+'</option>';
                            }
                        }
                    }
                    $(v).empty();
                    $(v).html(options);
                    $.hideIndicator();
                }
            });
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
        cache:false,
        success: function(data) {
        },
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
    //1,2,3 代表登录成功，失败，取消
    switch (status){
        case "1":
               window.location.reload();
        break;
        case "2":
                window.location.reload();
        break;
        case "3":
                window.location.reload();
        break;
    }
}

    
//配置文件
requirejs.config({
    urlArgs: "v="+app.version,
    baseUrl:app.getRootPath(),
    waitSeconds: 0,
    paths:{
        css:"style/js/require/css",
        addressAdm:"style/css/addressAdm",
        addressAdmInit:"style/js/addressAdm.init",
        addressAdmSystem:'style/js/addressAdm.system'
    }
});

//加载源
require(app.source, function() {
    app.getAppPersonId();
});