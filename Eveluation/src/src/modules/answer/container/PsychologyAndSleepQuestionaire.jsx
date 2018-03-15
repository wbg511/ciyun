import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import axios from "../../common/httpAjax";
import common from '../../common/common';
import qs from "qs";
import $ from "jquery";
import {Toast,DatePicker} from 'antd-mobile';
import "../../../static/css/app.well.css";
import NavList from "../../common/navList";

export default class PsychologyAndSleepQuestionaire extends Component {
	constructor(props) {
    super(props);
    this.state = {
      happies:"",
      hope:"",
      sad:"",
      lonely:"",
      depressed:"",
      dull:"",
      feelLikeALoser:"",
      menmoryDecline:"",
      slow:"",
      emotional:"",
      liveNervous:"",
      suicide:"",
      appetite:"",

      isSleeping:false,
      dailySleepTime:"",
      sleepQuality:"",
      difficultyFallingAsleep:"",
      hypnotic:"",
      sleepingDozenShout:"",
      snore:"",
      snoreLoudly:"",
      snoreAffectsTheOthers:"",
      apnea:"",
      sleepNoFatigue:"",
      fatigue:"",
      napWhenDriving:"",
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
    this.getPsychology();
  }
  //判断是否有节点。
  isCheckModule(questionaireMap){
    if (questionaireMap.PsychologyAndSleepQuestionaire!=undefined){
      if(questionaireMap.PsychologyAndSleepQuestionaire.psychologicalModule!=undefined){
        return true;
      }
    }
    return false;
  }
  getPsychology(){
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
          var psychologicalDate=gData.data.questionaireMap.PsychologyAndSleepQuestionaire.psychologicalModule;
          var sleepDate=gData.data.questionaireMap.PsychologyAndSleepQuestionaire.sleepModule;
          this.setState({
            happies:psychologicalDate.happies,
            hope:psychologicalDate.hope,
            sad:psychologicalDate.sad,
            lonely:psychologicalDate.lonely,
            depressed:psychologicalDate.depressed,
            dull:psychologicalDate.dull,
            feelLikeALoser:psychologicalDate.feelLikeALoser,
            menmoryDecline:psychologicalDate.menmoryDecline,
            slow:psychologicalDate.slow,
            emotional:psychologicalDate.emotional,
            liveNervous:psychologicalDate.liveNervous,
            suicide:psychologicalDate.suicide,
            appetite:psychologicalDate.appetite,

            dailySleepTime:sleepDate.dailySleepTime,
            sleepQuality:sleepDate.sleepQuality,
            difficultyFallingAsleep:sleepDate.difficultyFallingAsleep,
            hypnotic:sleepDate.hypnotic,
            sleepingDozenShout:sleepDate.sleepingDozenShout,
            snore:sleepDate.snore,
            snoreLoudly:sleepDate.snoreLoudly,
            snoreAffectsTheOthers:sleepDate.snoreAffectsTheOthers,
            apnea:sleepDate.apnea,
            sleepNoFatigue:sleepDate.sleepNoFatigue,
            fatigue:sleepDate.fatigue,
            napWhenDriving:sleepDate.napWhenDriving,
            result:gData.data.result
          },function(){
            if (this.state.sleepingDozenShout==1){
              this.setState({
                isSleeping:true
              })
            }
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
    if(name=="sleepingDozenShout"){
      value==1 ? this.setState({
          isSleeping:true
        }) : this.setState({
          isSleeping:false,
          snore:"-99",
          snoreLoudly:"-99",
          snoreAffectsTheOthers:"-99"
        })
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
    var tState, urlState;
    tState=this.state;
    urlState=this.props.location.state;
    if(tState.happies.length==0 || tState.happies==undefined){
      this.cyValidate("anchor-1", "请选择是否每天都很快乐");
      return;
    }

    if(tState.hope.length==0 || tState.hope==undefined){
      this.cyValidate("anchor-2", "请选择是否对将来充满希望");
      return;
    }
    if(tState.sad.length==0 || tState.sad==undefined){
      this.cyValidate("anchor-3", "请选择是否忧伤且不能摆脱");
      return;
    }
    if(tState.lonely.length==0 || tState.lonely==undefined){
      this.cyValidate("anchor-4", "请选择是否孤独");
      return;
    }
    if(tState.depressed.length==0 || tState.depressed==undefined){
      this.cyValidate("anchor-5", "请选择是否情绪低落、压抑和沮丧、没希望");
      return;
    }
    if(tState.dull.length==0 || tState.dull==undefined){
      this.cyValidate("anchor-6", "请选择是否做什么事情都没意思");
      return;
    }
    if(tState.feelLikeALoser.length==0 || tState.feelLikeALoser==undefined){
      this.cyValidate("anchor-7", "请选择是否自己是一个失败者");
      return;
    }
    if(tState.menmoryDecline.length==0 || tState.menmoryDecline==undefined){
      this.cyValidate("anchor-8", "请选择是否注意力不集中，记忆力下降");
      return;
    }
    if(tState.slow.length==0 || tState.slow==undefined){
      this.cyValidate("anchor-9", "请选择是否行动或说话缓慢到引起人们的注意，或刚好相反，坐臥不安，到处走动");
      return;
    }
    if(tState.emotional.length==0 || tState.emotional==undefined){
      this.cyValidate("anchor-10", "请选择是否容易情绪激动");
      return;
    }

    if(tState.liveNervous.length==0 || tState.liveNervous==undefined){
      this.cyValidate("anchor-11", "请选择是否感觉生活总是很紧张");
      return;
    }

    if(tState.suicide.length==0 || tState.suicide==undefined){
      this.cyValidate("anchor-12", "请选择是否有不如一死了之的念头，或想怎样伤害自己一下");
      return;
    }

    if(tState.appetite.length==0 || tState.appetite==undefined){
      this.cyValidate("anchor-13", "请选择是否总是感觉食欲不好或吃得太多");
      return;
    }

    if(tState.dailySleepTime.length==0 || tState.dailySleepTime==undefined){
      this.cyValidate("anchor-14", "请输入每日睡眠时间");
      return;
    }else{
      let isDaily=/^(([0-9]\.\d|[0-9])$|^(1\d|1\d.\d)$|^(2[0-3]|2[0-3].\d))$|24$/;
      if(!isDaily.test(tState.dailySleepTime)){
        this.cyValidate("anchor-14", "睡眠时间的输入范围为0-24，且最多保留1位小数");
        return;
      }
    }
    if(tState.sleepQuality.length==0 || tState.sleepQuality==undefined){
      this.cyValidate("anchor-15", "请选择睡眠质量");
      return;
    }

    if(tState.difficultyFallingAsleep.length==0 || tState.difficultyFallingAsleep==undefined){
      this.cyValidate("anchor-16", "请选择是否入睡困难、总是醒或睡得太多（嗜睡）");
      return;
    }

    if(tState.hypnotic.length==0 || tState.hypnotic==undefined){
      this.cyValidate("anchor-17", "是否需要服用催眠药");
      return;
    }

    if(tState.sleepingDozenShout.length==0 || tState.sleepingDozenShout==undefined){
      this.cyValidate("anchor-18", "请选择是否睡觉打呼噜");
      return;
    }else{
      if (tState.sleepingDozenShout==1){
        if (tState.snore=="" || tState.snore=="-99"){
          this.cyValidate("anchor-19", "请选择鼾声多响亮");
          return;
        }
        if (tState.snoreLoudly=="" || tState.snoreLoudly=="-99"){
          this.cyValidate("anchor-20", "请选择打呼噜次数");
          return;
        }
        if (tState.snoreAffectsTheOthers=="" || tState.snoreAffectsTheOthers=="-99"){
          this.cyValidate("anchor-21", "请选择鼾声是否影响其他人");
          return;
        }
      }
    }

    if(tState.apnea.length==0 || tState.apnea==undefined){
      this.cyValidate("anchor-22", "请选择是否睡觉时呼吸暂停现象");
      return;
    }

    if(tState.sleepNoFatigue.length==0 || tState.sleepNoFatigue==undefined){
      this.cyValidate("anchor-23", "请选择是否早上睡醒后感觉不解乏");
      return;
    }

    if(tState.fatigue.length==0 || tState.fatigue==undefined){
      this.cyValidate("anchor-24", "请选择是否白天疲劳、乏力或精力不够");
      return;
    }

    if(tState.napWhenDriving.length==0 || tState.napWhenDriving==undefined){
      this.cyValidate("anchor-25", "请选择是否开车时会打盹或睡觉");
      return;
    }
    axios({
      url:"/personHealthRisk/save",
      data:{
        personId:urlState.personId,
        evaluationId:urlState.evaluationId,
        gender:urlState.gender,
        questionaireKey:urlState.questionaireKey,
        psychologyAndSleepQuestionaire:{
          questionaireKey:urlState.questionaireKey,
          psychologicalModule:{
            modelKey: "psychologicalModule",
            happies:tState.happies,
            hope:tState.hope,
            sad:tState.sad,
            lonely:tState.lonely,
            depressed:tState.depressed,
            dull:tState.dull,
            feelLikeALoser:tState.feelLikeALoser,
            menmoryDecline:tState.menmoryDecline,
            slow:tState.slow,
            emotional:tState.emotional,
            liveNervous:tState.liveNervous,
            suicide:tState.suicide,
            appetite:tState.appetite
          },
          sleepModule:{
            modelKey: "sleepModule",
            dailySleepTime:tState.dailySleepTime,
            sleepQuality:tState.sleepQuality,
            difficultyFallingAsleep:tState.difficultyFallingAsleep,
            hypnotic:tState.hypnotic,
            sleepingDozenShout:tState.sleepingDozenShout,
            snore:tState.snore,
            snoreLoudly:tState.snoreLoudly,
            snoreAffectsTheOthers:tState.snoreAffectsTheOthers,
            apnea:tState.apnea,
            sleepNoFatigue:tState.sleepNoFatigue,
            fatigue:tState.fatigue,
            napWhenDriving:tState.napWhenDriving
          }
        }
      },
      method:"put"
    }).then((response)=>{
      var pData=response.data;
        if (pData.code==0){
          Toast.info("保存成功，即将跳转到下一问卷！",1, function(){
            hashHistory.push({
              pathname:'/answer/PhysicalIndicatorsQuestionaire',
              state:{
                personId:urlState.personId,
                evaluationId:urlState.evaluationId,
                gender:urlState.gender,
                questionaireKey:"PhysicalIndicatorsQuestionaire"
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
            <div class="title-no">第五部分</div>
            <div class="title-name">心理与睡眠</div>
          </div>
          <NavList
            pName="PsychologyAndSleepQuestionaire"
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
                  1、每天都很快乐<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="happies" checked={this.state.happies=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天是（完全符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="happies" checked={this.state.happies=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较多时间是（比较符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="happies" checked={this.state.happies=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半时间是（一般符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="happies" checked={this.state.happies=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较少时间是（比较不符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="happies" checked={this.state.happies=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        完全不是（完全不符合）
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-2">
                <div className="app-question-lab">
                  2、对将来充满希望<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="hope" checked={this.state.hope=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天是（完全符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="hope" checked={this.state.hope=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较多时间是（比较符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="hope" checked={this.state.hope=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半时间是（一般符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="hope" checked={this.state.hope=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较少时间是（比较不符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="hope" checked={this.state.hope=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        完全不是（完全不符合）
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-3">
                <div className="app-question-lab">
                  3、很忧伤且不能摆脱<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="sad" checked={this.state.sad=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天是（完全符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="sad" checked={this.state.sad=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较多时间是（比较符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="sad" checked={this.state.sad=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半时间是（一般符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="sad" checked={this.state.sad=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较少时间是（比较不符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="sad" checked={this.state.sad=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        完全不是（完全不符合）
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-4">
                <div className="app-question-lab">
                  4、很孤独<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="lonely" checked={this.state.lonely=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天是（完全符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="lonely" checked={this.state.lonely=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较多时间是（比较符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="lonely" checked={this.state.lonely=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半时间是（一般符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="lonely" checked={this.state.lonely=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较少时间是（比较不符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="lonely" checked={this.state.lonely=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        完全不是（完全不符合）
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-5">
                <div className="app-question-lab">
                  5、经常感觉情绪低落、压抑和沮丧、没希望<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="depressed" checked={this.state.depressed=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天是（完全符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="depressed" checked={this.state.depressed=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较多时间是（比较符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="depressed" checked={this.state.depressed=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半时间是（一般符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="depressed" checked={this.state.depressed=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较少时间是（比较不符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="depressed" checked={this.state.depressed=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        完全不是（完全不符合）
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-6">
                <div className="app-question-lab">
                  6、做什么事情都没意思<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="dull" checked={this.state.dull=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天是（完全符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="dull" checked={this.state.dull=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较多时间是（比较符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="dull" checked={this.state.dull=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半时间是（一般符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="dull" checked={this.state.dull=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较少时间是（比较不符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="dull" checked={this.state.dull=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        完全不是（完全不符合）
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-7">
                <div className="app-question-lab">
                  7、总是对自己不满，觉得自己是个失败者<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="feelLikeALoser" checked={this.state.feelLikeALoser=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天是（完全符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="feelLikeALoser" checked={this.state.feelLikeALoser=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较多时间是（比较符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="feelLikeALoser" checked={this.state.feelLikeALoser=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半时间是（一般符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="feelLikeALoser" checked={this.state.feelLikeALoser=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较少时间是（比较不符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="feelLikeALoser" checked={this.state.feelLikeALoser=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        完全不是（完全不符合）
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-8">
                <div className="app-question-lab">
                  8、注意力不能集中，记忆力下降<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="menmoryDecline" checked={this.state.menmoryDecline=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天是（完全符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="menmoryDecline" checked={this.state.menmoryDecline=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较多时间是（比较符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="menmoryDecline" checked={this.state.menmoryDecline=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半时间是（一般符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="menmoryDecline" checked={this.state.menmoryDecline=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较少时间是（比较不符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="menmoryDecline" checked={this.state.menmoryDecline=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        完全不是（完全不符合）
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-9">
                <div className="app-question-lab">
                  9、行动或说话缓慢到引起人们的注意,或刚好相反, 坐臥不安,到处走动<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="slow" checked={this.state.slow=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天是（完全符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="slow" checked={this.state.slow=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较多时间是（比较符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="slow" checked={this.state.slow=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半时间是（一般符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="slow" checked={this.state.slow=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较少时间是（比较不符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="slow" checked={this.state.slow=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        完全不是（完全不符合）
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-10">
                <div className="app-question-lab">
                  10、容易情绪激动<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="emotional" checked={this.state.emotional=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天是（完全符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="emotional" checked={this.state.emotional=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较多时间是（比较符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="emotional" checked={this.state.emotional=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半时间是（一般符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="emotional" checked={this.state.emotional=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较少时间是（比较不符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="emotional" checked={this.state.emotional=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        完全不是（完全不符合）
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-11">
                <div className="app-question-lab">
                  11、感觉生活总是很紧张<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="liveNervous" checked={this.state.liveNervous=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天是（完全符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="liveNervous" checked={this.state.liveNervous=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较多时间是（比较符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="liveNervous" checked={this.state.liveNervous=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半时间是（一般符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="liveNervous" checked={this.state.liveNervous=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较少时间是（比较不符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="liveNervous" checked={this.state.liveNervous=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        完全不是（完全不符合）
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-12">
                <div className="app-question-lab">
                  12、有不如一死了之的念头, 或想怎样伤害自己一下<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="suicide" checked={this.state.suicide=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天是（完全符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="suicide" checked={this.state.suicide=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较多时间是（比较符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="suicide" checked={this.state.suicide=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半时间是（一般符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="suicide" checked={this.state.suicide=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较少时间是（比较不符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="suicide" checked={this.state.suicide=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        完全不是（完全不符合）
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-13">
                <div className="app-question-lab">
                  13、总是感觉食欲不好或吃得太多<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="appetite" checked={this.state.appetite=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天是（完全符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="appetite" checked={this.state.appetite=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较多时间是（比较符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="appetite" checked={this.state.appetite=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半时间是（一般符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="appetite" checked={this.state.appetite=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        较少时间是（比较不符合）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="appetite" checked={this.state.appetite=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        完全不是（完全不符合）
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-14">
                <div className="app-question-lab">
                  14、每日睡眠时间（单位：小时）<span className="require">*</span>
                </div>
                <div className="app-question-val">
                    <input type="text" name="dailySleepTime" value={this.state.dailySleepTime} placeholder="请输入睡眠时间" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
              </div>
              <div className="app-question-form" id="anchor-15">
                <div className="app-question-lab">
                  15、睡眠质量<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="sleepQuality" checked={this.state.sleepQuality=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        很好
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="sleepQuality" checked={this.state.sleepQuality=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        还行
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="sleepQuality" checked={this.state.sleepQuality=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        不好
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="sleepQuality" checked={this.state.sleepQuality=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        很差
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-16">
                <div className="app-question-lab">
                  16、入睡困难、总是醒或睡得太多（嗜睡）<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="difficultyFallingAsleep" checked={this.state.difficultyFallingAsleep=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        几乎每天如此
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="difficultyFallingAsleep" checked={this.state.difficultyFallingAsleep=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一半以上时间是
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="difficultyFallingAsleep" checked={this.state.difficultyFallingAsleep=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        偶尔是
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="difficultyFallingAsleep" checked={this.state.difficultyFallingAsleep=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        没有这样的情况
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-17">
                <div className="app-question-lab">
                  17、是否需要服用催眠药<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="hypnotic" checked={this.state.hypnotic=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        不需服用
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="hypnotic" checked={this.state.hypnotic=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        偶尔服用（平均不到每周一次）
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="hypnotic" checked={this.state.hypnotic=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        每周需1-2次
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="hypnotic" checked={this.state.hypnotic=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        每周3次以上
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-18">
                <div className="app-question-lab">
                  18、睡觉打呼噜<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="sleepingDozenShout" checked={this.state.sleepingDozenShout=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        是
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="sleepingDozenShout" checked={this.state.sleepingDozenShout=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        否
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="sleepingDozenShout" checked={this.state.sleepingDozenShout=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        不知道
                      </label>
                    </li>
                  </ul>
                </div>
              </div>

              {this.state.isSleeping?
                <div>
                  <div className="app-question-form" id="anchor-19">
                    <div className="app-question-lab">
                      18.1、鼾声多响亮<span className="require">*</span>
                    </div>
                    <div className="app-question-val">
                      <ul className="app-list clearfix">
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="1" name="snore" checked={this.state.snore=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            比正常呼吸时响
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="2" name="snore" checked={this.state.snore=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            同说话一样响
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="3" name="snore" checked={this.state.snore=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            比说话更响
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="4" name="snore" checked={this.state.snore=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            其它房间能听到
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="5" name="snore" checked={this.state.snore=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            不知道
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="app-question-form" id="anchor-20">
                    <div className="app-question-lab">
                      18.2、打呼噜次数<span className="require">*</span>
                    </div>
                    <div className="app-question-val">
                      <ul className="app-list clearfix">
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="1" name="snoreLoudly" checked={this.state.snoreLoudly=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            每天
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="2" name="snoreLoudly" checked={this.state.snoreLoudly=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            每周3-4次
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="3" name="snoreLoudly" checked={this.state.snoreLoudly=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            每周1-2次
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="4" name="snoreLoudly" checked={this.state.snoreLoudly=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            一个月1-2次
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="5" name="snoreLoudly" checked={this.state.snoreLoudly=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            没有/不知道
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="app-question-form" id="anchor-21">
                    <div className="app-question-lab">
                      18.3、鼾声影响其他人<span className="require">*</span>
                    </div>
                    <div className="app-question-val">
                      <ul className="app-list clearfix">
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="1" name="snoreAffectsTheOthers" checked={this.state.snoreAffectsTheOthers=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            影响
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="2" name="snoreAffectsTheOthers" checked={this.state.snoreAffectsTheOthers=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            不影响
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="3" name="snoreAffectsTheOthers" checked={this.state.snoreAffectsTheOthers=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            不知道
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              :
                null
              }
              <div className="app-question-form" id="anchor-22">
                <div className="app-question-lab">
                  19、睡觉时呼吸暂停现象<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="apnea" checked={this.state.apnea=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        每天都有
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="apnea" checked={this.state.apnea=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一周3-4次
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="apnea" checked={this.state.apnea=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一周1-2次
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="apnea" checked={this.state.apnea=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一个月1-2次
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="apnea" checked={this.state.apnea=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        没有/不知道
                      </label>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="app-question-form" id="anchor-23">
                <div className="app-question-lab">
                  20、早上睡醒后感觉不解乏<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="sleepNoFatigue" checked={this.state.sleepNoFatigue=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        每天都有
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="sleepNoFatigue" checked={this.state.sleepNoFatigue=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一周3-4次
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="sleepNoFatigue" checked={this.state.sleepNoFatigue=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一周1-2次
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="sleepNoFatigue" checked={this.state.sleepNoFatigue=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一个月1-2次
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="sleepNoFatigue" checked={this.state.sleepNoFatigue=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        没有/不知道
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-24">
                <div className="app-question-lab">
                  21、白天疲劳、乏力或精力不够<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="fatigue" checked={this.state.fatigue=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        每天都有
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="fatigue" checked={this.state.fatigue=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一周3-4次
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="fatigue" checked={this.state.fatigue=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一周1-2次
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="fatigue" checked={this.state.fatigue=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一个月1-2次
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="fatigue" checked={this.state.fatigue=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        没有/不知道
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="app-question-form" id="anchor-25">
                <div className="app-question-lab">
                  22、开车时会打盹或睡觉<span className="require">*</span>
                </div>
                <div className="app-question-val">
                  <ul className="app-list clearfix">
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="1" name="napWhenDriving" checked={this.state.napWhenDriving=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        每天都有
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="2" name="napWhenDriving" checked={this.state.napWhenDriving=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一周3-4次
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="3" name="napWhenDriving" checked={this.state.napWhenDriving=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一周1-2次
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="4" name="napWhenDriving" checked={this.state.napWhenDriving=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        一个月1-2次
                      </label>
                    </li>
                    <li class="app-active">
                      <label className="app-radio-box">
                        <input type="radio" value="5" name="napWhenDriving" checked={this.state.napWhenDriving=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                        没有/不知道
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
