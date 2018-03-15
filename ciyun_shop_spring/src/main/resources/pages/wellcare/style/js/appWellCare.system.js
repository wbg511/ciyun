
/******************************支付********************************/
var WellCarePay = {};
//微信返回
WellCarePay.callBack = function(url){
	var shareFlag=app.getUrlKey("shareFlag",window.location.href);
	if(shareFlag=="1"){
		url=url+"&shareFlag="+shareFlag;
	};
    $.modal({
      title:  '<div class="orderPayCallBack">'+
                '<p class="orderPayOrder">温馨提示</p>'+
              '</div>',
      text: '<div class="orderPayCallBack-info">'+
              '<p>您已经成功购买此评测！</p>'+
            '</div>',
      buttons: [
        {
          text: '开始答题',
          onClick: function () {
           window.location.href=url+"&formBackTo=2";//分享处理
          }
        }
      ]
    })
};

//支付提示
WellCarePay.callBackError = function(){
  if(typeof window.ciyun!= "undefined" && typeof window.ciyun.isInApp != "undefined"){//android 
       
    }else if(typeof isInApp!= "undefined" && typeof(isInApp) == "function"){
    $.modal({
      extraClass:'modal-orderPayCallBackError',
      title:  '<div class="orderPayCallBack orderPayCallBackError">'+
                '<p class="orderPayOrder">支付提醒</p>'+
              '</div>',
      text: '<div class="orderPayCallBackError-info">'+
              '<p>是否已经完成支付</p>'+
            '</div>',
      buttons: [
        {
          text: '遇到问题',
          onClick: function () {
           $.closeModal('.modal-orderPayCallBackError');
           $(".shop-pay-order").removeAttr('disabled');
           WellCarePay.loadErrorHelp();
          }
        },
        {
          text: '完成支付',
          onClick: function () {
            window.location.href=window.location.href
          }
        }
      ]
   });
  }
};
//支付帮助
WellCarePay.loadErrorHelp = function(){
    $.modal({
      extraClass:'modal-orderPayCallBackHelp',
      title:  '<div class="orderPayCallBack orderPayCallBackError">'+
                '<p class="orderPayOrder">支付帮助</p>'+
              '</div>',
      text: '<div class="orderPayCallBackHelp-info">'+
              '<p>1、请安装支付宝/微信最新客户端</p>'+
              '<p>2、请在支付宝/微信客户端支付完成后返回</p>'+
              '<p>3、请确保支付宝/微信有足够余额进行支付</p>'+
              '<p>4、客服咨询热线：<a href="tel:4009-930-630">4009-930-630</a></p>'+
            '</div>',
      buttons: [
        {
          text: '我已经了解',
          onClick: function () {
           $.closeModal('.modal-orderPayCallBackHelp');
           $(".shop-pay-order").removeAttr('disabled');
          }
        }
      ]
   });
};


//微信支付读取支付数据
WellCarePay.onBridgeReady =function (o){
    var goTolUrl = $("#hide-goTolUrl").val();
    var location  = window.location.href;
    datas = JSON.stringify({
        uri:"well/buyWell",
        "requestBody":{
            "gender":Number(app.getUrlKey("gender",location)),
            "serviceKey":$.fn.cookie('serviceKey'),
            "payWay":3,
            "consultId":Number(app.getUrlKey("consultId",location)),
            "replyId":Number(app.getUrlKey("replyId",location)),
            "serviceId":Number(app.getUrlKey("serviceId",location))
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        async:false,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend:function(){
            $.showIndicator();
            $(o).attr('disabled', 'disabled');
        },
        success:function(data,status){
            if(data!=null){
                if(data.retCode != null && data.retCode=='0'){
                    var data = data.item;
                    var params = data.configParams;
                    var appId = params.appId;
                    var timeStamp = params.timeStamp;
                    var nonceStr = params.nonceStr;
                    var packages = params.package;
                    var signType = params.signType;
                    var paySign = params.paySign;
                    // console.log("appId="+appId+",timeStamp="+timeStamp+",nonceStr="+nonceStr+",packages="+packages+",signType="+signType+",paySign="+paySign);
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId" : appId,     //公众号名称，由商户传入
                            "timeStamp" : timeStamp,         //时间戳，自1970年以来的秒数
                            "nonceStr" : nonceStr, //随机串
                            "package" : packages,
                            "signType" : signType,         //微信签名方式:
                            "paySign" : paySign //微信签名
                        },
                        function(res){
                            //alert("支付结果："+res.err_msg);
                            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                WellCarePay.callBack(goTolUrl);
                            }else if(res.err_msg == "get_brand_wcpay_request:fail"){
                                console.log("支付失败");
                                $.toast("支付失败",2000);
                                $.hideIndicator();
                                $(o).removeAttr('disabled');
                            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                                console.log("支付取消");
                                $.toast("您已经取消支付",2000);
                                $.hideIndicator();
                                $(o).removeAttr('disabled');
                            }else{
                                $.toast("其他支付异常",2000);
                                $.hideIndicator();
                                $(o).removeAttr('disabled');
                               //其他失败
                            }   // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                        }
                    );
                }else{
                    $.toast("未能返回支付回调",2000);
                    $.hideIndicator();
                    $(o).removeAttr('disabled');
                    return false;
                }
            }else{
                app.loadError();
            }
            
        }
    });
};

//app 微信返回
var appWXPayCallback= function(code){
    var goTolUrl = $("#hide-goTolUrl").val();
    $.closeModal('.modal-orderPayCallBackError');
    if(code == '0'){
        WellCarePay.callBack(goTolUrl);
    }else if(code == '-2'){
        $.hideIndicator();
        $.toast("支付取消",2000,function(){
           $(".shop-pay-order").removeAttr('disabled');
        });
        return false;
    }else{
        $.hideIndicator();
        $.toast("支付失败",2000,function(){
           $(".shop-pay-order").removeAttr('disabled');
        });
        return false;
    }
};
//app 微信 支付获取支付的预支付id
WellCarePay.getWxPrepayId = function(o){
    var prepayId="";
    //payWay 1微信  2 支付 
    var location  = window.location.href;
    datas = JSON.stringify({
        uri:"well/buyWell",
        "requestBody":{
            "gender":Number(app.getUrlKey("gender",location)),
            "serviceKey":$.fn.cookie('serviceKey'),
            "payWay":1,
            "consultId":Number(app.getUrlKey("consultId",location)),
            "replyId":Number(app.getUrlKey("replyId",location)),
            "serviceId":Number(app.getUrlKey("serviceId",location))
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        async :false,
        beforeSend:function(){
            $.showIndicator();
            $(o).attr('disabled', 'disabled');
        },
        success:function(data,status){
            setTimeout(function(){
              WellCarePay.callBackError();  
            },200)
            if(data.retCode != null && data.retCode=='0'){
                prepayId = data.item.prePayId;
                $.hideIndicator();
            }else{
                $.hideIndicator();
                app.miniAlert(data.msg);
                $(o).removeAttr('disabled');
                return false;
            }
            
        }
    });
    return prepayId;
};

//支付宝返回
var appAliPayCallback = function(code){
    $.closeModal('.modal-orderPayCallBackError');
    var serviceId = $("#hide-serviceId").val();
    var goTolUrl = $("#hide-goTolUrl").val();
    if(code == '0' || code == '9000' || code == '8000'){
         WellCarePay.callBack(goTolUrl);
    }else{
        $.hideIndicator();
        $.toast("支付失败",2000,function(){
           $(".shop-pay-order").removeAttr('disabled');
        });
        return false;
    }
};
//app 支付宝 支付获取支付的预支付id
WellCarePay.getAliPrepayId = function(o){
    var productInfo="";
    //payWay 1微信  2 支付 
    var location  = window.location.href;
    datas = JSON.stringify({
        uri:"well/buyWell",
        "requestBody":{
            "gender":Number(app.getUrlKey("gender",location)),
            "serviceKey":$.fn.cookie('serviceKey'),
            "payWay":2,
            "consultId":Number(app.getUrlKey("consultId",location)),
            "replyId":Number(app.getUrlKey("replyId",location)),
            "serviceId":Number(app.getUrlKey("serviceId",location))
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        async:false,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend:function(){
            $.showIndicator();
            $(o).attr('disabled', 'disabled');
        },
        success:function(data,status){
            setTimeout(function(){
              WellCarePay.callBackError();  
            },200)
            if(data.retCode != null && data.retCode=='0'){
                productInfo = data.item.productInfo;
                $.hideIndicator();
            }else{
                $.hideIndicator();
                app.miniAlert(data.msg);
                $(o).removeAttr('disabled');
                return false;
            }
            
        }
    });
    return productInfo;
};

//支付方法
WellCarePay.order =function (type,o){
   switch (type){
        case "wx":
            WellCarePay.onBridgeReady(o);
        break;
        case "app-wx":
            var wxPayId = WellCarePay.getWxPrepayId(o);
            if(typeof window.ciyun!= "undefined" && typeof window.ciyun.appWXPay != "undefined"){
                window.ciyun.appWXPay(wxPayId);
            }else if(typeof appWXPay != "undefined"){//IOS调用
                appWXPay(wxPayId);
            }
        break;
        case "app-ali":
            var productInfo = WellCarePay.getAliPrepayId(o);
            if(typeof window.ciyun!= "undefined" && typeof window.ciyun.appAliPay != "undefined"){
                window.ciyun.appAliPay(productInfo);
            }else if(typeof appAliPay != "undefined"){//IOS调用
                appAliPay(productInfo);
            }
        break;
    }
};

/******************************支付********************************/
var appDownClose = function(){
    $(document).off("click", "#appDownClose").on("click", "#appDownClose", function() {
        $("#page-appDown").remove();
        $(".content").css("top","0")
    }); 
};
var shareFlag=app.getUrlKey("shareFlag",window.location.href);
var wxShowDown = function(){
  if($.device.isWeixin){
      if(shareFlag=="1"){
        $("#page-appDown").show();
        $(".content").css("top","2.2rem")
      }else{
        $(".content").css("top","0")
      }
    }else{
        $("#page-appDown").remove();
        $(".content").css("top","0")
    }
};

//主逻辑
define(app.source, function() {
    /*
        介绍界面
    */
    //微信引导app下载
    $(document).on("pageInit", ".page",function(e, pageId, $page) {
        appDownClose();
    });

    $(document).on("pageInit", "#appWellCareShow", function(e, pageId, $page) {
        //介绍界面
        app.getTplData("appWellCareShow","script#appWellCareShow_tpl","#appWellCareShow_tpl_data",function(){
          wxShowDown();
        });
        //去支付      
        $(document).off("click", "#returnBuy").on("click", "#returnBuy", function() {
           var location = window.location.href;
           var gender = app.getUrlKey("gender",location);
           var consultId = app.getUrlKey("consultId",location);
           var replyId = app.getUrlKey("replyId",location);
           var serviceId = app.getUrlKey("serviceId",location);
           window.location.href="index.html?gender="+gender+"&consultId="+consultId+"&replyId="+replyId+"&serviceId="+serviceId+"&shareFlag="+shareFlag;
        });
    });
    /*
        支付界面
    */
    $(document).on("pageInit", "#appWellCareList", function(e, pageId, $page) {
        //服务数据
        app.getTplData("appWellCare","script#appWellCareList_tpl","#appWellCareList_tpl_data",function(){
            wxShowDown();
            var flag = $("#hide-isBuy").val();
            var goTolUrl = $("#hide-goTolUrl").val();
            if (shareFlag=="1"){
            	goTolUrl=goTolUrl+"&shareFlag="+shareFlag;
            }
            if(flag=="true"){
                $.modal({
                  title:  '<div class="orderPayCallBack">'+
                            '<p class="orderPayOrder">温馨提示</p>'+
                          '</div>',
                  text: '<div class="orderPayCallBack-info">'+
                          '<p>您已经购买过此服务！</p>'+
                        '</div>',
                  buttons: [
                    {
                      text: '继续购买',
                      onClick: function () {
                       $.closeModal()
                      }
                    },
                    {
                      text: '去做评测',
                      onClick: function () {
                       window.location.href=goTolUrl;
                      }
                    }
                  ]
                })
            }
        });
        //支付      
        $(document).off("click", ".shop-pay-order").on("click", ".shop-pay-order", function() {
           var type = $(this).attr("data-type");
           WellCarePay.order(type,this)
        });
    });
    
    $(function() {
        setTimeout(function(){ 
            $.init();
        },50);
    });
});


