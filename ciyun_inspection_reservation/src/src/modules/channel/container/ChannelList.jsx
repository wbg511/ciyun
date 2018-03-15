import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import axios from "../../common/httpAjax";
import phyInit from '../../common/phy.init';
import qs from "qs";
import $ from "jquery";
import {Toast} from 'antd-mobile';
import Tloader from 'react-touch-loader';
import "../../common/common";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.maskClose = this.maskClose.bind(this);
    this.getCitys = this.getCitys.bind(this);
    this.setCurCity = this.setCurCity.bind(this);
    this.scrollToAnchor = this.scrollToAnchor.bind(this);

    this.state = {
      showOrgList: true,
      isPosition: false,
      isPositionLoading: true,
      orgList: [],
      cityList: [],
      cityListLetter: [],
      curLetter:"",
      letterShow:false,
      maskShow: false,
      isBooked: false,
      loadCurCity: ""
        ? ""
        : "定位中...",
      personId: this.props.location.query.personId,
      cityCode: "",
      hasMore: 0,
      pageNo: 1,
      lat: "",
      lng: "",
      title: ""
    }
  }
  componentDidMount() {
    console.log(123);
    phyInit.title("选择机构");
    var urlParms = this.props.location.query;
    var personId = urlParms.personId;
    var payOpenId = urlParms.payOpenId;
    var isWx = urlParms.isWx;
    localStorage.setItem("personId", personId);
    localStorage.setItem("isWx", isWx);
    if (payOpenId != undefined) {
      localStorage.setItem("payOpenId", payOpenId);
    }
    localStorage.removeItem("chargeItemList");
    localStorage.removeItem("reservationId");
    localStorage.removeItem("corpId");
    localStorage.removeItem("basicPrice");
    const _this = this;
    if (typeof window.ciyun != 'undefined' && typeof window.ciyun.isInApp != 'undefined') {
      //android处理
      if(window.sessionStorage.hasOwnProperty("channelList")&&window.sessionStorage.getItem("channelList")!='undefined'){
        const obj=JSON.parse(sessionStorage.getItem("channelList"));
        _this.setState({
          showOrgList: true,
          orgList: obj.list,
          isBooked: false,
          cityCode: obj.cityCode,
          loadCurCity: obj.cityName,
          lat: window.localStorage.getItem('lat'),
          lng: window.localStorage.getItem('lng'),
          isPosition: false,
          isPositionLoading: false
        });
      }else{
        setTimeout(() => {
          if (typeof window.ciyun != 'undefined' && typeof window.ciyun.h5loadFinish != 'undefined') {
            if (typeof JS_Call_APP != "undefined") {
              JS_Call_APP('getLocation', '', function(status, msg) {
                if (status == 1) {
                  var position = JSON.parse(msg);
                  window.localStorage.setItem('lat', position.latitude);
                  window.localStorage.setItem('lng', position.longitude);
                  if(window.localStorage.hasOwnProperty("channelList")&&window.localStorage.getItem("channelList")!='undefined'){
                    const obj=JSON.parse(localStorage.getItem("channelList"));
                    _this.setState({
                      showOrgList: true,
                      orgList: obj.list,
                      isBooked: false,
                      cityCode: obj.cityCode,
                      loadCurCity: obj.cityName,
                      lat: window.localStorage.getItem('lat'),
                      lng: window.localStorage.getItem('lng'),
                      isPosition: false,
                      isPositionLoading: false
                    });
                  }else{
                    _this.initPositionCity(position.latitude, position.longitude)
                  }
                } else {
                  _this.setState({isPosition: true, isPositionLoading: false, loadCurCity: ""})
                }
              });
            } else {
              //window.localStorage.setItem('lat', '39.9110666857');
              //window.localStorage.setItem('lng', '116.4136103013');
              //老版本IOS 直接定位到北京
              _this.initPositionCity("39.9110666857", "116.4136103013");
              _this.setState({isPositionLoading: false});
            }
          }
        }, 500)
      }
    } else if (typeof isInApp !== 'undefined' && typeof(isInApp) == "function") {
      if(window.sessionStorage.hasOwnProperty("channelList")&&window.sessionStorage.getItem("channelList")!='undefined'){
        const obj=JSON.parse(sessionStorage.getItem("channelList"));
        _this.setState({
          showOrgList: true,
          orgList: obj.list,
          isBooked: false,
          cityCode: obj.cityCode,
          loadCurCity: obj.cityName,
          lat: window.localStorage.getItem('lat'),
          lng: window.localStorage.getItem('lng'),
          isPosition: false,
          isPositionLoading: false
        });
      }else{
        setTimeout(() => {
          if (typeof JS_Call_APP != "undefined") {
            JS_Call_APP('addListener', 'loginState', function(status, msg) {
              console.log("loginState status", status);
              console.log("loginState msg", msg);
            });
            JS_Call_APP('getLocation', '', function(status, msg) {
              if (status == 1) {
                var position = JSON.parse(msg);
                window.localStorage.setItem('lat', position.latitude);
                window.localStorage.setItem('lng', position.longitude);
                _this.initPositionCity(position.latitude, position.longitude)
              } else {
                _this.setState({isPosition: true, isPositionLoading: false, loadCurCity: ""})
              }
            });
          } else {
            //window.localStorage.setItem('lat', '39.9110666857');
            //window.localStorage.setItem('lng', '116.4136103013');
            _this.initPositionCity("39.9110666857", "116.4136103013");
            _this.setState({isPositionLoading: false});
          }
        }, 10)
      }
    } else if (isWx == true) {
      wx.ready(function() {
        wx.getLocation({
          success: function(res) {
            var lat = res.latitude;
            var lng = res.longitude;
            window.localStorage.setItem('lat', lat);
            window.localStorage.setItem('lng', lng);
            _this.setState({
              isPositionLoading: false
            }, function() {
              if(window.localStorage.hasOwnProperty("channelList")&&window.localStorage.getItem("channelList")!='undefined'){
                  const obj=JSON.parse(localStorage.getItem("channelList"));
                  console.log(obj);
                  this.setState({
                    showOrgList: true,
                    orgList: obj.list,
                    isBooked: false,
                    cityCode: obj.cityCode,
                    loadCurCity: obj.cityName,
                    lat: window.localStorage.getItem('lat'),
                    lng: window.localStorage.getItem('lng'),
                    isPosition: false,
                    isPositionLoading: false
                  });
                }else{
                _this.initPositionCity(lat, lng);
              }
            })
          },
          cancel: function(res) {
            if (res.errMsg == "getLocation:fail") {
              _this.setState({isPosition: true, isPositionLoading: false, loadCurCity: ""})
            }
          },
          fail: function(res) {
            if (res.errMsg == "getLocation:fail") {
              _this.setState({isPosition: true, isPositionLoading: false, loadCurCity: ""})
            }
          }
        });
      });
    } else {
      // Toast.fail('APP/微信定位失败，代码测试专用', 1, function(){
      //   _this.setState({isPosition: true, isPositionLoading: false, loadCurCity: ""})
      // }, true);
      //开发本地测试用
      //北京请使用 "39.9110666857","116.4136103013"
      //深圳请使用 "22.5485544122","114.0661345267"  lat纬度、 lng经度
      //window.localStorage.setItem('lat', '22.5485544122');
      //window.localStorage.setItem('lng', '114.0661345267');
      // if(window.sessionStorage.hasOwnProperty("channelList")&&window.sessionStorage.getItem("channelList")!='undefined'){
      //   const obj=JSON.parse(sessionStorage.getItem("channelList"));
      //   console.log(obj);
      //   this.setState({
      //     showOrgList: true,
      //     orgList: obj.list,
      //     isBooked: false,
      //     cityCode: obj.cityCode,
      //     loadCurCity: obj.cityName,
      //     lat: window.localStorage.getItem('lat'),
      //     lng: window.localStorage.getItem('lng'),
      //     isPosition: false,
      //     isPositionLoading: false
      //   });
      // }else{
        _this.initPositionCity("39.9110666857", "116.4136103013");
        _this.setState({isPositionLoading: false});
      //}
    }
  }
  //获取城市列表
  getCitys() {
    axios({
      url: "/corp/cityListByLetter.json",
      data: {
        "personId":window.localStorage.getItem('personId')
      },
      method: "post"
    }).then((response) => {
      if (response.data.code == 0) {
        this.setState({
          cityList:response.data.result.letterCitys,
          cityListLetter:response.data.result.letters,
          maskShow: !this.state.maskShow,
          isPositionLoading: false,
          showOrgList: true,
          curLetter:''
        });
      } else {
        Toast.fail(response.data.msg, 3, '', true);
      }
    });
  }
  //设置当前样式
  getCurClass(index) {
    return index === this.state.cityCode
      ? "cur col-33"
      : " col-33";
  }
  //初始化城市 经纬度
  initPositionCity(lat, lng) {
    const _this = this;
    axios({
      url: "/base/location.json",
      data: {
        "lat": lat,
        "lng": lng
      },
      method: "post"
    }).then((response) => {
      if (response.data.code == 0) {
        const cityCode = response.data.result.cityCode;
        const cityName = response.data.result.cityName;
        const lat = response.data.result.lat;
        const lng = response.data.result.lng;
        _this.setState({
          loadCurCity: cityName,
          isPosition: false,
          isPositionLoading: false
        }, function() {
          _this.channelList(this.props.location.query.personId, cityCode, lat, lng, _this.state.pageNo);
        });
      } else if (response.data.code == 201) {
        _this.setState({isPosition: true, isPositionLoading: false, loadCurCity: ""})
      } else {
        Toast.fail(response.data.msg, 3, '', true);
      }
    })
  }
  //设定城市
  setCurCity(o) {
    this.setState({
      loadCurCity: o.cityName,
      cityCode: o.cityCode,
      maskShow: !this.state.maskShow,
      isBooked: false,
      curLetter:''
    }, function() {
      this.channelList(this.props.location.query.personId, o.cityCode, this.state.lat, this.state.lng, this.state.pageNo);
    });
  }
  //设定当前拼音
  setLetter(index){
    return index === this.state.curLetter
      ? "cur"
      : "";
  }
  //获取锚点位置
  scrollToAnchor(anchorName){
    if (anchorName) {
        this.setState({
          curLetter:anchorName,
          letterShow:true
        },function(){
          let anchorElement = document.getElementById(anchorName);
          if(anchorElement) {
            setTimeout(()=>{
              this.setState({
                letterShow:false
              })
            },500);
            //android webView无scrollTo
            this.refs.orgAreaScroll.scrollTop =anchorElement.offsetTop;

          }
        });
    }
  }
  //关闭选择城市
  closeCityList(o) {
    this.setState({
      maskShow: !this.state.maskShow,
      isBooked: false,
    });
  }
  //关闭遮罩层
  maskClose() {
    this.setState({
      maskShow: !this.state.maskShow
    });
  }
  //获得体检中心列表
  channelList(personId, cityCode, lat, lng, pageNo) {
      axios({
        url: "/corp/list.json",
        data: {
          "personId": window.localStorage.getItem('personId'),
          "cityCode": cityCode,
          "lat": window.localStorage.getItem('lat'),
          "lng": window.localStorage.getItem('lng'),
          "pageNo": pageNo,
          "pageSize": 10
        },
        method: "post"
      }).then((response) => {
      if (response.data.code == 0) {
        //有机构有服务
        if (response.data.result.list.length > 0) {
          var pages = response.data.result.pages;
          var pageNo = response.data.result.pageNo;
          if (pageNo == 1) {
            this.setState({
              showOrgList: true,
              orgList: response.data.result.list,
              isBooked: false,
              cityCode: response.data.result.cityCode,
              lat: window.localStorage.getItem('lat'),
              lng: window.localStorage.getItem('lng'),
              pageNo: pageNo,
              hasMore: pages > pageNo
                ? 1
                : 0,
              pages: pages,
              isPosition: false,
              isPositionLoading: false
            });
          } else if (pageNo <= pages) {
            this.setState({
              showOrgList: true,
              orgList: this.state.orgList.concat(response.data.result.list),
              isBooked: false,
              cityCode: response.data.result.cityCode,
              lat: window.localStorage.getItem('lat'),
              lng: window.localStorage.getItem('lng'),
              pageNo: pageNo,
              hasMore: pages > pageNo
                ? 1
                : 0,
              pages: pages,
              isPosition: false,
              isPositionLoading: false
            })
          } else {
            this.setState({hasMore: 0, isPosition: false, isPositionLoading: false})
          }
         sessionStorage.setItem("channelList",JSON.stringify(response.data.result));
        } else {
          //无机构无服务
          this.setState({showOrgList: false, hasMore: 0, isBooked: true, isPosition: false, isPositionLoading: false})
        }
      } else {
        Toast.fail(response.data.msg, 3, '', true);
      }
    });
  }
  //进入体检套餐
  goToBooking(o) {
    hashHistory.push({
      pathname: '/booking',
      query: {
        corpId: o.corpId
      }
    })
  }
  createMarkup(str) {
    return {__html: str};
  }
  loadMore(resolve) {
    setTimeout(() => {
      var pageNo = this.state.pageNo + 1;
      this.setState({
        pageNo: pageNo,
        hasMore: pageNo > 1 && pageNo < this.state.pages
      }, function() {
        this.channelList(window.localStorage.getItem('personId'), this.state.cityCode, this.state.lat, this.state.lng, pageNo);
      });
      resolve();
    }, 800);
  }
  render() {
    const {
      maskShow,
      showOrgList,
      isBooked,
      hasMore,
      isPosition,
      isPositionLoading
    } = this.state;
    //机构列表
    const orgList = this.state.orgList.map((item, index) => {
      return (<li key={index}>
        <a onClick={() => {
            this.goToBooking(item)
          }} class="org-info app-active app-link-img">
          <div class="org-banner">
            <img src={item.listImage
                ? item.listImage
                : require('../../static/images/default-banner.gif')} alt={item.name}/>
          </div>
          <div class="org-address">
            <p>{item.address}</p>
          </div>
          {
            item.distance != ""
              ? <p class="org-position">
                  <span class="unit-num">{item.distance}</span><span class="unit">km</span>
                </p>
              : ''
          }
        </a>
      </li>)
    })
    //城市列表
    const cityList = this.state.cityList.map((item, index) => {
      return (
        <div key={index} class={'app-list-item '+ this.setLetter(item.letter)} ref={item.letter} id={item.letter}>
          <div class={'app-item-hd '+ this.setLetter(item.letter) }>{item.letter}</div>
          <div class="app-item-bd">
          {item.cityList.map((items, index) => {
            return (
              <div class="cityList-item row" key={index} >
              <a
                class={this.getCurClass(items.cityCode)}
                onClick={() => {
                    this.setCurCity(items)
                  }}>{items.cityName}</a>
              </div>
            )
          }
        )}
        </div>
      </div>
      )
    })
    //城市列表
    const cityListLetter = this.state.cityListLetter.map((item, index) => {
      return(
        <li key={index}
           class={this.setLetter(item)}
           onClick={(event)=>{
             event.preventDefault();
             this.scrollToAnchor(item)
           }}
          ><span>{item}</span></li>
      )
    })

    return (<div class="app-doc">
      <div class="app-hd orgArea-hd" id="orgArea-hd" ref="orgAreaHd">
        <div class="org-area">
          <span>{this.state.loadCurCity}</span>
        </div>
        <button onClick={(event) => {
            event.preventDefault();
            this.getCitys()
          }} class="org-change" disabled={isPositionLoading}>切换城市</button>
      </div>
      {
        maskShow
          ? <div class="orgArea-dropMenu" id="orgArea-dropMenu">
              <div class="orgArea-dropMenu-hd app-hd" ref="orgAreaDropMenuHd">
                <p>当前选定城市：<span>{this.state.loadCurCity}</span></p>
                <a class="org-change"
                  onClick={()=>{
                  this.closeCityList()
                }}>返回</a>
              </div>
              {
                this.state.letterShow?
                <div class="orgArea-letterShow" ref="letterShow">{this.state.curLetter}</div>
                :
                ''
              }

              <div class="orgArea-dropMenu-bd app-bd" style={{height:document.documentElement.clientHeight-this.refs.orgAreaHd.clientHeight}}>
                <div class="orgArea-list" style={{height:document.documentElement.clientHeight-this.refs.orgAreaHd.clientHeight}}>
                  <div class="app-listScroll"  ref="orgAreaScroll">
                    <div class="app-list" >
                    {cityList}
                    </div>
                  </div>
                </div>
                <div class="orgArea-letter">
                  <ul>
                    {cityListLetter}
                  </ul>
                </div>
              </div>
            </div>
          : null
      }
      {
        maskShow
          ? <div id="sortmask" onClick={this.maskClose} class="sortmask"></div>
          : null
      }
      {
        showOrgList
          ? <div class="orgArea-bd app-bd">
              <ul class="org-list">
                <Tloader className="iScrollMain" hasMore={hasMore} onLoadMore={(resolve) => this.loadMore(resolve)}>
                  {orgList}
                </Tloader>

              </ul>
            </div>
          : ''
      }
      {
        isBooked
          ? <div class="showLoadingInit">
              <div class="no-data">
                <p class="no-text">体检预约服务正在筹备中，敬请期待~
                  <br/>您可选择其他地区进行体检预约
                </p>
              </div>
            </div>
          : ''
      }
      {
        isPosition
          ? <div class="no-position">
              <div class="no-data">
                <p class="no-text">定位失败，请确保手机的GPS和本应用的定位功能已开启</p>
              </div>
            </div>
          : ''
      }
      {
        isPositionLoading
          ? <div class="positionLoading">
              <span class="app-loading"></span>
              <p>我们正在为您定位城市，<br/>请稍等...</p>
            </div>
          : ''
      }
    </div>)
  }
}
