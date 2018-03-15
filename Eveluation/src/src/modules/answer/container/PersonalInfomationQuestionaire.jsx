import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import axios from "../../common/httpAjax";
import common from '../../common/common';
import qs from "qs";
import $ from "jquery";
import {Toast,DatePicker} from 'antd-mobile';
import "../../../static/css/app.well.css";
import NavList from "../../common/navList";

export default class PersonalInfomationQuestionaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameStr:"",
      gender:"",
      birthday:"",
      marriage:"",
      height:"",
      weight:"",
      bmi:"",
      phone:"",
      isShow:false,
      massage:""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.personalSubmit=this.personalSubmit.bind(this);
    this.scrollToAnchor = this.scrollToAnchor.bind(this);
    this.cyValidate=this.cyValidate.bind(this);
  }
  componentDidMount() {
    switch(this.props.location.state.gender){
      case "1":
        common.title('个人健康风险评估报告（男）');
      break;
      case "2":
        common.title('个人健康风险评估报告（女）');
      break;
      default:
        common.title('个人健康风险评估报告');
    }
    this.getPersonal();
  }
  //判断是否有节点。
  isCheckModule(questionaireMap){
    if(questionaireMap!=undefined){
      if (questionaireMap.PersonalInfomationQuestionaire!=undefined){
        if(questionaireMap.PersonalInfomationQuestionaire.personalInformationModule!=undefined){
          return true;
        }
      }
    }
    return false;
  }
  //判断是否undefined
  isUndefined(dataStr){
    let nStr="";
    if (dataStr!=undefined){
      nStr=dataStr;
    }
    return nStr;
  }
  
  getPersonal(){
    let getUrl="/personHealthRisk/load?"+
        "personId="+this.props.location.state.personId+"&"+
        "evaluationId="+this.props.location.state.evaluationId+"&"+
        "gender="+this.props.location.state.gender+"&"+
        "questionaireKey="+this.props.location.state.questionaireKey;
    axios({
      url:getUrl,
      method:"get"
    }).then((response)=>{
      var gData=response.data;
      if (gData.code==0 && gData.data!=undefined){
        this.setState({
          isShow:true
        });
        if(this.isCheckModule(gData.data.questionaireMap)){
          var personalDate=gData.data.questionaireMap.PersonalInfomationQuestionaire.personalInformationModule;
          let heightVal, weightVal;
          heightVal=personalDate.height;
          weightVal=personalDate.weight;
          let bmi='', nameStr='', birthdayStr='', marriageStr='', phoneStr='';
          if (heightVal!='' && weightVal!=''){
            bmi=(weightVal/(heightVal*heightVal/10000)).toFixed(1);
          }
          nameStr=this.isUndefined(personalDate.name);
          if (this.isUndefined(personalDate.birthday)!=""){
            birthdayStr=personalDate.birthday.replace(/-/g, '/');
            birthdayStr=new Date(birthdayStr);
          }
          marriageStr=this.isUndefined(personalDate.marriage);
          phoneStr=this.isUndefined(personalDate.phone);
          this.setState({
            nameStr:nameStr,
            gender:personalDate.gender,
            birthday:birthdayStr,
            marriage:marriageStr,
            height:heightVal,
            weight:weightVal,
            bmi:bmi,
            phone:phoneStr,
            result:gData.data.result
          })
        }
      }else{
        Toast.info(gData.msg, 5);
        this.setState({
          massage:gData.msg
        });
      }

    });
  }

  //受控表单
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;//target.type === 'checkbox' ? target.checked :
    const name = target.name;
    this.setState({
      [name]: value
    },function(){
      if (this.state.height!="" && this.state.weight!=""){
        this.setState({
          bmi:(this.state.weight/(this.state.height*this.state.height/10000)).toFixed(1)
        })
      }
    });
  }

  //获取锚点位置
  scrollToAnchor(anchorName){
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if(anchorElement) {
        //android webView无scrollTo
        this.refs.orgAreaScroll.scrollTop =anchorElement.offsetTop;
      }
    }
  }

  //验证validate
  cyValidate(anchor, tips){
    Toast.info(tips, 2);
    this.scrollToAnchor(anchor);
  }

  personalSubmit(){
    var tState, forDate, urlState, ancItem='';
    tState=this.state;
    urlState=this.props.location.state;
    //您的姓名判断
    if (tState.nameStr.length==0){
      this.cyValidate("anchor-1", "请输入您的姓名");
      return;
    }else if(tState.nameStr.length>10){
      this.cyValidate("anchor-1","姓名只能输入最多10个字的中文");
      return;
    }
    if (tState.birthday.length==0){
      this.cyValidate("anchor-2", "请选择生日");
      return;
    }else{
      forDate=tState.birthday.getFullYear() + '-' + (tState.birthday.getMonth() + 1) + '-' + tState.birthday.getDate();
    }
    if (tState.marriage.length==0){
      this.cyValidate("anchor-3", "请选择婚姻状况");
      return;
    }
    var chkHeight=/^((5[0-9]\.\d|5[0-9])$|^([6-9]\d\.\d|[6-9]\d)$|^(1\d{2}\.\d|1\d{2})$|^(2\d{2}\.\d|2\d{2}))$/;
    if (tState.height.length==0){
      this.cyValidate("anchor-4", "请输入身高");
      return;
    }else if(!chkHeight.test(tState.height)){
      this.cyValidate("anchor-4", "身高的输入范围在50-300内，且最多保留1位小数的数字");
      return;
    }
    var chkWeight=/^((2[5-9]\.\d|2[5-9])$|^([3-9]\d\.\d|[3-9]\d)$|^(1\d{2}\.\d|1\d{2})$|200)$/;
    if (tState.weight.length==0){
      this.cyValidate("anchor-5", "请输入您的体重");
      return;
    }else if(!chkWeight.test(tState.weight)){
      this.cyValidate("anchor-5", "体重的输入范围在25-200，且最多保留1位小数的数字");
      return;
    }
    var chkTel=/^[1|9]\d{10}$/;
    if (tState.phone.length==0){
      this.cyValidate("anchor-6", "请输入手机号");
      return;
    }else if(!chkTel.test(tState.phone)){
      this.cyValidate("anchor-6", "请输入正确的手机号");
      return;
    }
    axios({
      url:"/personHealthRisk/save",
      data:{
        personId:urlState.personId,
        evaluationId:urlState.evaluationId,
        gender:urlState.gender,
        questionaireKey:urlState.questionaireKey,
        personalInfomationQuestionaire:{
          questionaireKey:urlState.questionaireKey,
          personalInformationModule: {
            name:tState.nameStr,
            birthday:forDate,
            marriage:tState.marriage,
            height:tState.height,
            weight:tState.weight,
            bmi:tState.bmi,
            phone:tState.phone
          }
        }
      },
      method:"put"
    }).then((response)=>{
      var pData=response.data;
      if (pData.code==0){
        Toast.info("保存成功，即将跳转到下一问卷！",1, function(){
          hashHistory.push({
            pathname:'/answer/FamilyAndPersonalIllnessQuestionaire',
            state:{
              personId:urlState.personId,
              evaluationId:urlState.evaluationId,
              gender:urlState.gender,
              questionaireKey:"FamilyAndPersonalIllnessQuestionaire"
            }
          });
        });
      }else{
        Toast.info(pData.msg,1);
      }
    })

  }
  render() {
    const CustomChildren = ({ extra, onClick, children }) => (
      <div
        onClick={onClick}
        className="app-question-txt"
      >
        {extra}
        <div className="app-well-down"></div>
      </div>
    );
    return (
      <div className="app-doc app-question">
        {common.appShare(this.props.location.state.gender)}
        <input type="hidden" name="backTo" id="backTo" value="2"/>
        <input type="hidden" name="backTips" id="backTips" value="您可以休息一会儿，下次接着答题！"/>
        <div className="app-hd">
          <div className="app-title">
            <div class="title-no">第一部分</div>
            <div class="title-name">个人基本信息</div>
          </div>
          <NavList
            pName="PersonalInfomationQuestionaire"
            personId={this.props.location.state.personId}
            evaluationId={this.props.location.state.evaluationId}
            gender={this.props.location.state.gender}
            evaluationKey={this.props.location.state.evaluationKey}
          />
        </div>
        {this.state.isShow
          ?
            <div className="app-bd" ref="orgAreaScroll">
              <div className="app-question-list">
                <div className="app-question-form" id="anchor-1">
                  <div className="app-question-lab">
                    1、姓名<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="nameStr" value={this.state.nameStr} placeholder="请输入您的姓名" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-2">
                  <div className="app-question-lab">
                    2、生日<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <DatePicker
                      mode="date"
                      title="选择日期"
                      extra="请选择"
                      minDate={new Date("1900/01/01")}
                      maxDate={new Date(new Date().getTime() - 24*60*60*1000)}
                      value={this.state.birthday}
                      onChange={date => this.setState({ birthday:date })}
                    >
                      <CustomChildren></CustomChildren>
                    </DatePicker>
                  </div>
                </div>
                <div className="app-question-form"  id="anchor-3">
                  <div className="app-question-lab">
                    3、婚姻<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="marriage" checked={this.state.marriage=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          未婚
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="marriage" checked={this.state.marriage=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          已婚（含同居）
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="app-question-form" id="anchor-4">
                  <div className="app-question-lab">
                    4、身高（单位：cm）<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="height" value={this.state.height} placeholder="请输入您的身高" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-5">
                  <div className="app-question-lab">
                    5、体重（单位：kg）<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="weight" value={this.state.weight} placeholder="请输入您的体重" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form">
                  <div className="app-question-lab">
                    6、BMI<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <div className="app-question-txt disabled">
                      {this.state.bmi}
                    </div>
                  </div>
                </div>
                <div className="app-question-form" id="anchor-6">
                  <div className="app-question-lab">
                    7、手机号<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="phone" value={this.state.phone} placeholder="请输入您的手机号" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
              </div>
            </div>
          :
          <div className="no-data">
            <div className="no-text">
              {this.state.massage}
            </div>
          </div>
        }
        <div className="app-ft">
          <div className="app-ft-btn-group">
            {!this.state.result?
              <a href="javascript:;" className="app-btn app-btnGoPay" onClick={this.personalSubmit}>保存</a>
            :
              null
            }
          </div>
        </div>
      </div>
    )
        

  }
}
