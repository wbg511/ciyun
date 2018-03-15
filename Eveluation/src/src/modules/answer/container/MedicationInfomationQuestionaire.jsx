import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import axios from "../../common/httpAjax";
import common from '../../common/common';
import qs from "qs";
import $ from "jquery";
import {Toast,DatePicker} from 'antd-mobile';
import "../../../static/css/app.well.css";
import NavList from "../../common/navList";

export default class MedicationInfomationQuestionaire extends Component {
	constructor(props) {
    super(props);
    this.state = {
      antihypertensive:"2",
			antidiabetic:"2",
			lipidMedicine:"2",
			uricMedicine:"2",
			contraceptive:"2",
			estrogens:"2",
			cortisone:"2",
			analgesics:"2",
			slimmingMedicine:"2",
			antidepressant:"2",
			hypnotics:"2",
			herbal:"2",
			ach:"2",
			others:"2",
      isShow:false,
      massage:""
  	};
    this.checkboxInputChange = this.checkboxInputChange.bind(this);
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
    this.getMedication();
  }
  //判断是否有节点。
  isCheckModule(questionaireMap){
    if (questionaireMap.MedicationInfomationQuestionaire!=undefined){
      if(questionaireMap.MedicationInfomationQuestionaire.medicationInfomationModule!=undefined){
        return true;
      }
    }
    return false;
  }
  getMedication(){
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
        	var medicationDate=gData.data.questionaireMap.MedicationInfomationQuestionaire.medicationInfomationModule;
        	this.setState({
            antihypertensive:medicationDate.antihypertensive,
						antidiabetic:medicationDate.antidiabetic,
						lipidMedicine:medicationDate.lipidMedicine,
						uricMedicine:medicationDate.uricMedicine,
						contraceptive:medicationDate.contraceptive,
						estrogens:medicationDate.estrogens,
						cortisone:medicationDate.cortisone,
						analgesics:medicationDate.analgesics,
						slimmingMedicine:medicationDate.slimmingMedicine,
						antidepressant:medicationDate.antidepressant,
						hypnotics:medicationDate.hypnotics,
						herbal:medicationDate.herbal,
						ach:medicationDate.ach,
						others:medicationDate.others,
            result:gData.data.result
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

	personalSubmit(){
		var tState, urlState;
    tState=this.state;
    urlState=this.props.location.state;
    axios({
      url:"/personHealthRisk/save",
      data:{
        personId:urlState.personId,
        evaluationId:urlState.evaluationId,
        gender:urlState.gender,
        questionaireKey:urlState.questionaireKey,
        medicationInfomationQuestionaire:{
        	questionaireKey:urlState.questionaireKey,
        	medicationInfomationModule:{
		        antihypertensive:tState.antihypertensive,
						antidiabetic:tState.antidiabetic,
						lipidMedicine:tState.lipidMedicine,
						uricMedicine:tState.uricMedicine,
						contraceptive:tState.contraceptive,
						estrogens:tState.estrogens,
						cortisone:tState.cortisone,
						analgesics:tState.analgesics,
						slimmingMedicine:tState.slimmingMedicine,
						antidepressant:tState.antidepressant,
						hypnotics:tState.hypnotics,
						herbal:tState.herbal,
						ach:tState.ach,
						others:tState.others
        	}
        }
      },
      method:"put"
    }).then((response)=>{
			var pData=response.data;
			if (pData.code==0){
        Toast.info("保存成功，即将跳转到下一问卷！",1, function(){
          hashHistory.push({
            pathname:'/answer/LivingHabitsAndEnvironmentalEvaluationQuestionaire',
            state:{
              personId:urlState.personId,
              evaluationId:urlState.evaluationId,
              gender:urlState.gender,
              questionaireKey:"LivingHabitsAndEnvironmentalEvaluationQuestionaire"
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
							<div  class="title-no">第三部分</div>
							<div class="title-name">长期用药情况</div>
						</div>
	          <NavList
              pName="MedicationInfomationQuestionaire"
              personId={this.props.location.state.personId}
              evaluationId={this.props.location.state.evaluationId}
              gender={this.props.location.state.gender}
              evaluationKey={this.props.location.state.evaluationKey}
            />
	        </div>
          {this.state.isShow
          ?
            <div className="app-bd">
              <div className="app-question-list">
                <div className="app-question-form">
                  <div className="app-question-lab">
                    1、长期用药情况
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="antihypertensive" checked={this.state.antihypertensive=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          降压药
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="antidiabetic" checked={this.state.antidiabetic=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          降糖药
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="lipidMedicine" checked={this.state.lipidMedicine=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          调脂药
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="uricMedicine" checked={this.state.uricMedicine=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          降尿酸药
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="contraceptive" checked={this.state.contraceptive=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          避孕药
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="estrogens" checked={this.state.estrogens=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          雌激素类
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="ach" checked={this.state.ach=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          肾上腺皮质激素
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="cortisone" checked={this.state.cortisone=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          可的松类
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="analgesics" checked={this.state.analgesics=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          解热镇痛药
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="slimmingMedicine" checked={this.state.slimmingMedicine=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          减肥药
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="antidepressant" checked={this.state.antidepressant=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          抗抑郁或抗精神病类药
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="hypnotics" checked={this.state.hypnotics=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          镇静催眠药
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="herbal" checked={this.state.herbal=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          中草药
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="others" checked={this.state.others=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          其它
                        </label>
                      </li>
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
