import React, { Component } from "react";
import { Link, IndexLink, hashHistory, Router, Route } from "react-router";
import phyInit from '../../common/phy.init';
import axios from "../../common/httpAjax";
import qs from "qs";
import $ from "jquery";
import { Modal, Toast } from 'antd-mobile';



export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      modal1: false,
      corpId: 3,
      reservationId: "",
      plusChargeItemIds: [],
      baseChargeItemIds: [],
      allPrice: 0,
      basicPrice: 0,
      allProjectArr: [],//所有添加项目
      modalTitle: "",//项目title
      suitPersonRemarks: "",//适宜人群
      unsuitPersonRemarks: "",//禁忌人群
      remarks: "",//项目介绍
      recordHealthCardId: "",//是否是健康卡单独处理
      errormsg: "正在加载中，请稍等...",
      isInit: false,
    }
    this.getDetail = this.getDetail.bind(this);
    this.goToAddItem = this.goToAddItem.bind(this);

  }


  showModal(item) {
    this.setState({
      modalTitle: item.name,
      remarks: item.remarks,
      suitPersonRemarks: item.suitPersonRemarks,
      unsuitPersonRemarks: item.unsuitPersonRemarks,
      modal1: true,

    });
  }
  removeItem(item, index) {
    let { allPrice, allProjectArr } = this.state;
    allProjectArr.splice(index, 1);
    this.setState({
      allProjectArr: allProjectArr,
      allPrice: Number(allPrice) - item.amount
    })
  }
  onClose() {
    this.setState({
      modal1: false,
    });
  }
  componentDidMount() {
    var urlParms = this.props.location.query;
    var personId = urlParms.personId || "";
    if (personId != "") {
      window.localStorage.clear();
      var personId = urlParms.personId;
      var hmoId = urlParms.hmoId;
      var payOpenId = urlParms.payOpenId;
      var isWx = urlParms.isWx;
      localStorage.setItem("personId", personId);
      localStorage.setItem("hmoId", hmoId);
      localStorage.setItem("payOpenId", payOpenId);
      localStorage.setItem("isWx", isWx);
    }
    window.localStorage.setItem("reservationId", this.props.params.reservationId);
    window.localStorage.setItem("corpId", this.props.params.corpId);
    window.localStorage.removeItem("stateTxt");
    this.init();
    this.getDetail()
  }
  init() {
    phyInit.title("体检套餐详情");

    if (this.props.location.state) {
      var allPrice = 0;
      var allProjectArr = JSON.parse(window.localStorage.getItem("allProjectArr")) || [];
      if (allProjectArr.length > 0) {
        for (var i = 0; i < allProjectArr.length; i++) {
          allPrice += allProjectArr[i].amount;
        }
      }
      this.setState({
        allPrice: allPrice,
        allProjectArr: allProjectArr || [],
      });
    }
    if (this.props.location.query.hasOwnProperty("recordHealthCardId")) {//健康卡单独处理
      this.setState({
        recordHealthCardId: this.props.location.query.recordHealthCardId
      })
    }

  }
  createMarkup(str) {
    var str = str.replace(/<[^>]+>/g, "");
    str = str.substring(0, 90) + (str.length > 90 ? "..." : "");
    return { __html: str };
  }
  getDetail() {
    axios({
      url: "/package/info.json",
      data: {
        "reservationId": window.localStorage.getItem("reservationId"),
        "corpId": window.localStorage.getItem("corpId"),
        "personId": window.localStorage.getItem("personId")
      },
      method: "post"
    }).then((response) => {
      if (response.data.code == 0) {

      } else {
        //Toast.fail(response.data.msg, 3, '', true);
        this.setState({
          errormsg: response.data.msg,
          isInit: true,
        })
        return false;
      }
      let baseChargeItemIds = response.data.result.chargeItemList.map((item, index) => item.id);
      window.localStorage.setItem("chargeItemList", JSON.stringify(response.data.result.chargeItemList));
      window.localStorage.setItem("basicPrice", response.data.result.amount || 0);
      this.setState({
        data: response.data.result,
        show: true,
        basicPrice: response.data.result.amount,
        baseChargeItemIds: baseChargeItemIds,
        plusFlag: response.data.result.plusFlag,
        isInit: true,
      })
    });
  }
  //进入体检预约的的体检注意事项
  gotoNotice() {
    let reservationId = this.props.params.reservationId

    hashHistory.push({
      pathname: '/booking/notice/booking/' + reservationId
    })

  }
  goToAddItem() {//跳转我要加项跳转我要加项
    let { allProjectArr, plusFlag, data } = this.state;
    axios({
      url: "/package/validate.json",
      data: {
        "reservationId": window.localStorage.getItem("reservationId"),
        "corpId": window.localStorage.getItem("corpId"),
        "personId": window.localStorage.getItem("personId"),
        "plusFlag": 1,
      },
      method: "post"
    }).then((response) => {
      if (response.data.code == 0) {
        if (allProjectArr) {//更新当前已添加项目
          window.localStorage.setItem('allProjectArr', JSON.stringify(allProjectArr));
        }
        window.localStorage.setItem('plusFlag', plusFlag);

        hashHistory.push({
          pathname: '/booking/item/' + window.localStorage.getItem("corpId"),
          state: {
            allProjectArr: allProjectArr,
            reservationId: window.localStorage.getItem("reservationId"),
            corpId: window.localStorage.getItem("corpId"),
            personId: window.localStorage.getItem("personId"),
            chargeItemList: data.chargeItemList,
            plusFlag: plusFlag,

          }
        })
      } else {
        Toast.fail(response.data.msg, 3, '', true);
      }

    });



  }
  //提交数据到预约表单
  goToBookingForm() {

    let { allProjectArr, baseChargeItemIds, recordHealthCardId } = this.state;
    let plusChargeItemIds = allProjectArr.map((item, index) => item.id);
    axios({
      url: "/package/validate.json",
      data: {
        "reservationId": window.localStorage.getItem("reservationId"),
        "corpId": window.localStorage.getItem("corpId"),
        "personId": window.localStorage.getItem("personId"),
      },
      method: "post"
    }).then((response) => {
      if (response.data.code == 0) {
        if (recordHealthCardId == "") {
          hashHistory.push({
            pathname: '/bookingForm/',
            query: {
              reservationId: window.localStorage.getItem("reservationId"),
              plusChargeItemIds: plusChargeItemIds.join(),
              baseChargeItemIds: baseChargeItemIds.join(),
              corpId: window.localStorage.getItem("corpId"),
            }
          })
        } else {
          hashHistory.push({
            pathname: '/bookingForm/',
            query: {
              reservationId: window.localStorage.getItem("reservationId"),
              plusChargeItemIds: plusChargeItemIds.join(),
              baseChargeItemIds: baseChargeItemIds.join(),
              recordHealthCardId: recordHealthCardId,
              corpId: window.localStorage.getItem("corpId"),
            }
          })
        }
      } else {
        Toast.fail(response.data.msg, 3, '', true);
      }

    });



  }

  render() {
    var _this = this;
    const { isInit, show, data, allPrice, allProjectArr, recordHealthCardId, errormsg } = this.state;

    if (show) {
      const chargeItemList = data.chargeItemList.map((item, index) => {
        return (<a class="app-list-item" onClick={(e) => { _this.showModal(item) }} href="javascript:;" key={index}>
          <div class="app-item-bd">{item.name}</div>
        </a>)
      });

      const itemsOther = allProjectArr.map((item, index) => {

        return (
          <div class="app-list-item" href="#" key={index}>
            <div class="app-item-bd" onClick={(e) => { _this.showModal(item) }}>{item.name}</div>
            <div class="app-item-ft"><span class="remove-items" onClick={(e) => { _this.removeItem(item, index) }}></span></div>
          </div>
        )

      });



      return (
        <div className="app-doc">
          <div class="app-bd bookingDetails-bd">
            <div class="bookingDetails-Intro">
              <div class="booking-infoBox">
                <div class="booking-img">
                  <img src={data.image
                    ? data.image
                    : require('../../static/images/booking-img.png')} alt="" />
                </div>
                <div class="booking-intro">
                  <h3 class="booking-name app-txt-nowrap-2">{data.name}</h3>

                  <div class="booking-groupPerson">
                    <p>适宜人群：{data.usePersonStr}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bookingDetails-org">
              <div class="app-list">
                <div class="app-list-item">
                  <div class="app-item-bd"> 体检中心：{data.corpName}</div>
                </div>
              </div>
            </div>
            {
              data.precautions ?
                <div class="bookingDetails-notice">
                  <div class="app-list">
                    <div class="app-list-item">
                      <div class="app-item-hd">
                        <p class="notice-title">注意事项</p>

                      </div>
                      {
                        data.precautions.length > 70 ?
                          <div className="notice-most-btn" onClick={() => { this.gotoNotice() }}>更多</div>
                          : null
                      }
                    </div>
                  </div>
                  <div class="bookingDetails-notice-intro app-txt-nowrap-3">
                    <div class="app-txt-nowrap-3" dangerouslySetInnerHTML={this.createMarkup(data.precautions)}></div>

                  </div>
                </div>
                : null
            }

            <div class="bookingDetails-items">
              <div class="bookingDetails-items-total">
                <div class="total-title">基础项目（{chargeItemList.length}）</div>
                <div class="total-price"><span class="total-price-title">小计：</span><em class="rmb">¥</em><span class="total-price-sale">{this.state.data.amount}</span></div>
              </div>
              <div class="app-list">
                {chargeItemList}
                <Modal
                  visible={this.state.modal1}
                  transparent
                  maskClosable={false}
                  onClose={() => this.onClose('modal1')}
                  title={this.state.modalTitle}
                  footer={[{ text: '知道了', onPress: () => { this.onClose('modal1'); } }]}

                >
                  <div style={{ maxHeight: '8rem', overflow: 'scroll' }}>
                    <div className="am-modal-body-text"><span class="title">【项目介绍】：</span><span class="name">{this.state.remarks ? this.state.remarks : "无特殊说明"}</span></div>
                    <div className="am-modal-body-text"><span class="title">【适宜人群】：</span><span class="name">{this.state.suitPersonRemarks ? this.state.suitPersonRemarks : "--"}</span></div>
                    <div className="am-modal-body-text"><span class="title">【禁忌人群】：</span><span class="name">{this.state.unsuitPersonRemarks ? this.state.unsuitPersonRemarks : "--"}</span></div>
                  </div>
                </Modal>
              </div>

            </div>

            {allProjectArr.length > 0 ?
              <div class="bookingDetails-itemsOther">
                <div class="bookingDetails-items-total">
                  <div class="total-title">已添加项目（{itemsOther.length}）</div>
                  <div class="total-price"><span class="total-price-title">小计：</span><em class="rmb">¥</em><span class="total-price-sale">{allPrice.toFixed(2)}</span></div>
                </div>
                <div class="app-list">
                  {itemsOther}
                </div>

              </div>
              : null
            }
          </div>
          <div class="app-ft phy-ft">
            <div class="phy-ft-total">
              <div class="total-all">
                <span class="total-all-title">合计：</span><em class="rmb">¥</em><span class="total-price-all">{(Number(this.state.allPrice) + Number(this.state.basicPrice)).toFixed(2)}</span>
              </div>
              {this.state.data.plusFlag == "1" ?
                <Link onClick={() => {
                  this.goToAddItem()
                }} class={recordHealthCardId ? "none" : "phy-addItemBtn"}>我要加项</Link>
                : null
              }
              <button type="button" class="phy-bookingBtn" onClick={() => { this.goToBookingForm() }}>立即预约</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="app-doc">
          {
            isInit ?
              <div class="showLoadingInit">
                <div class="no-data">
                  <p class="no-text">
                    {errormsg}
                  </p>
                </div>
              </div>
              : null

          }
        </div>
      )
    }

  }
}
