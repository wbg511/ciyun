import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import { Toast, Modal, Picker, List, WhiteSpace } from 'antd-mobile';
import axios from "../../common/httpAjax";
import phyInit from "../../common/phy.init";
import qs from "qs";
import $ from "jquery";
import moment from "moment"
import BookingCalendar from "./Calendar"



export default class Index extends Component {
  constructor(props) {
    super(props);
      this.hanks = this.hanks.bind(this)
      this.hanksCancel = this.hanksCancel.bind(this)
    this.state = {
      calendarShow:false,
      show:1,
      title:"",
      type:"",
      typeStr:"",
      hmoName:"",
      corpName:"",
      name:"",
      address:"",
      tel:"",
      precautions:"",
      userNeedInfo:[],
      reservationId: "",
      corpId: "",
      personId: "",
      source:"",
      ansValue:"",
      htmlNameShow:true,
      htmlSexShow:true,
      htmlMarriageShow:false,
      htmlIdNoShow:true,
      htmlTelShow:false,
      htmlAddressShow:false,
      htmlSettmentShow:false,
      htmlCompanyNameShow:false,
      htmlReportWayShow:false,
      htmlReportAddressShow:false,
      isShowReportAddress:false,

      inpName:"",
      inpSex:"",
      inpTime:"",
      inspDate:"",
      inspBeginTime:"",
      inspEndTime:"",
      scheduleId:"",
      inpMarry:"",
      inpIdNo:"",
      inpTel:"",
      inpAddress:"",
      inpSettment:"",
      inpCompanyName:"",
      inpReportWay:"",
      inpReportAddress:"",
      plusChargeItemIds:"",
      baseChargeItemIds:"",
      recordHealthCardId:""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  componentWillMount(){
  }
  componentDidMount() {
    var recordHealthCardId='', storage, ansValue='';
    let personId, corpId, reservationId, plusChargeItemIds, baseChargeItemIds;
    storage=window.localStorage;
    personId=storage.getItem("personId");
    corpId=this.props.location.query.corpId;
    reservationId=this.props.location.query.reservationId;
    plusChargeItemIds=this.props.location.query.plusChargeItemIds;
    baseChargeItemIds=this.props.location.query.baseChargeItemIds;
    if (typeof(this.props.location.query.recordHealthCardId)!='undefined'){
      recordHealthCardId=this.props.location.query.recordHealthCardId;
    }
    if (typeof(this.props.location.query.ansValue)!='undefined'){
      ansValue=this.props.location.query.ansValue;
    }

    this.getInspFrom(reservationId,corpId,personId);
    this.setState({
      reservationId: reservationId,
      corpId: corpId,
      personId: personId,
      plusChargeItemIds: plusChargeItemIds,
      baseChargeItemIds: baseChargeItemIds,
      recordHealthCardId:recordHealthCardId,
      ansValue:ansValue
    });
  }

  //获取时间排期
  getCalendar(state) {
    if (state.inpSex ==""){
      this.showToast("请先选择性别！");
    }else{
      this.setState({
        calendarShow: !this.state.calendarShow,
      })
      localStorage.setItem("stateTxt",JSON.stringify(state));
    }

  }

  //获取预约表单信息查询
  getInspFrom(reservationId,corpId,personId){
    if (localStorage.hasOwnProperty("stateTxt")&&localStorage.getItem("personId")!='undefined'){
      const obj=JSON.parse(localStorage.getItem("stateTxt"));
      phyInit.title(obj.title);
      this.setState({
          show:obj.show,
          source:obj.source,
          typeStr:obj.typeStr,
          hmoName:obj.hmoName,
          corpName:obj.corpName,
          name:obj.name,
          address:obj.address,
          tel:obj.tel,
          precautions:obj.precautions,
          userNeedInfo:obj.userNeedInfo,

          inpName:obj.inpName,
          inpSex:obj.inpSex,
          inpMarry:obj.inpMarry,
          inpIdNo:obj.inpIdNo,
          inpTel:obj.inpTel,
          inpAddress:obj.inpAddress,
          inpSettment:obj.inpSettment,
          inpCompanyName:obj.inpCompanyName,
          inpReportWay:obj.inpReportWay,
          inpReportAddress:obj.inpReportAddress,

          htmlNameShow:obj.htmlNameShow,
          htmlSexShow:obj.htmlSexShow,
          htmlMarriageShow:obj.htmlMarriageShow,
          htmlIdNoShow:obj.htmlIdNoShow,
          htmlTelShow:obj.htmlTelShow,
          htmlAddressShow:obj.htmlAddressShow,
          htmlSettmentShow:obj.htmlSettmentShow,
          htmlCompanyNameShow:obj.htmlCompanyNameShow,
          htmlReportWayShow:obj.htmlReportWayShow,
          htmlReportAddressShow:obj.htmlReportAddressShow,
          title:obj.title,
          type:obj.type,
          ansValue:obj.ansValue
        });
    }else{
      axios({
        url:"/package/inspForm.json",
        data:{
          "reservationId": reservationId,
          "corpId": corpId,
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
          phyInit.title(titleType);
          this.setState({
            title:titleType,
            type:response.data.result.type,
            source:response.data.result.source,
            typeStr:response.data.result.typeStr,
            hmoName:response.data.result.hmoName,
            corpName:response.data.result.corpName,
            name:response.data.result.name,
            address:response.data.result.address,
            tel:response.data.result.tel,
            precautions:response.data.result.precautions,
            userNeedInfo:response.data.result.userNeedInfo,

            inpName:response.data.result.userNeedInfo.name.infoValue,
            inpSex:response.data.result.userNeedInfo.sex.infoValue,
            inpMarry:response.data.result.userNeedInfo.marriage.infoValue,
            inpIdNo:response.data.result.userNeedInfo.idNo.infoValue,
            inpTel:response.data.result.userNeedInfo.tel.infoValue,
            inpAddress:response.data.result.userNeedInfo.address.infoValue,
            inpSettment:response.data.result.userNeedInfo.settment.infoValue,
            inpCompanyName:response.data.result.userNeedInfo.companyName.infoValue,
            inpReportWay:response.data.result.userNeedInfo.reportWay.infoValue,
            inpReportAddress:response.data.result.userNeedInfo.reportAddress.infoValue,

            htmlNameShow:response.data.result.userNeedInfo.name.showFlag,
            htmlSexShow:response.data.result.userNeedInfo.sex.showFlag,
            htmlMarriageShow:response.data.result.userNeedInfo.marriage.showFlag,
            htmlIdNoShow:response.data.result.userNeedInfo.idNo.showFlag,
            htmlTelShow:response.data.result.userNeedInfo.tel.showFlag,
            htmlAddressShow:response.data.result.userNeedInfo.address.showFlag,
            htmlSettmentShow:response.data.result.userNeedInfo.settment.showFlag,
            htmlCompanyNameShow:response.data.result.userNeedInfo.companyName.showFlag,
            htmlReportWayShow:response.data.result.userNeedInfo.reportWay.showFlag,
            htmlReportAddressShow:response.data.result.userNeedInfo.reportAddress.showFlag,
            show:2
          });
        }else{
          phyInit.title("预约表单");
          this.setState({
            show:3,
            massage:response.data.msg
          });
        }
      });
    }
  }

  //弹窗
  showToast(toastTxt, onClose){
    Toast.info(toastTxt, 1, onClose);
    return false;
  }
  //体检注意事项
  getNotice(reservationId){
    hashHistory.push({
      pathname: '/booking/notice/booking/'+reservationId
    })
  }


  //受控表单
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;//target.type === 'checkbox' ? target.checked :
    const name = target.name;
    //判断是否显示邮寄地址
    if((name=="inpReportWay" && value==3) || name=="inpReportAddress"){
      this.setState({
        isShowReportAddress: true
      });
    }else if((name=="inpReportWay" && value==2) || name=="inpReportAddress"){
      this.setState({
        isShowReportAddress: false
      });
    }
    if (name=="inpSex"){
      this.setState({
        inspBeginTime:"",
        inspEndTime:"",
        inspDate:"",
        inpTime:""
      })
    }
    this.setState({
      [name]: value
    });
  }
  //提交表单
  handleSubmit(event){
    var inspStr='';
    //体检人姓名判断
    if(this.state.htmlNameShow){
      inspStr+='{"infoKey": "name","infoValue": "'+this.state.inpName+'"},';
      //const chkName=/^[`!@#$%^&<>?]+$/.test(this.state.inpName);
     var reg = new RegExp("[`!@#$%^&<>?]+");
      if (this.state.inpName.length==0){
        this.showToast("请输入体检人姓名");
        return false;
      }else if(this.state.inpName.length>20){
        this.showToast("体检人姓名不能多于20字");
        return false;
      }else if (reg.test(this.state.inpName)){
        this.showToast("不可输入!@#$%^&<>?这类字符");
        return false;
      }
    }
    //体检人性别判断
    if (this.state.htmlSexShow){
      inspStr+='{"infoKey": "sex","infoValue": "'+this.state.inpSex+'"},';
      if (this.state.inpSex.length==0){
        this.showToast("请选择性别");
        return false;
      }
    }
    //预约时间判断
    if (this.state.inspDate.length==0){
      this.showToast("请选择预约时间");
      return false;
    }
    //婚姻状况
    if (this.state.htmlMarriageShow){
      inspStr+='{"infoKey": "marriage","infoValue": "'+this.state.inpMarry+'"},';
      if (this.state.inpMarry.length==0){
        this.showToast("请选择婚姻状况");
        return false;
      }
    }
    //身份证号码
    if(this.state.htmlIdNoShow){
      inspStr+='{"infoKey": "idNo","infoValue": "'+this.state.inpIdNo+'"},';
      const chkIdNo=/^(\d{6})(18|19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X|x)?$/.test(this.state.inpIdNo);
      if (this.state.inpIdNo.length==0){
        this.showToast("请输入体检人身份证号");
        return false;
      }else if(!chkIdNo){
        this.showToast("请输入正确的身份证");
        return false;
      }
    }
    //体检人电话
    if(this.state.htmlTelShow){
      inspStr+='{"infoKey": "tel","infoValue": "'+this.state.inpTel+'"},';
      const chkTel=/^[1|9]\d{10}$/.test(this.state.inpTel);
      if (this.state.inpTel.length==0){
        this.showToast("请输入体检人电话");
        return false;
      }else if(!chkTel){
        this.showToast("请输入正确的手机号");
        return false;
      }
    }
    //家庭地址
    if(this.state.htmlAddressShow){
      inspStr+='{"infoKey": "address","infoValue": "'+this.state.inpAddress+'"},';
      if (this.state.inpAddress.length==0){
        this.showToast("请输入家庭地址");
        return false;
      }else if(this.state.inpAddress.length>50){
        this.showToast("家庭地址不能多于50字");
        return false;
      }
    }
    //结算类型
    if(this.state.htmlSettmentShow){
      inspStr+='{"infoKey": "settment","infoValue": "'+this.state.inpSettment+'"},';
      if (this.state.inpSettment.length==0){
        this.showToast("请选择结算类型");
        return false;
      }
    }
    //单位名称
    if (this.state.htmlCompanyNameShow){
      inspStr+='{"infoKey": "companyName","infoValue": "'+this.state.inpCompanyName+'"},';
      if (this.state.inpCompanyName.length==0){
        this.showToast("请输入单位名称");
        return false;
      }else if(this.state.inpCompanyName.length>50){
        this.showToast("单位名称不能多于50字");
        return false;
      }
    }
    //取报告方式
    if (this.state.htmlReportWayShow){
      inspStr+='{"infoKey": "reportWay","infoValue": "'+this.state.inpReportWay+'"},';
      if (this.state.inpReportWay.length==0){
        this.showToast("请选择取报告方式");
        return false;
      }
      //邮寄地址
      if (this.state.inpReportWay==3){
        inspStr+='{"infoKey": "reportAddress","infoValue": "'+this.state.inpReportAddress+'"},';
        if (this.state.inpReportAddress.length==0){
          this.showToast("请输入邮寄地址");
          return false;
        }else if(this.state.inpReportAddress.length>50){
          this.showToast("邮寄地址不能多于50字");
          return false;
        }
      }
    }
    //动态组合表达文本
    inspStr="["+inspStr.substring(0,inspStr.length-1)+"]";
    let arrPlus=[], arrBase=[];
    if (typeof(this.state.baseChargeItemIds) !='undefined'){
      if (this.state.baseChargeItemIds.length>0){
        arrBase=this.state.baseChargeItemIds.split(",");
      }
    }
    if (typeof(this.state.plusChargeItemIds) !='undefined'){
      if (this.state.plusChargeItemIds.length>0){
        arrPlus=this.state.plusChargeItemIds.split(",");
      }
    }

    event.preventDefault();
    var _this=this.state;
    axios({
      url:"/record/save.json",
      data:{
        "personId": this.state.personId,
        "corpId": this.state.corpId,
        "reservationId": this.state.reservationId,
        "scheduleId": this.state.scheduleId,
        "inspDate": this.state.inspDate,
        "inspBeginTime":this.state.inspBeginTime,
        "inspEndTime":this.state.inspEndTime,
        "inspUserInfo":JSON.parse(inspStr),
        "plusChargeItemIds":arrPlus,
        "baseChargeItemIds":arrBase,
        "recordHealthCardId":this.state.recordHealthCardId
      },
      method:"post"
    }).then((response)=>{
      if (response.data.code==0){
        localStorage.removeItem("stateTxt");
        this.showToast("您已经成功预约！",function(){
          hashHistory.push({
            pathname: '/bookingResult',
            query: {
              recordId:response.data.result.recordId
            }
          });
        });
      }else if(response.data.code==224){
        localStorage.removeItem("stateTxt");
        if (_this.type==1){
          Modal.alert("系统提示", "您选择的部分体检项目已被删除，请重新选择！",[{
            text: "重新选择",
            onPress: () => {
              hashHistory.push({
                pathname: '/booking/details/' + _this.corpId + '/' + _this.reservationId,
              })
            }
          }], "ios")
        }else if(_this.type==3){
          Modal.alert("系统提示", "您选择的部分体检项目已被删除，请重新选择！",[{
            text: "重新选择",
            onPress: () => {
              hashHistory.push({
                pathname: '/special/details/' + _this.corpId,
                query: {
                  corpId:_this.corpId,
                  ansValue:_this.ansValue
                }
              })
            }
          }], "ios")
        }
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
        reservationId:this.state.reservationId,
      });
  }
  render() {
    const CustomChildren = props => (
      <div onClick={props.onClick}>
        <div className="app-txt" style={{ color: '#000',paddingTop:'.05rem' }}>{props.extra}</div>
      </div>
    );
    if(this.state.show==2){
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
              reservationId={this.state.reservationId}
              scheduleId={this.state.scheduleId}
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
                <h4>{this.state.name}{this.state.inpSettment}</h4>
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
              <a href="javascript:;" className="icon-notice" onClick={()=>{this.getNotice(this.state.reservationId)}}>体检注意事项</a>
            }
            </div>
            <div className="bookingForm-phyForm">
              <div className="app-list app-list-form">
                  {this.state.htmlNameShow?
                    <div className="app-list-item">
                        <div className="app-item-hd">体检人姓名</div>
                        <div className="app-item-bd">
                            <input type="text" className="app-txt" placeholder="请输入体检人姓名" name="inpName" value={this.state.inpName} onChange={this.handleInputChange} />
                        </div>
                    </div>
                  :null}
                  {this.state.htmlSexShow?
                    <div className="app-list-item">
                      <div className="app-item-hd">性别</div>
                      <div className="app-item-bd">
                          <div className="radioGroup clearfix radioGroup-sex">
                              <label className="radioGroup-item"><input type="radio" className="app-radio-phy" name="inpSex" value="1" checked={this.state.inpSex==1?true : false} onChange={this.handleInputChange}/>男</label>
                              <label className="radioGroup-item"><input type="radio" className="app-radio-phy" name="inpSex" value="2" checked={this.state.inpSex==2?true : false} onChange={this.handleInputChange}/>女</label>
                          </div>
                      </div>
                    </div>
                  :null}
                  <div className="app-list-item">
                      <div className="app-item-hd">预约时间</div>
                      <div className="app-item-bd"
                        onClick={() => {
                        this.getCalendar(this.state)
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
                  {this.state.htmlMarriageShow?
                  <div className="app-list-item">
                      <div className="app-item-hd">婚姻状态</div>
                      <div className="app-item-bd">
                          <div className="radioGroup clearfix radioGroup-sex">
                              <label className="radioGroup-item"><input type="radio" className="app-radio-phy" name="inpMarry" value="1" checked={this.state.inpMarry==1?true : false} onChange={this.handleInputChange}/>已婚</label>
                              <label className="radioGroup-item"><input type="radio" className="app-radio-phy" name="inpMarry" value="2" checked={this.state.inpMarry==2?true : false} onChange={this.handleInputChange}/>未婚</label>
                          </div>
                      </div>
                  </div>
                  :null}
                  {this.state.htmlIdNoShow?
                  <div className="app-list-item">
                      <div className="app-item-hd">身份证号</div>
                      <div className="app-item-bd">
                          <input type="text" className="app-txt" placeholder="请输入体检人身份证号" name="inpIdNo" value={this.state.inpIdNo} onChange={this.handleInputChange} />
                      </div>
                  </div>
                  :null}
                  {this.state.htmlTelShow?
                  <div className="app-list-item">
                      <div className="app-item-hd">体检人电话</div>
                      <div className="app-item-bd">
                          <input type="text" className="app-txt" placeholder="请输入体检人电话" name="inpTel" value={this.state.inpTel} onChange={this.handleInputChange} />
                      </div>
                  </div>
                  :null}
                  {this.state.htmlAddressShow?
                  <div className="app-list-item">
                      <div className="app-item-hd">家庭地址</div>
                      <div className="app-item-bd">
                          <input type="text" className="app-txt" placeholder="请输入家庭地址" name="inpAddress" value={this.state.inpAddress} onChange={this.handleInputChange} />
                      </div>
                  </div>
                  :null}
                  {this.state.htmlSettmentShow?
                  <div className="app-list-item">
                      <div className="app-item-hd">结算类型</div>
                      <div className="app-item-bd">
                          <Picker
                            cols="1"
                            extra="请选择"
                            data={[{label: '自费',value: '1'},{label: '公费',value: '2'},{label: '医保',value: '3'}]}
                            value={this.state.inpSettment}
                            onChange={v => this.setState({ inpSettment: v })}
                            onOk={v => this.setState({ inpSettment: v })}
                          >
                            <CustomChildren></CustomChildren>
                          </Picker>
                      </div>
                      <div className="app-item-ft app-arr-phy"></div>
                  </div>
                  :null}
                  {this.state.htmlCompanyNameShow?
                  <div className="app-list-item">
                      <div className="app-item-hd">单位名称</div>
                      <div className="app-item-bd">
                          <input type="text" className="app-txt" placeholder="请输入单位名称" name="inpCompanyName" value={this.state.inpCompanyName} onChange={this.handleInputChange} />
                      </div>
                  </div>
                  :null}
                  {this.state.htmlReportWayShow?
                  <div className="app-list-item">
                      <div className="app-item-hd">取报告方式</div>
                      <div className="app-item-bd">
                        <div className="radioGroup clearfix radioGroup-sex">
                          <label className="radioGroup-item"><input type="radio" className="app-radio-phy" name="inpReportWay" value="2" checked={this.state.inpReportWay==2?true : false} onChange={this.handleInputChange}/>自取</label>
                          <label className="radioGroup-item"><input type="radio" className="app-radio-phy" name="inpReportWay" value="3" checked={this.state.inpReportWay==3?true : false} onChange={this.handleInputChange}/>邮寄</label>
                        </div>
                      </div>
                  </div>
                  :null}
                  {this.state.isShowReportAddress?
                  <div className="app-list-item">
                      <div className="app-item-hd">邮寄地址</div>
                      <div className="app-item-bd">
                          <input type="text" className="app-txt" placeholder="请输入邮寄地址" name="inpReportAddress" value={this.state.inpReportAddress} onChange={this.handleInputChange} />
                      </div>
                  </div>
                  :null}
              </div>
            </div>
          </div>
          <div className="app-ft phy-ft">
              <a href="javascript:;" onClick={this.handleSubmit} className="phy-bookingFormBtn">立即预约</a>
          </div>
        </div>
      )
    }else if(this.state.show==3){
      return(
        <div className="app-doc">
          <div className="no-data">
            <div className="no-text">
              {this.state.massage}
            </div>
          </div>
        </div>
      )
    }else{
      return(
        <div className="app-doc">

        </div>
      )
    }

  }
}
