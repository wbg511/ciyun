import React, { Component } from "react";
import { Link, IndexLink, hashHistory, Router, Route } from "react-router";
import axios from "../../common/httpAjax";
import phyInit from '../../common/phy.init';
import qs from "qs";
import $ from "jquery";
import { Tabs, WhiteSpace, Badge, PullToRefresh, Button, ListView, Toast } from 'antd-mobile';

var dataBlob = [];//保存列表数据，原始数据

var tabs2 = [
  { title: '套餐预约', sub: '1' },
];
var startX, startY;
export default class Index extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      refreshing: true,
      isLoading: true,
      down: true,
      corpId: 1,
      reservationId: 1,
      type: "",//order
      data: [],
      useBodyScroll: false,
      pageNo: "1",
      pageSize: "100",
      recordList: [],//预约套餐列表
      surveyUrl: "",//问卷地址
      dataSource: ds,
      companyList: [],//体检套餐列表
      priceArr: [["", ""], ["", "1000"], ["1000", "2000"], ["2000", "3000"], ["3000", "4000"], ["4000", "5000"], ["5000", "6000"], ["6000", ""]],//价格数组
      isPackage: false,
      isState: false,
      isSortmask: false,
      isNullData: false,
      isBooked: false,
      isWx: "",
      isInit: false,
      inspState: "",//价格切换状态
      usePerson: "",//使用人群
      amountMin: "",
      amountMax: "",
      bookingListState: false,
      specialState: false,
      companyState: false,
      personalState: true,
      initialPage: parseInt(localStorage.getItem("initialPage")) || 0,//记录tab页面索引
      errormsg: "正在加载中，请稍后...",


    }
    this.onEndReached = this.onEndReached.bind(this);
    this.sortDetails = this.sortDetails.bind(this);
    this.packageShow = this.packageShow.bind(this);
    this.stateShow = this.stateShow.bind(this);
    this.sortmaskShow = this.sortmaskShow.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.stateSearch = this.stateSearch.bind(this);
    this.stateReset = this.stateReset.bind(this);
    this.gotoQuestion = this.gotoQuestion.bind(this);
    this.MyBody = this.MyBody.bind(this);
    this.orderHtml = this.orderHtml.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
  }
  init() {
    tabs2 = [
      { title: '套餐预约', sub: '1' },
    ];
    dataBlob = [];
    var urlParms = this.props.location.query;
    var isWx = urlParms.isWx || "";
    if (isWx) {
      window.localStorage.clear();
      var personId = urlParms.personId;
      var hmoId = urlParms.hmoId;
      var payOpenId = urlParms.payOpenId;
      localStorage.setItem("personId", personId);
      localStorage.setItem("hmoId", hmoId);
      localStorage.setItem("payOpenId", payOpenId);
      localStorage.setItem("isWx", isWx);
    }
    var corpId = urlParms.corpId;
    localStorage.setItem("corpId", corpId);
    localStorage.removeItem('allProjectArr');
    axios({
      url: "/package/count.json",
      data: {
        "corpId": corpId,
        "personId": window.localStorage.getItem("personId")
      },
      method: "post"
    }).then((response) => {

      let result = response.data.result;
      var { specialState, companyState, bookingListState, personalState } = this.state;
      if (response.data.code == 0) {
        phyInit.title(result.corpName);
        if (result.personalCount > 0) {//常规体检判断是否为空
          if (this.isRepeat("1")) {
            tabs2.push({ title: '套餐预约', sub: '1' });
          }
          this.getBookingList()
        } else {
          personalState = false;
          var errormsg = "套餐预约正在筹备中，敬请期待~";
        }
        if (result.individualCount > 0) {//个性体检判断是否为空
          if (this.isRepeat("2")) {
            tabs2.splice(1, 0, { title: '个性推荐', sub: '2' });
          }
          specialState = true;
          this.getSpecialInfo();
        }
        if (result.staffCount > 0) {//职工数量判断是否为空
          if (this.isRepeat("3")) {
            tabs2.push({ title: '单位体检', sub: '3' });
          }
          companyState = true;
          this.getCompanyList()
        }
        if (result.individualCount == 0 && result.staffCount == 0) { //判断如果都为空不展示tab
          bookingListState = false
        } else {
          bookingListState = true;
        }
        this.setState({
          corpId: corpId,
          isWx: isWx,
          "specialState": specialState,
          "bookingListState": bookingListState,
          "companyState": companyState,
          "personalState": personalState,
          errormsg: errormsg,
          isInit:true,

        });
      } else {
        Toast.fail(response.data.msg, 3, '', true);
      }

    });

  }
  isRepeat(sub) {
    for (let i = 0; i < tabs2.length; i++) {
      if (tabs2[i].sub == sub) {
        return false;
      }
    }
    return true;
  }
  componentDidMount() {
    this.init();
    //用于计算列表范围高度
    let l = 100 * (750 ? Math.min(document.documentElement.clientWidth, 750 * window.devicePixelRatio) : document.documentElement.clientWidth) / 750;
    var hei = document.documentElement.clientHeight - (l * 0.86);
    setTimeout(() => {
      this.setState({
        height: hei,
      });
    }, 600);

  }

  //个性推荐
  getSpecialInfo() {
    axios({
      url: "/package/individualInfo.json",
      data: {
        "corpId": this.props.location.query.corpId,
        "personId": window.localStorage.getItem("personId")
      },
      method: "post"
    }).then((response) => {

      // this.setState({
      //   orgList:response.data.result.list
      // });
      if (response.data.hasOwnProperty("result")) {

        this.setState({
          surveyUrl: response.data.result.surveyUrl,
          reservationId: response.data.result.reservationId,
        })
      }
    });
  }
  //套餐预约
  getBookingList() {
    let { pageNo, bookingListState, errormsg } = this.state;
    axios({
      url: "/package/list.json",
      data: {
        "corpId": this.props.location.query.corpId,
        "personId": window.localStorage.getItem("personId"),
        "pageNo": this.state.pageNo,
        "pageSize": 100,
        "usePerson": this.state.usePerson,
        "order": this.state.type,
        "amountMax": this.state.amountMax,
        "amountMin": this.state.amountMin
      },
      method: "post"
    }).then((response) => {

      //一共有查询出数据量
      const listData = response.data.result.list.length;
      //判断是否是首屏无数据
      var isBooked = true;
      if (pageNo == 1 && listData == 0 && bookingListState) {
        isBooked = false;
        var errormsg = "套餐预约正在筹备中，敬请期待~";
      }
      //每次加载数据pageNo需要加一
      const newPageNo = response.data.result.pageNo + 1;
      var NewIsLoading = false;
      var NewIsNullData = false;
      //判断是否有数据
      if (listData == 0 && response.data.result.pages == 0) {
        dataBlob.splice(0, dataBlob.length);
        NewIsNullData = true;
      }
      //最后一条数据判断是否需要继续加载
      if (response.data.result.pages == this.state.pageNo) {
        NewIsLoading = true;
      }
      //进行新老数据的合并处理
      for (let i = 0; i < response.data.result.list.length; i++) {
        const ii = (response.data.result.pageNo * this.state.pageSize) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;

      }

      this.setState({
        isNullData: NewIsNullData,
        pageNo: newPageNo,
        recordList: response.data.result.list,
        isLoading: NewIsLoading,
        dataSource: this.state.dataSource.cloneWithRows(dataBlob),
        isBooked: isBooked,
        errormsg: errormsg,
      });
    });
  }
  //单位体检
  getCompanyList() {
    axios({
      url: "/package/staffList.json",
      data: {
        "corpId": this.props.location.query.corpId,
        "personId": window.localStorage.getItem("personId"),
      },
      method: "post"
    }).then((response) => {

      this.setState({
        companyList: response.data.result.list
      });

    });
  }
  //触底执行
  onEndReached() {

    if (this.state.isLoading) {
      return false;
    }
    this.getBookingList();
  }
  //跳转套餐详情
  gotoDetails(item) {
    let { corpId } = this.state;
    hashHistory.push({
      pathname: '/booking/details/' + corpId + '/' + item.reservationId,
    })

  }
  //跳转预约表单
  goToBookingForm(item) {
    if (item.source == '2') {//火箭蛙处理地址
      hashHistory.push({
        pathname: '/huojianwa/',
        query: {
          recordId: item.recordId,
        }
      })
    } else {
      hashHistory.push({
        pathname: '/bookingForm/',
        query: {
          reservationId: item.reservationId,
          corpId: window.localStorage.getItem("corpId"),
        }
      })
    }


  }
  //跳转问卷答题页面
  gotoQuestion() {
    var { surveyUrl, reservationId } = this.state;
    var url = surveyUrl + window.location.origin + window.location.pathname + "@@@/special/details/" + localStorage.getItem("corpId") + "?corpId=" + localStorage.getItem("corpId");

    axios({
      url: "/package/validate.json",
      data: {
        "reservationId": reservationId,
        "corpId": window.localStorage.getItem("corpId"),
        "personId": window.localStorage.getItem("personId"),
        "plusFlag": 1,
      },
      method: "post"
    }).then((response) => {
      if (response.data.code == 0) {
        window.location.href = url;
      } else {
        Toast.fail(response.data.msg, 3, () => window.location.reload(), true);

      }

    });
  }
  //排序套餐
  sortDetails(event) {
    this.lv.scrollTo(0, 0);
    const target = event.target;
    const value = target.value;
    dataBlob.splice(0, dataBlob.length);
    this.setState({
      type: value,
      isPackage: false,
      isState: false,
      isSortmask: false,
      pageNo: 1,
      dataSource: this.state.dataSource.cloneWithRows(dataBlob),
    }, function () {
      this.getBookingList();
    });
  }
  sortmaskShow() {
    $("#checkbox-filter-1").prop("checked", false);
    $("#checkbox-filter-2").prop("checked", false);
    this.setState({
      isPackage: false,
      isState: false,
      isSortmask: false
    });
  }
  packageShow(event) {
    this.setState({
      isPackage: true,
      isState: false,
      isSortmask: true
    });
  }
  stateShow(event) {
    this.setState({
      isPackage: false,
      isState: true,
      isSortmask: true
    });
  }
  //选中传值
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let amountMax = this.state.amountMax;
    let amountMin = this.state.amountMin;
    if (name == 'inspState') {
      amountMin = this.state.priceArr[parseInt(value ? value : 0)][0];
      amountMax = this.state.priceArr[parseInt(value ? value : 0)][1];
    }
    this.setState({
      [name]: value,
      "amountMax": amountMax,
      "amountMin": amountMin
    });

  }
  //状态搜索
  stateSearch() {
    this.lv.scrollTo(0, 0);
    dataBlob.splice(0, dataBlob.length);
    this.setState({
      isPackage: false,
      isState: false,
      isSortmask: false,
      pageNo: 1,
      dataSource: this.state.dataSource.cloneWithRows(dataBlob)
    }, function () {
      this.getBookingList();
    });
  }
  //重置状态
  stateReset() {
    this.setState({
      usePerson: "",
      amountMax: "",
      amountMin: "",
      inspState: "",

    })
  }
  //没有数据返回的样式
  MyBody() {
    return (
      <div style={{ height: this.state.height, position: "relative" }}>
        <div className="no-data">
          <div className="no-text">
            没有查询到符合条件的体检预约套餐~
          </div>
        </div>
      </div>
    )
  }
  goToHistroy() {
    hashHistory.push({
      pathname: "/histroy",
      query: {
        personId: localStorage.getItem("personId"),
        hmoId: localStorage.getItem("hmoId"),
        payOpenId: localStorage.getItem("payOpenId"),
        isWx: localStorage.getItem("isWx"),
      }
    })
  }
  //预约记录
  orderHtml() {
    var _this = this;
    return (
      <Link class="histroy_fixGo" onClick={() => {
        _this.goToHistroy()
      }} >预约记录</Link>
    )
  }
  touchStart(ev) {
    startX = ev.touches[0].pageX;
    startY = ev.touches[0].pageY;
    return false;
  }
  touchEnd(ev) {
    var endX, endY;
    endX = ev.changedTouches[0].pageX;
    endY = ev.changedTouches[0].pageY;
    var direction = this.GetSlideDirection(startX, startY, endX, endY);
    switch (direction) {
      case 0:
        break;
      case 1:
        // 向上
        break;
      case 2:
        // 向下
        break;

      default:
    }
  }
  GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    //var dx = endX - startX;
    var result = 0;
    if (dy > 0) {//向上滑动
      result = 1;
    } else if (dy < 0) {//向下滑动
      result = 2;
    }
    else {
      result = 0;
    }
    return result;
  }
  //套餐预约
  render() {
    //套餐列表 因为dataBlob以0为初始所以计算数据长度需要 index-1
    let _this = this;
    let index = this.state.recordList.length - 1;
    let inde1 = this.state.recordList.length - 1;
    const row = (rowData, sectionId, rowID) => {
      if (index < 0) {
        index = this.state.recordList.length - 1;
      }
      const obj = this.state.recordList[inde1 - index--];

      return (
        <a class="app-list-item" onClick={() => { this.gotoDetails(obj) }}>
          <div class="app-item-bd">
            <div class="booking-infoBox">
              <div class="booking-img">
                <img src={obj.image
                  ? obj.image
                  : require('../../static/images/booking-img.png')} alt="" />
              </div>
              <div class="booking-intro">
                <h3 class="booking-name-1 app-txt-nowrap">{obj.name}</h3>
                <div class="booking-price">
                  <span class="price-sale">
                    <em class="rmb">¥</em><span class="rmb-sale">{obj.amount}</span>
                  </span>
                  <span class="price-old">
                    <em class="rmbOld">原价：</em><del class="rmbOld-sale">¥{obj.originAmount}</del>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="app-item-ft app-arr-phy"></div>
        </a>
      )
    };
    //体检套餐列表渲染
    const copanyItem = this.state.companyList.map((item, index) => {
      return (
        <Link onClick={() => {
          this.goToBookingForm(item)
        }} class="app-list-item" key={index}>
          <div class="app-item-bd">
            <div class="company-infoBox">
              <div class="company-img">
                <img src={require("../../static/images/company-img.png")} alt="" />
              </div>
              <div class="company-intro">
                <h3 class="company-booking-name">{item.name}</h3>
                <div class="company-address">
                  {item.address}
                </div>
              </div>
            </div>
          </div>
          <div class="app-item-ft app-arr-phy"></div>
        </Link>
      )
    })
    //套餐预约
    let setMeal = () => {
      return (
        <div class="app-doc">

          <div class="bookingSort" id="bookingSort" style={{ top: '0' }} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
            <div class="bookingSort-tab">
              <ul class="app-sortTab">
                <li class="app-sortTab-item" >
                  <input type="radio" class="app-radio-filter" name="checkbox-filter" id="checkbox-filter-1" value="1" onClick={this.packageShow} />
                  <label for="checkbox-filter-1">排序</label>
                </li>
                <li class="app-sortTab-item">
                  <input type="radio" class="app-radio-filter" name="checkbox-filter" id="checkbox-filter-2" value="2" onClick={this.stateShow} />
                  <label for="checkbox-filter-2">筛选</label>
                </li>
              </ul>
            </div>
            <div class="bookingSort-tabMain">
              {isPackage ?
                <div class="bookingSort-content" id="checkbox-filter-1-main">
                  <div class="app-list app-list-bookingSort">
                    <label class="app-list-item">
                      <div class="app-item-bd"><input type="radio" class="app-radio-arrPhy" name="checkbox-arrow" defaultChecked={this.state.type == "" ? true : false} defaultValue="" id="checkbox-1" onClick={this.sortDetails} /><span class="bookingSort-type">默认</span></div>
                    </label>
                    <label class="app-list-item">
                      <div class="app-item-bd"><input type="radio" class="app-radio-arrPhy" name="checkbox-arrow" id="checkbox-2" defaultChecked={this.state.type == 1 ? true : false} defaultValue="1" onClick={this.sortDetails} /><span class="bookingSort-type">预约量由高到低</span></div>
                    </label>
                    <label class="app-list-item">
                      <div class="app-item-bd"><input type="radio" class="app-radio-arrPhy" name="checkbox-arrow" id="checkbox-3" defaultChecked={this.state.type == 3 ? true : false} defaultValue="3" onClick={this.sortDetails} /><span class="bookingSort-type">价格由高到低</span></div>
                    </label>
                    <label class="app-list-item">
                      <div class="app-item-bd"><input type="radio" class="app-radio-arrPhy" name="checkbox-arrow" id="checkbox-4" defaultChecked={this.state.type == 2 ? true : false} defaultValue="2" onClick={this.sortDetails} /><span class="bookingSort-type">价格由低到高</span></div>
                    </label>
                  </div>
                </div>
                : null}
              {isState ?
                <div class="bookingSort-content" id="checkbox-filter-2-main">
                  <div class="bookingSort-bd">
                    <div class="bookingSort-list">
                      <p class="bookingSort-title">价格：</p>
                      <div class="bookingSort-titleMain">
                        <ul class="sort-list clearfix">
                          <li>
                            <input type="radio" checked={this.state.inspState == "" ? true : false} name="inspState" defaultValue="" class="app-radio-cell" id="radioArrowspc-1" onChange={this.handleInputChange} />
                            <label for="radioArrowspc-1">不限</label>
                          </li>
                          <li>
                            <input type="radio" checked={this.state.inspState == "1" ? true : false} name="inspState" defaultValue="1" class="app-radio-cell" id="radioArrowspc-2" onChange={this.handleInputChange} />
                            <label for="radioArrowspc-2">1000元以下</label>
                          </li>
                          <li>
                            <input type="radio" checked={this.state.inspState == "2" ? true : false} name="inspState" defaultValue="2" class="app-radio-cell" id="radioArrowspc-3" onChange={this.handleInputChange} />
                            <label for="radioArrowspc-3">1000-2000元</label>
                          </li>
                          <li>
                            <input type="radio" checked={this.state.inspState == "3" ? true : false} name="inspState" defaultValue="3" class="app-radio-cell" id="radioArrowspc-4" onChange={this.handleInputChange} />
                            <label for="radioArrowspc-4">2000-3000元</label>
                          </li>
                          <li>
                            <input type="radio" checked={this.state.inspState == "4" ? true : false} name="inspState" defaultValue="4" class="app-radio-cell" id="radioArrowspc-5" onChange={this.handleInputChange} />
                            <label for="radioArrowspc-5">3000-4000元</label>
                          </li>
                          <li>
                            <input type="radio" checked={this.state.inspState == "5" ? true : false} name="inspState" defaultValue="5" class="app-radio-cell" id="radioArrowspc-6" onChange={this.handleInputChange} />
                            <label for="radioArrowspc-6">4000-5000元</label>
                          </li>
                          <li>
                            <input type="radio" checked={this.state.inspState == "6" ? true : false} name="inspState" defaultValue="6" class="app-radio-cell" id="radioArrowspc-7" onChange={this.handleInputChange} />
                            <label for="radioArrowspc-7">5000-6000元</label>
                          </li>
                          <li>
                            <input type="radio" checked={this.state.inspState == "7" ? true : false} name="inspState" defaultValue="7" class="app-radio-cell" id="radioArrowspc-8" onChange={this.handleInputChange} />
                            <label for="radioArrowspc-8">6000元以上</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="bookingSort-list">
                      <p class="bookingSort-title">性别：</p>
                      <div class="bookingSort-titleMain">
                        <ul class="sort-list clearfix">
                          <li>
                            <input type="radio" class="app-radio-cell" name="usePerson" checked={this.state.usePerson == "" ? true : false} defaultValue="" id="radioArrowspc-sex-1" onChange={this.handleInputChange} />
                            <label for="radioArrowspc-sex-1">不限</label>
                          </li>
                          <li>
                            <input type="radio" class="app-radio-cell" name="usePerson" checked={this.state.usePerson == "1" ? true : false} defaultValue="1" id="radioArrowspc-sex-2" onChange={this.handleInputChange} />
                            <label for="radioArrowspc-sex-2">男</label>
                          </li>
                          <li>
                            <input type="radio" class="app-radio-cell" name="usePerson" checked={this.state.usePerson == "2" ? true : false} defaultValue="2" id="radioArrowspc-sex-3" onChange={this.handleInputChange} />
                            <label for="radioArrowspc-sex-3">女</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="bookingSort-ft">
                    <div class="bookingSort-btn-group">
                      <button class="bookingSort-btn bookingSort-cancelBtn" onClick={this.stateReset}>重置</button>
                      <button class="bookingSort-btn bookingSort-confirmBtn" onClick={this.stateSearch}>确认</button>
                    </div>
                  </div>
                </div>
                : null}
            </div>
          </div>
          {isSortmask ?
            <div className="sortmask" id="sortmask" onClick={this.sortmaskShow}></div>
            : null}
          <div class="app-bd orgArea-bd">

            {isNullData ?
              <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderBodyComponent={() => <this.MyBody />}
                renderRow={(rowData, sectionId, rowID) => row(rowData, sectionId, rowID)}
                style={{
                  height: this.state.height,
                  overflow: 'auto',
                }}
              />
              :
              <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderFooter={() => (
                  this.state.isLoading ? <div style={{ textAlign: 'center' }}>加载完成</div> : null
                )}
                renderRow={(rowData, sectionId, rowID) => row(rowData, sectionId, rowID)}
                style={{
                  height: this.state.height,
                  overflow: 'auto',
                  top: "0.86rem",
                }}
                pageSize={100}
                scrollRenderAheadDistance={1}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
              />
            }


          </div>
        </div>
      )
    }
    //个性推荐
    let specialHtml = () => {
      return (
        <div class="app-doc">
          <div class="app-bd orgArea-bd">
            <div class="special-box">
              <img src={require("../../static/images/special-intro-1.png")} alt="" />
              <img src={require("../../static/images/special-intro-2.png")} alt="" />
            </div>
          </div>
          <div class="app-ft phy-ft">
            <button class="phy-specialBtn" onClick={this.gotoQuestion}>立即定制</button>
          </div>
        </div>
      )
    }
    //单位体检
    let componyHtml = () => {
      return (
        <div class="app-doc">
          <div class="app-bd orgArea-bd">
            <div class="phy-list-company">
              <div class="app-list">
                {copanyItem}
              </div>
            </div>
          </div>
        </div>
      )
    }
    let { isInit, isSortmask, isPackage, isState, isNullData, bookingListState, initialPage, isWx, specialState, companyState, isBooked, errormsg, personalState } = this.state
    return (
      <div>
        {
          isInit ?
            <div style={{ height: document.documentElement.clientHeight }}>
              {
                isWx ?
                  <this.orderHtml />
                  : null
              }
              {bookingListState ?
                <Tabs tabs={tabs2}
                  swipeable={false}
                  page={initialPage}
                  initialPage={initialPage}
                  onTabClick={(tab, index) => {
                    window.localStorage.setItem("initialPage", index), _this.setState({
                      initialPage: index
                    })
                  }}
                  tabBarPosition="top"
                  renderTab={tab => <span>{tab.title}</span>}
                >
                  {/* 套餐预约 */}
                  {personalState ?
                    setMeal() :
                    <div class="showLoadingInit">
                      <div class="no-data">
                        <p class="no-text">
                          {errormsg}
                        </p>
                      </div>
                    </div>}
                  {/* 个性推荐 */}
                  {specialState ?
                    specialHtml
                    : componyHtml}


                  {/* 单位体检 */}

                  {componyHtml}

                </Tabs>
                : isBooked
                  ?
                  setMeal()
                  :
                  <div class="showLoadingInit">
                    <div class="no-data">
                      <p class="no-text">
                        {errormsg}
                      </p>
                    </div>
                  </div>
              }

            </div>
            : null
        }
      </div>


    )
  }
}
