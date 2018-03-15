import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import axios from "../../common/httpAjax";
import common from '../../common/common';
import qs from "qs";
import $ from "jquery";
import {Toast,DatePicker} from 'antd-mobile';
import "../../../static/css/app.well.css";
import NavList from "../../common/navList";

export default class PhysicalIndicatorsQuestionaire extends Component {
	constructor(props) {
    super(props);
    this.state = {
      waistLine:"",
      fatRate:"",
      visceralFatRate:"",
      sbp:"",
      dbp:"",
      fastingBg:"",
      afterMeal2Hours:"",
      chol:"",
      trig:"",
      ldlc:"",
      hdlc:"",
      ua:"",
      homocysteine:"",
      hs_CRP:"",
      pro:"-",
      microalbumin:"",
      tScore:"",
      isShow:false,
      massage:""
    }
    this.handleInputChange=this.handleInputChange.bind(this);
    this.personalSubmit=this.personalSubmit.bind(this);
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
    this.getPhysical();
  }
  //判断是否有节点。
  isCheckModule(questionaireMap){
    if (questionaireMap.PhysicalIndicatorsQuestionaire!=undefined){
      if(questionaireMap.PhysicalIndicatorsQuestionaire.physicalIndicatorsModule!=undefined){
        return true;
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
  getPhysical(){
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
          var physicalDate=gData.data.questionaireMap.PhysicalIndicatorsQuestionaire.physicalIndicatorsModule;
          this.setState({
            waistLine:this.isUndefined(physicalDate.waistLine),
            fatRate:this.isUndefined(physicalDate.fatRate),
            visceralFatRate:this.isUndefined(physicalDate.visceralFatRate),
            sbp:this.isUndefined(physicalDate.sbp),
            dbp:this.isUndefined(physicalDate.dbp),
            fastingBg:this.isUndefined(physicalDate.fastingBg),
            afterMeal2Hours:this.isUndefined(physicalDate.afterMeal2Hours),
            chol:this.isUndefined(physicalDate.chol),
            trig:this.isUndefined(physicalDate.trig),
            ldlc:this.isUndefined(physicalDate.ldlc),
            hdlc:this.isUndefined(physicalDate.hdlc),
            ua:this.isUndefined(physicalDate.ua),
            homocysteine:this.isUndefined(physicalDate.homocysteine),
            hs_CRP:this.isUndefined(physicalDate.hs_CRP),
            pro:this.isUndefined(physicalDate.pro),
            microalbumin:this.isUndefined(physicalDate.microalbumin),
            tScore:this.isUndefined(physicalDate.tscore),
            result:this.isUndefined(gData.data.result)
          });
        }
      }else{
        Toast.info(gData.msg, 5);
        this.setState({
          massage:gData.msg
        });
      }
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
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
    var tState, urlState;
    tState=this.state;
    urlState=this.props.location.state;
    //腰围
    var chkWaistLine=/^((5[0-9]\.\d|5[0-9])$|^([6-9]\d\.\d|[6-9]\d)$|^(1\d{2}\.\d|1\d{2})$|200)$/;
    //体脂肪率
    var chkFatRate=/^(([5-9])$|^([1-4]\d)$|50)$/;
    //内脏脂肪指数
    var chkVisceralFatRate=/^(0\.[5-9])$|^([1-8]\.[0-9]|[1-9])$|^(9\.[0-5])$/;
    //收缩压
    var chkSbp=/^(6[0-9]$|^[7-9]\d$|^1\d{2}$|^2\d{2}$|300)/;
    //舒张压
    var chkDbp=/^(4[0-9]$|^[5-9]\d$|^1\d{2}$|200)/;
    //空腹血糖, 餐后2h血糖
    var chkBlood=/^(([0-9]\.\d{1,2}|[0-9])$|^([1-2]\d\.\d{1,2}|[1-2]\d)$|30)$/;
    //总胆固醇，低密度脂蛋白胆固醇
    var chk001to50=/^(([0-9]\.\d{1,2}|[0-9])$|^([1-4]\d\.\d{1,2}|[1-4]\d)$|50)$/;//甘油三酯, 高密度脂蛋白胆固醇
    //甘油三酯,高密度脂蛋白胆固醇
    var chk001to20=/^(([0-9]\.\d{1,2}|[0-9])$|^(1\d\.\d{1,2}|1\d)$|20)$/;
    //血尿酸
    var chkUa=/^(([0-9]\.\d|[0-9])$|^([1-9]\d\.\d|[1-9]\d)$|^([1-9]\d{2}\.\d|[1-9]\d{2})$|1000)$/; //同型半胱氨酸，超敏C反应蛋白
    var chk01to200=/^(([0-9]\.\d|[0-9])$|^([1-9]\d\.\d|[1-9]\d)$|^(1\d{2}\.\d|1\d{2})$|200)$/;
    //微量白蛋白
    var chkMicroalbumin=/^(([0-9]\.\d{1,2}|[0-9])$|^([1-9]\d\.\d{1,2}|[1-9]\d)$|^([1-9]\d{2}\.\d{1,2}|[1-9]\d{2})$|1000)$/;
    //骨密度检测T值
    var chktScore=/^((-)?[1-9]|[0-9])$/;
    
    
    if(tState.waistLine.length==0){
      this.cyValidate("anchor-1", "请输入腰围");
      return;
    }else if(!chkWaistLine.test(tState.waistLine)){
      this.cyValidate("anchor-1", "腰围的输入范围为50-200，且最多保留1位小数");
      return;
    }
    var fatRateNull, visceralFatRateNull, afterMeal2HoursNull, uaNull, homocysteineNull, hs_CRPNull, microalbuminNull,tScoreNull;

    if(tState.fatRate.length==0){
      fatRateNull=-999;
    }else if(!chkFatRate.test(tState.fatRate)){
      this.cyValidate("anchor-2", "体脂肪率的输入范围为5-50的整数");
      return;
    }else{
      fatRateNull=tState.fatRate;
    }
    if(tState.visceralFatRate.length==0){
      visceralFatRateNull=-999;
    }else if(!chkVisceralFatRate.test(tState.visceralFatRate)){
      this.cyValidate("anchor-3", "内脏脂肪指数的输入范围为0.5-9.5，且最多保留1位小数");
      return;
    }else{
      visceralFatRateNull=tState.visceralFatRate;
    }

    if(tState.sbp.length==0){
      this.cyValidate("anchor-4", "请输入收缩压");
      return;
    }else if(!chkSbp.test(tState.sbp)){
      this.cyValidate("anchor-4", "收缩压的输入范围为60-300的整数");
      return;
    }
    if(tState.dbp.length==0){
      this.cyValidate("anchor-4", "请输入舒张压");
      return;
    }else if(!chkDbp.test(tState.dbp)){
      this.cyValidate("anchor-4", "舒张压的输入范围为40-200的整数");
      return;
    }
    if(tState.fastingBg.length==0){
      this.cyValidate("anchor-5", "请输入空腹血糖");
      return;
    }else if(!chkBlood.test(tState.fastingBg)){
      this.cyValidate("anchor-5", "空腹血糖的输入范围为0.01-30，且最多保留2位小数");
      return;
    }
    if(tState.afterMeal2Hours.length==0){
      afterMeal2HoursNull=-999;
    }else if(!chkBlood.test(tState.afterMeal2Hours)){
      this.cyValidate("anchor-6", "餐后2h血糖的输入范围为0.01-30，且最多保留2位小数");
      return;
    }else{
      afterMeal2HoursNull=tState.afterMeal2Hours;
    }

    if(tState.chol.length==0){
      this.cyValidate("anchor-7", "请输入总胆固醇");
      return;
    }else if(!chk001to50.test(tState.chol)){
      this.cyValidate("anchor-7", "总胆固醇的输入范围为0.01-50，且最多保留2位小数");
      return;
    }


    if(tState.trig.length==0){
      this.cyValidate("anchor-8", "请输入甘油三酯");
      return;
    }else if(!chk001to20.test(tState.trig)){
      this.cyValidate("anchor-8", "甘油三酯的输入范围为0.01-20，且最多保留2位小数");
      return;
    }

    if(tState.ldlc.length==0){
      this.cyValidate("anchor-9", "请输入低密度脂蛋白胆固醇");
      return;
    }else if(!chk001to50.test(tState.ldlc)){
      this.cyValidate("anchor-9", "低密度脂蛋白胆固醇的输入范围为0.01-50，且最多保留2位小数");
      return;
    }

    if(tState.hdlc.length==0){
      this.cyValidate("anchor-10", "请输入高密度脂蛋白胆固醇");
      return;
    }else if(!chk001to20.test(tState.hdlc)){
      this.cyValidate("anchor-10", "高密度脂蛋白胆固醇的输入范围为0.01-20，且最多保留2位小数");
      return;
    }
    
    if(tState.ua.length==0){
      uaNull=-999;
    }else if(!chkUa.test(tState.ua)){
      this.cyValidate("anchor-11", "输入的血尿酸范围在0.1-1000并且最多保留1位小数");
      return;
    }else{
      uaNull=tState.ua;
    }

    if(tState.homocysteine.length==0){
      homocysteineNull=-999;
    }else if(!chk01to200.test(tState.homocysteine)){
      this.cyValidate("anchor-12", "同型半胱氨酸的输入范围为0.1-200，且最多保留1位小数");
      return;
    }else{
      homocysteineNull=tState.homocysteine;
    }
    
    if(tState.hs_CRP.length==0){
      hs_CRPNull=-999;
    }else if(!chk01to200.test(tState.hs_CRP)){
      this.cyValidate("anchor-13", "超敏C反应蛋白的输入范围为0.1-200，且最多保留1位小数");
      return;
    }else{
      hs_CRPNull=tState.hs_CRP;
    }

    if(tState.microalbumin.length==0){
      microalbuminNull=-999;
    }else if(!chkMicroalbumin.test(tState.microalbumin)){
      this.cyValidate("anchor-14", "微量白蛋白的输入范围为0.01-1000，且最多保留2位小数");
      return;
    }else{
      microalbuminNull=tState.microalbumin;
    }

    if(tState.tScore.length==0){
      tScoreNull=-999;
    }else if(!chktScore.test(tState.tScore)){
      this.cyValidate("anchor-16", "骨密度检测T值的输入范围为-9~9的整数");
      return;
    }else{
      tScoreNull=tState.tScore;
    }
   

    axios({
      url:"/personHealthRisk/save",
      data:{
        personId:urlState.personId,
        evaluationId:urlState.evaluationId,
        gender:urlState.gender,
        questionaireKey:urlState.questionaireKey,
        physicalIndicatorsQuestionaire:{
          questionaireKey:urlState.questionaireKey,
          physicalIndicatorsModule:{
            waistLine:tState.waistLine,
            fatRate:fatRateNull,
            visceralFatRate:visceralFatRateNull,
            sbp:tState.sbp,
            dbp:tState.dbp,
            fastingBg:tState.fastingBg,
            afterMeal2Hours:afterMeal2HoursNull,
            chol:tState.chol,
            trig:tState.trig,
            ldlc:tState.ldlc,
            hdlc:tState.hdlc,
            ua:uaNull,
            homocysteine:homocysteineNull,
            hs_CRP:hs_CRPNull,
            pro:tState.pro,
            microalbumin:microalbuminNull,
            tScore:tScoreNull
          }
        }
      },
      method:"put"
    }).then((response)=>{
      var pData=response.data;
        if (pData.code==0){
          Toast.info("保存成功，即将生成结果！",1, function(){
            hashHistory.push({
              pathname:'/PersonalInfomationReport',
              query:{
                personId:urlState.personId,
                evaluationId:urlState.evaluationId,
                gender:urlState.gender,
                reportKey:"PersonalInfomationReport"
              }
            });
          });
        }else{
          Toast.info(pData.msg,1);
        }
    });
  }
  render() {
    return (
			<div className="app-doc app-question">
        {common.appShare(this.props.location.state.gender)}
        <input type="hidden" name="backTo" id="backTo" value="2"/>
        <input type="hidden" name="backTips" id="backTips" value="您可以休息一会儿，下次接着答题！"/>
        <div className="app-hd">
          <div className="app-title">
            <div class="title-no">第六部分</div>
            <div class="title-name">主要生理指标</div>
          </div>
          <NavList
            pName="PhysicalIndicatorsQuestionaire"
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
                    1、腰围（单位：cm）<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="waistLine" value={this.state.waistLine} placeholder="请输入腰围" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-2">
                  <div className="app-question-lab">
                    2、体脂肪率（单位：%）
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="fatRate" value={this.state.fatRate} placeholder="请输入体脂肪率" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-3">
                  <div className="app-question-lab">
                    3、内脏脂肪指数
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="visceralFatRate" value={this.state.visceralFatRate} placeholder="请输入内脏脂肪指数" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-4">
                  <div className="app-question-lab">
                    4、血压（收缩压/舒张压）（单位：mmHg）<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <div className="app-sbp">
                      <input type="text" name="sbp" value={this.state.sbp} placeholder="请输入收缩压" className="app-question-txt" onChange={this.handleInputChange} />
                    </div>
                    <div>
                      <input type="text" name="dbp" value={this.state.dbp} placeholder="请输入舒张压" className="app-question-txt" onChange={this.handleInputChange} />
                    </div>
                  </div>
                </div>
                <div className="app-question-form" id="anchor-5">
                  <div className="app-question-lab">
                    5、空腹血糖（单位：mmol/L）<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="fastingBg" value={this.state.fastingBg} placeholder="请输入空腹血糖" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-6">
                  <div className="app-question-lab">
                    6、餐后2h血糖（单位：mmol/L）
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="afterMeal2Hours" value={this.state.afterMeal2Hours} placeholder="请输入餐后2h血糖" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-7">
                  <div className="app-question-lab">
                    7、总胆固醇（单位：mmol/L）<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="chol" value={this.state.chol} placeholder="请输入总胆固醇" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-8">
                  <div className="app-question-lab">
                    8、甘油三酯（单位：mmol/L）<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="trig" value={this.state.trig} placeholder="请输入甘油三酯" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-9">
                  <div className="app-question-lab">
                    9、低密度脂蛋白胆固醇（单位：mmol/L）<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="ldlc" value={this.state.ldlc} placeholder="请输入低密度脂蛋白胆固醇" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-10">
                  <div className="app-question-lab">
                    10、高密度脂蛋白胆固醇（单位：mmol/L）<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="hdlc" value={this.state.hdlc} placeholder="请输入高密度脂蛋白胆固醇" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-11">
                  <div className="app-question-lab">
                    11、血尿酸（单位：μmol/L）
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="ua" value={this.state.ua} placeholder="请输入血尿酸" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-12">
                  <div className="app-question-lab">
                    12、同型半胱氨酸（单位：μmol/L）
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="homocysteine" value={this.state.homocysteine} placeholder="请输入同型半胱氨酸" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-13">
                  <div className="app-question-lab">
                    13、超敏C反应蛋白（单位：mg/L）
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="hs_CRP" value={this.state.hs_CRP} placeholder="请输入超敏C反应蛋白" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-14">
                  <div className="app-question-lab">
                    14、微量白蛋白（单位：mg/24h）
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="microalbumin" value={this.state.microalbumin} placeholder="请输入微量白蛋白" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="app-question-form" id="anchor-15">
                  <div className="app-question-lab">
                    15、尿蛋白
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="-" name="pro" checked={this.state.pro=='-'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          -
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="+" name="pro" checked={this.state.pro=='+'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          +
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="++" name="pro" checked={this.state.pro=='++'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          ++
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="+++" name="pro" checked={this.state.pro=='+++'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          +++
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="++++" name="pro" checked={this.state.pro=='++++'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          ++++
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="app-question-form" id="anchor-16">
                  <div className="app-question-lab">
                    16、骨密度检测T值
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="tScore" value={this.state.tScore} placeholder="请输入骨密度检测T值" className="app-question-txt" onChange={this.handleInputChange} />
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
