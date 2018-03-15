
//健康卡
var healthCard ={};
healthCard.getCode = function(){
  var location = window.location.href;
  var goodsId =app.getUrlKey("goodsId",location);
  var serviceItemId =app.getUrlKey("serviceItemId",location);
  var healthCardId =app.getUrlKey("healthCardId",location);
     datas = JSON.stringify({
        uri:"healthcard/exam_consumeCode",
        requestBody:{
            serviceItemId:Number(serviceItemId),
            goodsId:goodsId,
            healthCardId:healthCardId
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
            if(typeof window.ciyun!= "undefined" && typeof window.ciyun.isReceivePE != "undefined"){//android 
                window.ciyun.isReceivePE();
             }else if(typeof isReceivePE!= "undefined" && typeof(isReceivePE) == "function"){//ios
                isReceivePE();
             }
             healthCard.callBack();
        } else {
            $.hideIndicator();
            app.miniAlert(data.msg);
            return false;
        }
      }
    });
};

//领取回调
healthCard.callBack = function(){
    $.modal({
      extraClass:'modal-MsgCallBack',
      title:  '<div class="MsgCallBack">'+
                '<p>您已经成功领取</p>'+
              '</div>',
      text: '<div class="MsgCallBack-info">'+
              '<p>请在到达体检中心时出示消费码。</p>'+
            '</div>',
      buttons: [
        {
          text: '我已了解',
          onClick:function(){
            window.location.href=window.location.href;
          }
        }
      ]
   });
};




    


//主逻辑
define(app.source, function() {
    /*
        介绍界面
    */
    $(document).on("pageInit", "#healthCard", function(e, pageId, $page) {
        //介绍界面
         app.getTplData("healthcard","script#healthCard_tpl","#healthCard_tpl_data");
        //领取消费码
        $(document).off('click','.healthCard-get').on('click','.healthCard-get', function () {
          var id = $(this).attr("data-id");
          healthCard.getCode(id);
        });
    });
    
    $(function() {
        setTimeout(function(){ 
            $.init();
        },50);
    });
});


