//收货地址
var address = {};
//初始化address
address.initAddressCity = function(){
    var addressId =$("#hid-addressId").val();
    var userProvince =$("#hid-userProvince").val();
    var userCity = $("#hid-userCity").val();
    var userArea = $("#hid-userArea").val();
    //加载省
    if(addressId){
        app.initChildArea(0,'#userProvince',userProvince);
        app.initChildArea(userProvince,'#userCity',userCity);
        app.initChildArea(userCity,'#userArea',userArea);
    }else{
        app.initChildArea(0,'#userProvince',userProvince);
    }
};
//保存地址
address.saveDataUrl = function(o){
    var addressId = $("#hid-addressId").val();
    var userName = $("#userName").val();
    var userTel = Number($("#userTel").val());
    var userProvince = Number($("#userProvince").val());
    var userCity = Number($("#userCity").val());
    var userArea = Number($("#userArea").val());
    var userAreaDes = $("#userAreaDes").val();
    var userAddressDefault = address.isDefaultAddrss("#userAddressDefault");
    if(userName==""){
        app.miniAlert("请输入收货人姓名");
        return false;
    }
    if(app.chkSpcWord(userName)){
        app.miniAlert(app.formError);
        return false;
    }
    if(userTel==""){
        app.miniAlert("请输入联系电话");
        return false;
    }
    if(app.chkTel(userTel)){
        app.miniAlert('请输入正确的手机号');
        return false;
    }
    if(userProvince=="-1"){
        app.miniAlert("请选择省");
        return false;
    }
    if(userCity=="-1"){
        app.miniAlert("请选择市");
        return false;
    }
    if(userArea=="-1"){
        app.miniAlert("请选择地区");
        return false;
    }
    if(userAreaDes==""){
        app.miniAlert("请输入详细地址");
        return false;
    }
    if(app.chkSpcWord(userAreaDes)){
        app.miniAlert(app.formError);
        return false;
    }
    if(app.getLength(userAreaDes)>50){
        app.miniAlert("详细地址超长了");
        return false;
    }
    var location = window.location.href;
    var serviceType =app.getUrlKey("serviceType",location);
    var goodsId =app.getUrlKey("goodsId",location);
    var healthCardId =app.getUrlKey("healthCardId",location);
    var serviceItemId =app.getUrlKey("serviceItemId",location);
    //后面具体逻辑具体处理
    datas = JSON.stringify({ 
        "uri":"healthcard/device/receiveDevice",
        "requestBody":{
            "address":{
                "addressId": addressId,
                "isDefault": userAddressDefault,
                "tel": userTel,
                "name": userName,
                "addressSimple": app.htmlReplace(userAreaDes),
                "provAreaId": userProvince,
                "dijiAreaId": userCity,
                "quxianAreaId": userArea
            },
            "serviceType":Number(serviceType),
            "goodsId":goodsId,
            "serviceItemId":Number(serviceItemId),
            "healthCardId":healthCardId
        }
    });
    var serviceTypeDevice ="";
    switch (serviceType){
        case 3:
            serviceTypeDevice ="血压计";
        break;
        case 4:
            serviceTypeDevice ="血糖仪";
        break;
        case 8:
            serviceTypeDevice ="基因检测";
        break;
    }
    console.log(datas)
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
            systemMsg.result("success","领取成功","<p>注：您的"+serviceTypeDevice+"订单请在[个人中心]-[我的订单]中查看，我们会在48小时内为您发货！（如您已领取请忽略）</p>");
            //返回app健康卡
            setTimeout(function(){
                if(typeof window.ciyun!= "undefined" && typeof window.ciyun.isInApp != "undefined"){
                    window.ciyun.backHealthCard();
                }else if(typeof isInApp!= "undefined" && typeof(isInApp) == "function"){
                        backHealthCard();
                }
            },3000);
        } else {
            $.hideIndicator();
            app.miniAlert(data.msg);
            $(o).removeAttr('disabled');
            return false;
        }
      }
    });
};
//是否默认选择地址
address.isDefaultAddrss = function(o){
    var v;
    var isChecked = $(o).prop("checked");
    if(isChecked==true){
        $(o).prop("checked",true);
        v = true;
    }else{
        $(o).prop("checked",false);
        v = false;
    }
    return v;
    console.log("isChecked==="+isChecked);
};

var systemMsg ={};
systemMsg.result = function(type,msgInfo,other){
    var msgCode ="";
    switch(type) {
        case "success":
          msgCode="success";
        break;
        case "error":
           msgCode="error";
        break;
        default:
          msgCode="normal";
    }
    //进入APP IM
    $.modal({
      extraClass:'systemMsgBox systemMsgBox-'+msgCode,
      title:  '<div class="systemMsg-hd">'+
                '<p>'+msgInfo+'</p>'+
              '</div>',
      text: '<div class="systemMsg-bd">'+other+'</div>'
   });
};


//主逻辑
define(app.source, function() {
    /*
        收货地址列表 编辑 删除
    */
    $(document).on("pageInit", "#goodsAddressOpr", function(e, pageId, $page) {
            var addressId = $(this).attr("data-id");
            $.fn.cookie('addressId', addressId, { expires: 7 });
            //收货地址数据调取
             app.getTplData("healthcardGetAddress","script#goodsAddressOpr_tpl","#goodsAddressOpr_tpl_data",function(){
                address.initAddressCity();
            });
            //省市联动
            $(document).off("change", "#userProvince").on("change", "#userProvince", function() {
                app.loadChildArea(this,'#userCity',1);
            });
             $(document).off("change", "#userCity").on("change", "#userCity", function() {            
               app.loadChildArea(this,'#userArea',2);
            });
            //是否默认地址
            $(document).off("change", "#userAddressDefault").on("change", "#userAddressDefault", function() {
                address.isDefaultAddrss(this);
            });
            //保存地址
            $(document).off("click", "#address-getGoods").on("click", "#address-getGoods", function() {
                address.saveDataUrl(this);
            });
    });


    $(function() {
        setTimeout(function(){
            $.init();
        },50);
    });
});

