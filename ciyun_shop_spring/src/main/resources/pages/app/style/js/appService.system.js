
/******************************支付********************************/
var servicePay = {};
//积分微信返回
servicePay.callBack = function(type,serviceId,url){
    var location  = window.location.href;
    var serviceId = $("#hide-serviceId").val();
    datas = JSON.stringify({
        uri:"sku/querySkuUrl",
        "requestBody":{
            "serviceId":serviceId,
            "itemId":Number(app.getUrlKey("itemId",location)),
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
        if (data.retCode==0) {
          $.hideIndicator();
          var item = data.item;
          if(item.isUrl){
            $.modal({
              title:  '<div class="orderPayCallBack">'+
                        '<p class="orderPayOrder"><span>温馨提醒</span></p>'+
                      '</div>',
              text: '<div class="orderPayCallBack-info">'+
                      '<p>您已经成功购买此服务！</p>'+
                    '</div>',
              buttons: [
                {
                  text: '马上使用',
                  onClick: function () {
                      if(typeof window.ciyun!= "undefined" && typeof window.ciyun.openImportReportActivity != "undefined"){
                        window.ciyun.openImportReportActivity(item.url);
                      }else{
                        window.location.href=item.url;
                      }
                  }
                }
              ]
            })
          }else{
              if ($.device.ios) {
                  if(serviceId!=undefined && serviceId>0 && item.recordId!=undefined && item.recordId>0 && typeof openConsultChat != 'undefined'){
                    openConsultChat("'"+serviceId+"|"+item.recordId+"|0'");
                  }else if(serviceId!=undefined && serviceId>0 && typeof openChatIm != 'undefined'){
                    openChatIm(serviceId);
                  }else  if(typeof consultingNutrilitTubeDivision != 'undefined'){
                  consultingNutrilitTubeDivision();
                }
              }else if ($.device.android) {
                if(serviceId!=undefined && serviceId>0 && item.recordId!=undefined && item.recordId>0 && typeof window.ciyun.openConsultChat != 'undefined' ){
                  window.ciyun.openConsultChat("'"+serviceId+"|"+item.recordId+"|0'");
                  }else if(typeof window.ciyun.openChatIm != 'undefined' ){
                  window.ciyun.openChatIm(serviceId);
                }else if(typeof window.ciyun.goToHealthConsult != 'undefined' ){
                  window.ciyun.goToHealthConsult();
                }   
              }
          }
        } else {
            $.hideIndicator();
            app.miniAlert(data.msg);
            return false;
        }
      }
    });
};
//支付提示
servicePay.callBackError = function(){
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
               servicePay.loadErrorHelp();
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
servicePay.loadErrorHelp = function(){
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



//积分支付
servicePay.point = function(o){
    //payWay 1微信  2 支付 3 积分
    var location  = window.location.href;
    var serviceId = $("#hide-serviceId").val();
    var isUrl = $("#hide-isUrl").val();
    var goTolUrl = $("#hide-goTolUrl").val();
    datas = JSON.stringify({
        uri:"sku/buySku",
        "requestBody":{
            "skuId":app.getUrlKey("skuId",location),
            "itemId":Number(app.getUrlKey("itemId",location)),
            "payWay":3
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
        $(o).attr('disabled', 'disabled');
      },
      success: function(data){
        if (data.retCode==0) {
            $.hideIndicator();
            $.toast("积分兑换"+data.msg,2000,function(){
                $(o).removeAttr('disabled');
                servicePay.callBack(isUrl,serviceId,goTolUrl);
            });
        } else {
            $.hideIndicator();
            app.miniAlert(data.msg);
            $(o).removeAttr('disabled');
            return false;
        }
      }
    });
};
//app 微信返回
var appWXPayCallback= function(code){
    $.closeModal('.modal-orderPayCallBackError');
    var serviceId = $("#hide-serviceId").val();
    var isUrl = $("#hide-isUrl").val();
    var goTolUrl = $("#hide-goTolUrl").val();
    if(code == '0'){
        servicePay.callBack(isUrl,serviceId,goTolUrl);
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
servicePay.getWxPrepayId = function(o){
    var prepayId="";
    //payWay 1微信  2 支付 3 积分
    var location  = window.location.href;
    datas = JSON.stringify({
        uri:"sku/buySku",
        "requestBody":{
            "skuId":app.getUrlKey("skuId",location),
            "itemId":Number(app.getUrlKey("itemId",location)),
            "payWay":1
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
              servicePay.callBackError();  
              $(o).removeAttr('disabled');
            },200)
            if(data.retCode != null && data.retCode=='0'){
                prepayId = data.item.prePayId;
                $(o).removeAttr('disabled');
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
    var isUrl = $("#hide-isUrl").val();
    var goTolUrl = $("#hide-goTolUrl").val();
    if(code == '0' || code == '9000' || code == '8000'){
        servicePay.callBack(isUrl,serviceId,goTolUrl);
    }else{
        $.hideIndicator();
        $.toast("支付失败",2000,function(){
           $(".shop-pay-order").removeAttr('disabled');
        });
        return false;
    }
};
//app 支付宝 支付获取支付的预支付id
servicePay.getAliPrepayId = function(o){
    var productInfo="";
    //payWay 1微信  2 支付 3 积分
    var location  = window.location.href;
    datas = JSON.stringify({
        uri:"sku/buySku",
        "requestBody":{
            "skuId":app.getUrlKey("skuId",location),
            "itemId":Number(app.getUrlKey("itemId",location)),
            "payWay":2
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
              servicePay.callBackError();
              $(o).removeAttr('disabled'); 
            },200)
            if(data.retCode != null && data.retCode=='0'){
                productInfo = data.item.productInfo;
                $(o).removeAttr('disabled');
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
servicePay.order =function (type,o){
   switch (type){
        case "point":
            servicePay.point(o)
        break;
        case "app-wx":
            var wxPayId = servicePay.getWxPrepayId(o);
            if(typeof window.ciyun!= "undefined" && typeof window.ciyun.appWXPay != "undefined"){
                window.ciyun.appWXPay(wxPayId);
            }else if(typeof appWXPay != "undefined"){//IOS调用
                appWXPay(wxPayId);
            }
        break;
        case "app-ali":
            var productInfo = servicePay.getAliPrepayId(o);
            if(typeof window.ciyun!= "undefined" && typeof window.ciyun.appAliPay != "undefined"){
                window.ciyun.appAliPay(productInfo);
            }else if(typeof appAliPay != "undefined"){//IOS调用
                appAliPay(productInfo);
            }
        break;
    }
};

/******************************支付********************************/


//主逻辑
define(app.source, function() {
    /*
        支付界面
    */
    $(document).on("pageInit", "#appServiceList", function(e, pageId, $page) {
        //服务数据调取
        setTimeout(function(){ 
          app.getTplData("appService","script#appServiceList_tpl","#appServiceList_tpl_data")
        },50);
        //积分支付
        $(document).off("click", "#app-btn-pointpay").on("click", "#app-btn-pointpay", function() {
           var type = $(this).attr("data-type");
           servicePay.order("point",this)
        });
        //支付      
        $(document).off("click", ".shop-pay-order").on("click", ".shop-pay-order", function() {
           var type = $(this).attr("data-type");
           servicePay.order(type,this)
        });
    });
    
    $(function() {
      setTimeout(function(){ 
          $.init();
      },50);
    });
});


