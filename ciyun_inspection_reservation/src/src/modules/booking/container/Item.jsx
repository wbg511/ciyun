import React, { Component } from "react";
import { Link, IndexLink, hashHistory, Router, Route } from "react-router";
import phyInit from '../../common/phy.init';
import axios from "../../common/httpAjax";
import qs from "qs";
import $ from "jquery";
import { Modal, List, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';



export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      show: false,
      modal1: false,
      modal2: false,
      curProject: {},
      allPrice: 0,//总金额
      allProjectNum: 0,//总添加项目个数
      "corpId": 1, //体检中心id
      "plusFlag": 1, //是否可添加项目
      reservationId: 1,//number 配置id
      allProjectArr: [],//总添加项目
      projectArr: [],
      personId: 1,
      corpId: 1,
      plusChargeItemIds: [],//已添加收费项集合
      packageChargeItemIds: [],//套餐内的收费项集合
      mutexChargeItemIds: [],//互斥的收费项id
      repeatChargeItemIds: [],//重复的收费项id
      surveyUrl: "",//个性化推荐路径
      isInit:false,

    }
    this.allPrice = this.allPrice.bind(this);
  }
  init(props) {
    const chargeItemList = JSON.parse(window.localStorage.getItem("chargeItemList"));

    const allProjectArr = JSON.parse(window.localStorage.getItem("allProjectArr")) || [];
    const basicPrice = window.localStorage.getItem("basicPrice");
    let plusChargeItemIds = allProjectArr.map((item, index) => item.id);
    let allPrice = 0 + Number(basicPrice);
    for (var i = 0; i < allProjectArr.length; i++) {
      allPrice += allProjectArr[i].amount;
    }
    const packageChargeItemIds = chargeItemList.map((item, index) => {
      return item.id;
    })

    this.setState({
      "allProjectArr": allProjectArr,
      "chargeItemList": chargeItemList,
      "packageChargeItemIds": packageChargeItemIds,
      "corpId": localStorage.getItem("corpId"),
      plusChargeItemIds: plusChargeItemIds,
      allPrice: allPrice,
      plusFlag: localStorage.getItem("plusFlag"),
    })
  }
  showModal(key, item) {
    this.setState({
      [key]: true,
      "curProject": item
    })

  }
  onClose(key) {
    this.setState({
      [key]: false,
    });
  }
  componentDidMount() {
    phyInit.title("添加体检项目");
    this.init(this.props);
    axios({ //请求查询全部检查项目
      url: "/package/chargeItemAll.json",
      data: {
        "corpId": window.localStorage.getItem("corpId"),
        "plusFlag": localStorage.getItem("plusFlag")
      },
      method: "post"
    }).then((response) => {
      if (response.data.code == 0) {
      } else {
        Toast.fail(response.data.msg, 3, '', true);
        return false;
      }
      var result = response.data.result;
      let packageChargeItemIds = this.state.packageChargeItemIds;
      let plusChargeItemIds = this.state.plusChargeItemIds;
      const projectArr = [];
      for (var i in result.categoryList) {
        for (var j in result.categoryList[i].chargeItemList) {
          result.categoryList[i].chargeItemList[j].isChecked = false;
          if (packageChargeItemIds.includes(result.categoryList[i].chargeItemList[j].id) || plusChargeItemIds.includes(result.categoryList[i].chargeItemList[j].id)) {
            result.categoryList[i].chargeItemList[j].isChecked = true;
          } else {
            result.categoryList[i].chargeItemList[j].isChecked = false;
          }

          projectArr.push(result.categoryList[i].chargeItemList[j]);
        }
      }

      this.setState({
        show: true,
        data: response.data.result,
        projectArr: projectArr,
        isInit:true,
      });
    });
    axios({//请求个性化体检信息
      url: "/package/individualInfo.json",
      data: {
        "corpId": window.localStorage.getItem("corpId"),
        "personId": window.localStorage.getItem("personId")
      },
      method: "post"
    }).then((response) => {
      var result = response.data.result || "";
      if (response.data.code == 0) {
        if (result) {
          this.setState({
            surveyUrl: result.surveyUrl
          });
        }
      } else {
        Toast.fail(response.data.msg, 3, '', true);
      }

    });

  }
  changeActive(item, t) {//切换项目状态
    $(".app-tab-normal li").removeClass("cur");
    $(".app-list").removeClass('cur');
    $(t).addClass("cur");
    var index = $(".app-tab-normal li").index($(t));
    $(".app-tab-content .app-list").eq(index).addClass('cur');

  }
  isRepeat(arr1, arr2, arr3) {
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
    if (boo) {
      this.setState({
        repeat_message: message.join(",")
      })
    }


    return boo;
  }
  showModal2(title, mes) { //项目重复互斥
    this.setState({
      modalTitle: title,
      modal2: true,
      message: mes,
    })
  }
  allPrice(e, item, index, num) {//计算总额以及总添加项目
    let allProjectArr = this.state.allProjectArr;
    let _this = this;
    var isChecked = $(e).is(':checked');
    let { plusChargeItemIds, packageChargeItemIds, mutexChargeItemIds, repeatChargeItemIds, data, chargeItemList } = this.state
    if (!isChecked) {
      for (var i = 0; i < plusChargeItemIds.length; i++) {
        if (plusChargeItemIds[i] == item.id) {
          plusChargeItemIds.splice(i, 1);
          allProjectArr.splice(i, 1);
        }
      }
      data.categoryList[num].chargeItemList[index].isChecked = false;
      add_reduce_price();
      return false;
    }
    if(plusChargeItemIds.length<=0 && packageChargeItemIds.length<=0){
      plusChargeItemIds.push(item.id);
      allProjectArr.push(item);
      $(e).prop("checked", true);
      data.categoryList[num].chargeItemList[index].isChecked = true;
      add_reduce_price();
      return true;
    }
    axios({
      url: "/package/mutexAndRepeat.json",
      data: {
        "chargeItemId": item.id,
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
      let { mutexChargeItemIds, repeatChargeItemIds } = response.data.result
       if (this.isRepeat(repeatChargeItemIds, packageChargeItemIds, chargeItemList)) {
        this.showModal2("项目重复", "您选择的项目与套餐中的基础项目【" + this.state.repeat_message + "】有相同检测内容");
        $(e).prop("checked", "false");
        var isChecked = $(e).is(':checked');

        return false;
      } 
      else if (this.isRepeat(repeatChargeItemIds, plusChargeItemIds, allProjectArr)) {
        this.showModal2("项目重复", "您选择的项目与已添加的项目【" + this.state.repeat_message + "】有相同检测内容");
        $(e).prop("checked", "false");
        return false;
      }
      else if (this.isRepeat(mutexChargeItemIds, packageChargeItemIds, chargeItemList)) {//判断所添加项目是否重复
        this.showModal2("项目互斥", "您选择的项目与套餐中的基础项目【" + this.state.repeat_message + "】的检测内容有部分互斥，请重新选择");
        $(e).prop("checked", "false");
        return false;
      } else if (this.isRepeat(mutexChargeItemIds, plusChargeItemIds, allProjectArr)) {
        this.showModal2("项目互斥", "您选择的项目与已添加的项目【" + this.state.repeat_message + "】的检测内容有部分互斥，请重新选择");
        $(e).prop("checked", "false");
        return false;
      }else {
        plusChargeItemIds.push(item.id);
        allProjectArr.push(item);
        $(e).prop("checked", true);
        data.categoryList[num].chargeItemList[index].isChecked = true;
        add_reduce_price();
      }

    });
    function add_reduce_price() {
      var price = 0;
      var allProjectNum = 0;
      var basicPrice = Number(window.localStorage.getItem("basicPrice"));
      
      $('.app-checkBox-phy').each(function () {
        var _this = $(this);
        if (_this.is(':checked') && !_this.attr("disabled")) {
          price += Number(_this.attr("data-amount"));
        }
      });
      _this.setState({
        allPrice:basicPrice+price,
        allProjectNum: allProjectNum,
        allProjectArr: allProjectArr,
        data: data
      });
    }
  }
  goToQuestion() {
    axios({
      url: "/package/validate.json",
      data: {
        "reservationId": window.localStorage.getItem("reservationId"),
        "corpId": window.localStorage.getItem("corpId"),
        "personId": window.localStorage.getItem("personId"),
        "individualFlag": 1,
        "plusFlag": 1,
      },
      method: "post"
    }).then((response) => {
      if (response.data.code == 0) {
        var url = this.state.surveyUrl + window.location.origin + window.location.pathname + "@@@/booking/recommend/" + localStorage.getItem("corpId") + "?corpId=" + localStorage.getItem("corpId");
        window.location.href = url;
      } else {
        Toast.fail(response.data.msg, 3, '', true);
      }

    });

  }
  goToDetail() {
    let { allProjectArr, reservationId, corpId, personId, allPrice } = this.state;
    window.localStorage.setItem('allProjectArr', JSON.stringify(allProjectArr));
    Toast.loading("", 1, function () {
      hashHistory.push({
        pathname: '/booking/details/' + localStorage.getItem("corpId") + "/" + localStorage.getItem("reservationId"),
        query: {
          corpId: localStorage.getItem("corpId"),
          reservationId: localStorage.getItem("reservationId"),
        },
        state: {
          allProjectArr: allProjectArr,
          reservationId: reservationId,
          corpId: corpId,
          personId: personId,
          allPrice: allPrice
        }
      })
    }, true)

  }
  render() {
    const _this = this;
    const {isInit, show, packageChargeItemIds, projectArr, surveyUrl } = this.state;

    if (show) {

      const categoryList = this.state.data.categoryList.map((item, index) => {
        return (
          <li className={index ? "" : "cur"} onClick={(e) => { this.changeActive(item, e.currentTarget) }} key={index}><a href="javascript:;"><p className="app-txt-nowrap-2">{item.name}</p></a></li>
        )
      });
      const projectList = this.state.data.categoryList.map((item, num) => {
        const item_list = item.chargeItemList.map((i, index) => {

          return (
            <div key={index} class="app-list-item" key={index} data-name={i.name}>
              <div onClick={() => this.showModal('modal1', i)} class="app-item-bd"><div className="app-txt-nowrap-2">{i.name}</div></div>
              <div class="app-item-ft"><input type="checkbox" class="app-checkBox-phy" name="checkbox" id={"checkbox" + index + num} onChange={(e) => this.allPrice("#checkbox" + index + num, i, index, num)} data-amount={i.amount} checked={i.isChecked ? true : false} data-num={num} defaultValue={index} disabled={i.plusFlag != "1" || packageChargeItemIds.includes(i.id) ? "disabled" : ""} /></div>
            </div>

          )
        });
        return (
          <div class={num ? "app-list" : "app-list cur"} key={num} data-name={item.name}>
            {item_list}
          </div>
        )
      });
      return (
        <div class="app-doc">
          <div class="app-bd bookingDetails-items-bd">
            <div class="app-tab-scroll">
              <ul class="app-tab-normal">
                {categoryList}
              </ul>
              <div class="app-tab-content bookingDetails-itemsAdd">
                {projectList}
              </div>
            </div>
          </div>
          {categoryList.length>0?
            <div class="app-ft phy-ft">
              <div class="phy-ft-total">
                <div class="total-all">
                  <span class="total-all-title">合计：</span><em class="rmb">¥</em><span class="total-price-all">{(Number(this.state.allPrice)).toFixed(2)}</span>
                </div>
                {surveyUrl ?
                  <Link onClick={() => {
                    this.goToQuestion()
                  }} class="phy-recommendBtn">个性推荐</Link>
                  : null
                }

                <Link onClick={() => {
                  this.goToDetail()
                }} class="phy-confirmAddBtn">确定添加</Link>
              </div>
            </div>
            : <div class="showLoadingInit"><div class="no-data"><p class="no-text">暂无可添加的体检项目
            </p></div></div>
          }

          <Modal
            visible={this.state.modal1}
            transparent
            maskClosable={false}
            onClose={() => this.onClose('modal1')}
            title={this.state.curProject.name}
            footer={[{ text: '知道了', onPress: () => { this.onClose('modal1') } }]}
          >
            <div style={{ maxHeight:'8rem', overflow: 'scroll'}}>
              <div class="am-modal-body-text"><span class="title">【项目介绍】：</span><span class="name">{this.state.curProject.remarks ? this.state.curProject.remarks : "无特殊说明"}</span></div>
              <div class="am-modal-body-text "><span class="title">【适宜人群】：</span><span class="name">{this.state.curProject.suitPersonRemarks ? this.state.curProject.suitPersonRemarks : "--"}</span></div>
              <div class="am-modal-body-text "><span class="title">【禁忌人群】：</span><span class="name">{this.state.curProject.unsuitPersonRemarks ? this.state.curProject.unsuitPersonRemarks : "--"}</span></div>

            </div>
          </Modal>
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

      )
    } else {
      return (
        <div></div>
      )
    }


  }
}
