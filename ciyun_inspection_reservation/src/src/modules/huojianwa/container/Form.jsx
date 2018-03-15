import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import { Toast, Picker, List, WhiteSpace } from 'antd-mobile';
import axios from "../../common/httpAjax";
import phyInit from "../../common/phy.init";
import qs from "qs";
import $ from "jquery";
import moment from "moment"
import BookingCalendar from "../../bookingForm/container/Calendar"

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.hanks = this.hanks.bind(this)
    this.hanksCancel = this.hanksCancel.bind(this)
    this.state = {
      calendarShow:false,
      title:"",
      typeStr:"",
      hmoName:"",
      corpName:"",
      name:"",
      address:"",
      tel:"",
      precautions:"",
      recordId:"",
      corpId: "",
      personId: "",
      source:"",

      inpTime:"",
      inspDate:"",
      inspBeginTime:"",
      inspEndTime:"",
      scheduleId:"",
      userInfoList:[]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.getCalendar = this.getCalendar.bind(this);
  }

  componentDidMount() {
    var storage=window.localStorage;
    let personId=storage.getItem("personId");
    let recordId=this.props.location.query.recordId;
    this.getInspFrom(recordId,personId);
    this.setState({
      recordId: recordId,
      personId: personId
    });
  }

  //获取时间排期
  getCalendar() {
      this.setState({
        calendarShow: !this.state.calendarShow,
      })
    // let _this=this;
    // if(this.state.inpTime==""){
    //   var now  = moment().format('YYYY-MM-DD');
    //   Toast.loading('', 1, function(){
    //     hashHistory.push({
    //       pathname: '/bookingForm/calendar/'+now,
    //       state:{
    //         corpId: _this.state.corpId,
    //         recordId:_this.state.recordId,
    //         source:_this.state.source,
    //         ishjw:false
    //       }
    //     })
    //   }, true);
    // }else{
    //   var cal_date = this.state.inpTime.split(" ")[0];
    //   var cal_time = this.state.inpTime.split(" ")[1];
    //   var cal_beginTime='', cal_endTime='';
    //   if(typeof(cal_time)!="undefined"){
    //     cal_beginTime = cal_time.split("-")[0];
    //     cal_endTime = cal_time.split("-")[1];
    //   }
    //   hashHistory.push({
    //     pathname: '/bookingForm/calendar/'+_this.state.inpTime,
    //     state:{
    //       inspBeginTime:cal_endTime,
    //       inspEndTime:cal_beginTime,
    //       inspDate:cal_date,
    //       corpId: _this.state.corpId,
    //       recordId:_this.state.recordId,
    //       source:_this.state.source,
    //       ishjw:false
    //     }
    //   })
    // }
  }


  //获取预约表单信息查询
  getInspFrom(recordId,personId){
    axios({
      url:"/record/info.json",
      data:{
        "recordId": recordId,
        "personId": personId
      },
      method:"post"
    }).then((response)=>{
      if (response.data.code==0){
          let titleType="";
          switch (response.data.result.type){
            case 1:
              titleType="体检套餐预约";
              break;
            case 2:
              titleType="单位体检预约";
              break;
            case 3:
              titleType="个性推荐预约";
              break;
            default:
              titleType="预约表单";
              break;
          }
          this.setState({
            corpId:response.data.result.corpId,
            title:titleType,
            source:response.data.result.source,
            typeStr:response.data.result.typeStr,
            hmoName:response.data.result.hmoName,
            corpName:response.data.result.corpName,
            name:response.data.result.name,
            address:response.data.result.medAddress,
            tel:response.data.result.medTel,
            precautions:response.data.result.precautions,

            userInfoList:response.data.result.userInfoList
          },function(){
            // if(this.props.location.state!=null){
            //   if(this.props.location.state.inspBeginTime==""&&this.props.location.state.inspEndTime==""){
            //     this.setState({
            //       inspDate:this.props.location.state.inspDate,
            //       inspBeginTime:this.props.location.state.inspBeginTime,
            //       inspEndTime:this.props.location.state.inspEndTime,
            //       scheduleId:this.props.location.state.scheduleId,
            //       inpTime:this.props.location.state.inspDate
            //     })
            //   }else{
            //     this.setState({
            //       inspDate:this.props.location.state.inspDate,
            //       inspBeginTime:this.props.location.state.inspBeginTime,
            //       inspEndTime:this.props.location.state.inspEndTime,
            //       scheduleId:this.props.location.state.scheduleId,
            //       inpTime:this.props.location.state.inspDate+" "+this.props.location.state.inspBeginTime+"-"+this.props.location.state.inspEndTime
            //     })
            //   }
            // };
        });
        }else{
          phyInit.title("预约表单");
          Toast.info(response.data.msg, 5);
        }
      });

  }

  //弹窗
  showToast(toastTxt, onClose){
    Toast.info(toastTxt, 1, onClose);
    return false;
  }

  //体检注意事项
  getNotice(recordId){
    Toast.loading('', 1, function(){
      hashHistory.push({
      pathname: '/booking/notice/histroy/'+recordId
    })
    }, true);

  }
  //受控表单
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }
  //提交表单
  handleSubmit(event){
    //预约时间判断
    if (this.state.inspDate.length==0){
      this.showToast("请选择预约时间");
      return false;
    }

    event.preventDefault();
    axios({
      url:"/record/selectInspDate.json",
      data:{
        "personId": this.state.personId,
        "corpId": this.state.corpId,
        "recordId": this.state.recordId,
        "scheduleId": this.state.scheduleId,
        "inspDate": this.state.inspDate,
        "inspBeginTime":this.state.inspBeginTime,
        "inspEndTime":this.state.inspEndTime
      },
      method:"post"
    }).then((response)=>{
      if (response.data.code==0){
        let _recordId=this.state.recordId;
        this.showToast("添加成功",function(){
          hashHistory.push({
            pathname: '/bookingResult',
            query: {
              recordId:_recordId
            }
          });
        });
      }else{
        this.showToast(response.data.msg);
      }
    });
  }
  hanksCancel() {
      this.setState({
        calendarShow:false,
        inpTime:"请选择时间",
        inspDate:"",
        inspBeginTime:"",
        inspEndTime:"",
      });
  }
  hanks(bookinspDate,bookinspBeginTime,bookinspEndTime,scheduleId) {
      this.setState({
        calendarShow:false,
        inpTime:bookinspDate+" "+bookinspBeginTime+"-"+bookinspEndTime,
        inspDate:bookinspDate,
        inspBeginTime:bookinspBeginTime,
        inspEndTime:bookinspEndTime,
        scheduleId:scheduleId,
      });
  }
  render() {
    const CustomChildren = props => (
      <div onClick={props.onClick}>
        <div className="app-txt" style={{ color: '#000',paddingTop:'.05rem' }}>{props.extra}</div>
      </div>
    );
    const userInfoHtml=this.state.userInfoList.map((item,index)=>{
      if (item.infoValue=='' || item.infoValue==null){
        return('');
      }else{
        return(
          <div key={index} className="app-list-item">
            <div className="app-item-hd">{item.infoName}</div>
            <div className="app-item-bd">
              {item.infoValue}
            </div>
          </div>
        )
      }
    });
    return (
      <div className="app-doc">
        {this.state.calendarShow?
          <div class="calendarShow" ><BookingCalendar
            hanks={this.hanks}
            hanksCancel={this.hanksCancel}
            inspDate={this.state.inspDate}
            inspBeginTime={this.state.inspBeginTime}
            inspEndTime={this.state.inspEndTime}
            corpId={this.state.corpId}
            source={this.state.source}
            baseChargeItemIds={this.state.baseChargeItemIds}
            plusChargeItemIds={this.state.plusChargeItemIds}
            recordHealthCardId={this.state.recordHealthCardId}
            ansValue={this.state.ansValue}
            sex={this.state.inpSex}
          /></div>
          :
          ''
        }
        <div className="app-bd bookingForm-bd">
          <div className="bookingForm-intro">
              <h4>{this.state.name}</h4>
          </div>
          <div className="bookingForm-introItem">
              <div className="app-list app-list-form">
                  <div className="app-list-item">
                      <div className="app-item-hd">预约类型：</div>
                      <div className="app-item-bd">{this.state.typeStr}</div>
                  </div>
                  <div className="app-list-item">
                      <div className="app-item-hd">体检机构：</div>
                      <div className="app-item-bd">{this.state.hmoName}</div>
                  </div>
                  <div className="app-list-item">
                      <div className="app-item-hd">体检中心：</div>
                      <div className="app-item-bd">{this.state.corpName}</div>
                  </div>
                  <div className="app-list-item">
                      <div className="app-item-hd">体检地址：</div>
                      <div className="app-item-bd">{this.state.address}</div>
                  </div>
                  <div className="app-list-item">
                      <div className="app-item-hd">联系电话：</div>
                      <div className="app-item-bd">{this.state.tel}</div>
                  </div>
              </div>
          </div>
          <div className="bookingForm-item-notice">
          {this.state.precautions.length==0 ?
            null
          :
          <a href="javascript:;" className="icon-notice" onClick={()=>{this.getNotice(this.state.recordId)}}>体检注意事项</a>
          }
          </div>
          <div className="bookingForm-phyForm">
            <div className="app-list app-list-form">
              <div className="app-list-item">
                  <div className="app-item-hd">预约时间</div>
                  <div className="app-item-bd"
                    onClick={() => {
                    this.getCalendar('isNeedTime')
                    }}
                    >
                    {
                      this.state.inpTime?
                      this.state.inpTime:
                      '请选择时间'
                    }
                  </div>
                  <div className="app-item-ft app-arr-phy"></div>
              </div>
              {userInfoHtml}
            </div>
          </div>
        </div>
        <div className="app-ft phy-ft">
            <a href="javascript:;" onClick={this.handleSubmit} className="phy-bookingFormBtn">立即预约</a>
        </div>
      </div>
    )
  }
}
