import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import phyInit from '../../common/phy.init';
import axios from "../../common/httpAjax";
import qs from "qs";
import $ from "jquery";
import moment from 'moment';
import { Toast } from 'antd-mobile';
import DayPicker, { LocaleUtils } from "react-day-picker";

function formatMonthTitle(d, locale) {
 return `${d.getFullYear()}年 ${d.getMonth() + 1}月`
}
export default class BookingCalendar extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.MonthChangClick = this.MonthChangClick.bind(this);
    this.getTime = this.getTime.bind(this);
    this.setBookingTime = this.setBookingTime.bind(this);
    this.cancelBookingTime = this.cancelBookingTime.bind(this);
    this.state = {
      title: "",
      selectedDay: undefined,
      datas:[],
      timeList:[],
      reservationId:"",
      corpId:"",
      personId:"",
      source:"",
      recordId:"",
      bookinspDate:"",
      bookinspBeginTime:"",
      bookinspEndTime:"",
      scheduleId:"",
      year:moment().year(),
      month:moment().month()+1,
      curSelected:"",
      baseChargeItemIds:"",
      plusChargeItemIds:"",
      recordHealthCardId:"",
      ansValue:"",
      ishjw:"",
      sex:"",
    }
  }
  //取消
  cancelBookingTime(){
    this.props.hanksCancel()
  }
  //设定日期传值
  setBookingTime(){
    if(this.state.ishjw==true){
      if(this.state.bookinspDate==""||this.state.bookinspDate==undefined){
        Toast.info('请选择预约日期', 2, '', true)
      }else if(this.state.isNeedTime==true && (this.state.bookinspBeginTime==""||this.state.bookinspEndTime=="")){
        Toast.info('请选择预约时段', 2, '', true)
      }else{
        this.props.hanks(this.state.bookinspDate,this.state.bookinspBeginTime,this.state.bookinspEndTime,this.state.scheduleId);
      }
    }else{
      if(this.state.bookinspDate==""||this.state.bookinspDate==undefined){
        Toast.info('请选择预约日期', 2, '', true);
      }else if(this.state.isNeedTime==true && (this.state.bookinspBeginTime==""||this.state.bookinspEndTime=="")){
        Toast.info('请选择预约时段', 2, '', true)
      }else{
        this.props.hanks(this.state.bookinspDate+" "+this.state.bookinspBeginTime+"-"+this.state.bookinspEndTime,this.state.scheduleId);
      }
    }
  }
  //初始化日历
  getCalendar(reservationId,corpId,source,bookinspDate,bookinspBeginTime,bookinspEndTime,year,month,sex){
    var storage=window.localStorage;
    let personId=storage.getItem("personId");
    var bookinspDate  = this.props.inspDate;
    var bookinspBeginTime   = this.props.inspBeginTime;
    var bookinspEndTime   = this.props.inspEndTime;
    axios({
      url: "/package/scheduleInfo.json",
      data: {
        "personId": personId,
      	"reservationId": reservationId,
      	"corpId": corpId,
      	"source": source,
      	"year": year,
      	"month": month,
      	"sex": this.props.inpSex,
      	"inspDate": bookinspDate,
      	"inspBeginTime": bookinspBeginTime,
      	"inspEndTime": bookinspEndTime
      },
      method: "post"
    }).then((response) => {
      var isNeedTime = response.data.result.isNeedTime;
      this.setState({
        year:response.data.result.year,
        month:response.data.result.month,
        isNeedTime:isNeedTime
      })
      if(response.data.code==0){
        this.renderDayClass();
        const year = response.data.result.year;
        const month = response.data.result.month;
        //设定默认传入日期
        const date = response.data.result.list;
        date.map((item,index)=>{
          if(isNeedTime==true){
            if(item.date==this.props.inspDate&&item.badge==true){
              if(item.selected==1){
                this.setState({
                  timeList:item.timeList,
                  selectedDay: moment(item.date).toDate()
                });
              }
            }
          }
        });
        this.setState({
            datas:response.data.result.list,
            hasBadge:this.state.selectedDay==undefined?true:false
          },function(){
            if(response.data.result.hasBadge==false){
              Toast.info(year+'年'+month+'月无可预约时间,请选择合适的预约时间', 1, '', false)
              this.setState({
                hasBadge:true
              })
            }
          })
      }else{
        alert(response.data.msg)
      }
    });
  }
  //更换月份
  MonthChangClick(e) {
    const changeYear = moment(e).year();
    const changeMonth = moment(e).month();
    this.setState({
      selectedDay: undefined,
    },function(){
      this.getCalendar(this.state.reservationId,this.state.corpId,this.state.source,this.state.bookinspDate,this.state.bookinspBeginTime,this.state.bookinspEndTime,changeYear,changeMonth+1,this.props.inpSex);
      this.renderDayClass();
    });
  }
  //日期点击处理
  handleDayClick(day, { selected ,disabled}) {
    if(selected==undefined&&disabled==undefined) {
      this.setState({
          timeList:[],
        },function(){
        var date = this.state.datas;
        date.map((item,index)=>{
          if(item.date==moment(day).format('YYYY-MM-DD')){
            if(this.state.isNeedTime==true){
              this.setState({
                timeList:item.timeList
              },function(){
                this.setState({
                  selectedDay: selected ? undefined : day,
                  bookinspDate:item.date,
                  bookinspBeginTime:"",
                  bookinspEndTime:"",
                });
              })
            }else {
              this.setState({
                  selectedDay: selected ? undefined : day,
                bookinspDate:item.date,
                hasBadge:false,
                // bookinspBeginTime:"",
                // bookinspEndTime:"",
              });
            }
          }
        });
    })
      this.renderDayClass();
    }else if(moment(this.state.selectedDay).format('YYYY-MM-DD')==moment().format('YYYY-MM-DD')){
      this.renderDayClass();
    }
  }
  componentDidMount() {
    var storage=window.localStorage, hjw=true;
    let personId=storage.getItem("personId");
    if(typeof(this.props.ishjw)!='undefined'){
      hjw=false;
    }
    this.setState({
      reservationId:this.props.reservationId,
      corpId:this.props.corpId,
      personId:personId,
      source:this.props.source,
      recordId:this.props.recordId,
      baseChargeItemIds:this.props.baseChargeItemIds,
      plusChargeItemIds:this.props.plusChargeItemIds,
      recordHealthCardId:this.props.recordHealthCardId,
      ansValue:this.props.ansValue,
      sex:this.props.inpSex,
      ishjw:hjw
    },function(){
      this.initGetTime();
    });
  }
  //获取url时间
  initGetTime(){
    var paramsTime = this.props.inspDate;
    if(this.props.inspDate==""){
      var cal_year = moment().year();
      var cal_month = moment().month()+1;
      var cal_date = moment().toDate();
      this.setState({
        inspDate:paramsTime,
        inspBeginTime:"",
        inspEndTime:"",
        year:cal_year,
        month:cal_month,
        selectedDay: moment().toDate(),
      },function(){
        this.getCalendar(this.state.reservationId,this.state.corpId,this.state.source,cal_date,"","",cal_year,cal_month,this.props.inpSex);
        if(moment(this.state.selectedDay).format('YYYY-MM-DD')==moment().format('YYYY-MM-DD')){
          this.setState({
            selectedDay:undefined
          })
        }

        this.renderDayClass();
      })
    }else{
      var cal_date = this.props.inspDate;
      var cal_year = cal_date.split("-")[0];
      var cal_month = cal_date.split("-")[1];
      var cal_beginTime = this.props.inspBeginTime
      var cal_endTime = this.props.inspEndTime
      this.setState({
        bookinspDate:cal_date,
        bookinspBeginTime:cal_beginTime,
        bookinspEndTime:cal_endTime,
        year:cal_year,
        month:cal_month,
      },function(){
        this.getCalendar(this.state.reservationId,this.state.corpId,this.state.source,cal_date,cal_beginTime,cal_endTime,cal_year,cal_month,this.props.inpSex);
        this.renderDayClass();
      })
    }
  }
  //获取时间
  getTime(o,index){
    const bookinspBeginTime = o.startTime;
    const bookinspEndTime = o.endTime;
    const scheduleId=o.scheduleId;
    this.setState({
      bookinspBeginTime:bookinspBeginTime,
      bookinspEndTime:bookinspEndTime,
      scheduleId:scheduleId,
      type:scheduleId
    },function(){
      this.setState({
        hasBadge:false
      })
    })
  }
  //重置day
  renderDayClass(){
    setTimeout(()=>{
      $(".DayPicker-Day[aria-disabled='false']").addClass('sbCur');
    },300)
  }
  renderDay(day){
    return(
      <div>{day.getDate()}</div>
    )
  }

  render() {
    const { startTime,endTime,selectedDay } = this.state;
    const curMonth = moment().month();
    const curYear = moment().year();
    const WEEKDAYS_SHORT = [ '日', '一', '二', '三', '四', '五','六'];
    const today = new Date();
    const arrDate = [];
    const arrTime = [];
    this.state.datas.map((item,index)=>{
      if(item.badge==false){
        arrDate.push(moment(item.date).toDate());
      }else{
        arrTime.push(item.timeList);
      }
    });
    const arrTimeList = this.state.timeList.map((item,index)=> {
         return (
          <li key={index} class="timeList-lab">
            <input type="radio"
              name="radio-time"
              onClick={() => {
                this.getTime(item,index)
              }}
               id={"app-radio-"+index}
               defaultChecked={item.selected==1?true:""}
               class="app-radio-cell"/>
            <label for={"app-radio-"+index} class="timeList-item">{item.startTime}-{item.endTime}</label>
          </li>
        )
    })
   const modifiers = {
    highlighted:this.state.curSelected
   };

    return (
      <div class="app-doc">
         <div class="app-DayPicker">请选择预约时间</div>
        <div class="app-bd">
          <DayPicker
            modifiers={modifiers}
            month={new Date(this.state.year, this.state.month-1)}
            weekdaysShort={WEEKDAYS_SHORT}
            selectedDays={this.state.selectedDay}
            onDayClick={this.handleDayClick}
            onMonthChange ={this.MonthChangClick }
            showPreviousMonth  = {this.showPreviousMonth}
            fromMonth={new Date(curYear, curMonth)}
            toMonth={new Date(curYear+1, curMonth)}
            disabledDays={arrDate}
            localeUtils={ { ...LocaleUtils, formatMonthTitle }}
           />
           {this.state.selectedDay
           ?
            <div class="timeList-box">
                  {this.state.timeList.length>0
                  ?
                  <p>选择预约时段</p>
                  :
                  ""
                  }
                  <div class="timeList clearfix">
                      {arrTimeList}
                  </div>
            </div>
            :
            ""
           }
        </div>
        <div class="app-ft">
          <div class="phy-ft-btn-group">
            <button  type="button"
              class="phy-btn phy-btnCancel" onClick={this.cancelBookingTime}>取消</button>
            <button type="button" disabled={this.state.hasBadge} onClick={this.setBookingTime} class="phy-btn phy-btnSave">确认</button>
          </div>
        </div>
      </div>
    )
  }
}
