var  isPriceNumber = function(str){  
    if(str == "0" || str == "0." || str == "0.0" || str == "0.00"){  
        str = "0"; 
        return false;  
    }else{  
        var index = str.indexOf("0");  
        var length = str.length;  
        if(index == 0 && length>1){ 
            var reg = /^[0]{1}[.]{1}[0-9]{1,2}$/;  
            if(!reg.test(str)){  
                return false;  
            }else{  
                return true;  
            }  
        }else{
            var reg = /^[1-9]{1}[0-9]{0,10}[.]{0,1}[0-9]{0,2}$/;  
            if(!reg.test(str)){  
                return false;  
            }else{  
                return true;  
            }  
        }             
        return true;  
    }  
};


/******************************支付********************************/
var orgPay = {};
//微信支付读取支付数据
orgPay.orgWxPay =function (o){
    var price = $("#orgPayNum").val();
    if(price==""){
        app.miniAlert("请输入支付金额",function () {
            $("#orgPayNum").focus();
        });
        return false;
    }
    if(!isPriceNumber(price)){
        app.miniAlert("请输入正确的金额",function(){
             $("#orgPayNum").val("").focus();
        });
        return false;
    }
    datas = JSON.stringify({
        uri:"orgpay/wxpay",
        "requestBody":{
            "price":price,
            "orgId":123
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
        success:function(data,status){
            if(data.retCode != null && data.retCode=='0'){
                var data = data.item;
                var params = data.configParams;
                var appId = params.appId;
                var timeStamp = params.timeStamp;
                var nonceStr = params.nonceStr;
                var packages = params.package;
                var signType = params.signType;
                var paySign = params.paySign;
                var orderId = data.orderId;
                //alert("appId="+appId+",timeStamp="+timeStamp+",nonceStr="+nonceStr+",packages="+packages+",signType="+signType+",paySign="+paySign);
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
                            window.location.href="org.payMsg.html?orderId="+orderId;
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
        }
    });
};

//支付宝支付读取支付数据
orgPay.orgAliPay =function (){
    var price = $("#orgPayNum").val();
    if(price==""){
        app.miniAlert("请输入支付金额",function () {
            $("#orgPayNum").focus();
        });
        return false;
    }
    if(!isPriceNumber(price)){
        app.miniAlert("请输入正确的金额",function(){
             $("#orgPayNum").val("").focus();
        });
        return false;
    }
   $("#formAliPay").submit();
};


//支付方法
orgPay.order =function (type,o){
   switch (type){
        case "wx":
            orgPay.orgWxPay(o);
        break;
        case "ali":
            orgPay.orgAliPay();
        break;
    }
};
/******************************支付********************************/


//分开2套界面处理
define(app.source, function() {
    /*
       微信支付界面
    */
    $(document).on("pageInit", "#orgWxPay", function(e, pageId, $page) {
        //订单数据调取
        app.getTplData("orgPay","script#orgWxPay_tpl","#orgWxPay_tpl_data");
        //支付      
        $(document).off("click", ".shop-pay-order").on("click", ".shop-pay-order", function() {
           var type = $(this).attr("data-type");
           orgPay.order(type,this);
        });
    });
    /*
       支付宝支付界面
    */
    $(document).on("pageInit", "#orgAliPay", function(e, pageId, $page) {
        //订单数据调取
        app.getTplData("orgPay","script#orgAliPay_tpl","#orgAliPay_tpl_data");
        //支付      
        $(document).off("click", ".shop-pay-order").on("click", ".shop-pay-order", function() {
           var type = $(this).attr("data-type");
           orgPay.order(type,this)
        });
    });
    
    /*
	    订单完成提示界面
	 */
	 $(document).on("pageInit", "#orgMsgPay", function(e, pageId, $page) {
	     //订单数据调取
	     app.getTplData("orgMsgPay","script#orgPayMsg_tpl","#orgPayMsg_tpl_data",function(data){
	    	 var bg = data.item.bg;
	    	 $("#orgMsgPay").addClass(bg);
	     });
	 });
    
    $(function() {
        setTimeout(function(){
            $.init();
        },50);
    });
});


