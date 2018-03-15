var HtmlUtil = {
    htmlEncode: function (html) {
        var temp = document.createElement("div");
        (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    htmlDecode: function (text) {
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    }
};
//临时购物车商品数量
var shopCart = {};
shopCart.config = {
    add: ".account-add",
    reduce: ".account-reduce",
    totalPoint: "#totalPoint",
    totalNumber: "#totalNumber",
    number: "#pamount",
    name: "hide-pamount",
    ints: "hide-init",
    intsTotal: "#html-pamount-ints",
    id: "#html-pamount-total",
    numberId: "#html-pamount-number",
    buyId: "#goods_buy",
    error: ["请输入正确的数量！", "商品数量最少为", "商品数量最多为"]
};
var setAmount = {
    min: 1,
    max: 999,
    reg: function (x) {
        return new RegExp("^[0-9]\\d*$").test(x);
    },
    amount: function (obj, mode) {
        var x = $(obj).val();
        if (x == 1) {
            $(shopCart.config.reduce).attr('disabled', 'disabled');
        }
        if (this.reg(x)) {
            if (mode) {
                x++;
            } else {
                x--;
            }
        } else {
            return
        }
        return x;
    },
    reduce: function (obj) {
        var x = this.amount(obj, false);
        var p = $(obj).attr("data-price");
        var ints = $(obj).attr("data-ints");
        if (x >= this.min) {
            $(shopCart.config.add).removeAttr('disabled');
            $(obj).val(x);
            $(obj).next().val(parseInt(p * x * 100) / 100);
            $(obj).next().next().val(parseInt(ints * x));
            shopCart.loadPrice(shopCart.config.name);
            var price = parseInt(p * x * 100) / 100;
            $(shopCart.config.id).html(price.toFixed(2));
            shopCart.loadInts(shopCart.config.ints);
        } else {
            return
        }
    },
    add: function (obj) {
        var x = this.amount(obj, true);
        var p = $(obj).attr("data-price");
        var ints = $(obj).attr("data-ints");
        var isSnap = app.strTobool($("#hide-isSnap").val());
        var purchaseQuantity = $('#purchaseQuantity').text() || '';//限购数量
        var snapPurchaseQuantity = $('#snapPurchaseQuantity').val() || '';//已购总数
        var snapSalesCount = $('#snapSalesCount').val() || '';//抢购数量
        var remainingPurchaseQuantity = $('#remainingPurchaseQuantity').val() || '';//用户可抢购数量
        //判断库存
        //判断限购是否限制购买数量

        if (x > $(shopCart.config.totalNumber).val()) {
            $.toast("商品库存不足");
            return
        }
        if (isSnap && purchaseQuantity > 0 && x > purchaseQuantity) {
            $.toast("超出限购数量");
            return
        }
        if (isSnap && x - 1 == remainingPurchaseQuantity) {
            $.toast("超出限购数量");
            return
        }
        if (isSnap && x - 1 == (snapSalesCount - snapPurchaseQuantity)) {
            $.toast("超出限购数量");
        }
        $(shopCart.config.reduce).removeAttr('disabled');
        $(obj).val(x);
        $(obj).next().val(parseInt(p * x * 100) / 100);
        $(obj).next().next().val(parseInt(ints * x));
        shopCart.loadPrice(shopCart.config.name);
        var price = parseInt(p * x * 100) / 100;
        $(shopCart.config.id).html(price.toFixed(2));
        shopCart.loadInts(shopCart.config.ints);

    }
};
//计算价格
shopCart.loadPrice = function (name) {
    var str = 0;
    $("[name=" + name + "]").each(function () {
        str += parseInt($(this).val());
        if ($(this).val() == 0) {
            $(this).next().next().val(1);
        }
    });
    var num = $(shopCart.config.number).val();
    $(shopCart.config.name).val(str);
    $(shopCart.config.numberId).html(num);
};
//计算积分
shopCart.loadInts = function (ints) {
    var str = 0;
    $("[name=" + ints + "]").each(function () {
        str += parseInt($(this).val());
        if ($(this).val() == 0) {
            $(this).next().next().val(1);
        }
    });
    $(shopCart.config.intsTotal).html(str);
    var totalPoint = $(shopCart.config.totalPoint).attr("data-value");
    if (parseInt(str) > parseInt(totalPoint)) {
        $.toast("您的积分不足，无法购买！");
        $(shopCart.config.buyId).attr('disabled', 'disabled');
        $(shopCart.config.add).attr('disabled', 'disabled');
        return false;
    } else {
        $(shopCart.config.buyId).removeAttr('disabled')
    }
};
//重新计算价格
shopCart.priceInit = function (o) {
    var $radio = $(o).find("input[type=radio]");
    var checked = $radio.prop("checked");
    if (checked) {
        var price = $radio.attr("data-price");
        var point = $radio.attr("data-point");
        $("#" + shopCart.config.name).attr("value", price);
        $("#" + shopCart.config.ints).attr("value", point);
    }
    $(shopCart.config.add).removeAttr('disabled');
    $(shopCart.config.number).val("1");
    $(shopCart.config.number).attr("data-price", price);
    $(shopCart.config.number).attr("data-ints", point);
    $("#" + shopCart.config.name).val(price);
    $("#" + shopCart.config.ints).val(point);
    if (point != "0") {
        $('.goodsRule_totalBox .unit-i').show();
        $('.goodsRule_totalBox .int').show();
        $(shopCart.config.intsTotal).html(point);
        var totalPoint = $(shopCart.config.totalPoint).attr("data-value");
        if (parseInt(point) > parseInt(totalPoint)) {
            $.toast("您的积分不足，无法购买！");
            $(shopCart.config.buyId).attr('disabled', 'disabled');
            $(shopCart.config.add).attr('disabled', 'disabled');
            return false;
        } else {
            $(shopCart.config.buyId).removeAttr('disabled')
        }
    } else {
        $('.goodsRule_totalBox .unit-i').hide();
        $('.goodsRule_totalBox .int').hide();
        $(shopCart.config.intsTotal).html(0);
        $(shopCart.config.buyId).removeAttr('disabled')
    }
    $(shopCart.config.id).html(price);
    $(shopCart.config.numberId).html(1);
};

var goods = {};
goods.des = function (o) {
    var goodsId = $(o).attr("data-id");
    var href = $(o).attr("href");
    if (goodsId) {
        $.fn.cookie('goodsId', goodsId, { expires: 7 });
        $.router.loadPage("goods.html");
    } else {
        var getGoodsId = app.getUrlKey("goodsId", href);
        $.router.loadPage("goods.html?goodsId=" + getGoodsId);
        $.fn.cookie('goodsId', app.getUrlKey("goodsId"), { expires: 7 });
    }

}
goods.buy = function (o) {
    $(o).attr('disabled', 'disabled');
    var goodsId = app.getUrlKey("goodsId");
    var price = Number($("#hide-pamount").val());
    var point = Number($("#hide-init").val());
    var num = Number($("#pamount").val());
    var isSnap = app.strTobool($("#hide-isSnap").val());
    var phy = app.getUrlKey("phy", window.location.href);
    $.fn.cookie('phy', phy, { expires: 7 });
    if (app.isCookie) {
        //$.fn.cookie('goodsId', goodsId, { expires: 7, path:'/',domain:host});
        $.fn.cookie('goodsId', goodsId, { expires: 7 });
        $.fn.cookie('price', price, { expires: 7 });
        $.fn.cookie('point', point, { expires: 7 });
        $.fn.cookie('num', num, { expires: 7 });
        $.fn.cookie('isSnap', isSnap, { expires: 7 });
    }
    $.closeModal("#goodsRule");
    var urlRedirect = "";
    urlRedirect += "?goodsId=" + goodsId;
    urlRedirect += "&price=" + price;
    urlRedirect += "&point=" + point;
    urlRedirect += "&num=" + num;
    urlRedirect += "&isSnap=" + isSnap;
    urlRedirect += "&couponId=0";
    urlRedirect += "&invoiceId=0";
    urlRedirect += "&addressId=0";
    //window.location.href="confirm.order.html"+urlRedirect;
    $.router.loadPage("confirm.order.html" + urlRedirect, true)
};

//收货地址
var address = {};
//初始化address
address.initAddressCity = function () {
    var userProvince = $("#hid-userProvince").val();
    var userCity = $("#hid-userCity").val();
    var userArea = $("#hid-userArea").val();
    //加载省
    var addressId = $.fn.cookie('addressId');
    if (addressId != "0") {
        app.initChildArea(0, '#userProvince', userProvince);
        app.initChildArea(userProvince, '#userCity', userCity);
        app.initChildArea(userCity, '#userArea', userArea);
    } else {
        app.initChildArea(0, '#userProvince', userProvince);
    }
};
//保存地址
address.saveDataUrl = function (o) {
    var backUrl = window.location.href;
    var addressId = $("#addressId").val();
    var userName = $("#userName").val();
    var userTel = Number($("#userTel").val());
    var userProvince = Number($("#userProvince").val());
    var userCity = Number($("#userCity").val());
    var userArea = Number($("#userArea").val());
    var userAreaDes = $("#userAreaDes").val();
    var userAddressDefault = address.isDefaultAddrss("#userAddressDefault");
    if (userName == "") {
        app.miniAlert("请输入收货人姓名");
        return false;
    }
    if (app.chkSpcWord(userName)) {
        app.miniAlert(app.formError);
        return false;
    }
    if (userTel == "") {
        app.miniAlert("请输入联系电话");
        return false;
    }
    if (app.chkTel(userTel)) {
        app.miniAlert('请输入正确的手机号');
        return false;
    }
    if (userProvince == "-1") {
        app.miniAlert("请选择省");
        return false;
    }
    if (userCity == "-1") {
        app.miniAlert("请选择市");
        return false;
    }
    if (userArea == "-1") {
        app.miniAlert("请选择地区");
        return false;
    }
    if (userAreaDes == "") {
        app.miniAlert("请输入详细地址");
        return false;
    }
    if (app.chkSpcWord(userAreaDes)) {
        app.miniAlert(app.formError);
        return false;
    }
    if (app.getLength(userAreaDes) > 50) {
        app.miniAlert("详细地址超长了");
        return false;
    }
    //后面具体逻辑具体处理
    datas = JSON.stringify({
        "uri": "order/addressSave",
        "requestBody": {
            "backUrl": backUrl,
            "addressId": addressId,
            "isDefault": userAddressDefault,
            "tel": userTel,
            "name": userName,
            "addressSimple": app.htmlReplace(userAreaDes),
            "provAreaId": userProvince,
            "dijiAreaId": userCity,
            "quxianAreaId": userArea
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend: function () {
            $.showIndicator();
            $(o).attr('disabled', 'disabled');
        },
        success: function (data) {
            if (data.retCode == 0) {
                $.hideIndicator();
                $.closeModal(".popup-address");
                $.fn.cookie('addressId', data.item.addressId, { expires: 7 });
                window.location.href = data.item.backUrl;
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
address.isDefaultAddrss = function (o) {
    var v;
    var isChecked = $(o).prop("checked");
    if (isChecked == true) {
        $(o).prop("checked", true);
        v = true;
    } else {
        $(o).prop("checked", false);
        v = false;
    }
    return v;
};
//设置默认地址
address.setDefaultAddrss = function (addressId) {
    datas = JSON.stringify({
        "uri": "order/setDefaultAddressById",
        "requestBody": {
            "addressId": addressId
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend: function () {
            $.showIndicator();
        },
        success: function (data) {
            if (data.retCode == 0) {
                $.hideIndicator();
                var insertHtml = $("#address_list_" + addressId);
                //$.toast("设置默认地址"+data.msg,2000,function(){
                $(insertHtml).prependTo('.address-list');
                $(".address-defTip").html("");
                $(".setDefaultAddress").removeClass('address-opr-link-def').addClass('address-opr-link');
                $(".setDefaultAddress").find('em').html("设为默认");
                $(".setDefaultAddress").find('.icon').addClass('icon-check');
                $("#address_list_" + addressId).find("#address_list_def_" + addressId).html("[默认地址]")
                $("#address_list_" + addressId).find(".setDefaultAddress").addClass('address-opr-link-def').removeClass('address-opr-link');
                $("#address_list_" + addressId).find(".setDefaultAddress").find('em').html('&nbsp;')
                $("#address_list_" + addressId).find(".setDefaultAddress").find('.icon').removeClass('icon-check');
                //});
            } else {
                $.hideIndicator();
                app.miniAlert(data.msg);
                return false;
            }
        }
    });
};
//设定订单地址
address.setOrderAddrss = function (addressId) {
    //后面具体逻辑具体处理
    datas = JSON.stringify({
        "uri": "order/confirm",
        "requestBody": {
            "goodsId": $.fn.cookie('goodsId'),
            "isSnap": app.strTobool($.fn.cookie('isSnap')),
            "price": $.fn.cookie('price'),
            "point": $.fn.cookie('point'),
            "num": $.fn.cookie('num'),
            "addressId": addressId,
            "couponId": $.fn.cookie('couponId'),
            "invoiceId": $.fn.cookie('invoiceId')
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend: function () {
            $.showIndicator();
        },
        success: function (data) {
            if (data.retCode == 0) {
                $.hideIndicator();
                $.fn.cookie('addressId', addressId, { expires: 7 });
                //$.toast("选择地址"+data.msg,2000,function(){
                $.router.loadPage("confirm.order.html", true);
                //});
            } else {
                $.hideIndicator();
                app.miniAlert(data.msg);
                return false;
            }
        }
    });
};
//删除地址
address.delAddess = function (addressId) {
    $.confirm('确认要删除此地址么？', function () {
        datas = JSON.stringify({
            "uri": "order/delAddressById",
            "requestBody": {
                "addressId": addressId
            }
        });
        $.ajax({
            type: 'POST',
            url: app.api,
            dataType: 'json',
            data: datas,
            contentType: 'application/json',
            timeout: 30000,
            beforeSend: function () {
                $.showIndicator();
            },
            success: function (data) {
                if (data.retCode == 0) {
                    $.hideIndicator();
                    $("#address_list_" + addressId).remove();
                    var len = $(".address-list li").length;
                    if (len == 0) {
                        $(".address-list").html('<div class="page-noDate"><p>您还没有添加收货地址</p></div>');
                        $.fn.cookie('addressId', "0", { expires: 7 });
                    }
                } else {
                    $.hideIndicator();
                    app.miniAlert(data.msg);
                    return false;
                }
            }
        });
    });
};
//收货地址设定
address.urlSet = function (form, key) {
    if (app.isCookie) {
        //cookie处理
        $.fn.cookie(form, key, { expires: 7 });
    }
};
//收货地址选择跳转
address.urlGo = function (form, key) {
    var addressForUrl = app.getUrlKey(form);
    if (addressForUrl == key) {
        if (app.isCookie) {
            $.fn.cookie(form, key, { expires: 7 });
        }
        $(".address-select").addClass('address-select').removeClass('address-selectNone');
    } else {
        if (app.isCookie) {
            $.fn.cookie(form, "", { expires: -1 });
        }
        $(".address-select").addClass('address-selectNone').removeClass('address-select');
        $(".setOrderAddress").removeClass()
        $(".address-select-radio").hide()
    }
};
//地址调整判定
address.urlRedirect = function () {
    var formFlag;
    if (app.isCookie) {
        //cookie处理
        formFlag = $.fn.cookie("form");
    }
    return formFlag;
};

//发票
var bill = {};
//保存发票
bill.saveData = function () {
    var invoiceId = $("#invoiceId").val();
    var userBillSwitch = bill.typeSwitch("#switchBill");
    var userBillType = app.zeptoChk("userInvoiceType");
    var userBillInfo = $("#userBillInfo").val();
    var payTaxes = $("#payTaxes").val();

    if (userBillSwitch == true) {
        if (userBillType == "") {
            app.miniAlert("请选择发票类型");
            return false;
        }
        if (userBillInfo == "") {
            app.miniAlert("请输入发票内容");
            return false;
        }
        if (userBillType == '2') {
            var reg = /^([a-z]|[A-Z]|[0-9]){15,20}$/;

            if (!reg.test(payTaxes)) {
                app.miniAlert("纳税人识别号长度应为15位、17位、18位、20位");
                return false;
            }
        }
        if (app.chkSpcWord(userBillInfo)) {
            app.miniAlert(app.formError);
            return false;
        }
    } else {
        userBillType = "";
        userBillInfo = "";
        invoiceId = "";
        payTaxes = "";
    }
    //后面具体逻辑具体处理
    var datas = {
        "uri": "order/invoiceSave",
        "requestBody": {
            "titleType": userBillType,
            "invoiceId": invoiceId,
            "title": app.htmlReplace(userBillInfo)
        }
    };
    if (userBillType == '2') {
        datas.requestBody.taxpayerIdNumber = payTaxes
    };
    datas = JSON.stringify(datas);
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend: function () {
            $.showIndicator();
        },
        success: function (data) {
            if (data.retCode == 0) {
                $.hideIndicator();
                $.fn.cookie('invoiceId', data.item.invoiceId, { expires: 7 });
                //$.toast("保存"+data.msg,2000,function(){
                $.router.loadPage("confirm.order.html", true);
                //});
            } else {
                $.hideIndicator();
                app.miniAlert(data.msg);
                return false;
            }
        }
    });
};
//是否需要发票
bill.typeSwitch = function (o) {
    var isChecked = $(o).prop("checked");
    var userBillType = app.zeptoChk("userInvoiceType");
    if (isChecked == true) {
        $(o).prop("checked", true);
        $(".switchBill-info").show();
        if (userBillType != '2') {
            $('.switchBill-info').eq(2).hide();
        }
    } else {
        $(o).prop("checked", false);
        $(".switchBill-info").hide()
    }
    return isChecked;
};
//发票类型
bill.type = function (o) {
    var isChecked = $(o).prop("checked");
    var v = $(o).val();
    if (isChecked) {
        $(o).prop("checked", true);
    } else {
        $(o).prop("checked", false);
    }
    if (v == 1) {
        $("#userBillInfo").attr('placeholder', '请输入个人发票内容');
        $('.switchBill-info').eq(2).hide();
    } else {
        $("#userBillInfo").attr('placeholder', '请输入公司发票内容');
        $('.switchBill-info').eq(2).show();
    }

};

//代金券
var coupon = {};
coupon.saveDataUrl = function (o) {
    var couponCode = $("#couponCode").val();
    if (couponCode == "") {
        app.miniAlert("请输入代金券号码");
        return false;
    }
    //后面具体逻辑具体处理
    datas = JSON.stringify({
        uri: "my/saveCoupon",
        requestBody: {
            "code": couponCode,
            "goodsId": $.fn.cookie('goodsId')
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend: function () {
            $.showIndicator();
            $(o).attr('disabled', 'disabled');
        },
        success: function (data) {
            if (data.retCode == 0) {
                $.hideIndicator();
                $.toast("添加" + data.msg, 2000, function () {
                    window.location.href = window.location.href;
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
//设定代金券
coupon.setOrderCoupon = function (couponId) {
    if (app.isCookie) {
        //cookie处理
        $.fn.cookie('couponId', couponId, { expires: 7 });
        var goodsId = $.fn.cookie('goodsId');
        var price = $.fn.cookie('price');
        var point = $.fn.cookie('point');
        var num = $.fn.cookie('num');
        var isSnap = $.fn.cookie('isSnap');
        var invoiceId = $.fn.cookie('invoiceId');
    }
    //后面具体逻辑具体处理
    datas = JSON.stringify({
        "uri": "order/confirm",
        "requestBody": {
            "addressId": $.fn.cookie('addressId'),
            "goodsId": goodsId,
            "isSnap": app.strTobool(isSnap),
            "price": Number(price),
            "point": Number(point),
            "num": Number(num),
            "couponId": couponId,
            "invoiceId": invoiceId
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend: function () {
            $.showIndicator();
        },
        success: function (data) {
            if (data.retCode == 0) {
                $.hideIndicator();
                //$.toast("选择"+data.msg,2000,function(){
                // window.location.href="confirm.order.html"
                $.router.loadPage("confirm.order.html", true);
                //});
            } else {
                $.hideIndicator();
                app.miniAlert(data.msg);
            }
        }
    });
};

var order = {};
//提交订单
order.saveDataUrl = function (o) {
    var addressId = $("#hide-addressId").val();
    var isSnap = app.strTobool($.fn.cookie('isSnap') ? $.fn.cookie('isSnap') : app.getUrlKey("isSnap", location))
    if (addressId == "0") {
        app.miniAlert("请添加收货地址");
        return false;
    }
    var location = window.location.href;
    var isSnap = app.strTobool($.fn.cookie('isSnap') ? $.fn.cookie('isSnap') : app.getUrlKey("isSnap", location));
    $(o).attr('disabled', 'disabled');
    //后面具体逻辑具体处理
    datas = JSON.stringify({
        uri: "order/saveOrder",
        "requestBody": {
            "addressId": $.fn.cookie('addressId') ? $.fn.cookie('addressId') : app.getUrlKey("addressId", location),
            "couponId": Number($.fn.cookie('couponId') ? $.fn.cookie('couponId') : app.getUrlKey("couponId", location)),
            "invoiceId": $.fn.cookie('invoiceId') ? $.fn.cookie('invoiceId') : app.getUrlKey("invoiceId", location),
            "goodsId": $.fn.cookie('goodsId') ? $.fn.cookie('goodsId') : app.getUrlKey("goodsId", location),
            "price": Number($.fn.cookie('price') ? $.fn.cookie('price') : app.getUrlKey("price", location)),
            "point": Number($.fn.cookie('point') ? $.fn.cookie('point') : app.getUrlKey("point", location)),
            "num": Number($.fn.cookie('num') ? $.fn.cookie('num') : app.getUrlKey("num", location)),
            "isSnap": isSnap
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend: function () {
            $.showIndicator();
            $(o).attr('disabled', 'disabled');
        },
        success: function (data) {
            if (data.retCode == 0) {
                $.hideIndicator();
                $.fn.cookie('orderId', data.item.orderId, { expires: 7 });
                var phy = $.fn.cookie('phy');
                if (phy != "" && phy != null) {
                    window.location.href = "order.phyPay.html?orderId=" + data.item.orderId;
                    $.fn.cookie("couponId", "", { expires: -1 });
                } else {
                    window.location.href = "order.pay.html?orderId=" + data.item.orderId;
                    $.fn.cookie("couponId", "", { expires: -1 });
                }
            } else if (data.retCode == -1) {
                $.hideIndicator();
                if (isSnap) {
                    app.miniAlert('购买数量超过限购数，可能是商品库存不足', function () {
                        window.location.href = "goods.html?goodsId=" + ($.fn.cookie('goodsId') ? $.fn.cookie('goodsId') : app.getUrlKey("goodsId", location));
                    });
                } else {
                    app.miniAlert('商品库存不足', function () {
                        window.location.href = "goods.html?goodsId=" + ($.fn.cookie('goodsId') ? $.fn.cookie('goodsId') : app.getUrlKey("goodsId", location));
                    });
                }
                $(o).removeAttr('disabled');
            } else {
                $.hideIndicator();
                app.miniAlert(data.msg);
                $(o).removeAttr('disabled');
                return false;
            }
        }
    });
};
//取消订单
order.cancel = function (orderId) {
    $.confirm('确认要取消此订单？', function () {
        datas = JSON.stringify({
            "uri": "order/cancelOrder",
            "requestBody": {
                "orderId": orderId
            }
        });
        $.ajax({
            type: 'POST',
            url: app.api,
            dataType: 'json',
            data: datas,
            contentType: 'application/json',
            timeout: 30000,
            beforeSend: function () {
                $.showIndicator();
            },
            success: function (data) {
                if (data.retCode == 0) {
                    $.hideIndicator();
                    window.location.href = window.location.href;
                } else {
                    $.hideIndicator();
                    app.miniAlert(data.msg);
                    return false;
                }
            }
        });
    });
};
//删除订单
order.delete = function (orderId) {
    $.confirm('确认要删除此订单？', function () {
        datas = JSON.stringify({
            "uri": "order/deleteOrder",
            "requestBody": {
                "orderId": orderId
            }
        });
        $.ajax({
            type: 'POST',
            url: app.api,
            dataType: 'json',
            data: datas,
            contentType: 'application/json',
            timeout: 30000,
            beforeSend: function () {
                $.showIndicator();
            },
            success: function (data) {
                if (data.retCode == 0) {
                    $.hideIndicator();
                    var len = $(".order-list").length;
                    $("#order_list_" + orderId).remove();
                    if (len > 0) {
                        Number(len--);
                        if (len == 0) {
                            $(".order-content").html(' <div class="order-list-noData"><div class="page-noDate"><p>没有相关订单信息</p></div>/div>');
                        }
                    }
                } else {
                    $.hideIndicator();
                    app.miniAlert(data.msg);
                    return false;
                }
            }
        });
    });
};

//健康卡
var healthCardId = {};
healthCardId.activate = function (cardNo, cardId) {
    datas = JSON.stringify({
        "uri": "healthcard/activate",
        "requestBody": {
            "cardNo": cardNo,
            "cardId": cardId,
            "orderId": app.getUrlKey("orderId")
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend: function () {
            $.showIndicator();
        },
        success: function (data) {
            if (data.retCode == 0) {
                $.hideIndicator();
                $.modal({
                    extraClass: 'modal-MsgCallBack',
                    title: '<div class="MsgCallBack">' +
                    '<p>激活成功！</p>' +
                    '</div>',
                    text: '<div class="MsgCallBack-info">' +
                    '<p>请在[健康卡]模块使用健康卡</p>' +
                    '</div>',
                    buttons: [
                        {
                            text: '我已了解',
                            onClick: function () {
                                window.location.href = window.location.href;
                            }
                        }
                    ]
                });
            } else {
                $.hideIndicator();
                app.miniAlert(data.msg);
                return false;
            }
        }
    });
};



/******************************支付********************************/
var pay = {};
//积分微信返回
pay.callBack = function (type, orderId) {
    //获取机构类型
    var from = $.fn.cookie('from');
    var phy = app.getUrlKey("phy", window.location.href) ? $.fn.cookie('phy') : $.fn.cookie('phy');
    if (phy != "" && phy != null) {
        backInfo = "返回体检预约";
    } else {
        backInfo = "返回商城首页";
    }
    var orgChannel = $.fn.cookie('orgChannel');
    //医生推送商品返回IM
    var serviceId = $("#hide-serviceId").val();
    if (typeof (orderId) == "undefined") {
        $.closeModal('.modal-orderPayCallBackOrder');
    } else {
        if (type) {
            //进入APP IM
            $.modal({
                extraClass: 'modal-orderPayCallBackOrder',
                title: '<div class="orderPayCallBack">' +
                '<p class="orderPayOrder">订单号：<span>' + orderId + '</span></p>' +
                '</div>',
                text: '<div class="orderPayCallBack-info">' +
                '<p>我们将根据订单及时为您准备好商品、开通服务、或安排发货！</p>' +
                '<p>您可在【我的订单】中查看此商品订单详情</p>' +
                '</div>',
                buttons: [
                    {
                        text: '返回到家庭医生',
                        onClick: function () {
                            if (typeof window.ciyun != "undefined" && typeof window.ciyun.openChatIm != "undefined") {//android 
                                window.ciyun.openChatIm(serviceId);
                            } else if (typeof openChatIm != "undefined" && typeof (openChatIm) == "function") {//ios
                                openChatIm(serviceId);
                            } else {
                                app.miniAlert("非ios android 支付失败");
                            }
                        }
                    },
                    {
                        text: '查看我的订单',
                        onClick: function () {
                            window.location.href = "order.des.html?orderId=" + orderId;
                        }
                    }
                ]
            });
        } else {
            $.modal({
                extraClass: 'modal-orderPayCallBackOrder',
                title: '<div class="orderPayCallBack">' +
                '<p class="orderPayOrder">订单号：<span>' + orderId + '</span></p>' +
                '</div>',
                text: '<div class="orderPayCallBack-info">' +
                '<p>我们将根据订单及时为您准备好商品、开通服务、或安排发货！</p>' +
                '<p>您可以在【我的订单】中查询此订单详情</p>' +
                '</div>',
                buttons: [
                    {
                        text: backInfo,
                        onClick: function () {
                            if (from != null) {
                                window.location.href = "org.index.html?orgChannel=" + from;
                            }
                            if (phy != "" && phy != null) {
                                var newPhyUrl = HtmlUtil.htmlDecode(phy).replace(/\@@/g, "&");
                                window.location.href = newPhyUrl;
                            } else if (orgChannel != null) {
                                window.location.href = "org.index.html?orgChannel=" + orgChannel;
                            } else {
                                window.location.href = "index.html";
                            }
                        }
                    },
                    {
                        text: '查看我的订单',
                        onClick: function () {
                            window.location.href = "order.des.html?orderId=" + orderId;
                        }
                    }
                ]
            });
        }
    }
};

var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
            iPad: u.indexOf('iPad') > -1,
            webApp: u.indexOf('Safari') == -1,
            weChat: u.indexOf('MicroMessenger') > -1
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
/**
 * 关闭当前页（后退）
 */
var closeCurPage = function () {
    if (browser.versions.weChat) {
        wx.closeWindow();
    } else if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        if (back != "" && $.isFunction(back)) {
            back();
        } else {
            window.location.href = "index.html";
        }
    } else if (browser.versions.android) {
        if (window.ciyun.back != "" && $.isFunction(window.ciyun.back)) {
            window.ciyun.back();
        } else {
            window.location.href = "index.html";
        }
    }
};
/**
 * 打开聊天界面
 */
var openImChat= function(serviceId,serviceRecordId,consultId){
    
    if(browser.versions.weChat){
        //微信处理方法 关闭微信窗口 必须调用wxjsdk 才能用
        wx.closeWindow();
    } else if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        if(typeof(openConsultChat) != "undefined" ){
            openConsultChat(serviceId+"|"+serviceRecordId+"|"+consultId);
        }else if(serviceId!=undefined && serviceId>0 && openChatIm!="" && $.isFunction(openChatIm) ){
            openChatIm(serviceId);
        }else  if(consultingNutrilitTubeDivision!= "" && $.isFunction(consultingNutrilitTubeDivision)){
            consultingNutrilitTubeDivision();
        }
    }else if (browser.versions.android) {
        if(typeof(window.ciyun.openConsultChat) != "undefined" ){
            window.ciyun.openConsultChat(serviceId+"|"+serviceRecordId+"|"+consultId);
        }else if(window.ciyun.openChatIm!= "" && $.isFunction(window.ciyun.openChatIm)){
            window.ciyun.openChatIm(serviceId);
        }else if(window.ciyun.goToHealthConsult!= "" && $.isFunction(window.ciyun.goToHealthConsult)){
            window.ciyun.goToHealthConsult();
        }       
    }
};
//支付提示
pay.callBackError = function (orderId) {
    if (typeof window.ciyun != "undefined" && typeof window.ciyun.isInApp != "undefined") {

    } else if (typeof isInApp != "undefined" && typeof (isInApp) == "function") {
        $.modal({
            extraClass: 'modal-orderPayCallBackError',
            title: '<div class="orderPayCallBack orderPayCallBackError">' +
            '<p class="orderPayOrder">支付提醒</p>' +
            '</div>',
            text: '<div class="orderPayCallBackError-info">' +
            '<p>是否已经完成支付</p>' +
            '</div>',
            buttons: [
                {
                    text: '遇到问题',
                    onClick: function () {
                        $.closeModal('.modal-orderPayCallBackError');
                        $(".shop-pay-order").removeAttr('disabled');
                        pay.loadErrorHelp();
                    }
                },
                {
                    text: '完成支付',
                    onClick: function () {
                        window.location.href = "order.des.html?orderId=" + orderId
                    }
                }
            ]
        });
    }
};
//支付帮助
pay.loadErrorHelp = function () {
    $.modal({
        extraClass: 'modal-orderPayCallBackHelp',
        title: '<div class="orderPayCallBack orderPayCallBackError">' +
        '<p class="orderPayOrder">支付帮助</p>' +
        '</div>',
        text: '<div class="orderPayCallBackHelp-info">' +
        '<p>1、请安装支付宝/微信最新客户端</p>' +
        '<p>2、请在支付宝/微信客户端支付完成后返回</p>' +
        '<p>3、请确保支付宝/微信有足够余额进行支付</p>' +
        '<p>4、客服咨询热线：<a href="tel:4009-930-630">4009-930-630</a></p>' +
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
pay.point = function (o) {
    var orderId = $("#hide-orderId").val();
    var doctorId = $("#hide-doctorId").val();
    datas = JSON.stringify({
        uri: "pay/pointpay",
        "requestBody": {
            "orderId": orderId
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend: function () {
            $.showIndicator();
            $(o).attr('disabled', 'disabled');
        },
        success: function (data) {
            if (data.retCode == 0) {
                $.hideIndicator();
                //$.toast("积分兑换"+data.msg,2000,function(){
                pay.callBack(doctorId, orderId)
                //});
            } else {
                $.hideIndicator();
                app.miniAlert(data.msg);
                $(o).removeAttr('disabled');
                return false;
            }
        }
    });
};
//0元支付
pay.zeropay = function (o) {
    var orderId = $("#hide-orderId").val();
    var doctorId = $("#hide-doctorId").val();
    datas = JSON.stringify({
        uri: "pay/zeropay",
        "requestBody": {
            "orderId": orderId
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend: function () {
            $.showIndicator();
            $(o).attr('disabled', 'disabled');
        },
        success: function (data) {
            if (data.retCode == 0) {
                $.hideIndicator();
                //$.toast("支付"+data.msg,2000,function(){
                pay.callBack(doctorId, orderId)
                //});
            } else {
                $.hideIndicator();
                app.miniAlert(data.msg);
                $(o).removeAttr('disabled');
                return false;
            }
        }
    });
};
//app微信支付回调
var appWXPayCallback = function (code) {
    var orderId = $("#hide-orderId").val();
    var doctorId = $("#hide-doctorId").val();
    $.closeModal('.modal-orderPayCallBackError');
    if (code == '0') {
        if (doctorId != "" && doctorId != null) {
            pay.callBack(true, orderId)
        } else {
            pay.callBack(false, orderId)
        }
    } else if (code == '-2') {
        $.hideIndicator();
        $.toast("订单支付取消", 2000, function () {
            $(".shop-pay-order").removeAttr('disabled');
        });
        return false;
    } else {
        $.hideIndicator();
        $.toast("订单支付失败", 2000, function () {
            $(".shop-pay-order").removeAttr('disabled');
        });
        return false;
    }
};
//app 微信 支付获取支付的预支付id
pay.getWxPrepayId = function (o) {
    var orderId = $("#hide-orderId").val();
    var prepayId = "";
    datas = JSON.stringify({
        uri: "pay/wxPrepayId",
        "requestBody": {
            "orderId": orderId
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        async: false,
        beforeSend: function () {
            $.showIndicator();
            $(o).attr('disabled', 'disabled');
        },
        success: function (data, status) {
            setTimeout(function () {
                pay.callBackError(orderId);
            }, 200)
            if (data.retCode != null && data.retCode == '0') {
                prepayId = data.item.prePayId;
                $.hideIndicator();
            } else {
                app.miniAlert(data.msg);
                $(o).removeAttr('disabled');
                return false;
            }
        }
    });
    return prepayId;
};

//app支付宝回调
var appAliPayCallback = function (code) {
    $.closeModal('.modal-orderPayCallBackError');
    var orderId = $("#hide-orderId").val();
    var doctorId = $("#hide-doctorId").val();
    if (code == '0' || code == '9000' || code == '8000') {
        if (doctorId != "" && doctorId != null) {
            pay.callBack(true, orderId)
        } else {
            pay.callBack(false, orderId)
        }
    } else {
        $.hideIndicator();
        $.toast("订单支付失败", 2000, function () {
            $(".shop-pay-order").removeAttr('disabled');
        });
        return false;
    }
};
//app 支付宝 支付获取支付的预支付id
pay.getAliPrepayId = function (o) {
    var orderId = $("#hide-orderId").val();
    var productInfo = "";
    datas = JSON.stringify({
        uri: "pay/alipay",
        "requestBody": {
            "orderId": orderId
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        async: false,
        beforeSend: function () {
            $.showIndicator();
            $(o).attr('disabled', 'disabled');
        },
        success: function (data, status) {
            setTimeout(function () {
                pay.callBackError(orderId);
            }, 200)
            if (data.retCode != null && data.retCode == '0') {
                productInfo = data.item;
                $.hideIndicator();
            } else {
                $.hideIndicator();
                app.miniAlert(data.msg);
                $(o).removeAttr('disabled');
                return false;
            }
        }
    });
    return productInfo;
};
//微信支付读取支付数据
pay.onBridgeReady = function (o) {
    var orderId = $("#hide-orderId").val();
    var doctorId = $("#hide-doctorId").val();
    datas = JSON.stringify({
        uri: "pay/wxpay",
        "requestBody": {
            "orderId": orderId
        }
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend: function () {
            $.showIndicator();
            $(o).attr('disabled', 'disabled');
        },
        success: function (data, status) {
            if (data.retCode != null && data.retCode == '0') {
                var data = data.item;
                var params = data.configParams;
                var appId = params.appId;
                var timeStamp = params.timeStamp;
                var nonceStr = params.nonceStr;
                var packages = params.package;
                var signType = params.signType;
                var paySign = params.paySign;
                //alert("appId="+appId+",timeStamp="+timeStamp+",nonceStr="+nonceStr+",packages="+packages+",signType="+signType+",paySign="+paySign);
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": appId,     //公众号名称，由商户传入
                        "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数
                        "nonceStr": nonceStr, //随机串
                        "package": packages,
                        "signType": signType,         //微信签名方式:
                        "paySign": paySign //微信签名
                    },
                    function (res) {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            if (doctorId != "" && doctorId != null) {
                                pay.callBack(true, orderId)
                            } else {
                                pay.callBack(false, orderId)
                            }
                        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                            $.toast("支付失败", 2000);
                            $.hideIndicator();
                            $(o).removeAttr('disabled');
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            $.toast("您已经取消支付", 2000);
                            $.hideIndicator();
                            $(o).removeAttr('disabled');
                        } else {
                            $.toast("其他支付异常", 2000);
                            $.hideIndicator();
                            $(o).removeAttr('disabled');
                        }
                    }
                );
            } else {
                $.toast("未能返回支付回调", 2000);
                $.hideIndicator();
                $(o).removeAttr('disabled');
                return false;
            }
        }
    });
};

//支付方法
pay.order = function (type, o) {
    switch (type) {
        case "zero":
            pay.zeropay(o);
            break;
        case "point":
            pay.point(o)
            break;
        case "wx":
            pay.onBridgeReady(o);
            break;
        case "app-wx":
            var wxPayId = pay.getWxPrepayId(o);
            if (typeof window.ciyun != "undefined" && typeof window.ciyun.appWXPay != "undefined") {
                window.ciyun.appWXPay(wxPayId);
            } else if (typeof appWXPay != "undefined") {//IOS调用
                appWXPay(wxPayId);
            }
            break;
        case "app-ali":
            var productInfo = pay.getAliPrepayId(o);
            if (typeof window.ciyun != "undefined" && typeof window.ciyun.appAliPay != "undefined") {
                window.ciyun.appAliPay(productInfo);
            } else if (typeof appAliPay != "undefined") {//IOS调用
                appAliPay(productInfo);
            }
            break;
    }
};
var removeBackSui = {};
//返回关闭弹出
removeBackSui.toastAlert = function () {
    $(".modal-overlay-visible,.title-iframe,.modal-in,.popup-eror").hide().remove();
};
//返回关闭 popup
removeBackSui.popup = function () {
    $(".modal-overlay-visible,.content-iframe,.title-iframe,.popup-eror").hide().remove();
    $.closeModal('.modal-orderPayCallBackOrder');
}
//返回关闭地址 popup
removeBackSui.popupAddress = function () {
    $(".popup-address,.modal-overlay-visible,.content-iframe,.title-iframe,.popup-eror").hide().remove();
};
/******************************支付********************************/

var appDownClose = function () {
    $(document).off("click", "#appDownClose").on("click", "#appDownClose", function () {
        $("#page-appDown").remove();
        $(".pull-to-refresh-content").css("top", "-2.2rem")
        $("#page-appDown-coupon").css("top", "0")
    });
};

//完鼎
var vend = {};
//跳转
vend.vendUrl = function () {
    var datas = JSON.stringify({
        uri: "/index/point"
    });
    $.ajax({
        type: 'POST',
        url: app.api,
        dataType: 'json',
        data: datas,
        contentType: 'application/json',
        timeout: 30000,
        beforeSend: function () {
            //app.getAppPersonId();
        },
        success: function (data) {
            var code = data.retCode;
            var os = data.os;
            if (code == "001") {//需要登录                       
                if (os == "wx") {
                    app.isWxLogin();
                }
            } else if (code == "0") {//返回接口信息
                if (os == "wx") {
                    window.location.href = data.item.url;
                }
            }
        },
        error: function (xhr, type) {
            $.toast(app.apiError, 5000);
            $(".shop-loading-pre").remove();
            app.loadError();
        }
    });
};

//主逻辑
define(app.source, function () {

    var loading = false;

    //微信引导app下载
    $(document).on("pageInit", ".page", function (e, pageId, $page) {
        appDownClose();
    });


    /*
     * 完鼎积分
     */
    $(document).on("pageInit", "#vend", function (e, pageId, $page) {
        vend.vendUrl();
    });
    /*
        商城首页
    */
    $(document).on("pageInit", "#home", function (e, pageId, $page) {
        //默认首页数据
        removeBackSui.popup();
        var hideTitle = $('#hideTitle').val() || ''; //首页数据是否存在
        if (hideTitle) {
            return
        }
        app.getTplData("index", "script#home_tpl", "#home_tpl_data", function () {
            //头图
            app.initSwiperImg(".swiper-wrapper-home img", 3);
            app.initSwiperImg(".snapBuy-item img", 3);
            app.initSwiperImg(".points-item img", 5);
            $(".swiper-container-home").swiper({
                pagination: '.swiper-pagination-home',
                lazyLoading: true,
                spaceBetween: 10,
                autoplay: 5000,
                onInit: function (swiper) {
                    app.initSwiperImg(".swiper-slide", 3);
                    app.initSwiperImg(".swiper-container-home img", 3);
                    var len = swiper.slides.length;
                    if (len == 1) {
                        $(".swiper-pagination-home").hide();
                    }
                }
            });
            //抢购倒计时
            app.countTime(".countTime");
            //推荐图初始化大小
            app.hotImginit();
            if ($.device.isWeixin) {
                $("#page-appDown").show();
            } else {
                $("#page-appDown").remove();
            }
        });
        //加载商品数据
        $(document).on("infinite", "#home_tpl_data", function () {
            if (loading) return;
            loading = true;
            setTimeout(function () {
                loading = false;
                var pageNo = $("#page-val").attr('data-pageNo');
                var pageSize = $("#page-val").attr('data-pageSize');
                var pageLast = $("#page-val").attr('data-pageLast');
                if (parseInt(pageNo) >= parseInt(pageLast)) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').html("<p class='preloader-noDate'>没有更多商品了</p>");
                    return;
                }
                app.getPageData("indexMore", "#moreGoods_tpl", ".category-goods-list", parseInt(pageNo) + 1, parseInt(pageSize));
                $.refreshScroller();
            }, 1000);
        });
        //刷新首页
        $(document).on('refresh', '#home_tpl_data', function (e) {
            setTimeout(function () {
                app.getTplData("index", "script#home_tpl", "#home_tpl_data", function () {
                    //头图
                    app.initSwiperImg(".swiper-wrapper-home img", 3);
                    app.initSwiperImg(".snapBuy-item img", 3);
                    app.initSwiperImg(".points-item img", 5);
                    $(".swiper-container-home").swiper({
                        pagination: '.swiper-pagination-home',
                        lazyLoading: true,
                        loop: false,
                        spaceBetween: 10,
                        //autoplay : 5000,
                        onInit: function (swiper) {
                            app.initSwiperImg(".swiper-slide", 3);
                            app.initSwiperImg(".swiper-container-home img", 3);
                            var len = swiper.slides.length;
                            if (len == 1) {
                                $(".swiper-pagination-home").hide();
                            }
                        }
                    });
                    //抢购倒计时
                    app.countTime(".countTime");
                    //推荐图初始化大小
                    app.hotImginit();
                });
                // 加载完毕需要重置
                $.pullToRefreshDone('#home_tpl_data');
            }, 1000);
        });
        //完鼎判断跳转        
        $(document).off("click", "#vendUrl").on("click", "#vendUrl", function () {
            if (browser.versions.weChat) {
                window.location.href = "vend.html?vendId=0";
            } else if (typeof window.ciyun != "undefined" && typeof window.ciyun.action2IntegralMall != "undefined") {
                window.ciyun.action2IntegralMall();
            } else if (typeof loginToThirdMall != "undefined" && typeof (loginToThirdMall) == "function") {//ios
                loginToThirdMall();
            } else {//3.2以下版本进慈云商城积分
                window.location.href = "points.html";
            }
        });
        //跳转路由添加
        $(document).on('click', "div[data-href]", function () {
            $.router.load($(this).attr("data-href"));

            return false;
        });
        $.fn.cookieClearAll();
    });

    /*
        限时抢购
    */
    $(document).on("pageInit", "#snapGoods", function (e, pageId, $page) {
        //默认首页数据
        removeBackSui.popup();
        app.getTplData("snapGoods", "script#snapGoods_tpl", "#snapGoods_tpl_data", function () {
            //抢购商品图
            app.initSwiperImg(".snapBuy-item img", 3);
            //抢购倒计时
            app.countTime(".countTime");
        });

    });
    /*
        积分
    */
    $(document).on("pageInit", "#points", function (e, pageId, $page) {
        //积分商品
        removeBackSui.popup();
        app.getTplData("points", "script#points_tpl", "#points_tpl_data");
        //加载积分商品数据
        $(document).on("infinite", "#points_tpl_data", function () {
            if (loading) return;
            loading = true;
            setTimeout(function () {
                loading = false;
                var pageNo = $("#page-val").attr('data-pageNo');
                var pageSize = $("#page-val").attr('data-pageSize');
                var pageLast = $("#page-val").attr('data-pageLast');
                if (parseInt(pageNo) >= parseInt(pageLast)) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').html("<p class='preloader-noDate'>没有更多商品了</p>");
                    return;
                }
                app.getPageData("pointsMore", "#pointsMore_tpl", ".category-list", parseInt(pageNo) + 1, parseInt(pageSize));
                $.refreshScroller();
            }, 1000);
        });
    });
    /*
        分类商品
    */
    $(document).on("pageInit", "#category", function (e, pageId, $page) {
        //分类商品
        removeBackSui.popup();
        app.getTplData("category", "script#category_tpl", "#category_tpl_data", function () {
            app.initSwiperImg("#category_swiper img", 3);
            if (app.getUrlKey("categoryId") == 14) {
                $("#category_swiper").show();
            }
        });
        if ($.device.isWeixin) {
            $("#page-appDown").show();
        } else {
            $("#page-appDown").remove();
        }
        var categoryId = app.getUrlKey("categoryId");
        $.fn.cookie('categoryId', categoryId, { expires: 7 });
        //加载分类商品数据
        $(document).on("infinite", "#category_tpl_data", function () {
            if (loading) return;
            loading = true;
            setTimeout(function () {
                loading = false;
                var pageNo = $("#page-val").attr('data-pageNo');
                var pageSize = $("#page-val").attr('data-pageSize');
                var pageLast = $("#page-val").attr('data-pageLast');
                if (parseInt(pageNo) >= parseInt(pageLast)) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').html("<p class='preloader-noDate'>没有更多商品了</p>");
                    return;
                }
                app.getPageData("categoryMore", "#categoryGoods_tpl", ".category-list", parseInt(pageNo) + 1, parseInt(pageSize));
                $.refreshScroller();
            }, 1000);
        });
    });

    /*
        商品预览详情
    */
    $(document).on("pageInit", "#goodsViewDes", function (e, pageId, $page) {
        app.getTplData("goodsViewDes", "script#goodsViewDes_tpl", "#goodsViewDes_tpl_data", function () {
            //商品头图
            $.fn.cookieClearAll();
            app.initSwiperImg("#goodsDes_swiper .swiper-wrapper img", 2);
            $(".swiper-container-goodsDes").swiper({
                pagination: '.swiper-pagination-goodsDes',
                lazyLoading: true,
                loop: false,
                spaceBetween: 10,
                freeMode: false,
                //autoplay : 5000,
                onInit: function (swiper) {
                    var len = swiper.slides.length;
                    if (len == 1) {
                        $(".swiper-pagination-goodsDes").hide();
                    }
                }
            });
            //详情图预览
            //微信JSDK
            if ($.device.isWeixin) {
                $(document).off("click", ".pic-view").on("click", ".pic-view", function () {
                    var imgSrc = $(this).attr("src");
                    var arr = [];
                    $('.pic-view').each(function () {
                        arr.push($(this).attr('src'));
                    })
                    wx.previewImage({
                        current: imgSrc,
                        urls: arr
                    });
                });
            } else {
                // $(document).off("click", ".pic-view").on("click", ".pic-view", function() {
                //     app.initImgView(".pic-view");
                // });

                //详情图预览
                $(document).off("click", ".pic-view").on("click", ".pic-view", function () {
                    $("#imgzoom-item").attr("src", $(this).attr("src"));
                    $("#imgzoom-x").show();
                    $("#imgzoom-pack").show();
                });
                ImagesZoom.init({
                    "elem": ".pic-view-box"
                });
            }
        });
    });

    /*
        商品详情
    */
    $(document).on("pageInit", "#goodsDes", function (e, pageId, $page) {
        //商品数据调取
        removeBackSui.popupAddress();
        removeBackSui.toastAlert();
        app.getTplData("goodsDes", "script#goodsDes_tpl", "#goodsDes_tpl_data", function () {
            //商品头图
            var from = $.fn.cookie('from');
            var orgChannel = $.fn.cookie('orgChannel');
            var phy = app.getUrlKey("phy");
            $.fn.cookieClearAll();
            if (from != null) {
                $.fn.cookie('from', from, { expires: 7, path: '/' });
            }
            if (orgChannel != null) {
                $.fn.cookie('orgChannel', orgChannel, { expires: 7, path: '/' });
            }
            if (phy != null) {
                $.fn.cookie('phy', phy, { expires: 7, path: '/' });
            }
            app.initSwiperImg("#goodsDes_swiper .swiper-wrapper img", 2);
            $(".swiper-container-goodsDes").swiper({
                pagination: '.swiper-pagination-goodsDes',
                lazyLoading: true,
                loop: false,
                spaceBetween: 10,
                freeMode: false,
                //autoplay : 5000,
                onInit: function (swiper) {
                    var len = swiper.slides.length;
                    if (len == 1) {
                        $(".swiper-pagination-goodsDes").hide();
                    }
                }
            });
            //详情图预览
            //微信JSDK
            if ($.device.isWeixin) {
                $(document).off("click", ".pic-view").on("click", ".pic-view", function () {
                    var imgSrc = $(this).attr("src");
                    var arr = [];
                    $('.pic-view').each(function () {
                        arr.push($(this).attr('src'));
                    })
                    wx.previewImage({
                        current: imgSrc,
                        urls: arr
                    });
                });
            } else {
                //详情图预览
                $(document).off("click", ".pic-view").on("click", ".pic-view", function () {
                    $("#imgzoom-item").attr("src", $(this).attr("src"));
                    $("#imgzoom-x").show();
                    $("#imgzoom-pack").show();
                });
                ImagesZoom.init({
                    "elem": ".pic-view-box"
                });
            }
            //商品抢购提示
            if ($(".countTime").size() > 0) {
                app.countTime(".countTime");
            }
            //健康卡商品进APPIM
            $(document).off("click", "#goToIm").on("click", "#goToIm", function () {
                var serviceId = $(this).attr("data-serviceId");
                if (typeof window.ciyun != "undefined" && typeof window.ciyun.isInApp != "undefined") {
                    if (window.ciyun.isLogin()) {
                        openImChat(serviceId,"0","0");
                    } else {
                        window.ciyun.clickFromJs("1");
                    }
                } else if (typeof isInApp != "undefined" && typeof (isInApp) == "function") {
                    isLogin();
                    $.fn.cookie('serviceId', serviceId, { expires: 7 });
                }
            });

        });
        //商品规格    
        $(document).off('click', '#goTo-buy').on('click', '#goTo-buy', function () {
            $(this).attr('disabled', 'disabled');
            $.popup('#goodsRule');
            app.getTplData("goodsRule", "script#goodsRule_tpl", "#goodsRule", function () {
                shopCart.priceInit(".goodsRule_lab_price");
            });
            $(document).off('change', '.goodsRule_lab_price').on("change", ".goodsRule_lab_price", function () {
                shopCart.priceInit(this);
            });
        });
        //推荐类似商品    
        $(document).off('click', '#goTo-buyMore').on('click', '#goTo-buyMore', function () {
            var location = window.location.href;
            var goodsId = app.getUrlKey("goodsId", location);
            var href = $(this).attr("data-href");
            window.location.href = href + "?goodsId=" + goodsId;
        });

        //商品数量计算
        $(document).off('click', '.account-reduce').on("click", ".account-reduce", function () {
            setAmount.reduce('#pamount');
        });
        //商品数量计算
        $(document).off('click', '.account-add').on("click", ".account-add", function () {
            setAmount.add('#pamount');
        });
        $(document).off('click', '#goods_buy').on("click", "#goods_buy", function () {
            goods.buy(this);
        });
        $(document).on("click", ".popup-overlay", function () {
            $.closeModal("#goodsRule");
            $("#goTo-buy").removeAttr('disabled')
        });
        $(document).on("click", ".close-goodsRule", function () {
            $.closeModal("#goodsRule");
            $("#goTo-buy").removeAttr('disabled')
        });
        $(document).on("click", ".close-popup", function () {
            $.closeModal(".popup-goodsSimilar");
            $("#goTo-buyMore").removeAttr('disabled')
        });
    });
    /*
    推荐类似商品
    */
    $(document).on("pageInit", "#goodsRecommend", function (e, pageId, $page) {
        app.getTplData("goodsRecommend", "script#goodsRecommend_tpl", "#goodsRecommend_tpl_data");
        //加载推荐商品
        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            if (loading) return;
            loading = true;
            setTimeout(function () {
                loading = false;
                var pageNo = $("#page-val").attr('data-pageNo');
                var pageSize = $("#page-val").attr('data-pageSize');
                var pageLast = $("#page-val").attr('data-pageLast');
                if (parseInt(pageNo) >= parseInt(pageLast)) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').html("<p class='preloader-noDate'>没有更多商品了</p>");
                    return;
                }
                app.getPageData("goodsRecommendMore", "#moreGoods_tpl", ".category-goods-list", parseInt(pageNo) + 1, parseInt(pageSize));
                $.refreshScroller();
            }, 1000);
        });
    });

    /*
        分享商品详情
    */
    $(document).on("pageInit", "#goodsDesShare", function (e, pageId, $page) {
        //商品数据调取
        removeBackSui.popupAddress();
        removeBackSui.toastAlert();
        app.getTplData("goodsDesShare", "script#goodsDesShare_tpl", "#goodsDesShare_tpl_data", function () {
            //商品头图
            var from = $.fn.cookie('from');
            var location = window.location.href;
            var orgChannel = app.getUrlKey("orgChannel", location);
            var phy = app.getUrlKey("phy", location);
            $.fn.cookieClearAll();
            if (from != null) {
                $.fn.cookie('from', from, { expires: 7, path: '/' });
            }
            if (orgChannel != null) {
                $.fn.cookie('orgChannel', orgChannel, { expires: 7, path: '/' });
            }
            if (phy != null) {
                $.fn.cookie('phy', phy, { expires: 7, path: '/' });
            }
            app.initSwiperImg("#goodsDes_swiper .swiper-wrapper img", 2);
            $(".swiper-container-goodsDes").swiper({
                pagination: '.swiper-pagination-goodsDes',
                lazyLoading: true,
                loop: false,
                spaceBetween: 10,
                freeMode: false,
                //autoplay : 5000,
                onInit: function (swiper) {
                    var len = swiper.slides.length;
                    if (len == 1) {
                        $(".swiper-pagination-goodsDes").hide();
                    }
                }
            });
            //详情图预览
            //微信JSDK
            if ($.device.isWeixin) {
                $(document).off("click", ".pic-view").on("click", ".pic-view", function () {
                    var imgSrc = $(this).attr("src");
                    var arr = [];
                    $('.pic-view').each(function () {
                        arr.push($(this).attr('src'));
                    })
                    wx.previewImage({
                        current: imgSrc,
                        urls: arr
                    });
                });
            } else {
                //详情图预览
                $(document).off("click", ".pic-view").on("click", ".pic-view", function () {
                    $("#imgzoom-item").attr("src", $(this).attr("src"));
                    $("#imgzoom-x").show();
                    $("#imgzoom-pack").show();
                });
                ImagesZoom.init({
                    "elem": ".pic-view-box"
                });
            }
            //判断分享跳转首页跳转
            $(document).off("click", "#backHome").on("click", "#backHome", function () {
                var location = window.location.href;
                var orgChannel = $.fn.cookie('orgChannel') ? $.fn.cookie('orgChannel') : app.getUrlKey("orgChannel", location);
                if (orgChannel == "") {
                    $.fn.cookie('orgChannel', "", { expires: -1 });
                    window.location.href = "index.html"
                } else {
                    $.fn.cookie('orgChannel', orgChannel, { expires: 7 });
                    window.location.href = "org.index.html?orgChannel=" + orgChannel
                }

            });
            //商品抢购提示
            if ($(".countTime").size() > 0) {
                app.countTime(".countTime");
            }
            //健康卡商品进APPIM
            $(document).off("click", "#goToIm").on("click", "#goToIm", function () {
                var serviceId = $(this).attr("data-serviceId");
                if (typeof window.ciyun != "undefined" && typeof window.ciyun.isInApp != "undefined") {
                    if (window.ciyun.isLogin()) {
                        openImChat(serviceId,"0","0");
                    } else {
                        window.ciyun.clickFromJs("1");
                    }
                } else if (typeof isInApp != "undefined" && typeof (isInApp) == "function") {
                    isLogin();
                    $.fn.cookie('serviceId', serviceId, { expires: 7 });
                }
            });
        });
        //商品规格    
        $(document).off('click', '#goTo-buy').on('click', '#goTo-buy', function () {
            $(this).attr('disabled', 'disabled');
            $.popup('#goodsRule');
            app.getTplData("goodsRule", "script#goodsRule_tpl", "#goodsRule", function () {
                shopCart.priceInit(".goodsRule_lab_price");
            });
            $(document).off('change', '.goodsRule_lab_price').on("change", ".goodsRule_lab_price", function () {
                shopCart.priceInit(this);
            });
        });
        //商品数量计算
        $(document).off('click', '.account-reduce').on("click", ".account-reduce", function () {
            setAmount.reduce('#pamount');
        });
        //商品数量计算
        $(document).off('click', '.account-add').on("click", ".account-add", function () {
            setAmount.add('#pamount');
        });
        $(document).off('click', '#goods_buy').on("click", "#goods_buy", function () {
            goods.buy(this);
        });
        $(document).on("click", ".popup-overlay", function () {
            $.closeModal("#goodsRule");
            $("#goTo-buy").removeAttr('disabled')
        });
        $(document).on("click", ".close-goodsRule", function () {
            $.closeModal("#goodsRule");
            $("#goTo-buy").removeAttr('disabled')
        });
        $(".content").on("scroll", function () {
            var top = $(this).scrollTop();
            if (top > 300) {
                $("#page-goToUp").show()
            } else {
                $("#page-goToUp").hide()
            }
        });
        $(document).on("click", "#page-goToUp", function () {
            $(".content").scrollTop(0);
        });

    });

    /*
        发票信息
    */
    $(document).on("pageInit", "#bill", function (e, pageId, $page) {
        //发票数据调取

        app.getTplData("bill", "script#bill_tpl", "#bill_tpl_data");
        //判断是否选择发票
        $(document).off("change", "#switchBill").on("change", "#switchBill", function () {
            bill.typeSwitch(this);
        });
        //发票内容判断
        $(document).off("change", ".app-radio-bill").on("change", ".app-radio-bill", function () {
            bill.type(this);
        });
        //保存发票
        $(document).off("click", "#bill-save").on("click", "#bill-save", function () {
            bill.saveData();
        });
    });

    /*
        收货地址列表 编辑 删除
    */
    $(document).on("pageInit", "#addressList", function (e, pageId, $page) {
        //收货地址列表
        app.getTplData("addressList", "script#addressList_tpl", "#addressList_tpl_data", function () {
            address.urlGo("form", "order");
        });
        //设置默认地址
        $(document).off("click", ".setDefaultAddress").on("click", ".setDefaultAddress", function () {
            var addressId = $(this).attr("data-addressId");
            address.setDefaultAddrss(addressId);
        });
        //删除地址
        $(document).off("click", ".delAddress").on("click", ".delAddress", function () {
            var id = $(this).attr("data-id");
            address.delAddess(id);
        });
        //设定订单地址
        $(document).off("click", ".setOrderAddress").on("click", ".setOrderAddress", function () {
            var id = $(this).attr("data-id");
            address.setOrderAddrss(id);
        });
        //编辑新增地址
        $(document).off('click', '.addressList-opr').on('click', '.addressList-opr', function () {
            var addressId = $(this).attr("data-id");
            if (addressId) {
                $.fn.cookie('addressId', addressId, { expires: 7 });
            } else {
                $.fn.cookie('addressId', '0', { expires: 7 });
            }
            $.popup('.popup-address');
            //收货地址数据调取
            app.getTplData("getAddressById", "script#goodsAddressOpr_tpl", "#goodsAddressOpr_tpl_data", function () {
                address.initAddressCity();
            });
            //省市联动
            $(document).off("change", "#userProvince").on("change", "#userProvince", function () {
                app.loadChildArea(this, '#userCity', 1);
            });
            $(document).off("change", "#userCity").on("change", "#userCity", function () {
                app.loadChildArea(this, '#userArea', 2);
            });
            //是否默认地址
            $(document).off("change", "#userAddressDefault").on("change", "#userAddressDefault", function () {
                address.isDefaultAddrss(this);
            });
            //保存地址
            $(document).off("click", "#address-save").on("click", "#address-save", function () {
                address.saveDataUrl(this);
            });
        });
    });

    /*
        订单代金券
    */
    $(document).on("pageInit", "#couponList", function (e, pageId, $page) {

        app.getTplData("couponsList", "script#goodsCoupon_tpl", "#goodsCoupon_tpl_data");
        //新增代金券
        $(document).off("click", "#coupon-save").on("click", "#coupon-save", function () {
            coupon.saveDataUrl(this);
        });
        //设定订单代金券
        $(document).off("click", ".setOrderCoupon").on("click", ".setOrderCoupon", function () {
            var id = $(this).attr("data-id");
            var disabled = $(this).attr("data-disabled");
            if (disabled === 'false') {
                coupon.setOrderCoupon(id);
            }
        });
    });
    /*
        我的代金券
    */
    $(document).on("pageInit", "#couponMyself", function (e, pageId, $page) {
        removeBackSui.toastAlert();
        app.getTplData("couponsMyself", "script#couponMyself_tpl", "#couponMyself_tpl_data", function () {
            if ($.device.isWeixin) {
                $("#page-appDown").show();
            } else {
                $("#page-appDown").remove();
                $(".bar-tab ~ #page-appDown-coupon.content").css("top", 0);
            }
            var orgChannel = app.getUrlKey("orgChannel");
            if (orgChannel == "") {
                // $.fn.cookie('orgChannel', "", { expires: -1});
            } else {
                $.fn.cookie('orgChannel', orgChannel, { expires: 7 });
            }
        });
        //新增代金券
        $(document).off("click", "#coupon-save").on("click", "#coupon-save", function () {
            coupon.saveDataUrl(this);
        });
    });
    /*
        过期代金券
    */
    $(document).on("pageInit", "#couponExpire", function (e, pageId, $page) {

        app.getTplData("couponsExpire", "script#couponExpire_tpl", "#couponExpire_tpl_data");
    });
    /*
        健康卡代金券
    */
    $(document).on("pageInit", "#healthCardCoupon", function (e, pageId, $page) {

        app.getTplData("healthCardCoupon", "script#healthCardCoupon_tpl", "#healthCardCoupon_tpl_data");
    });
    /*
        代金券商品
    */
    $(document).on("pageInit", "#couponGoods", function (e, pageId, $page) {
        //分类商品
        removeBackSui.toastAlert();
        app.getTplData("couponGoods", "script#couponGoods_tpl", "#couponGoods_tpl_data");
        var couponId = app.getUrlKey("couponId");
        $.fn.cookie('couponId', couponId, { expires: 7 });
        //加载代金券商品数据
        $(document).on("infinite", "#couponGoods_tpl_data", function () {
            if (loading) return;
            loading = true;
            setTimeout(function () {
                loading = false;
                var pageNo = $("#page-val").attr('data-pageNo');
                var pageSize = $("#page-val").attr('data-pageSize');
                var pageLast = $("#page-val").attr('data-pageLast');
                if (parseInt(pageNo) >= parseInt(pageLast)) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').html("<p class='preloader-noDate'>没有更多商品了</p>");
                    return;
                }
                app.getPageData("couponGoodsMore", "#couponGoodsMore_tpl", ".category-list", parseInt(pageNo) + 1, parseInt(pageSize));
                $.refreshScroller();
            }, 1000);
        });
    });
    /*
        订单确认
    */
    $(document).on("pageInit", "#confirmOrder", function (e, pageId, $page) {
        //订单数据调取
        removeBackSui.toastAlert();
        var phy = app.getUrlKey("phy");
        $.fn.cookie("orderId", "", { expires: -1 });
        app.getTplData("orderConfirm", "script#confirmOrder_tpl", "#confirmOrder_tpl_data", function () {
            var addressId = $("#hide-addressId").val();
            var couponId = $("#hide-couponId").val();
            var invoiceId = $("#hide-invoiceId").val();

            var price = $("#hide-price").val();
            var point = $("#hide-point").val();
            var number = $("#hide-number").val();
            if (phy == "" || phy == null) {
                var goodsId = $("#hide-goodsId").val();
                $.fn.cookie('goodsId', goodsId, { expires: 7 });
            } else {
                //如果是从预约进来的
                var goodsId = app.getUrlKey("goodsId");
                $.fn.cookie("goodsId", goodsId, { expires: 7 });
                $.fn.cookie("phy", phy, { expires: 7 });
            }
            $.fn.cookie('addressId', addressId, { expires: 7 });
            $.fn.cookie('couponId', couponId, { expires: 7 });
            $.fn.cookie('invoiceId', invoiceId, { expires: 7 });
            $.fn.cookie('price', price, { expires: 7 });
            $.fn.cookie('point', point, { expires: 7 });
            $.fn.cookie('num', number, { expires: 7 });
        });
        //地址定位
        address.urlSet("form", "order");
        //新增地址
        $(document).off('click', '.addressList-opr').on('click', '.addressList-opr', function () {
            var addressId = $(this).attr("data-id");
            if (addressId) {
                $.fn.cookie('addressId', addressId, { expires: 7 });
            } else {
                $.fn.cookie('addressId', '0', { expires: 7 });
            }

            $.popup('.popup-address');
            //收货地址数据调取
            app.getTplData("getAddressById", "script#goodsAddressOpr_tpl", "#goodsAddressOpr_tpl_data", function () {
                address.initAddressCity();
            });
            //省市联动
            $(document).off("change", "#userProvince").on("change", "#userProvince", function () {
                app.loadChildArea(this, '#userCity', 1);
            });
            $(document).off("change", "#userCity").on("change", "#userCity", function () {
                app.loadChildArea(this, '#userArea', 2);
            });
            //是否默认地址
            $(document).off("change", "#userAddressDefault").on("change", "#userAddressDefault", function () {
                address.isDefaultAddrss(this);
            });
            //保存地址
            $(document).off("click", "#order-address-save").on("click", "#order-address-save", function () {
                address.saveDataUrl(this);
            });
        });
        $(document).off('click', '#goTo-order').on('click', '#goTo-order', function () {
            order.saveDataUrl(this);
        });
    });

    /*
        提交订单 支付界面
    */
    $(document).on("pageInit", "#orderPay", function (e, pageId, $page) {
        //订单数据调取
        app.getTplData("orderPay", "script#orderPay_tpl", "#orderPay_tpl_data");
        //订单支付跳转
        if (window.history && window.history.pushState) {

    $(window).on('popstate', function() {

      window.history.go(-2);
    });

    window.history.pushState('goods', null, window.location.href);
  }
        //支付      
        $(document).off("click", ".shop-pay-order").on("click", ".shop-pay-order", function () {
            var type = $(this).attr("data-type");
            pay.order(type, this)
        });
    });

    /*
        体检预约 支付界面
    */
    $(document).on("pageInit", "#orderPhyPay", function (e, pageId, $page) {
        //订单数据调取
        app.getTplData("orderPhyPay", "script#orderPhyPay_tpl", "#orderPhyPay_tpl_data", function () {
            var phy = app.getUrlKey("phy", window.location.href);
            if (phy == "" || phy == null) {
                //购买支付
            } else {
                //预约记录
                $.fn.cookie('phy', phy, { expires: 7 });
            }
        });
        //支付      
        $(document).off("click", ".shop-pay-order").on("click", ".shop-pay-order", function () {
            var type = $(this).attr("data-type");
            pay.order(type, this)
        });
    });



    /*
        我的订单 全部
    */
    $(document).on("pageInit", "#orderList", function (e, pageId, $page) {
        //收货地址数据调取
        $.closeModal('.modal-orderPayCallBackError');
        $.closeModal('.modal-orderPayCallBackOrder');
        app.getTplData("orderList", "script#orderList_tpl", "#orderList_tpl_data", function () {
            var payingCount = $("#payingCount").val();
            if (payingCount == 0) {
                $("#badge").remove();
            } else {
                $("#badge").html(payingCount);
            }
        });
        //取消订单
        $(document).off('click', '.cancel-order').on('click', '.cancel-order', function () {
            var id = $(this).attr("data-id");
            order.cancel(id);
        });
        //删除订单
        $(document).off('click', '.delete-order').on('click', '.delete-order', function () {
            var id = $(this).attr("data-id");
            order.delete(id);
        });
        //加载更多订单
        $(document).on("infinite", "#orderList_tpl_data", function () {
            if (loading) return;
            loading = true;
            setTimeout(function () {
                loading = false;
                var pageNo = $("#page-val").attr('data-pageNo');
                var pageSize = $("#page-val").attr('data-pageSize');
                var pageLast = $("#page-val").attr('data-pageLast');
                if (parseInt(pageNo) >= parseInt(pageLast)) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.order-scroll-preloader').html("<p class='preloader-noDate'>没有更多订单了</p>");
                    return;
                }
                app.getPageData("orderListMore", "#orderListMore_tpl", ".order-content", parseInt(pageNo) + 1, parseInt(pageSize));
                $.refreshScroller();
            }, 1000);
        });
    });

    /*
        我的订单 待付款
    */
    $(document).on("pageInit", "#orderListPaying", function (e, pageId, $page) {
        //收货地址数据调取
        $.closeModal('.modal-orderPayCallBackError');
        $.closeModal('.modal-orderPayCallBackOrder');
        app.getTplData("orderListPaying", "script#orderListPaying_tpl", "#orderListPaying_tpl_data", function () {
            var payingCount = $("#payingCount").val();
            if (payingCount == 0) {
                $("#badge").remove();
            } else {
                $("#badge").html(payingCount);
            }
        });
        //取消订单
        $(document).off('click', '.cancel-order').on('click', '.cancel-order', function () {
            var id = $(this).attr("data-id");
            order.cancel(id);
        });
        //加载更多订单
        $(document).on("infinite", "#orderListPaying_tpl_data", function () {
            if (loading) return;
            loading = true;
            setTimeout(function () {
                loading = false;
                var pageNo = $("#page-val").attr('data-pageNo');
                var pageSize = $("#page-val").attr('data-pageSize');
                var pageLast = $("#page-val").attr('data-pageLast');
                if (parseInt(pageNo) >= parseInt(pageLast)) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.order-scroll-preloader').html("<p class='preloader-noDate'>没有更多订单了</p>");
                    return;
                }
                app.getPageData("orderListMore", "#orderListMore_tpl", ".order-content", parseInt(pageNo) + 1, parseInt(pageSize));
                $.refreshScroller();
            }, 1000);
        });
    });

    /*
        我的订单 已付款
    */
    $(document).on("pageInit", "#orderListPayed", function (e, pageId, $page) {
        //收货地址数据调取
        $.closeModal('.modal-orderPayCallBackError');
        $.closeModal('.modal-orderPayCallBackOrder');
        app.getTplData("orderListPayed", "script#orderListPayed_tpl", "#orderListPayed_tpl_data", function () {
            var payingCount = $("#payingCount").val();
            if (payingCount == 0) {
                $("#badge").remove();
            } else {
                $("#badge").html(payingCount);
            }
        });
        //加载更多订单
        $(document).on("infinite", "#orderListPayed_tpl_data", function () {
            if (loading) return;
            loading = true;
            setTimeout(function () {
                loading = false;
                var pageNo = $("#page-val").attr('data-pageNo');
                var pageSize = $("#page-val").attr('data-pageSize');
                var pageLast = $("#page-val").attr('data-pageLast');
                if (parseInt(pageNo) >= parseInt(pageLast)) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.order-scroll-preloader').html("<p class='preloader-noDate'>没有更多订单了</p>");
                    return;
                }
                app.getPageData("orderListMore", "#orderListMore_tpl", ".order-content", parseInt(pageNo) + 1, parseInt(pageSize));
                $.refreshScroller();
            }, 1000);
        });
    });

    /*
        我的订单 已完成
    */
    $(document).on("pageInit", "#orderListDone", function (e, pageId, $page) {
        //收货地址数据调取
        $.closeModal('.modal-orderPayCallBackError');
        $.closeModal('.modal-orderPayCallBackOrder');
        app.getTplData("orderListDone", "script#orderListDone_tpl", "#orderListDone_tpl_data", function () {
            var payingCount = $("#payingCount").val();
            if (payingCount == 0) {
                $("#badge").remove();
            } else {
                $("#badge").html(payingCount);
            }
        });
        //加载更多订单
        $(document).on("infinite", "#orderListDone_tpl_data", function () {
            if (loading) return;
            loading = true;
            setTimeout(function () {
                loading = false;
                var pageNo = $("#page-val").attr('data-pageNo');
                var pageSize = $("#page-val").attr('data-pageSize');
                var pageLast = $("#page-val").attr('data-pageLast');
                if (parseInt(pageNo) >= parseInt(pageLast)) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.order-scroll-preloader').html("<p class='preloader-noDate'>没有更多订单了</p>");
                    return;
                }
                app.getPageData("orderListMore", "#orderListMore_tpl", ".order-content", parseInt(pageNo) + 1, parseInt(pageSize));
                $.refreshScroller();
            }, 1000);
        });
    });

    /*
        我的订单 已取消
    */
    $(document).on("pageInit", "#orderListCancel", function (e, pageId, $page) {
        //收货地址数据调取
        $.closeModal('.modal-orderPayCallBackError');
        $.closeModal('.modal-orderPayCallBackOrder');
        app.getTplData("orderListCancel", "script#orderListCancel_tpl", "#orderListCancel_tpl_data", function () {
            var payingCount = $("#payingCount").val();
            if (payingCount == 0) {
                $("#badge").remove();
            } else {
                $("#badge").html(payingCount);
            }
        });
        //删除订单
        $(document).off('click', '.delete-order').on('click', '.delete-order', function () {
            var id = $(this).attr("data-id");
            order.delete(id);
        });
        //加载更多订单
        $(document).on("infinite", "#orderListCancel_tpl_data", function () {
            if (loading) return;
            loading = true;
            setTimeout(function () {
                loading = false;
                var pageNo = $("#page-val").attr('data-pageNo');
                var pageSize = $("#page-val").attr('data-pageSize');
                var pageLast = $("#page-val").attr('data-pageLast');
                if (parseInt(pageNo) >= parseInt(pageLast)) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.order-scroll-preloader').html("<p class='preloader-noDate'>没有更多订单了</p>");
                    return;
                }
                app.getPageData("orderListMore", "#orderListMore_tpl", ".order-content", parseInt(pageNo) + 1, parseInt(pageSize));
                $.refreshScroller();
            }, 1000);
        });
    });

    /*
        我的订单 - 订单详情
    */
    $(document).on("pageInit", "#orderDes", function (e, pageId, $page) {
        //订单数据调取
        app.getTplData("orderDes", "script#orderDes_tpl", "#orderDes_tpl_data", function () {
            //$.fn.cookieClearAll();
            var dom = $(".refund-btn");
            var services_btn = $(".artificial-services-btn");

            var state = dom.attr('data-state'); //订单状态
            var isYaoFang = app.strTobool($("#hide-yaofang").val()); //判断药房网订单
            var activated = app.strTobool(dom.attr('data-activated')); //是否是虚拟商品且已激活
            if (activated) {
                dom.hide();
            }
            if (isYaoFang) {
                dom.hide(); services_btn.hide();
            }
            switch (state) {
                case "1": dom.hide(); services_btn.hide();//未发货
                    break;
                case "3": dom.hide(); //已发货
                    break;
                case "6": dom.html("退款中"); dom.addClass('active'); dom.show();
                    break;
                case "7": dom.html("退款成功"); dom.addClass('refunded'); dom.show();
                    break;
                default: dom.html("申请退款");
            }
        });
        //积分支付
        $(document).off("click", "#app-btn-pointpay").on("click", "#app-btn-pointpay", function () {
            var type = $(this).attr("data-type");
            pay.order("point", this)
        });
        //支付      
        $(document).off("click", ".shop-pay-order").on("click", ".shop-pay-order", function () {
            var type = $(this).attr("data-type");
            pay.order(type, this)
        });
        //激活健康卡
        $(document).off('click', '.healthCard-activate').on('click', '.healthCard-activate', function () {
            var id = $(this).attr("data-id");
            var cardid = $(this).attr("data-cardid");
            healthCardId.activate(id, cardid);
        });
        //申请退款
        $(document).off('click', '.refund-btn').on('click', '.refund-btn', function () {
            var addres;
            if ($(".refund-btn").hasClass('active') || $(".refund-btn").hasClass('refunded')) {
                addres = 'see.refund.html?orderId=';
            } else {
                addres = 'refund.apply.html?orderId=';
            }
            window.location.href = addres + $("#hide-orderId").val();
        });
        //人工服务
        $(document).off('click', '.artificial-services-btn').on('click', '.artificial-services-btn', function () {
            var applyState = $("#applyState").val();
            var orderId = $("#hide-orderId").val();
            var afterSaleApplyId = $("#afterSaleApplyId").val();
            var url;
            if (applyState == '0') {
                url = 'see.server.html?orderId=' + orderId + "&afterSaleApplyId=" + afterSaleApplyId;
            } else {
                url = 'server.apply.html?orderId=' + orderId;
            }
            window.location.href = url;
        });
    });

    //用户中心
    $(document).on("pageInit", "#userCenter", function (e, pageId, $page) {
        //订单数据调取
        removeBackSui.toastAlert();
        app.getTplData("userCenter", "script#userCenter_tpl", "#userCenter_tpl_data", function () {
            var payingCount = $("#payingCount").val();
            if (payingCount == 0) {
                $(".arr-bage").hide()
            } else {
                $(".arr-bage").show()
            }
        });
    });
    var refund_server = {};//退款 售后 人工客服
    refund_server.submit = function (o, type) {
        var textareaval = $('.text-warrper textarea').val();
        var textarealen = textareaval.length;
        if (textarealen == 0 || textarealen > 300) {
            app.miniAlert('填写申请原因');
            return false;
        }
        var tel = $("#tel").val();
        if (app.chkTel(tel)) {
            app.miniAlert('请填写联系方式');
            return false;
        }
        var orderId = app.getUrlKey("orderId");
        var url;
        switch (type) {
            case "refundApply": datas = JSON.stringify({
                "uri": "/order/refund/apply",
                "requestBody": {
                    "orderId": $.fn.cookie('orderId') ? $.fn.cookie('orderId') : app.getUrlKey("orderId"),
                    "reason": textareaval,
                    "mobile": tel
                }

            }); url = "see.refund.html?orderId=" + app.getUrlKey("orderId");
                break;
            case "serverApply": datas = JSON.stringify({
                "uri": "/order/after/apply",
                "requestBody": {
                    "orderId": $.fn.cookie('orderId') ? $.fn.cookie('orderId') : app.getUrlKey("orderId"),
                    "reason": textareaval,
                    "mobile": tel
                }

            }); url = "see.server.html?orderId=" + app.getUrlKey("orderId");
                break;
            case "changeRefundApply": datas = JSON.stringify({
                "uri": "/order/refund/modify",
                "requestBody": {
                    "orderId": $.fn.cookie('orderId') ? $.fn.cookie('orderId') : app.getUrlKey("orderId"),
                    "reason": textareaval,
                    "mobile": tel
                }
            }); url = "see.refund.html?orderId=" + app.getUrlKey("orderId");
                break;
            case "changeServerApply": datas = JSON.stringify({
                "uri": "/order/after/modify",
                "requestBody": {
                    "orderId": $.fn.cookie('orderId') ? $.fn.cookie('orderId') : app.getUrlKey("orderId"),
                    "reason": textareaval,
                    "mobile": tel,
                    "afterSaleApplyId": app.getUrlKey("afterSaleApplyId")
                }
            }); url = "see.server.html?orderId=" + app.getUrlKey("orderId") + "&afterSaleApplyId=" + app.getUrlKey("afterSaleApplyId");
                break;
        }


        $.ajax({
            type: 'POST',
            url: app.api,
            dataType: 'json',
            data: datas,
            contentType: 'application/json',
            timeout: 30000,
            beforeSend: function () {
                $.showIndicator();
                $("#submit_btn").attr('disabled', 'disabled');
            },
            success: function (data) {
                if (data.retCode == 0) {
                    $.hideIndicator();
                    if (data.item) {
                        url = url + "&afterSaleApplyId=" + data.item;
                    }
                    app.miniAlert("提交成功", function () {
                        history.replaceState({}, "order_des", 'order.des.html?orderId=' + app.getUrlKey("orderId"));
                        window.location.href = url;
                    });
                } else {
                    $.hideIndicator();
                    app.miniAlert(data.msg, function () {
                        window.location.href = 'order.des.html?orderId=' + app.getUrlKey("orderId");
                        $("#submit_btn").removeAttr('disabled');
                    });
                }
            }
        });
    }
    refund_server.testareaNum=function(){//textarea计数
        var chnIpt = false ;
            $(document).off('focus', 'textarea').on('focus', "textarea", function () {
                refund_server.jishu();
            });
             $(document).off('keyup', 'textarea').on('keyup', "textarea", function () {
                 refund_server.jishu();
            });
            $(document).off('paste', 'textarea').on('paste', "textarea", function () {
               setTimeout(function(){
                    refund_server.jishu();
               },50)
               
            });
    }
    refund_server.jishu = function(){
        var val = $("textarea").val();
        var len = val.length;
        if(len>300){
            len = 300;
            val = val.substr(0,300);
            $("textarea").val(val);

        }
        $('.change-size').text(len);
        console.log(len);
    }
    //退款申请页面
    $(document).on("pageInit", "#refundApply", function (e, pageId, $page) {
        //订单数据调取
        removeBackSui.toastAlert();
        app.getTplData("refundApply", "script#refundApply_tpl", "#refundApply_tpl_data", function () {
            refund_server.testareaNum();
            $(document).off('click', '#submit_btn').on('click', "#submit_btn", function () {

                refund_server.submit($(this), 'refundApply');
            });
        });
    });
    //申请售后服务
    $(document).on("pageInit", "#serverApply", function (e, pageId, $page) {

        removeBackSui.toastAlert();
        app.getTplData("serverApply", "script#serverApply_tpl", "#serverApply_tpl_data", function () {
            
            refund_server.testareaNum();
            

            $(document).off('click', '#submit_btn').on('click', "#submit_btn", function () {
                var afterSaleApplyId = app.getUrlKey("afterSaleApplyId");
                if (afterSaleApplyId) {
                    refund_server.submit($(this), 'changeServerApply');
                } else {
                    refund_server.submit($(this), 'serverApply');
                }


            });
        });
    });
    //查看售后界面
    $(document).on("pageInit", "#seeServer", function (e, pageId, $page) {
        //订单数据调取
        removeBackSui.toastAlert();
        app.getTplData("seeServer", "script#seeServer_tpl", "#seeServer_tpl_data", function () {
            $(document).on('click', ".change-apply-btn", function () {
                window.location.href = 'server.apply.html?orderId=' + app.getUrlKey("orderId") + "&afterSaleApplyId=" + app.getUrlKey("afterSaleApplyId");
                $(document).off('click', '.change-apply-btn');
            });
        });
    });
    //查看退款界面
    $(document).on("pageInit", "#seeRefund", function (e, pageId, $page) {
        //订单数据调取
        removeBackSui.toastAlert();
        app.getTplData("seeRefund", "script#seeRefund_tpl", "#seeRefund_tpl_data", function () {
            $(document).on('click', ".change-apply-btn", function () {
                window.location.href = 'changeRefundApply.html?orderId=' + app.getUrlKey("orderId");
                $(document).off('click', '.change-apply-btn');
            });
        });
    });
    //修改退款申请界面
    $(document).on("pageInit", "#changeRefundApply", function (e, pageId, $page) {
        //订单数据调取
        removeBackSui.toastAlert();
        app.getTplData("changeRefundApply", "script#changeRefundApply_tpl", "#changeRefundApply_tpl_data", function () {
            refund_server.testareaNum();
            $(document).off('click', '#submit_btn').on('click', "#submit_btn", function () {
                refund_server.submit($(this), 'changeRefundApply');
            });
        });
    });
    //查看售后历史界面
    $(document).on("pageInit", "#serverHistory", function (e, pageId, $page) {
        //订单数据调取
        removeBackSui.toastAlert();
        app.getTplData("serverHistory", "script#serverHistory_tpl", "#serverHistory_tpl_data", function () {
        });
    });
    /*
        机构首页
    */
    $(document).on("pageInit", "#homeOrg", function (e, pageId, $page) {
    	var indexPageInitFlag =$("#indexPageInitFlag");
    	
    	if(indexPageInitFlag.val()=='true'){
    		return;
    	}
    	indexPageInitFlag.val("true");
    	
        //默认首页数据
        removeBackSui.popup();
        app.getTplData("indexOrg", "script#homeOrg_tpl", "#homeOrg_tpl_data", function () {
            //头图
            app.initSwiperImg(".swiper-wrapper-home img", 3);
            $(".swiper-container-home").swiper({
                pagination: '.swiper-pagination-home',
                lazyLoading: true,
                //loop:true,
                autoplay: 5000,
                spaceBetween: 10,
                onInit: function (swiper) {
                    app.initSwiperImg(".swiper-slide", 3);
                    app.initSwiperImg(".swiper-container-home img", 3);
                    var len = swiper.slides.length;
                    if (len == 1) {
                        $(".swiper-pagination-home").hide();
                    }
                }
            });
            if ($.device.isWeixin) {
                $("#page-appDown").show();
            } else {
                $("#page-appDown").remove();
            }
            var payingCount = $("#payingCount").val();
            if (payingCount == 0) {
                $(".bage").hide()
            } else {
                $(".bage").show()
            }
            var isOrgExit = $("#isOrgExit").val();
            if (isOrgExit == "false") {
                $("#wx-bar-tab,#page-appDown,#home_swiper").remove();
            }

            var orgChannel = app.getUrlKey("orgChannel");
            if (orgChannel == "") {
                //$.fn.cookie('orgChannel', "", { expires: -1, path:'/',domain:document.domain});
                $.fn.cookie('orgChannel', "", { expires: -1 });
            } else {
                $.fn.cookie('orgChannel', orgChannel, { expires: 7 });
                //$.fn.cookie('orgChannel', orgChannel, { expires: 7, path:'/',domain:document.domain});
            }
           
            orgTjtc.load();

        });
        
        //加载商品数据
        $(document).on("infinite", "#homeOrg_tpl_data", function () {
            //判断 如果体检套餐滑动，不加载数据
        	if($("div.tabs > #tab2").hasClass("active")){
        		return;
        	}
            if (loading) return;
            loading = true;
            setTimeout(function () {
                loading = false;
                var pageNo = $("#page-val").attr('data-pageNo');
                var pageSize = $("#page-val").attr('data-pageSize');
                var pageLast = $("#page-val").attr('data-pageLast');
                if (parseInt(pageNo) >= parseInt(pageLast)) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').html("<p class='preloader-noDate'>没有更多商品了</p>");
                    return;
                }
                app.getPageData("indexMore", "#moreGoods_tpl", ".category-goods-list", parseInt(pageNo) + 1, parseInt(pageSize));
                $.refreshScroller();
            }, 1000);
        });
        //刷新首页
        $(document).on('refresh', '#homeOrg_tpl_data', function (e) {
            setTimeout(function () {
                app.getTplData("indexOrg", "script#homeOrg_tpl", "#homeOrg_tpl_data", function () {
                    //头图
                    app.initSwiperImg(".swiper-wrapper-home img", 3);
                    $(".swiper-container-home").swiper({
                        pagination: '.swiper-pagination-home',
                        lazyLoading: true,
                        //loop:true,
                        autoplay: 5000,
                        spaceBetween: 10,
                        onInit: function (swiper) {
                            app.initSwiperImg(".swiper-slide", 3);
                            app.initSwiperImg(".swiper-container-home img", 3);
                            var len = swiper.slides.length;
                            if (len == 1) {
                                $(".swiper-pagination-home").hide();
                            }
                        }
                    });
                	orgTjtc.load();
                    var payingCount = $("#payingCount").val();
                    if (payingCount == 0) {
                        $(".bage").hide()
                    } else {
                        $(".bage").show()
                    }
                });
                // 加载完毕需要重置
                $.pullToRefreshDone('#homeOrg_tpl_data');
            }, 1000);
        });
        //跳转路由添加
        $(document).on('click', "div[data-href]", function () {
            $.router.load($(this).attr("data-href"));

            return false;
        });
        $.fn.cookieClearAll();
    });
    $(function () {
        setTimeout(function () {
            $.init();
        }, 50);
    });
});

var orgTjtc ={
		load:function(){
			 	var datas = JSON.stringify({
	                "hmoId": $("#hidehomoId").val()||"",
	                "shopFlag": "1"
	            });
	            var template = $("#tjtcGoods_tpl").html();
	            var compiledTemplate = Template7.compile(template);
	            $.ajax({
	                type: 'POST',
	                url: app.orghost,
	                dataType: 'json',
	                data: datas,
	                contentType: 'application/json',
	                timeout: 30000,
	                beforeSend: function () {
	                    //app.getAppPersonId();
	                },
	                success:function(res){
	                	
	                    if(res.code == 0 && res.result.list.length>0){
	                        var htmlStr = compiledTemplate(res.result);
	                        $(".tjtc-goods-list").html(htmlStr);
	                        if ($("img.lazy").length > 0) {
	                            $("img.lazy").lazyload({
	                                threshold: 5,
	                                event: "load",
	                                container: $(".content")
	                            })
	                        }
	                    }
//	                    console.log(res);
	                },
	                error:function(res){
//	                    console.log(res);
	                },
	                complete:function(xhr,str){
	                	orgTjtc.tabShow();
	                }
	            })
			
		},
		tabShow:function(){
			//体检套餐的数据请求目前是在 机构商品请求后在发起请求
			var orgGoodsLen=$(".category-goods-list > li").length;
			var tjtcLen=$(".tjtc-goods-list > li").length;
			if(orgGoodsLen>0 && tjtcLen>0){
				$("#tabs_wrap").show();
			}
			if(orgGoodsLen == 0 && tjtcLen>0){
				$("#tab1")[0].style.display="none";
				$("#tab2")[0].style.display="block";
			}
			
		}
}


