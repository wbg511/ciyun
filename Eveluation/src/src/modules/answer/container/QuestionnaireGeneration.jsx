import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import axios from "../../common/httpAjax";
import common from '../../common/common';
import qs from "qs";
import $ from "jquery";
import {Toast,DatePicker} from 'antd-mobile';
import "../../../static/css/app.well.css";

export default class QuestionnaireGeneration extends Component {
	constructor(props) {
    super(props);
    this.state = {
      title:""
    }
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
    this.interval = setInterval(
      () => {
        this.getQuestion();
      },
      2000
    );
    
  }
  getQuestion(){
    let getUrl="/personHealthRisk/load?"+
    "personId="+this.props.location.state.personId+"&"+
    "evaluationId="+this.props.location.state.evaluationId+"&"+
    "gender="+this.props.location.state.gender;
    axios({
      url:getUrl,
      method:"get"
    }).then((response)=>{
      var gData=response.data;
      if (gData.code==0){
        if (gData.data.result==true){
          clearInterval(this.interval);
          Toast.info("结果已经生成，即将跳转到结果页面！",1, function(){
            hashHistory.push({
              pathname:'/answer/QuestionnaireGeneration',
              state:{
                personId:urlState.personId,
                evaluationId:urlState.evaluationId,
                gender:urlState.gender
              }
            });
          });
        }else{
          clearInterval(this.interval);
        }
      }
    })
  }
  render() {
    return (
			<div className="app-doc">
        {this.state.content}
        <input type="hidden" name="backTo" id="backTo" value="2"/>
        <input type="hidden" name="backTips" id="backTips" value="您可以休息一会儿，下次接着答题！"/>
        <div className="app-bd">
						<img src={require("static/images/loading-banner.png")} alt="" />
            <div className="app-sm">
              <img src={require("static/images/loading-sm.gif")} alt="" />
            </div>
        </div>
      </div>
    )
  }
}