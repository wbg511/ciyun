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
      data: "",
      modal1: false,
      modal2: false,
      baseChargeItemList: [],//基础项目列表
      baseChargeStatus: false,//默认收状态
      plusChargeStatus: true,//默认展开状态
      plusChargeItemList: [],//推荐项目列表
      plusChargeItemIds: [],//已添加收费项集合
      packageChargeItemIds: [],//套餐内的收费项集合
      mutexChargeItemIds: [],//互斥的收费项id
      repeatChargeItemIds: [],//重复的收费项id
      titlePrice: 0,
      isLoading:true,
      isNulldata:false,
      errormsg:"正在加载中，请稍后...",
      show:false,

    };
    this.changeStatus = this.changeStatus.bind(this);
    this.gotoBookingForm = this.gotoBookingForm.bind(this);
  }

  componentDidMount() {
    phyInit.title("推荐体检项目");
    this.setState({
      corpId: this.props.params.id
    })
    this.getInfo(this.props);
  }


  componentDidUpdate() {

  }
  onClose(key) {

    this.setState({
      [key]: false,
    });
  }
  showModal(item) { //项目介绍

    this.setState({
      modalTitle: item.name,
      remarks: item.remarks,
      suitPersonRemarks: item.suitPersonRemarks,
      unsuitPersonRemarks: item.unsuitPersonRemarks,
      modal1: true,
    });
  }
  showModal2(title, mes) { //项目重复互斥
    this.setState({
      modalTitle: title,
      modal2: true,
      message: mes,
    })
  }
  gotoBookingForm() { //跳转到预约表单
    let { data, plusChargeItemIds, packageChargeItemIds, corpId,ansValue } = this.state;
    axios({
      url: "/package/validate.json",
      data: {
        "reservationId": data.reservationId || window.localStorage.getItem("reservationId"),
        "corpId": window.localStorage.getItem("corpId"),
        "personId": window.localStorage.getItem("personId"),

      },
      method: "post"
    }).then((response) => {
      if (response.data.code == 0) {
        hashHistory.push({
          pathname: '/bookingForm/',
          query: {
            reservationId: data.reservationId || localStorage.getItem("reservationId"),
            plusChargeItemIds: plusChargeItemIds.join(),
            baseChargeItemIds: packageChargeItemIds.join(),
            corpId: corpId,
            ansValue:ansValue,
          }
        })
      } else {
        Toast.fail(response.data.msg, 3, '', true);
      }

    });


  }
  countPrice(id, type) { //计算总价
    const { plusChargeItemList, titlePrice } = this.state;
    let price, allPrice;
    for (let i = 0; i < plusChargeItemList.length; i++) {
      if (plusChargeItemList[i].id == id) {
        price = plusChargeItemList[i].amount;
        break;
      }
    }
    if (type == "add") {
      allPrice = Number(titlePrice) + price;
    } else {
      allPrice = Number(titlePrice) - price;
    }
    allPrice = allPrice.toFixed(2);
    this.setState({
      titlePrice: allPrice
    })
    return;
  }
  isRepeat(arr1, arr2, arr3) {//arr1表示重复项或互斥项ids arr2表示已添加项或基础项目ids arr3表示表示已添加项，基础项目总对象包含ids
    var boo = false;
    var message = [];
    for (var i = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i])) {
        for (var j = 0; j < arr3.length; j++) {
          if (arr3[j].id == arr1[i]) {
            message.push(arr3[j].name);
          }
        }
        boo = true;
        continue;
      }
    }
    this.setState({
      repeat_message: message.join(",")
    })
    return boo;
  }
  changeChecked(e, item, index) {//切换项目选中状态 总价计算 项目删减计算 项目重复互斥判断
    var isChecked = $(e).is(':checked');
    let { plusChargeItemIds, packageChargeItemIds, plusChargeItemList } = this.state;
    if (!isChecked) {//取消
      for (var i = 0; i < plusChargeItemIds.length; i++) {
        if (plusChargeItemIds[i] == item.id) {
          this.countPrice(item.id, "reduce");
          plusChargeItemIds.splice(i, 1);
          break;
        }
      }
      plusChargeItemList[index].isChecked = false;
      this.setState({
        plusChargeItemIds: plusChargeItemIds,
        plusChargeItemList: plusChargeItemList,
      })

      return false;
    }
    if(plusChargeItemIds.length<=0 && packageChargeItemIds.length<=0){
      this.countPrice(item.id, "add");
      plusChargeItemIds.push(item.id);
      plusChargeItemList[index].isChecked = true;
      this.setState({
        plusChargeItemIds: plusChargeItemIds,
        plusChargeItemList: plusChargeItemList,
      })
      return true;
    }
    axios({
      url: "/package/mutexAndRepeat.json",
      data: {
        "chargeItemId": item.id,//当前添加项目id
        "plusChargeItemIds": plusChargeItemIds,//已添加的收费项目
        "packageChargeItemIds": packageChargeItemIds//套餐内的收费项目
      },
      method: "post"
    }).then((response) => {
      if (response.data.code == 0) {

      } else {
        Toast.fail(response.data.msg, 3, '', true);
        return false;
      }
      const { baseChargeItemList, plusChargeItemList, data } = this.state;
      let { mutexChargeItemIds, repeatChargeItemIds } = response.data.result
      if (this.isRepeat(mutexChargeItemIds, packageChargeItemIds, baseChargeItemList)) {//判断所添加项目是否重复

        this.showModal2("项目互斥", "您选择的项目与套餐中的基础项目【" + this.state.repeat_message + "】的检测内容有部分互斥，请重新选择");
        $(e).prop("checked", "false");

        return false;
      } else if (this.isRepeat(mutexChargeItemIds, plusChargeItemIds, plusChargeItemList)) {
        this.showModal2("项目互斥", "您选择的项目与已添加的项目【" + this.state.repeat_message + "】的检测内容有部分互斥，请重新选择");
        $(e).prop("checked", "false");
        return false;
      } else if (this.isRepeat(repeatChargeItemIds, plusChargeItemIds, plusChargeItemList)) {
        this.showModal2("项目重复", "您选择的项目与已添加的项目【" + this.state.repeat_message + "】有相同检测内容");
        $(e).prop("checked", "false");
        return false;
      }
      else if (this.isRepeat(repeatChargeItemIds, packageChargeItemIds, baseChargeItemList)) {

        this.showModal2("项目重复", "您选择的项目与套餐中的基础项目【" + this.state.repeat_message + "】有相同检测内容");
        $(e).prop("checked", "false");
        return false;
      } else {
        this.countPrice(item.id, "add");
        plusChargeItemIds.push(item.id);
        plusChargeItemList[index].isChecked = true;
        this.setState({
          plusChargeItemIds: plusChargeItemIds,
          plusChargeItemList: plusChargeItemList,
        })


      }
    });
  }
  changeStatus(type) { //控制项目展开收回

    this.setState({
      [type]: !this.state[type]
    })

  }
  getInfo(props) {//初始化渲染
    var ansValue = props.location.query.ansValue;
    var corpId = props.location.query.corpId;
    axios({
      url: "/package/individualDetail.json",
      data: {
        "ansValue": ansValue,
        "corpId": corpId,
      },
      method: "post"
    }).then((response) => {
      this.setState({
        show:true,
      })
      if (response.data.code == 0) {

      } else {
        Toast.fail(response.data.msg, 3, '', true);

        return false;
      }
      var result = response.data.result || "";
      this.setState({
        isLoading:false
      })
      if (result) {
        var plusChargeItemList = result.plusChargeItemList;
        if(plusChargeItemList.length<=0){
          this.setState({
            baseChargeStatus: true,//默认收状态
            plusChargeStatus: false,//默认展开状态
          });
        }
        for (var i = 0; i < plusChargeItemList.length; i++) {
          plusChargeItemList[i].isChecked = false;
        }
        var packageChargeItemIds = result.baseChargeItemList.map((item, index) => {
          return item.id
        })
      } else {//没有数据处理
        this.setState({
          data: result,
          isNulldata:true,
          errormsg:"很遗憾，个性体检预约服务已结束~"
        });
        return false;
      }

      this.setState({
        data: result,
        packageChargeItemIds: packageChargeItemIds,
        baseChargeItemList: result.baseChargeItemList,
        plusChargeItemList: plusChargeItemList,
        titlePrice: result.baseAmount,
        ansValue:ansValue,
        corpId:corpId,
      });

    });
  }
  render() {
    const _this = this;
    let {show, baseChargeStatus, plusChargeStatus, data ,isLoading,errormsg,isNulldata} = this.state;
    const baseChargeItemList = this.state.baseChargeItemList.map((item, index) => {
      return (
        <div class="app-list-item" href="#" key={index}>
          <div class="app-item-bd" onClick={(e) => { _this.showModal(item) }}>{item.name}</div>
        </div>
      )
    })
    const plusChargeItemList = this.state.plusChargeItemList.map((item, index) => {
      return (
        <div class="app-list-item" href="#" key={index}>
          <div class="app-item-bd" onClick={(e) => { _this.showModal(item) }} >{item.name}</div>
          <div class="app-item-ft"><input type="checkbox" checked={item.isChecked ? true : false} class="app-checkBox-phy" name="checkbox" id={"checked" + index} onClick={(e) => { _this.changeChecked(("#checked" + index), item, index) }} /></div>
        </div>
      )
    })
    if(show){
      return (
        <div class="app-doc">

          {data ?
            <div class="app-doc">
              <div class="app-bd special-bd">
                <div class="special-title">
                  <div class="ico-special"></div>
                  <p>根据您的问卷情况</p>
                  <p>我们为您量身定制了以下体检项目~</p>
                </div>
                {
                  baseChargeItemList ?
                    <div class="special-items">
                      <div class="special-items-hd" onClick={(e) => { _this.changeStatus('baseChargeStatus') }}>
                        <h3>基础体检项目（{baseChargeItemList.length}）</h3>
                        <span class={baseChargeStatus ? 'icon-toggle toggle-up' : ' icon-toggle toggle-down'}></span>
                      </div>
                      <div class={baseChargeStatus ? 'special-items-bd' : 'special-items-bd none'}>
                        <div class="special-items-list">
                          <div class="app-list">
                            {baseChargeItemList}
                            <Modal
                              visible={this.state.modal1}
                              transparent
                              maskClosable={false}
                              onClose={() => this.onClose('modal1')}
                              title={this.state.modalTitle}
                              footer={[{ text: '知道了', onPress: () => { this.onClose('modal1'); } }]}

                            >
                              <div style={{ maxHeight:'8rem', overflow: 'scroll' }}>
                                <div className="am-modal-body-text"><span class="title">【项目介绍】：</span><span class="name">{this.state.remarks ? this.state.remarks : "无特殊说明"}</span></div>
                                <div className="am-modal-body-text"><span class="title">【适宜人群】：</span><span class="name">{this.state.suitPersonRemarks ? this.state.suitPersonRemarks : "--"}</span></div>
                                <div className="am-modal-body-text"><span class="title">【禁忌人群】：</span><span class="name">{this.state.unsuitPersonRemarks ? this.state.unsuitPersonRemarks : "--"}</span></div>
                              </div>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                    : null
                }
                {
                  plusChargeItemList.length > 0 ?
                    <div class="special-items">
                      <div class="special-items-hd" onClick={(e) => { _this.changeStatus('plusChargeStatus') }}>
                        <h3>推荐体检项目（{plusChargeItemList.length}）</h3>
                        <span class={plusChargeStatus ? 'icon-toggle toggle-up' : ' icon-toggle toggle-down'}></span>
                      </div>
                      <div class={plusChargeStatus ? 'special-items-bd' : 'special-items-bd none'}>
                        <div class="special-items-list">
                          <div class="app-list">
                            {plusChargeItemList}
                            <Modal
                              visible={this.state.modal2}
                              transparent
                              maskClosable={false}
                              onClose={() => this.onClose('modal2')}
                              title={this.state.modalTitle}
                              footer={[{ text: '知道了', onPress: () => { this.onClose('modal2'); } }]}

                            >
                              <div style={{ height: 100, overflow: 'scroll' }}>
                                {this.state.message}
                              </div>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                    : null
                }

              </div>
              <div class="app-ft phy-ft">
                <div class="phy-ft-total">
                  <div class="total-all">
                    <span class="total-all-title">合计：</span><em class="rmb">¥</em><span class="total-price-all">{this.state.titlePrice}</span>
                  </div>
                  <Link onClick={() => { this.gotoBookingForm() }} class="phy-bookingBtn">立即预约</Link>
                </div>
              </div>
            </div>
            :null
          }
          { isLoading ?
            <div class="showLoadingInit"><div class="no-data"><p class="no-text">{errormsg}
          </p></div></div>
            :null
          }
          { isNulldata ?
            <div class="showLoadingInit"><div class="no-data"><p class="no-text">{errormsg}
          </p></div></div>
            :null
          }
        </div>
      )
    }else{
      return null
    }

  }
}
