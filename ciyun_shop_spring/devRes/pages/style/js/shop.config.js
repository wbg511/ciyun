(function (win, doc) {
    //接口地址配置
    var regEx = {
        Strs: /^[\u0391-\uFFE5\w]+$/, //中文字、英文字母、数字和下划线
        Tel: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,//更新最新手机验证
        SpecialWord: /^[`\\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:\"\<\>\?\/\.\,\;\'\[\]\\]+$/,//检查特殊字符
    };
    var ishttps = (("https:" == document.location.protocol) ? " https://" : " http://");
    var host=ishttps +"devnewshop.love-health.com.cn";//devnewshop.love-health.com.cn
    var wxhost=ishttps +"centrinwx.love-health.com.cn";
    var orghost = ishttps + "devinspection.love-health.com.cn/api/insp/shop/packageList";//配置文件正式环境记得修改
    var app = {
        version:"3.5.4",//升级请修改
        wxShareMpNum:"gh_562de0d8efee",//慈云研发中心 正式环境记得修改mpNum gh_a88da45c1fae
        serviceName: "pages",
        api: host + "/api/",
        orghost:orghost,
        apiWxLogin: host + "/towx/",
        apiLogin: host + "/doLogin/",
        apiError: "接口地址配置故障，请联系管理员",
        formError: "请勿输入特殊字符",
        apiLocalstorage: "Cookie和Localstorage均不支持，悲剧了...",
        showHead: false,
        //源配置
        source: [
            'css!shopCss',
            'shopInit',
            'shopSystem'
        ],
        browser: function () {
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
        isEmpty: function (str) {
            return (str === '' || str === null) ? false : true;
        },
        htmlReplace: function (str) {
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
        checkStr: function (str) {
            var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]")
            var rs = "";
            for (var i = 0; i < str.length; i++) {
                rs = rs + str.substr(i, 1).replace(pattern, '');
            }
            return rs;
        },
        chkSpcWord: function (str) {
            if (regEx.SpecialWord.test(str)) {
                return true;
            } else {
                return false;
            }
        },
        //检查手机号
        chkTel: function (str) {
            if (regEx.Tel.test(str)) {
                return false;
            } else {
                return true;
            }
        },
        //获取长度
        getLength: function (str) {
            var realLength = 0, len = str.length, charCode = -1;
            for (var i = 0; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128) realLength += 1;
                else realLength += 2;
            }
            return realLength;
        },
        //截取长度
        cutstr: function (str, len) {
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
        strTobool: function (str) {
            return (str && typeof str == 'string') ? (str.toLowerCase() == 'true' || str == '1') : (str == true);
        },
        //获取地址 避免地址混乱
        getRootPath: function () {
            //point根据项目目录自己设定
            var location = win.location.href,
                path = location.split(app.serviceName)[0] + app.serviceName;
            return path;
        },
        //随机数
        random: function (length, upper, lower, number) {
            if (!upper && !lower && !number) {
                upper = lower = number = true;
            }
            var a = [
                ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
                ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
                ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            ];
            var b = [];
            var c = "";
            b = upper ? b.concat(a[0]) : b;
            b = lower ? b.concat(a[1]) : b;
            b = number ? b.concat(a[2]) : b;
            for (var i = 0; i < length; i++) {
                c += b[Math.round(Math.random() * (b.length - 1))];
            }
            return c;
        },
        //获取URL参数 key 参数名称 url URL链接，默认为当前URL
        getUrlKey: function (key, url) {
            var url = url ? url : location.href;
            var v = '';
            var o = url.indexOf(key + "=");
            if (o != -1) {
                o += key.length + 1;
                e = url.indexOf("&", o);
                if (e == -1) {
                    e = url.length;
                }
                //v = decodeURIComponent(url.substring(o, e));
                v = url.substring(o, e);
            }
            return v;
        },
        loadPopPage: function (title, url) {
            var popupHTML = '<div class="popup">' +
                '<header class="bar bar-nav">' +
                '<a class="icon pull-left close-popup" href="javascript:;"><span class="icon-item">关闭</span></a>' +
                '<h1 class="title-popupDyn">' + title + '</h1>' +
                '</header>' +
                '<div class="content">' +
                '<iframe class="content-iframe" src="' + url + '">' +
                '</iframe>' +
                '</div>' +
                '</div>'
            $.popup(popupHTML);
        },
        //load page
        loadPage: function (url, fromtag) {
            var fromtag = fromtag || 0;
            if (fromtag == "closepanel") {
                $.closePanel()
            }
            $.router.loadPage(url)
        },
        //获取pageId
        getPageId: function () {
            var $page = $(".page-current");
            if (!$page[0]) {
                $page = $(".page").addClass("page-current")
            }
            return $page[0].id;
        },
        //miniAlert
        miniAlert: function (txt, fun) {
            if (fun) {
                $.modal({
                    title: "",
                    text: txt,
                    buttons: [{
                        text: "确认",
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
        //计时
        countTime: function (o) {
            $(o).each(function () {
                var endtime = new Date($(this).attr("endtime")).getTime();
                var nowtime = new Date().getTime();
                var youtime = endtime - nowtime;
                var seconds = Math.floor(youtime / 1000);
                var minutes = Math.floor(seconds / 60);
                var hours = Math.floor(minutes / 60);
                var days = Math.floor(hours / 24);
                var CDay = days;
                var CHour = Math.floor(hours % 24);
                var CMinute = Math.floor(minutes % 60);
                var CSecond = Math.floor(seconds % 60);
                if (CDay < 10) { CDay = "0" + CDay; }
                if (CHour < 10) { CHour = "0" + CHour; }
                if (CMinute < 10) { CMinute = "0" + CMinute; }
                if (CSecond < 10) { CSecond = "0" + CSecond; }
                if (endtime <= nowtime) {
                    $(this).hide();
                    $(this).next().hide();
                    $(this).html("<span class='countTimeExp'>&nbsp;</span>");
                    if ($("#goTo-buy").size() > 0) {
                        $("#goTo-buy").html("马上抢购")
                    }
                    return false;
                } else {
                    if ($(this).attr("showDate") == "yes") {
                        $(this).html("<span class='countTimeBox'><em>倒计时</em></span><span class='countDay'>" + days + "</span><em>天</em><span class='countHour'>" + CHour + "</span><em>:</em><span class='countMinu'>" + CMinute + "</span><em>:</em><span class='countSec'>" + CSecond + "</span>");
                    } else {
                        $(this).html("<span class='countTimeBox'><em>倒计时</em></span><span class='countHour'>" + CHour + "</span><em>:</em><span class='countMinu'>" + CMinute + "</span><em>:</em><span class='countSec'>" + CSecond + "</span>");
                    }
                }
            });
            setTimeout(function () {
                app.countTime(o)
            }, 1000);
        },
        loadH5Error: function () {
            var loadH5ErrorHtml = '<div class="popup popup-eror"><div class="content-error">' +
                '<p>请在慈云健康APP上进行购买</p>' +
                '<p class="imgQcode"><img src="style/images/qcode/erweima-img.jpg" alt="" /></p>' +
                '<p><a class="external" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ciyun.lovehealth&g_f=991653">下载慈云APP</a></p>' +
                '</div></div>';
            $.popup(loadH5ErrorHtml);
        },
        loadError: function () {
            var loadErrorHtml = '<div class="popup popup-h5"><div class="content-error">' +
                '<p><a class="external" href="' + host + '">网络不给力！点击返回首页</a></p>' +
                '</div></div>';
            $.popup(loadErrorHtml);
        },
        intShopLoad: function (tplTo) {
            var html = '<div class="shop-loading-overlay shop-loading-pre"></div>' +
                '<div class="shop-loading shop-loading-pre">' +
                '<span class="preloader loading preloader-white"></span>' +
                '</div>';
            app.checkDevice(app.showHead);
            $(tplTo).append(html);
        },
        getAllCookies: function () {
            if (document.cookie) {
                var aCookie = document.cookie.split(";");
                var re = "";
                for (var i = 0; i < aCookie.length; i++) {
                    var aCrumb = aCookie[i].split("=");
                    re += (aCrumb[0] + ":" + aCrumb[1] + '\n');
                }
                return re;
            } else {
                return "无cookie"
            }
        },
        isCookie: function () {
            if (window.navigator.cookieEnabled) {
                return true;
            } else {
                return false;
            }
        },
        isLocalStorage: function () {
            if (window.localStorage) {
                return true;
            } else {
                return false;
            }
        },
        isAppLogin: function () {
            if (typeof window.ciyun != "undefined" && typeof window.ciyun.isInApp != "undefined") {//android 
                window.ciyun.clickFromJs("1");//传1调登录
            } else if (typeof isInApp != "undefined" && typeof (isInApp) == "function") {//ios
                webFunFromIosWithOperateType("1");
            } else {
                app.loadH5Error();
            }
        },
        wxGetTitle: function (title) {
            var $body = $('body');
            document.title = title;
            var $iframe = $("<iframe style='display:none;' class='title-iframe' src='/favicon.ico'></iframe>");
            $iframe.on('load', function () {
                setTimeout(function () {
                    $iframe.off('load').hide().remove();
                }, 0);
            }).appendTo($body);
        },
        isWxLogin: function () {
            var url = window.location.href;
            var orgChannel = app.getUrlKey("orgChannel", url);
            $.ajax({
                type: 'POST',
                url: app.apiWxLogin,
                dataType: 'json',
                data: JSON.stringify({ "url": url, "orgChannel": orgChannel }),
                async: false,
                contentType: 'application/json',
                timeout: 30000,
                success: function (data) {
                    var code = data.retCode;
                    if (code == "0") {
                        window.location.href = data.item.redirectUrl;
                    } else {
                        $.toast("登录跳转失败", 5000);
                    }
                },
                error: function (xhr, type) {
                    //接口异常
                    $.toast(app.apiError, 5000);
                    $(".shop-loading-pre").remove();
                }
            })
        },
        getAppPersonId: function () {
            if (typeof window.ciyun != "undefined" && typeof window.ciyun.isInApp != "undefined") {//android 
                window.ciyun.isInApp();
            } else if (typeof isInApp != "undefined" && typeof (isInApp) == "function") {//ios
                isInApp();
            }
        },
        wxShare: function (title, linkUrl, imgUrl, desc, type, dataUrl) {
            var curUrl = window.location.href;
            var mpNum = app.wxShareMpNum;
            var reqUrl = curUrl.split('#')[0];
            reqUrl = reqUrl.replace(/&/g, "@^^^");
            var reqParam = '{"apiName":"loadjssdkconfig","reqData":{"mp_num":"' + mpNum + '"}}';
            $.ajax({
                type: "POST",
                async: false,
                url: wxhost + "/gateway/mp.gateway.inf?curUrl=" + reqUrl + "&reqData=" + reqParam + "&time=" + new Date().getTime(),
                dataType: "jsonp",
                contentType: 'application/json',
                jsonp: "jsonpShare",
                jsonpCallback: "jsonpShare",
                success: function (paramsJson) {
                    if (paramsJson != null && paramsJson.reCode == "0000") {
                        var configParam = paramsJson.reData;
                        wx.config({
                            debug: false,
                            appId: configParam.appId,
                            timestamp: configParam.timestamp,
                            nonceStr: configParam.nonceStr,
                            signature: configParam.signature,
                            jsApiList: ['hideMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'closeWindow', 'hideOptionMenu']
                        });
                        // console.log("http://centrinwx.ciyun.cn/gateway/mp.gateway.inf?curUrl="+reqUrl+"&reqData="+reqParam+"&time="+new Date().getTime());
                        wx.ready(function () {
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
                        wx.error(function (res) {
                            console.log("config信息验证失败：" + res.errMsg);
                        });
                    } else {
                        console.log("获取config配置参数失败！");
                    }
                }
            });
        },
        //获取模板数据
        getTplData: function (type, tplForm, tplTo, fn) {
            app.intShopLoad(tplTo);
            var template = $(tplForm).html();
            var compiledTemplate = Template7.compile(template);
            var location = window.location.href;
            var orgChannel = app.getUrlKey("orgChannel");
            //type 数据模板请求类型
            switch (type) {
                case "index":
                    datas = JSON.stringify({
                        uri: "index"
                    });
                    break;
                case "indexOrg":
                    datas = JSON.stringify({
                        uri: "index/org",
                        orgChannel: orgChannel
                    });
                    break;
                case "points":
                    datas = JSON.stringify({
                        uri: "goods/pointlist",
                        requestBody: {}
                    });
                    break;
                case "snapGoods":
                    datas = JSON.stringify({
                        uri: "snapBuy/list",
                        requestBody: {}
                    });
                    break;
                case "goodsViewDes":
                    datas = JSON.stringify({
                        uri: "goods/detail",
                        requestBody: {
                            goodsId: app.getUrlKey("goodsId", location)
                        }
                    });
                    break;
                case "goodsDes":
                    datas = JSON.stringify({
                        uri: "goods/detail",
                        requestBody: {
                            goodsId: app.getUrlKey("goodsId", location)
                        }
                    });
                    break;
                case "goodsRecommend":
                    datas = JSON.stringify({
                        uri: "goods/recommendList",
                        requestBody: {
                            goodsId: app.getUrlKey("goodsId", location)
                        }
                    });
                    break;
                case "goodsRule":
                    datas = JSON.stringify({
                        uri: "goods/rule",
                        requestBody: {
                            goodsId: app.getUrlKey("goodsId", location)
                        }
                    });
                    break;
                case "goodsDesShare":
                    datas = JSON.stringify({
                        uri: "goods/detail",
                        requestBody: {
                            goodsId: app.getUrlKey("goodsId", location)
                        }
                    });
                    break;
                case "category":
                    datas = JSON.stringify({
                        uri: "goods/list",
                        requestBody: {
                            categoryId: Number(app.getUrlKey("categoryId", location) ? app.getUrlKey("categoryId", location) : $.fn.cookie('categoryId'))
                        }
                    });
                    break;
                case "orderConfirm":
                    datas = JSON.stringify({
                        uri: "order/confirm",
                        requestBody: {
                            "addressId": app.getUrlKey("addressId", location) ? app.getUrlKey("addressId", location) : $.fn.cookie('addressId'),
                            "couponId": Number(app.getUrlKey("couponId", location) ? app.getUrlKey("couponId", location) : $.fn.cookie('couponId')),
                            "invoiceId": app.getUrlKey("invoiceId", location) ? app.getUrlKey("invoiceId", location) : $.fn.cookie('invoiceId'),
                            "goodsId": app.getUrlKey("goodsId", location) ? app.getUrlKey("goodsId", location) : $.fn.cookie('goodsId'),
                            "price": Number(app.getUrlKey("price", location) ? app.getUrlKey("price", location) : $.fn.cookie('price')),
                            "point": Number(app.getUrlKey("point", location) ? app.getUrlKey("point", location) : $.fn.cookie('point')),
                            "num": Number(app.getUrlKey("num", location) ? app.getUrlKey("num", location) : $.fn.cookie('num')),
                            "isSnap": app.strTobool(app.getUrlKey("isSnap", location) ? app.getUrlKey("isSnap", location) : $.fn.cookie('isSnap'))
                        }
                    });
                    break;
                //订单支付
                case "orderPay":
                    datas = JSON.stringify({
                        uri: "order/queryOrder",
                        requestBody: {
                            "orderId": $.fn.cookie('orderId') ? $.fn.cookie('orderId') : app.getUrlKey("orderId", location)
                        }
                    });
                    break;
                //体检预约 订单支付
                case "orderPhyPay":
                    datas = JSON.stringify({
                        uri: "order/queryOrder",
                        requestBody: {
                            "orderId": app.getUrlKey("orderId", location)
                        }
                    });
                    break;
                //积分支付支付
                case "zeroPay":
                    datas = JSON.stringify({
                        uri: "pay/zeropay",
                        requestBody: {
                            "orderId": $.fn.cookie('orderId')
                        }
                    });
                    break;
                //订单列表 全部
                case "orderList":
                    $.fn.cookie("from", "", { expires: -1 });
                    $.fn.cookie("orderId", "", { expires: -1 });
                    datas = JSON.stringify({
                        uri: "order/list",
                        requestBody: {
                            "orderState": 0
                        }
                    });
                    break;
                //订单列表 待付款
                case "orderListPaying":
                    $.fn.cookie("from", "", { expires: -1 });
                    $.fn.cookie("orderId", "", { expires: -1 });
                    datas = JSON.stringify({
                        uri: "order/list",
                        requestBody: {
                            "orderState": 1
                        }
                    });
                    break;
                //订单列表 已付款
                case "orderListPayed":
                    $.fn.cookie("from", "", { expires: -1 });
                    $.fn.cookie("orderId", "", { expires: -1 });
                    datas = JSON.stringify({
                        uri: "order/list",
                        requestBody: {
                            "orderState": 2
                        }
                    });
                    break;
                //订单列表 已完成
                case "orderListDone":
                    $.fn.cookie("from", "", { expires: -1 });
                    $.fn.cookie("orderId", "", { expires: -1 });
                    datas = JSON.stringify({
                        uri: "order/list",
                        requestBody: {
                            "orderState": 4
                        }
                    });
                    break;
                //订单列表 取消
                case "orderListCancel":
                    $.fn.cookie("from", "", { expires: -1 });
                    $.fn.cookie("orderId", "", { expires: -1 });
                    datas = JSON.stringify({
                        uri: "order/list",
                        requestBody: {
                            "orderState": 5
                        }
                    });
                    break;
                //订单详情
                case "orderDes":
                    datas = JSON.stringify({
                        uri: "order/queryOrder",
                        requestBody: {
                            orderId: app.getUrlKey("orderId", location) ? app.getUrlKey("orderId", location) : $.fn.cookie('orderId')
                        }
                    });
                    break;
                //退款申请
                case "refundApply":
                    datas = JSON.stringify({
                        uri: "/order/refund/order",
                        requestBody: {
                            orderId: app.getUrlKey("orderId", location) ? app.getUrlKey("orderId", location) : $.fn.cookie('orderId')
                        }
                    });
                    break;
                //查看退款申请
                case "seeRefund":
                    datas = JSON.stringify({
                        uri: "/order/refund/detail",
                        requestBody: {
                            orderId: app.getUrlKey("orderId", location) ? app.getUrlKey("orderId", location) : $.fn.cookie('orderId')
                            
                        }
                    });
                    break;
                //查看申请售后详情
                case "seeServer":
                    datas = JSON.stringify({
                        uri: "/order/after/detail",
                        requestBody: {
                            orderId: app.getUrlKey("orderId", location) ? app.getUrlKey("orderId", location) : $.fn.cookie('orderId'),
                            afterSaleApplyId : app.getUrlKey("afterSaleApplyId")
                        }
                    });
                    break;
                //申请售后历史列表
                case "serverHistory":
                    datas = JSON.stringify({
                        uri: "/order/after/list",
                        requestBody: {
                            orderId: app.getUrlKey("orderId", location) ? app.getUrlKey("orderId", location) : $.fn.cookie('orderId')
                        }
                    });
                    break;
               //修改退款申请
                case "changeRefundApply":
                    datas = JSON.stringify({
                        uri: "/order/refund/detail",
                        requestBody: {
                            orderId: app.getUrlKey("orderId", location) ? app.getUrlKey("orderId", location) : $.fn.cookie('orderId')
                        }
                    });
                    break;
                //申请售后
                case "serverApply":
                    datas = JSON.stringify({
                        uri: "/order/after/detail",
                        requestBody: {
                            orderId: app.getUrlKey("orderId", location) ? app.getUrlKey("orderId", location) : $.fn.cookie('orderId'),
                            afterSaleApplyId : app.getUrlKey("afterSaleApplyId")
                        }
                    });
                    break;
                //地址列表
                case "addressList":
                    $.fn.cookie("from", "", { expires: -1 });
                    datas = JSON.stringify({
                        uri: "order/addressList",
                        requestBody: {
                            "addressId": $.fn.cookie('addressId') ? $.fn.cookie('addressId') : "0"
                        }
                    });
                    break;
                //新增编辑地址
                case "getAddressById":
                    datas = JSON.stringify({
                        uri: "order/getAddressById",
                        requestBody: {
                            "addressId": $.fn.cookie('addressId') ? $.fn.cookie('addressId') : "0",
                            "goodsId": $.fn.cookie('goodsId'),
                            "price": Number($.fn.cookie('price')),
                            "point": Number($.fn.cookie('point')),
                            "num": Number($.fn.cookie('num')),
                            "isSnap": app.strTobool($.fn.cookie('isSnap'))
                        }
                    });
                    break;
                //订单发票
                case "bill":
                    datas = JSON.stringify({
                        uri: "order/invoiceList",
                        requestBody: {}
                    });
                    break;
                //订单优惠券列表
                case "couponsList":
                    datas = JSON.stringify({
                        uri: "order/listCoupons",
                        requestBody: {
                            "goodsId": $.fn.cookie('goodsId'),
                            "totalPrice": Number($.fn.cookie('price')),
                            "couponId": $.fn.cookie('couponId')
                        }
                    });
                    break;
                //可用优惠券列表
                case "couponsMyself":
                    datas = JSON.stringify({
                        uri: "my/listCoupons",
                        requestBody: {
                            "state": 0
                        }
                    });
                    break;
                //健康代金券
                case "healthCardCoupon":
                    datas = JSON.stringify({
                        uri: "healthcard/exam_coupons",
                        requestBody: {
                            "healthCardId": app.getUrlKey("healthCardId", location)
                        }
                    });
                    break;

                //过期优惠券列表
                case "couponsExpire":
                    datas = JSON.stringify({
                        uri: "my/listCoupons",
                        requestBody: {
                            "state": 4
                        }
                    });
                    break;
                //代金券商品
                case "couponGoods":
                    datas = JSON.stringify({
                        uri: "goods/couponGoods",
                        requestBody: {
                            couponId: Number(app.getUrlKey("couponId", location) ? app.getUrlKey("couponId", location) : $.fn.cookie('couponId'))
                        }
                    });
                    break;
                //用户中心
                case "userCenter":
                    datas = JSON.stringify({
                        uri: "my/index",
                        requestBody: {}
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
                beforeSend: function () {
                    //app.getAppPersonId();
                },
                success: function (data) {
                    if (data != null) {
                        var code = data.retCode;
                        var msg = data.msg;
                        var os = data.os;
                        if (code == "001") {//需要登录                       
                            if (os == "wx") {
                                app.isWxLogin();
                            } else {
                                app.isAppLogin();
                            }
                        } else if (code == "002") {//微信获取支付OpenId
                            if (os == "wx") {
                                window.location.href = data.item.redirectUrl;
                            }
                        } else if (code == "0") {//返回接口信息
                            var htmlStr = compiledTemplate(data);
                            var title = app.cutstr(data.title, 25);
                            $(tplTo).html(htmlStr);
                            if (os == "wx") {
                                $("#wx-bar-tab").show();
                                var sharetitle = $("#shareShop").attr("data-title");
                                var sharelinkUrl = $("#shareShop").attr("data-linkUrl");
                                var shareimgUrl = $("#shareShop").attr("data-imgUrl");
                                var sharedesc = $("#shareShop").attr("data-desc");
                                var sharetype = $("#shareShop").attr("data-type");
                                var sharedataUrl = $("#shareShop").attr("data-dataUrl");
                                app.wxShare(sharetitle, sharelinkUrl, shareimgUrl, sharedesc, sharetype, sharedataUrl);
                            } else {
                                $("#wx-bar-tab").remove();
                            }
                            //判定只在APP出现
                            if (typeof window.ciyun != "undefined" && typeof window.ciyun.isInApp != "undefined") {//android 
                                $(".appShow-flag").show();
                            } else if (typeof isInApp != "undefined" && typeof (isInApp) == "function") {
                                $(".appShow-flag").show();
                            } else {
                                $(".appShow-flag").remove();
                            }
                            setTimeout(function () {
                                $(".shop-loading-pre").remove();
                            }, 10);
                            //就在不足1页SUI bug
                            if ($("#page-val").length > 0) {
                                var pageSize = $("#page-val").attr('data-pageSize');
                                var len = $(tplTo + " li").length;
                                if (len < pageSize) {
                                    $('.infinite-scroll-preloader').remove();
                                    $('.order-scroll-preloader').remove();
                                }
                            }
                            if ($("img.lazy").length > 0) {
                                $("img.lazy").lazyload({
                                    threshold: 5,
                                    event: "load",
                                    container: $(".content")
                                })
                            }
                            switch (type) {
                                case "goodsDesShare":
                                    var titleShare = app.cutstr(data.item.goodsName, 25);
                                    var goodNameShare = data.item.goodsName;
                                    var $body = $('body');
                                    document.title = data.item.goodsName;
                                    var $iframe = $("<iframe style='display:none;' class='title-iframe' src='/favicon.ico'></iframe>");
                                    $iframe.on('load', function () {
                                        setTimeout(function () {
                                            $iframe.off('load').hide().remove();
                                        }, 0);
                                    }).appendTo($body);
                                    if (goodNameShare) {
                                        $("title").text(document.title);
                                    }
                                    if (titleShare) {
                                        $(".title-share").text(titleShare);
                                    }
                                    break;
                                case "getAddressById":
                                    $(".title-popup").text(title);
                                    break;
                                case "home":
                                    $("title,.title").text(document.title);
                                    break;
                                default:
                                    setTimeout(function () {
                                        app.wxGetTitle(title)
                                    }, 1);
                                    $("title,.title").text(title);
                            }
                            //通知android 数据加载完毕 回调title机制
                            if (typeof window.ciyun != "undefined" && typeof window.ciyun.isInApp != "undefined") {
                                if (typeof window.ciyun.h5loadFinish != "undefined") {
                                    window.ciyun.h5loadFinish();
                                }
                            } else if (typeof isInApp != "undefined" && typeof (isInApp) == "function") {
                                if (typeof h5loadFinish != "undefined") {
                                    h5loadFinish();
                                }
                            }
                            if (fn != "" && $.isFunction(fn)) fn();
                        } else {
                            $.toast(msg, 3500);
                            return false;
                        }
                    } else {
                        app.loadError();
                    }
                },
                error: function (xhr, type) {
                    $.toast(app.apiError, 5000);
                    $(".shop-loading-pre").remove();
                    app.loadError();
                }
            })
        },
        //头图设置处理
        initSwiperImg: function (o, ratio) {
            $(o).width($(window).width()).height(($(window).width() / ratio));
        },
        //热门头图
        hotImginit: function () {
            $(".hot-goods-0 img").width($(window).width() / 2).height(($(window).width() / 2.2));
            $(".hot-goods-1 img").width($(window).width() / 2).height(($(window).width() / 4.4));
            $(".hot-goods-2 img").width($(window).width() / 2).height(($(window).width() / 4.4));
        },
        //PhotoBrowserPopup bug待纠正
        initImgView: function (o) {
            items = [];
            $(o).each(function (i, o) {
                items[i] = {
                    url: $(o).attr("src"),
                    caption: $(o).attr("alt")
                }
            });
            var myPhotoBrowserPopup = $.photoBrowser({
                photos: items,
                theme: 'dark',
                type: 'popup'
            });
            myPhotoBrowserPopup.open();
        },
        //zepto checkbox radio
        zeptoChk: function (name) {
            $items = $("[name='" + name + "']");
            var strVal = "";
            $items.each(function () {
                if ($(this).prop("checked")) {
                    strVal += $(this).attr("value");
                }
            });
            return strVal;
        },
        //点击除非加载分页 未验证
        getNextPage: function (o, tplForm, tplTo, url, currPage, pageSize) {
            $(o).html("加载中...");
            var template = $(tplForm).html();
            $.ajax({
                type: 'POST',
                url: app.api,
                timeout: 3000,
                dataType: 'json',
                async: false,
                data: JSON.stringify({ uri: url, requestBody: { pageNo: currPage, pageSize: pageSize } }),
                contentType: 'application/json',
                success: function (data) {
                    var json = data.item;
                    $(o).html("点击展开更多商品...");
                    var compiledTemplate = Template7.compile(template);
                    var htmlStr = compiledTemplate(data.item);
                    $(tplTo).append(htmlStr);
                    $("img.lazy").lazyload({
                        threshold: 10,
                        event: "load",
                        container: $(".page")
                    });
                    $(".page-val").attr('data-pagenum', parseInt(json.pageNo));
                    $(".page-val").attr('data-pagesize', parseInt(json.pageSize));
                    $(".page-val").attr('data-totalpage', parseInt(json.last));
                }

            });
        },
        //检查设备OS
        checkDevice: function (o) {
            return false;
            var type = $.device.os;
            if (o) {
                switch (type) {
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
            } else {
                switch (type) {
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
        //滚动分页
        getPageData: function (type, tplForm, tplTo, pageNo, pageSize) {
            var template = $(tplForm).html();
            var location = window.location.href;
            var goodsId = app.getUrlKey("goodsId", location);
            var couponId = parseInt(app.getUrlKey("couponId", location));
            var categoryId = parseInt(app.getUrlKey("categoryId", location));
            var orderState = parseInt($("#orderState").val());
            //type 数据模板请求类型
            switch (type) {
                case "indexMore":
                    datas = JSON.stringify({
                        uri: "index/getNewGoods",
                        requestBody: { "pageNo": pageNo, "pageSize": pageSize }
                    });
                    break;
                case "pointsMore":
                    datas = JSON.stringify({
                        uri: "goods/pointlist",
                        requestBody: { pageNo: pageNo, pageSize: pageSize }
                    });
                    break;
                case "categoryMore":
                    datas = JSON.stringify({
                        uri: "goods/list",
                        requestBody: { categoryId: categoryId, pageNo: pageNo, pageSize: pageSize }
                    });
                    break;
                case "couponGoodsMore":
                    datas = JSON.stringify({
                        uri: "goods/couponGoods",
                        requestBody: { couponId: couponId, pageNo: pageNo, pageSize: pageSize }
                    });
                    break;
                case "goodsRecommendMore":
                    datas = JSON.stringify({
                        uri: "goods/recommendList",
                        requestBody: { goodsId: goodsId, "pageNo": pageNo, "pageSize": pageSize }
                    });
                    break;
                case "orderListMore":
                    datas = JSON.stringify({
                        uri: "order/list",
                        requestBody: { orderState: orderState, "pageNo": pageNo, "pageSize": pageSize }
                    });
                    break;

            }
            $.ajax({
                type: 'POST',
                url: app.api,
                timeout: 30000,
                dataType: 'json',
                async: false,
                data: datas,
                contentType: 'application/json',
                success: function (data) {
                    var code = data.retCode;
                    var msg = data.msg;
                    if (code == "0") {
                        var json = data.item;
                        var compiledTemplate = Template7.compile(template);
                        var htmlStr = compiledTemplate(data.item);
                        $(tplTo).append(htmlStr);
                        if ($("#page-val").length > 0) {
                            var pageSize = $("#page-val").attr('data-pageSize');
                            var len = $(tplTo + " li").length;
                            if (len < pageSize) {
                                $('.infinite-scroll-preloader').remove();
                                $('.order-scroll-preloader').remove();
                            }
                        }
                        $("img.lazy").lazyload({
                            threshold: 10,
                            event: "load",
                            container: $(".page")
                        });
                        $("#page-val").attr('data-pageNo', parseInt(json.pageNo));
                        $("#page-val").attr('data-pagesize', parseInt(json.pageSize));
                        $("#page-val").attr('data-pageLast', parseInt(json.last));
                        console.log(json.payingCount)
                    } else {
                        $.toast(msg, 3500);
                    }
                },
                error: function (xhr, type) {
                    $.toast(api.apiError, 5000);
                }
            });
        },
        //省市区联动
        loadChildArea: function (o, v, level) {
            if (level == 1) {
                $("#userCity").empty();
                $("#userArea").empty();
                $("#userArea").html('<option value="-1" selected="selected">请选择地区</option>');
            } else if (level == 2) {
                $("#userArea").empty();
            }
            var parentId = $(o).val();
            var pId = $(o).attr("id");
            datas = JSON.stringify({
                uri: "order/childArea",
                requestBody: {
                    parentId: Number(parentId)
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
                    var options = '<option value="-1" >请选择</option>';
                    var json = data.item;
                    if (json.len != 0) {
                        var childAreas = json.childAreas;
                        for (var i = 0; i < json.len; i++) {
                            var tarea = childAreas[i];
                            options = options + '<option value="' + tarea.id + '" >' + tarea.areaName + '</option>';
                        }
                    }
                    $(v).empty();
                    $(v).html(options);
                    if (pId == "userProvince" && parentId == -1) {
                        $("#userCity").empty();
                        $("#userCity").html('<option value="-1" selected="selected">请选择</option>');
                    }
                    if (pId == "userCity" && parentId == -1) {
                        $("#userArea").empty();
                        $("#userArea").html('<option value="-1" selected="selected">请选择</option>');
                    }
                    $.hideIndicator();
                }
            })
        },
        //省市加载联动
        initChildArea: function (parentId, v, childArea) {
            datas = JSON.stringify({
                uri: "order/childArea",
                requestBody: {
                    parentId: Number(parentId)
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
                    var options = '<option value="-1" >请选择</option>';
                    var json = data.item;
                    if (json.len != 0) {
                        var childAreas = json.childAreas;
                        for (var i = 0; i < json.len; i++) {
                            var tarea = childAreas[i];
                            if (childArea == tarea.id) {
                                options = options + '<option value="' + tarea.id + '" selected="selected">' + tarea.areaName + '</option>';
                            } else {
                                options = options + '<option value="' + tarea.id + '" >' + tarea.areaName + '</option>';
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
}(window, document));

function isLoginCallback(iosIsLogin) {
    if (iosIsLogin == "true") {
        openImChat($.fn.cookie('serviceId'),"0","0");
    } else {
        webFunFromIosWithOperateType("1");
    }
}
//app获取PersonId
function getPersonIdCallback(str) {
    //回调返回personId,web根据personId进行登录
    $.ajax({
        url: app.apiLogin,
        type: "POST",
        data: JSON.stringify({ "personId": str }),
        dataType: "json",
        contentType: "application/json",
        async: false,
        cache: false,
        success: function (data) {
        },
        error: function (xhr, type) {
            alert("getPersonIdCallback回调错误");
        }
    });
}
//在app中，由app回调通知
function getIsInAppCallback(isIn) {
    if (isIn) {
        //在app中web通知app需要获取personId
        if (typeof window.ciyun != "undefined" && typeof window.ciyun.getPersonId != "undefined") {
            window.ciyun.getPersonId();
        } else if (typeof getPersonId != "undefined") {
            getPersonId();
        }
    }
}
//在app中，捕捉登录状态
function loginStatusCallBack(status) {
    //1,2,3 代表登录成功，失败，取消
    var vendId = app.getUrlKey("vendId", window.location.href);
    switch (status) {
        case "1":
            if (vendId != "") {
                window.location.href = "vend.html?vendId=1";
            } else {
                window.location.reload();
            }
            break;
        case "2":
            if (vendId != "") {
                window.location.href = "vend.html?vendId=-1";
            } else {
                window.location.reload();
            }
            break;
        case "3":
            if (vendId != "") {
                window.location.href = "vend.html?vendId=-1";
            } else {
                window.location.reload();
            }
            break;
    }
}
//配置文件
requirejs.config({
    urlArgs: "v=" + app.version,//配置版本号
    baseUrl: "/",
    waitSeconds: 0,
    paths: {
        css: "style/js/require/css",
        shopCss: "style/css/shop",
        shopInit: "style/js/shop.init",
        shopSystem: 'style/js/shop.system'
    }
});
//加载源
require(app.source, function () {
    app.getAppPersonId();
});

