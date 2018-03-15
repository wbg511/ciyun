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
        serviceName:"pages",
        api:host+"/orgapi",
        apiError:"接口地址配置故障，请联系管理员",
        formError:"请勿输入特殊字符",
        apiLocalstorage:"Cookie和Localstorage均不支持，悲剧了...",
        showHead:false,
        //源配置
        source:[
            'css!shopCss',
            'shopInit',
            'shopSystem'
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
        $("html").removeClass('with-statusbar-overlay')
        },
        intShopLoad:function(tplTo){
            var html = '<div class="shop-loading-overlay shop-loading-pre"></div>'+
            '<div class="shop-loading shop-loading-pre">'+
                '<span class="preloader loading preloader-white"></span>'+
            '</div>';
            $(tplTo).append(html);
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
                url: wxhost + "/gateway/mp.gateway.inf?curUrl="+reqUrl+"&reqData="+reqParam+"&time="+new Date().getTime(),
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
                        // console.log("http://centrinwx.ciyun.cn/gateway/mp.gateway.inf?curUrl="+reqUrl+"&reqData="+reqParam+"&time="+new Date().getTime());
                        wx.error(function(res){
                            console.log("config信息验证失败："+res.errMsg);
                        });
                    }else{
                        console.log("获取config配置参数失败！");
                    }
                }
            });
        },
        //获取模板数据
        getTplData : function(type,tplForm,tplTo,fn){
            app.intShopLoad(tplTo);
            var template = $(tplForm).html();
            var compiledTemplate = Template7.compile(template);
            var location = window.location.href;
            //type 数据模板请求类型
            switch(type) {
                case "orgPay":
                    datas = JSON.stringify({
                        uri:"orgpay/detail",
                        requestBody:{}
                    });
                break;
                case "orgMsgPay":
                    datas = JSON.stringify({
                        uri:"orgpay/done",
                        requestBody:{
                        	"orderId":app.getUrlKey("orderId",location)
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

              },
              success: function(data){
                if(data!=null){
                    var code = data.retCode;
                    var msg = data.msg;
                    if(code=="0"){//返回接口信息
                        var htmlStr = compiledTemplate(data);
                        $(tplTo).html(htmlStr);
                        setTimeout(function () {
                            $(".shop-loading-pre").remove();
                        }, 750);
                        if(fn != "" && $.isFunction(fn)) fn(data);
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
//配置文件
requirejs.config({
    urlArgs: "v="+app.version,//配置版本号
    baseUrl:"/",
    waitSeconds: 0,
    paths:{
        css:"style/js/require/css",
        shopCss:"style/css/orgPay",
        shopInit:"style/js/shop.init",
        shopSystem:'style/js/orgPay'
    }
});
//加载源
require(app.source, function() {
});

