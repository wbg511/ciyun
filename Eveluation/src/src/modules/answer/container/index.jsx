import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import axios from "../../common/httpAjax";
import common from '../../common/common';
import qs from "qs";
import $ from "jquery";
import {Toast} from 'antd-mobile';
import "../../../static/css/app.well.css";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personId:"",
      evaluationId:"",
      gender:"",
      questionaireKey:"",
      progress:""
    }
  }
  componentDidMount() {
    this.getIndex();
  }
  getIndex(){
    axios({
      url:"/personHealthRisk/state?personId="+this.props.location.query.personId+"&evaluationKey="+this.props.location.query.evaluationKey,
      method:"get"
    }).then((response)=>{
      var gData=response.data;
      if (gData.code==0){
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
        this.setState({
          personId:gData.data.personId,
          evaluationId:gData.data.evaluationId,
          gender:gData.data.gender,
          questionaireKey:gData.data.questionaireKey,
          progress:gData.data.progress
        })
      }else{
        Toast.info(gData.msg, 1);
      }
    });
  }

  /*hashDetails(hisState){
    hashHistory.push({
      pathname: hisState.questionaireKey,
      state:{
        personId:hisState.personId,
        evaluationId:hisState.evaluationId,
        gender:hisState.gender,
        questionaireKey:hisState.questionaireKey,
        progress:hisState.progress
      }
    })
  }*/
  /*
  //没有数据
  hashDetails(hisState){
    hashHistory.push({
      pathname:'/answer/PersonalInfomationQuestionaire',
      state:{
        personId:"liuyong",
        evaluationId:"liuyong",
        gender:hisState.gender,
        questionaireKey:"PersonalInfomationQuestionaire"
      }
    })
  }*/
  hashDetails(hisState){
    hashHistory.push({
      pathname:'/answer/PersonalInfomationQuestionaire',
      state:{
        personId:"p160312170610319",
        evaluationId:"liuyong",
        gender:1,
        questionaireKey:"PersonalInfomationQuestionaire",
        evaluationKey:"PersonalHealthRiskEveluation"
      }
    })
  }
  render() {
    return (
      <div className="app-doc app-question">
        <div className="app-bd">
          <img src={require("static/images/introduce.jpg")} alt="" />
        </div>
        <div className="app-ft">
          <div className="app-ft-btn-group">
            <a href="javascript:;" className="app-btn app-btnGoPay" onClick={() => {this.hashDetails(this.state)}}>{this.state.progress>0 ? '继续答题' : '开始答题'}</a>
          </div>
        </div>
      </div>
    )
  }
}
