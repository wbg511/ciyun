import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import phyInit from '../../common/phy.init';
import axios from "../../common/httpAjax";
import qs from "qs";
import $ from "jquery";
import {Toast, Modal} from 'antd-mobile';
import Pay from "../../common/initPay";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      prePayId_wx: "",
      prePayId_ali: "",
      code: "",
      statePayCallback: "",
      createTime: "",
      inspNo: "",
      name: "",
      userPersonStr: "",
      image: "",
      amount: "",
      baseChargeItemList: [],
      plusChargeItemList: [],
      baseCount: "",
      baseAmount: "",
      plusCount: "",
      plusAmount: "",
      payFlag: "",
      corpName: "",
      itemDetailsShow: false,
      itemDetails: {}
    }
  }
  //app支付宝回调
  appAliPayCallback(code) {
    if (code == '0' || code == '9000' || code == '8000') {
      this.paySucceCallback(this.props.params.recordId)
    } else {
      Toast.fail('订单支付失败！', 3, '', true);
    }
  }
  //app微信回调
  appWXPayCallback(code) {
    if (code == '0') {
      this.paySucceCallback(this.props.params.recordId)
    } else if (code == '-2') {
      Toast.fail('订单支付取消', 3, '', true);
    } else {
      Toast.fail('订单支付失败', 3, '', true);
    }
  }
  //微信JSSDK支付回调
  wxApiCall(response, recordId) {
    if (response.data.code == 0) {
      var params = response.data.result.wxSdk;
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
          window.Pay.paySucceCallback(recordId)
        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
          Toast.fail('订单支付失败！', 3, '', true);
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          Toast.fail('您已经取消支付', 3, '', true);
        } else {
          Toast.fail('其他支付异常', 3, '', true);
        }
      });
    } else {
      alert(response.data.code + "支付网关接口配置错误")
    }
  };
  //支付成功回调
  paySucceCallback(recordId) {
    Modal.alert("订单号" + this.state.inspNo, "体检预约服务的线上支付已完成，您可以在【预约记录】中查看体检状态！", [
      {
        text: "查看预约记录",
        onPress: () => {
          this.goToHistroy(recordId)
        }
      }
    ])
  };
  //查看预约记录
  goToHistroy(recordId) {
    hashHistory.push({
      pathname: '/histroy/details/' + recordId
    })
  };
  getPayId(o) {
    Pay.done(o, this.props.params.recordId);
  }
  //生成预约记录
  getRecord() {
    axios({
      url: "/record/chargeItemInfo.json",
      data: {
        "personId": window.localStorage.getItem("personId"),
        "recordId": this.props.params.recordId
      },
      method: "post"
    }).then((response) => {
      if (response.data.code == 0) {
        var res = response.data.result;
        this.setState({
          createTime: res.createTime,
          inspNo: res.inspNo,
          image: res.image,
          name: res.name,
          userPersonStr: res.usePersonStr,
          img: res.img,
          amount: res.amount,
          baseChargeItemList: res.baseChargeItemList,
          plusChargeItemList: res.plusChargeItemList,
          baseCount: res.baseCount,
          baseAmount: res.baseAmount,
          plusCount: res.plusCount,
          plusAmount: res.plusAmount,
          corpName: res.corpName,
          payFlag: res.payFlag,
          payState: ""
        }, function() {
          if (res.payFlag == "1") {
            this.setState({payState: "已支付"})
          } else if (res.payFlag == "2") {
            this.setState({payState: "待付款"})
          }
        });
        phyInit.title("订单详情");
      } else {
        Toast.fail(response.data.mgs, 3, '', true)
      }
    });
  }

  componentDidMount() {
    this.getRecord();
    window.Pay = this;
  }
  render() {
    const isWx = window.localStorage.getItem("isWx")
    return (<div class="app-doc">
      <div class="app-bd confirmOrder-bd">
        <div class="confirmOrder-intro">
          <p>订单编号：{this.state.inspNo}</p>
          <p>下单时间：{this.state.createTime}</p>
          <span class={"order-status status-" + this.state.payFlag}>
            {this.state.payState}
          </span>
        </div>
        <div class="bookingDetails-Intro">
          <div class="booking-infoBox">
            <div class="booking-img">
              <img src={this.state.image != ''
                  ? this.state.image
                  : require('../../static/images/booking-img.png')} alt=""/>
            </div>
            <div class="booking-intro">
              <h3 class="booking-name app-txt-nowrap-2">{this.state.name}</h3>
              <div class="booking-groupPerson">
                <p>适宜人群：{this.state.userPersonStr}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bookingDetails-org">
          <div class="app-list">
            <div class="app-list-item">
              <div class="app-item-hd">
                体检中心：
              </div>
              <div class="app-item-bd">{
                  this.state.corpName
                    ? this.state.corpName
                    : '无体检中心名称'
                }</div>
            </div>
          </div>
        </div>
        <div class="confirmOrder-list-total">
          <div class="app-list">
            <div class="app-list-item">
              <div class="app-item-bd">基础项目 ({this.state.baseCount})</div>
              <div class="app-item-ft">
                <div class="total-price">
                  <em class="rmb">¥</em>
                  <span class="total-price-sale">{this.state.baseAmount}</span>
                </div>
              </div>
            </div>
            {
              this.state.plusCount > 0
                ? <div class="app-list-item">
                    <div class="app-item-bd">添加项目 ({this.state.plusCount})</div>
                    <div class="app-item-ft">
                      <div class="total-price">
                        <em class="rmb">¥</em>
                        <span class="total-price-sale">{this.state.plusAmount}</span>
                      </div>
                    </div>
                  </div>
                : ''
            }

          </div>
        </div>
        <div class="confirmOrder-list-bill">
          <div class="app-list">
            <div class="app-list-item">
              <div class="app-item-bd">发票</div>
              <div class="app-item-ft">
                <span class="no-bill">暂不提供</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        this.state.payFlag == "2"
          ? <div class="app-ft phy-ft">
              <div class="phy-ft-total">
                <div class="total-all">
                  <span class="total-all-title">合计：</span>
                  <em class="rmb">¥</em>
                  <span class="total-price-all">{this.state.amount}</span>
                </div>
                {
                  isWx == 'true'
                    ? <button type="butto" onClick={() => {
                          this.getPayId(3)
                        }} class="phy-wxPayBtn">微信支付</button>
                    : <div class="phy-ft-pay">
                        <button type="butto" onClick={() => {
                            this.getPayId(1)
                          }} class="phy-aliPayBtn">支付宝支付</button>
                        <button type="butto" onClick={() => {
                            this.getPayId(2)
                          }} class="phy-wxPayBtn">微信支付</button>
                      </div>
                }

              </div>
            </div>
          : <div class="app-ft phy-ft">
              <div class="phy-ft-total">
                <div class="total-all">
                  <span class="total-all-title">合计：</span>
                  <em class="rmb">¥</em>
                  <span class="total-price-all">{this.state.amount}</span>
                </div>
              </div>
            </div>
      }
    </div>)
  }
}
