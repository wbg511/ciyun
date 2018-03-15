import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import axios from "../../common/httpAjax";
import common from '../../common/common';
import qs from "qs";
import $ from "jquery";
import {Toast,DatePicker} from 'antd-mobile';
import "../../../static/css/app.well.css";
import NavList from "../../common/navList";

export default class FamilyAndPersonalIllnessQuestionaire extends Component {
	constructor(props) {
    super(props);
    this.state = {
      isDiab:false,
			diabF:2,
			diabM:2,
			diabBro:2,
			diabSis:2,
			diabChild:2,
			diabGrand:2,
			diabetesBeforeFortyFamily:"",
			isChdFamily:false,
			chdFamily:2,
			chdBeforefiftyfiveFamily:2,
			hbpF:2,
			hbpM:2,
			hbpBro:2,
			hbpSis:2,
			lungCancerBro:2,
			lungCancerF:2,
			lungCancerM:2,
			lungCancerSis:2,
			strokeFamily:2,
			copdFamily:2,
			liverCancerFamily:2,
			stomachCancerFamily:2,
			colorectalCancerFamily:2,
			breastCancerFamily:2,
			cervicalCancerFamily:2,
			parentsFractureF:2,
			parentsFractureM:2,
			crpcF:2,
			crpcBro:2,
			crpcSon:2,

			diab1:2,
			diab2:2,
			hbp:2,
			hlp:2,
			gout:2,
			gastritis:2,
			nephritis:2,
			chd:2,
			stroke:2,
			afib:2,
			angiosis:2,
			pneumonia:2,
			chronicBronchitis:2,
			asthma:2,
			emphysema:2,
			tb:2,
			otherCopd:2,
			fracture:2,
			ra:2,
			bph:2,
			hyperplasiaOfMammaryGlands:2,
			pcos:2,
			chronicCervicalDisease:2,
			lungCancer:2,
			liverCancer:2,
			stomachCancer:2,
			colorectalCancer:2,
			breastCancer:2,
			cervicalCancer:2,
			crpc:2,
			airwayAbnormal:2,
			op:2,
      isShow:false,
      massage:"",
      diabetesBeforeFamily:2,

      headache:2,
      vertigo:2,
      stethalgia:2,
      dyspnea:2,
      cough:2,
      dysphagia:2,
      stomachache:2,
      diarrhea:2,
      urine:2,
      colporrhagia:2,  
      easyToHungry:2,
      loseFlesh:2,
      deadlimb:2,
      palpitate:2,
      isMenopause:2

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.personalSubmit=this.personalSubmit.bind(this);
    //多选
    this.checkboxInputChange=this.checkboxInputChange.bind(this);
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
    if (questionaireMap.FamilyAndPersonalIllnessQuestionaire!=undefined){
      if(questionaireMap.FamilyAndPersonalIllnessQuestionaire.familyIllnessModel!=undefined){
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
        	var familyDate=gData.data.questionaireMap.FamilyAndPersonalIllnessQuestionaire.familyIllnessModel;
        	var personalDate=gData.data.questionaireMap.FamilyAndPersonalIllnessQuestionaire.personalIllnessModel;
          var physicalDate=gData.data.questionaireMap.FamilyAndPersonalIllnessQuestionaire.physicalSymptomsModel
					this.setState({
						diabF:familyDate.diabF,
						diabM:familyDate.diabM,
						diabBro:familyDate.diabBro,
						diabSis:familyDate.diabSis,
						diabChild:familyDate.diabChild,
						diabGrand:this.isUndefined(familyDate.diabGrand),
						diabetesBeforeFortyFamily:this.isUndefined(familyDate.diabetesBeforeFortyFamily),
						chdFamily:familyDate.chdFamily,
						chdBeforefiftyfiveFamily:familyDate.chdBeforefiftyfiveFamily,
						hbpF:familyDate.hbpF,
						hbpM:familyDate.hbpM,
						hbpBro:familyDate.hbpBro,
						hbpSis:familyDate.hbpSis,
						lungCancerBro:familyDate.lungCancerBro,
						lungCancerF:familyDate.lungCancerF,
						lungCancerM:familyDate.lungCancerM,
						lungCancerSis:familyDate.lungCancerSis,
						strokeFamily:familyDate.strokeFamily,
						copdFamily:familyDate.copdFamily,
						liverCancerFamily:familyDate.liverCancerFamily,
						stomachCancerFamily:familyDate.stomachCancerFamily,
						colorectalCancerFamily:familyDate.colorectalCancerFamily,
						breastCancerFamily:familyDate.breastCancerFamily,
						cervicalCancerFamily:familyDate.cervicalCancerFamily,
						parentsFractureF:familyDate.parentsFractureF,
						parentsFractureM:familyDate.parentsFractureM,
						crpcF:familyDate.crpcF,
						crpcBro:familyDate.crpcBro,
						crpcSon:familyDate.crpcSon,

						diab1:personalDate.diab1,
						diab2:personalDate.diab2,
						hbp:personalDate.hbp,
						hlp:personalDate.hlp,
						gout:personalDate.gout,
						gastritis:personalDate.gastritis,
						nephritis:personalDate.nephritis,
						chd:personalDate.chd,
						stroke:personalDate.stroke,
						afib:personalDate.afib,
						angiosis:personalDate.angiosis,
						pneumonia:personalDate.pneumonia,
						chronicBronchitis:personalDate.chronicBronchitis,
						asthma:personalDate.asthma,
						emphysema:personalDate.emphysema,
						tb:personalDate.tb,
						otherCopd:personalDate.otherCopd,
						fracture:personalDate.fracture,
						ra:personalDate.ra,
						bph:personalDate.bph,
						hyperplasiaOfMammaryGlands:personalDate.hyperplasiaOfMammaryGlands,
						pcos:personalDate.pcos,
						chronicCervicalDisease:personalDate.chronicCervicalDisease,
						lungCancer:personalDate.lungCancer,
						liverCancer:personalDate.liverCancer,
						stomachCancer:personalDate.stomachCancer,
						colorectalCancer:personalDate.colorectalCancer,
						breastCancer:personalDate.breastCancer,
						cervicalCancer:personalDate.cervicalCancer,
						crpc:personalDate.crpc,
						airwayAbnormal:personalDate.airwayAbnormal,
						op:personalDate.op,
            result:gData.data.result,

            headache:physicalDate.headache,
            vertigo:physicalDate.vertigo,
            stethalgia:physicalDate.stethalgia,
            dyspnea:physicalDate.dyspnea,
            cough:physicalDate.cough,
            dysphagia:physicalDate.dysphagia,
            stomachache:physicalDate.stomachache,
            diarrhea:physicalDate.diarrhea,
            urine:physicalDate.urine,
            colporrhagia:physicalDate.colporrhagia,  
            easyToHungry:physicalDate.easyToHungry,
            loseFlesh:physicalDate.loseFlesh,
            deadlimb:physicalDate.deadlimb,
            palpitate:physicalDate.palpitate,
            isMenopause:physicalDate.isMenopause
          },function(){
          	var booleanDiab=false, booleanChdFamily=false, diabetesBeforeFamily=2;
        		if(this.state.diabF==1 || this.state.diabM==1 || this.state.diabBro==1 || this.state.diabSis==1 || this.state.diabChild==1 || this.state.diabGrand==1){
        			booleanDiab=true;
        			diabetesBeforeFamily=1;
        		}
						if (this.state.chdFamily==1){
							booleanChdFamily=true;
						};
						this.setState({
							isDiab:booleanDiab,
							isChdFamily:booleanChdFamily,
							diabetesBeforeFamily:diabetesBeforeFamily
						});
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
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if(name=="chdFamily"){
    	value==1 ? this.setState({
          isChdFamily:true
        }) : this.setState({
          isChdFamily:false,
          chdBeforefiftyfiveFamily:"2"
        })
    }
    if (name=="diabetesBeforeFamily"){
    	value==1 ? this.setState({
        isDiab:true
      }) : this.setState({
        isDiab:false,
        diabF:"2",
        diabM:"2",
        diabBro:"2",
        diabSis:"2",
        diabChild:"2",
        diabGrand:"2",
        diabetesBeforeFortyFamily:"2"
      })
    }
    this.setState({
      [name]: value
    });
  }
  checkboxInputChange(event){
  	var target = event.target;
		var value = target.value;
		var name = target.name;
		if (target.checked==false){
			value="2";
		}
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
		var tState, urlState, isDiabS=true;
    tState=this.state;
    urlState=this.props.location.state;
    if (this.state.diabetesBeforeFamily==1){
			$(".is_diab").each(function(){
				if($(this).is(':checked')) {
					  isDiabS=false;
				}
			});
			if (isDiabS){
				this.cyValidate("anchor-1", "至少选择一个糖尿病患者");
      	return;
			}
			if(tState.diabetesBeforeFortyFamily.length==0){
				this.cyValidate("anchor-2", "请选择患病者的年龄是否是在40岁之前");
      	return;
			}
    }
    axios({
      url:"/personHealthRisk/save",
      data:{
        personId:urlState.personId,
        evaluationId:urlState.evaluationId,
        gender:urlState.gender,
        questionaireKey:urlState.questionaireKey,
        familyAndPersonalIllnessQuestionaire:{
          questionaireKey:urlState.questionaireKey,
          familyIllnessModel: {
          	modelKey: "FamilyIllnessModel",
            diabF:tState.diabF,
						diabM:tState.diabM,
						diabBro:tState.diabBro,
						diabSis:tState.diabSis,
						diabChild:tState.diabChild,
						diabGrand:tState.diabGrand,
						diabetesBeforeFortyFamily:tState.diabetesBeforeFortyFamily,
						chdFamily:tState.chdFamily,
						chdBeforefiftyfiveFamily:tState.chdBeforefiftyfiveFamily,
						hbpF:tState.hbpF,
						hbpM:tState.hbpM,
						hbpBro:tState.hbpBro,
						hbpSis:tState.hbpSis,
						lungCancerBro:tState.lungCancerBro,
						lungCancerF:tState.lungCancerF,
						lungCancerM:tState.lungCancerM,
						lungCancerSis:tState.lungCancerSis,
						strokeFamily:tState.strokeFamily,
						copdFamily:tState.copdFamily,
						liverCancerFamily:tState.liverCancerFamily,
						stomachCancerFamily:tState.stomachCancerFamily,
						colorectalCancerFamily:tState.colorectalCancerFamily,
						breastCancerFamily:tState.breastCancerFamily,
						cervicalCancerFamily:tState.cervicalCancerFamily,
						parentsFractureF:tState.parentsFractureF,
						parentsFractureM:tState.parentsFractureM,
						crpcF:tState.crpcF,
						crpcBro:tState.crpcBro,
						crpcSon:tState.crpcSon
          },
          personalIllnessModel:{
          	modelKey: "personalIllnessModel",
          	diab1:tState.diab1,
						diab2:tState.diab2,
						hbp:tState.hbp,
						hlp:tState.hlp,
						gout:tState.gout,
						gastritis:tState.gastritis,
						nephritis:tState.nephritis,
						chd:tState.chd,
						stroke:tState.stroke,
						afib:tState.afib,
						angiosis:tState.angiosis,
						pneumonia:tState.pneumonia,
						chronicBronchitis:tState.chronicBronchitis,
						asthma:tState.asthma,
						emphysema:tState.emphysema,
						tb:tState.tb,
						otherCopd:tState.otherCopd,
						fracture:tState.fracture,
						ra:tState.ra,
						bph:tState.bph,
						hyperplasiaOfMammaryGlands:tState.hyperplasiaOfMammaryGlands,
						pcos:tState.pcos,
						chronicCervicalDisease:tState.chronicCervicalDisease,
						lungCancer:tState.lungCancer,
						liverCancer:tState.liverCancer,
						stomachCancer:tState.stomachCancer,
						colorectalCancer:tState.colorectalCancer,
						breastCancer:tState.breastCancer,
						cervicalCancer:tState.cervicalCancer,
						crpc:tState.crpc,
						airwayAbnormal:tState.airwayAbnormal,
						op:tState.op
          },
          physicalSymptomsModel:{
            modelKey: "physicalSymptomsModel",
            headache:tState.headache,
            vertigo:tState.vertigo,
            stethalgia:tState.stethalgia,
            dyspnea:tState.dyspnea,
            cough:tState.cough,
            dysphagia:tState.dysphagia,
            stomachache:tState.stomachache,
            diarrhea:tState.diarrhea,
            urine:tState.urine,
            colporrhagia:tState.colporrhagia,  
            easyToHungry:tState.easyToHungry,
            loseFlesh:tState.loseFlesh,
            deadlimb:tState.deadlimb,
            palpitate:tState.palpitate,
            isMenopause:tState.isMenopause
          }
        }
      },
      method:"put"
    }).then((response)=>{
			var pData=response.data;
      if (pData.code==0){
        Toast.info("保存成功，即将跳转到下一问卷！",1, function(){
          hashHistory.push({
            pathname:'/answer/MedicationInfomationQuestionaire',
            state:{
              personId:urlState.personId,
              evaluationId:urlState.evaluationId,
              gender:urlState.gender,
              questionaireKey:"MedicationInfomationQuestionaire"
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
          	<div class="title-no">第二部分</div>
          	<div class="title-name">家族和个人疾病史</div>
          </div>
          <NavList
            pName="FamilyAndPersonalIllnessQuestionaire"
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
              <div className="app-question-form">
                <div className="app-question-lab">
                  1、家庭成员是否有人患有糖尿病
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="diabetesBeforeFamily" checked={this.state.diabetesBeforeFamily=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        是
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="diabetesBeforeFamily" checked={this.state.diabetesBeforeFamily=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        否
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              {this.state.isDiab ?
                <div className="app-question-form">
                  <div className="app-question-form" id="anchor-1">
                    <div className="app-question-lab">
                      1.1、患病者与您的关系<span className="require">*</span>
                    </div>
                    <div className="app-question-val">
                      <ul className="app-list clearfix">
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="diabF" checked={this.state.diabF=='1'?true : false} className="app-checkBox app-checkBox-well is_diab" onChange={this.checkboxInputChange}/>
                            父亲
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="diabM" checked={this.state.diabM=='1'?true : false} className="app-checkBox app-checkBox-well is_diab" onChange={this.checkboxInputChange}/>
                            母亲
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="diabBro" checked={this.state.diabBro=='1'?true : false} className="app-checkBox app-checkBox-well is_diab" onChange={this.checkboxInputChange}/>
                            兄弟
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="diabSis" checked={this.state.diabSis=='1'?true : false} className="app-checkBox app-checkBox-well is_diab" onChange={this.checkboxInputChange}/>
                            姐妹
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="diabChild" checked={this.state.diabChild=='1'?true : false} className="app-checkBox app-checkBox-well is_diab" onChange={this.checkboxInputChange}/>
                            子女
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="diabGrand" checked={this.state.diabGrand=='1'?true : false} className="app-checkBox app-checkBox-well is_diab" onChange={this.checkboxInputChange}/>
                            祖（外祖）父母、孙（外孙）子女、叔舅姑姨、外甥（女）
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="app-question-form" id="anchor-2">
                    <div className="app-question-lab">
                      1.2、患病者的年龄是否是在40岁之前<span className="require">*</span>
                    </div>
                    <div className="app-question-val">
                      <ul className="app-list clearfix">
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="1" name="diabetesBeforeFortyFamily" checked={this.state.diabetesBeforeFortyFamily=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            是
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="2" name="diabetesBeforeFortyFamily" checked={this.state.diabetesBeforeFortyFamily=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            否
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              :
                null
              }
              <div className="app-question-form">
                <div className="app-question-lab">
                  2、家庭成员是否患有冠心病/心肌梗死/心脏血运重建手术
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="chdFamily" checked={this.state.chdFamily=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        是
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="chdFamily" checked={this.state.chdFamily=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        否
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              {this.state.isChdFamily ?
                <div className="app-question-form">
                  <div className="app-question-lab">
                    2.1、患心脏病的年龄是否男性在55岁之前或女性在65岁之前？
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="chdBeforefiftyfiveFamily" checked={this.state.chdBeforefiftyfiveFamily=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          是
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="chdBeforefiftyfiveFamily" checked={this.state.chdBeforefiftyfiveFamily=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          否
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              :
                null
              }
              <div className="app-question-form">
                <div className="app-question-lab">
                  3、家庭成员是否患有高血压
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="hbpF" checked={this.state.hbpF=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        父亲
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="hbpM" checked={this.state.hbpM=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        母亲
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="hbpBro" checked={this.state.hbpBro=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        兄弟
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="hbpSis" checked={this.state.hbpSis=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        姐妹
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form">
                <div className="app-question-lab">
                  4、家庭成员是否患有肺癌
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="lungCancerF" checked={this.state.lungCancerF=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        父亲
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="lungCancerM" checked={this.state.lungCancerM=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        母亲
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="lungCancerBro" checked={this.state.lungCancerBro=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        兄弟
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="lungCancerSis" checked={this.state.lungCancerSis=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        姐妹
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form">
                <div className="app-question-lab">
                  5、家族患病史是否出现以下疾病
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="strokeFamily" checked={this.state.strokeFamily=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        脑卒中（脑中风）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="copdFamily" checked={this.state.copdFamily=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        慢阻肺（慢性支气管炎、哮喘、肺气肿）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="liverCancerFamily" checked={this.state.liverCancerFamily=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        肝癌
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="stomachCancerFamily" checked={this.state.stomachCancerFamily=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        食管癌/胃癌
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="colorectalCancerFamily" checked={this.state.colorectalCancerFamily=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        结直肠癌
                      </label>
                    </li>
                    {this.state.gender=="2" ?
                      <div>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="breastCancerFamily" checked={this.state.breastCancerFamily=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                            乳腺癌
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="cervicalCancerFamily" checked={this.state.cervicalCancerFamily=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                            宫颈癌
                          </label>
                        </li>
                      </div>
                    :
                      null
                    }
                  </ul>
                </div>
              </div>
              <div className="app-question-form">
                <div className="app-question-lab">
                  6、家庭成员是否出现髋部骨折史
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="parentsFractureF" checked={this.state.parentsFractureF=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        父亲
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="parentsFractureM" checked={this.state.parentsFractureM=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        母亲
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              {this.props.location.state.gender=="1" ?
                <div className="app-question-form">
                  <div className="app-question-lab">
                    7、家庭成员是否患有前列腺癌
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="crpcF" checked={this.state.crpcF=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          父亲
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="crpcBro" checked={this.state.crpcBro=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          兄弟
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="crpcSon" checked={this.state.crpcSon=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          儿子
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              :
                null
              }
              <div className="app-question-form">
                <div className="app-question-lab">
                  {this.props.location.state.gender=="1" ?"8":"7"}、个人是否患有以下疾病
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="diab1" checked={this.state.diab1=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        1型糖尿病
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="diab2" checked={this.state.diab2=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        2型糖尿病
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="hbp" checked={this.state.hbp=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        高血压
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="hlp" checked={this.state.hlp=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        高脂血症
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="gout" checked={this.state.gout=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        痛风（高尿酸血症）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="gastritis" checked={this.state.gastritis=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        胃炎/胃、十二指肠溃疡
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="nephritis" checked={this.state.nephritis=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        肾脏疾病（肾炎、肾病，肾功能不全）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="chd" checked={this.state.chd=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        冠心病/心肌梗死/心脏血运重建手术
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="stroke" checked={this.state.stroke=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        脑卒中（脑中风）/短暂脑缺血发作
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="afib" checked={this.state.afib=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        房颤/心脏瓣膜病
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="angiosis" checked={this.state.angiosis=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        外周血管病（动脉瘤、动脉夹层、动脉闭塞等）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="pneumonia" checked={this.state.pneumonia=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        肺炎
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="chronicBronchitis" checked={this.state.chronicBronchitis=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        慢性支气管炎
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="asthma" checked={this.state.asthma=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        哮喘
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="emphysema" checked={this.state.emphysema=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        肺气肿
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="tb" checked={this.state.tb=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        肺结核
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="otherCopd" checked={this.state.otherCopd=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        其它慢性阻塞性肺部疾病
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="fracture" checked={this.state.fracture=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        骨折史
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="ra" checked={this.state.ra=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        类风湿性关节炎
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="lungCancer" checked={this.state.lungCancer=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        肺癌
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="liverCancer" checked={this.state.liverCancer=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        肝癌
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="stomachCancer" checked={this.state.stomachCancer=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        食管癌/胃癌
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="colorectalCancer" checked={this.state.colorectalCancer=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        结直肠癌
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="airwayAbnormal" checked={this.state.airwayAbnormal=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        腭垂或扁桃体肥大
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="op" checked={this.state.op=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        骨质疏松症
                      </label>
                    </li>
                    {this.props.location.state.gender=="1" ?
                      <div>
                        <li>
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="bph" checked={this.state.bph=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                            前列腺增生/肥大
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="crpc" checked={this.state.crpc=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                            前列腺癌
                          </label>
                        </li>
                      </div>
                    :
                      null
                    }
                    {this.props.location.state.gender=="2" ?
                      <div>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="hyperplasiaOfMammaryGlands" checked={this.state.hyperplasiaOfMammaryGlands=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                            乳腺增生/结节
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="pcos" checked={this.state.pcos=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                            多囊卵巢综合征
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="chronicCervicalDisease" checked={this.state.chronicCervicalDisease=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                            慢性宫颈疾病（炎症、纳囊）
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="breastCancer" checked={this.state.breastCancer=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                            乳腺癌
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="cervicalCancer" checked={this.state.cervicalCancer=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                            宫颈癌
                          </label>
                        </li>
                      </div>
                    :
                      null
                    }
                  </ul>
                </div>
              </div>
              <div className="app-question-form">
                <div className="app-question-lab">
                  {this.props.location.state.gender=="1" ?"9":"8"}、躯体症状（最近3个月明显的不适症状）
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="headache" checked={this.state.headache=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        头晕、头痛、头胀、头部紧箍感
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="vertigo" checked={this.state.vertigo=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        一过性偏身感觉障碍、肢体活动不灵、视觉障碍或偏盲、行走或站立不稳、眩晕
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="stethalgia" checked={this.state.stethalgia=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        胸痛、胸闷、心悸或心动过速
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="dyspnea" checked={this.state.dyspnea=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        呼吸困难、夜间不能平卧/下肢水肿
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="cough" checked={this.state.cough=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        咳嗽、咳痰、咯血
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="dysphagia" checked={this.state.dysphagia=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        吞咽困难、反酸，胃部不适
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="stomachache" checked={this.state.stomachache=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        腹痛、腹胀、腹部不适
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="diarrhea" checked={this.state.diarrhea=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        大便带血、黑便、腹泻
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="urine" checked={this.state.urine=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        尿频、尿急、尿痛、尿血、排尿困难
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="easyToHungry" checked={this.state.easyToHungry=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        口渴多饮、易饥饿
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="loseFlesh" checked={this.state.loseFlesh=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        身体消瘦或体重减轻（3个月内体重减轻超过原体重的10%）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="deadlimb" checked={this.state.deadlimb=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        手足麻木、刺痛、间歇性跛行
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-checkBox-box">
                        <input type="checkbox" value="1" name="palpitate" checked={this.state.palpitate=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                        发作性心慌、乏力、出汗
                      </label>
                    </li>
                    {this.props.location.state.gender=="2" ?
                      <div>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="colporrhagia" checked={this.state.colporrhagia=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                            原因不明的阴道出血/白带异常
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-checkBox-box">
                            <input type="checkbox" value="1" name="isMenopause" checked={this.state.isMenopause=='1'? true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                            绝经
                          </label>
                        </li>
                      </div>
                    :null}
                  </ul>
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
