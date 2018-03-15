import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import axios from "../../common/httpAjax";
import common from '../../common/common';
import qs from "qs";
import $ from "jquery";
import {Toast, Modal} from 'antd-mobile';
import Pay from "../../common/initPay";
import "../style/index.less"

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.goAppLogin = this.goAppLogin.bind(this);
    this.state = {
      title: "",
      isLogin:false,
      isWx: this.props.location.query.isWx,
      gender: this.props.location.query.gender,
      personId:"",
      evaluationKey: this.props.location.query.evaluationKey,
      serviceKey: this.props.location.query.serviceKey,
      consultId: this.props.location.query.consultId,
      replyId: this.props.location.query.replyId,
      orderPrice: '',
      price: '',
      available: false,
      questionaireKey: '',
      evaluationId: '',
      isLoading: false
    }
  }

  //app支付宝回调
  appAliPayCallback(code) {
    if (code == '0' || code == '9000' || code == '8000') {
      this.paySucceCallback()
    } else {
      Toast.fail('订单支付失败！', 3, '', true);
    }
  }
  //app微信回调
  appWXPayCallback(code) {
    if (code == '0') {
      this.paySucceCallback()
    } else if (code == '-2') {
      Toast.fail('订单支付取消', 3, '', true);
    } else {
      Toast.fail('订单支付失败', 3, '', true);
    }
  }
  //微信JSSDK支付回调
  wxApiCall(response) {
    if (response.data.code == 0) {
      var params = response.data.data.wxSdk;
      var appId = params.appId;
      var timeStamp = params.timeStamp;
      var nonceStr = params.nonceStr;
      var packages = params.package;
      var signType = params.signType;
      var paySign = params.paySign;
      WeixinJSBridge.invoke('getBrandWCPayRequest', {
        "appId": appId, //公众号名称，由商户传入
        "timeStamp": timeStamp, //时间戳，自1970年以来的秒数
        "nonceStr": nonceStr, //随机串
        "package": packages,
        "signType": signType, //微信签名方式:
        "paySign": paySign //微信签名
      }, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          window.Pay.paySucceCallback()
        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
          Toast.fail('订单支付失败！', 3, '', true);
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          Toast.fail('您已经取消支付', 3, '', true);
        } else {
          Toast.fail('其他支付异常', 3, '', true);
        }
      });
    } else {
      Toast.fail("支付网关接口配置错误", 3, '', true);
    }
  };
  //支付成功回调
  paySucceCallback() {
    const _this = this;
    console.log("支付成功回调",_this);
    axios({
      url: "/personHealthRisk/state",
      params: {
        "personId":_this.state.personId,
        "evaluationKey": _this.props.location.query.evaluationKey,
        "evaluationId": _this.props.location.query.evaluationId,
        "gender": _this.props.location.query.gender
      },
      method: "get"
    }).then((response) => {
      var code = response.data.code;
      var res = response.data.data;
      if (code == 0) {
        console.log("支付成功 response",response.data);
        _this.setState({
          evaluationId:res.evaluationId,
          personId:res.personId,
          isLogin:true
        });
        Modal.alert("支付成功", "健康评测支付已完成，您可以！", [
          {
            text: "马上去答题",
            onPress: () => {
              _this.goToAnswer(res.questionaireKey)
            }
          }
        ])
      } else {
        Toast.fail(response.data.msg, 3, '', true);
      }
    })
  }

  //支付
  getPayId(payType) {
    Pay.done(payType,this.state.gender,this.state.evaluationKey, this.state.orderPrice, this.state.price,this.state.serviceKey,this.state.consultId,this.state.replyId);
  }

  //APP登录回调
  loginStatusCallBack(status) {
    const _this = this;
    var type = status.split("-")[0],
      pid = status.split("-")[1];
    switch (type) {
      case "1":
       console.log("登录成功处理123");
       window.localStorage.setItem("personId",pid);
        _this.setState({
          isLogin:true,
          personId:pid
        });
        _this.getEveluation();
        break;
      case "2":
        console.log("登录失败，请重新登录");
        _this.setState({
          isLogin:false,
          personId:"",
        })
        window.localStorage.removeItem("personId")
        break;
      case "3":
        console.log('您未登录，请登录后进行操作')
        _this.setState({
          isLogin:false,
          personId:"",
        })
        window.localStorage.removeItem("personId")
        break;
    }
  }
  goAppLogin() {
      if (typeof window.ciyun != "undefined" && typeof window.ciyun.isInApp != "undefined") { //android
        window.ciyun.clickFromJs("1");
      } else if (typeof isInApp != "undefined" && typeof(isInApp) == "function") { //ios
        webFunFromIosWithOperateType("1");
      }else{
        Toast.info('请在微信或者慈云APP登录', 3, '', true);
      }
  }
  componentDidMount() {
      var urlParms = this.props.location.query;
      var personId = urlParms.personId;
      if (personId == ""||personId=="null") {
        this.setState({
          isLogin:false,
          personId:"",
        })
        window.localStorage.removeItem("personId");
      } else {
        this.setState({
          isLogin:true,
          personId:personId
        })
        window.localStorage.setItem("personId",personId);
      }
    window.Pay = this;
    window.Login = this;
    this.getEveluation();
    //微信分享 可以根据实际情况处理
    var gender = this.props.location.query.gender;
    var sharetitle =gender==1?common.wxShareInfo.sharename+"(男)":common.wxShareInfo.sharename+"(女)";
    var sharelinkUrl = common.wxShareInfo.shareurl;
    var shareimgUrl = common.wxShareInfo.shareimage;
    var sharedesc = common.wxShareInfo.sharedesc;
    common.wxShare(sharetitle, sharelinkUrl, shareimgUrl, sharedesc, "", "");
    common.title('健康评测');
  }
  //获取评测状态
  getEveluation() {
    axios({
      url: "/personHealthRisk/state",
      params: {
        "personId":this.state.personId?this.state.personId:window.localStorage.getItem("personId"),
        "evaluationKey": this.props.location.query.evaluationKey,
        "evaluationId": this.state.evaluationId?this.state.evaluationId:this.props.location.query.evaluationId,
        "gender": this.props.location.query.gender
      },
      method: "get"
    }).then((response) => {
      var code = response.data.code;
      var res = response.data.data;
      if (code == 0) {
        this.setState({
          isLoading: true,
          evaluationKey: res.evaluationKey,
          evaluationId: res.evaluationId,
          personId: res.personId,
          gender: res.gender,
          available: res.available,
          price: res.price,
          orderPrice: res.orderPrice,
          gender: res.gender,
          questionaireKey: res.questionaireKey
        })
      } else {
        Toast.fail(response.data.msg, 3, '', true);
      }
    });
  }
  //显示支付状态
  setPayType(wx) {
    if (wx == 'true') {
      return (<div class="app-ft-btn">
        <button type="butto" onClick={() => {
            this.getPayId(3)
          }} class="app-wxPayBtn">微信支付</button>
      </div>)
    } else if (wx == 'false') {
      return (<div class="app-ft-btn">
        <button class="app-wxPayBtn" onClick={() => {
            this.getPayId(2)
          }}>微信支付</button>
        <button class="app-aliPayBtn" onClick={() => {
            this.getPayId(1)
          }}>支付宝支付</button>
      </div>)
    }
  }
  //去答题界面
  goToAnswer(type) {
      hashHistory.push({
        pathname: '/answer/' + type,
        state: {
          personId: this.state.personId,
          evaluationId: this.state.evaluationId,
          gender: this.props.location.query.gender,
          evaluationKey: this.props.location.query.evaluationKey,
          questionaireKey: type
        }
      });
  }
  render() {
    const isWx = this.props.location.query.isWx;
    return (<div class="app-doc">
      {common.appShare(this.props.location.query.gender)}
      <div class="app-bd">
        <img src={require("static/images/introduce.jpg")} alt=""/>
      </div>
      {
        this.state.isLoading
          ? <div class="app-ft app-ft-healthEve">
              {
                this.state.available == false
                  ? <div>
                      <div class="healthEve-price">
                        <span class="rmb">￥</span>
                        <span class="rmb-sale">{this.state.price}</span>
                        /次
                      </div>
                      {
                        !this.state.isLogin
                          ? <div class="app-ft-btn">
                              <button class="app-wxPayBtn" type="button" onClick={() => {
                                  this.goAppLogin()
                                }}>购买</button>
                            </div>
                          : <div>
                              {this.setPayType(this.props.location.query.isWx)}
                            </div>
                      }
                    </div>
                  : <div><a class="app-goAnswer"
                    onClick={() => {
                      this.goToAnswer(this.state.questionaireKey)
                    }}
                    >继续答题</a></div>
              }
            </div>
          : ''
      }
    </div>)
  }
}
