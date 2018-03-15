import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import axios from "../../common/httpAjax";
import common from '../../common/common';
import qs from "qs";
import $ from "jquery";
import {Toast,DatePicker} from 'antd-mobile';
import "../../../static/css/app.well.css";
import NavList from "../../common/navList";

export default class LivingHabitsAndEnvironmentalEvaluationQuestionaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMeat:false,
      corn:"",
      meat:"",
      meatType:"1",
      vegetable:"",
      fruit:"",
      soyBean:"",
      egg:"",

      friedFood:"",
      pickledFoodFrequency:"",
      breakFastHabit:"",
      dessert:"",

      isSmoke:false,
      isQSmoke:false,
      isNSmoke:false,
      smokeOrNot:"",
      ageBegainToSmoke:"0",
      ageBegainToGiveUpSmoking:"0",
      dailySmokeNumber:"0",
      passiveSmoking:"",

      isDrink:false,
      drinkOrNot:"",
      redWine:"0",
      yellowWine:"0",
      beer:"0",
      wine:"0",

      hActivityFreq:"0",
      hActTimeLength:"0",
      mActivityFreq:"0",
      mActTimeLength:"0",
      lActivityFreq:"0",
      lActTimeLength:"0",
      potato:"0",
      roughage:"",
      ache:"2",
      hardToBreath:"2",
      dizzy:"2",
      pnd:"2",
      ankleEdema:"2",
      palpitation:"2",
      intermittenClaudication:"2",
      heartMurmur:"2",
      shortness:"2",

      isCook:false,
      pollution:"",
      illuminationTime:"",
      cook:"",
      hot:"2",
      isShow:false,
      massage:""
    };
    this.handleInputChange=this.handleInputChange.bind(this);
    this.checkboxInputChange=this.checkboxInputChange.bind(this);
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
    this.getLiving();
  }
  //判断是否有节点。
  isCheckModule(questionaireMap){
    if (questionaireMap.LivingHabitsAndEnvironmentalEvaluationQuestionaire!=undefined){
      if(questionaireMap.LivingHabitsAndEnvironmentalEvaluationQuestionaire.dietModule!=undefined){
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
  getLiving(){
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
          var dietDate=gData.data.questionaireMap.LivingHabitsAndEnvironmentalEvaluationQuestionaire.dietModule;
          var eatingDate=gData.data.questionaireMap.LivingHabitsAndEnvironmentalEvaluationQuestionaire.eatingHabitsModule;
          var smokeDate=gData.data.questionaireMap.LivingHabitsAndEnvironmentalEvaluationQuestionaire.smokeModule;
          var drinkDate=gData.data.questionaireMap.LivingHabitsAndEnvironmentalEvaluationQuestionaire.drinkModule;
          var activityDate=gData.data.questionaireMap.LivingHabitsAndEnvironmentalEvaluationQuestionaire.activityAndSportModule;
          var environmentDate=gData.data.questionaireMap.LivingHabitsAndEnvironmentalEvaluationQuestionaire.environmentModule;
          this.setState({
            corn:dietDate.corn,
            meat:dietDate.meat,
            meatType:dietDate.meatType,
            vegetable:dietDate.vegetable,
            fruit:dietDate.fruit,
            soyBean:dietDate.soyBean,
            egg:dietDate.egg,

            friedFood:eatingDate.friedFood,
            pickledFoodFrequency:eatingDate.pickledFoodFrequency,
            breakFastHabit:eatingDate.breakFastHabit,
            dessert:eatingDate.dessert,

            smokeOrNot:smokeDate.smokeOrNot,
            ageBegainToSmoke:smokeDate.ageBegainToSmoke,
            ageBegainToGiveUpSmoking:smokeDate.ageBegainToGiveUpSmoking,
            dailySmokeNumber:smokeDate.dailySmokeNumber,
            passiveSmoking:smokeDate.passiveSmoking,

            drinkOrNot:drinkDate.drinkOrNot,
            redWine:drinkDate.redWine,
            yellowWine:drinkDate.yellowWine,
            beer:drinkDate.beer,
            wine:drinkDate.wine,


            hActivityFreq:activityDate.hactivityFreq,
            hActTimeLength:activityDate.hactTimeLength,
            mActivityFreq:activityDate.mactivityFreq,
            mActTimeLength:activityDate.mactTimeLength,
            lActivityFreq:activityDate.lactivityFreq,
            lActTimeLength:activityDate.lactTimeLength,
            potato:activityDate.potato,
            roughage:activityDate.roughage,
            ache:activityDate.ache,
            hardToBreath:activityDate.hardToBreath,
            dizzy:activityDate.dizzy,
            pnd:activityDate.pnd,
            ankleEdema:activityDate.ankleEdema,
            palpitation:activityDate.palpitation,
            intermittenClaudication:activityDate.intermittenClaudication,
            heartMurmur:activityDate.heartMurmur,
            shortness:activityDate.shortness,

            pollution:environmentDate.pollution,
            illuminationTime:environmentDate.illuminationTime,
            cook:environmentDate.cook,
            hot:environmentDate.hot,
            result:gData.data.result
          },function(){
            var booleanMeat=false, booleanDrink=false, booleanCook=false;
            var booleanSmoke=false, booleanQSmoke=false,booleanNSmoke=false;
            if (this.state.meat!=4){
              booleanMeat=true;
            }
            if (this.state.smokeOrNot==1){
              booleanSmoke=true;
            }else if(this.state.smokeOrNot==2){
              booleanQSmoke=true;
            }else if(this.state.smokeOrNot==3){
              booleanNSmoke=true;
            }
            if (this.state.drinkOrNot==1){
              booleanDrink=true;
            }
            if (this.state.cook!=1){
              booleanCook=true;
            }
            this.setState({
              isMeat:booleanMeat,
              isSmoke:booleanSmoke,
              isQSmoke:booleanQSmoke,
              isNSmoke:booleanNSmoke,
              isDrink:booleanDrink,
              isCook:booleanCook,
            });
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
    switch(name){
      case "meat":
        value==4 ? this.setState({
          isMeat:false,
          meatType:"1"
        }) : this.setState({
          isMeat:true
        })
      break;
      case "smokeOrNot":
        if (value==1){
          this.setState({
            isSmoke:true,
            isQSmoke:false,
            isNSmoke:false,
            ageBegainToGiveUpSmoking:"0",
            passiveSmoking:"5"
          })
        }else if(value==2){
          this.setState({
            isQSmoke:true,
            isSmoke:false,
            isNSmoke:false
          })
        }else if(value==3){
          this.setState({
            isNSmoke:true,
            isSmoke:false,
            isQSmoke:false,
            ageBegainToSmoke:"0",
            ageBegainToGiveUpSmoking:"0",
            dailySmokeNumber:"0"
          })
        }


      break;
      case "drinkOrNot":
        (value==1)?this.setState({
          isDrink:true,
          redWine:"0",
          yellowWine:"0",
          beer:"0",
          wine:"0"
        }) : this.setState({
          isDrink:false,

        })
      break;
      case "cook":
        value==1?this.setState({
          isCook:false,
          hot:"2"
        }) : this.setState({
          isCook:true
        })
      break;
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
    var tState, urlState;
    tState=this.state;
    urlState=this.props.location.state;

    if(tState.corn.length==0){
      this.cyValidate("anchor-1", "请选择每日米面、薯类及杂粮类摄入量");
      return;
    }

    if(tState.meat.length==0){
      this.cyValidate("anchor-2", "请选择平均每日肉类食物摄入量");
      return;
    }else{
      if(tState.meat!=4){
        if(tState.meatType.length==0){
          this.cyValidate("anchor-3", "请选择习惯选择的肉食种类");
          return;
        }
      }
    }
    if(tState.vegetable.length==0){
      this.cyValidate("anchor-4", "请选择每日蔬菜摄入量");
      return;
    }
    if(tState.fruit.length==0){
      this.cyValidate("anchor-5", "请选择每日水果摄入量");
      return;
    }

    if(tState.soyBean.length==0){
      this.cyValidate("anchor-6", "请选择平均每日大豆及豆制品的摄入量");
      return;
    }

    if(tState.egg.length==0){
      this.cyValidate("anchor-7", "请选择平均每日蛋类的摄入量");
      return;
    }
    if(tState.friedFood.length==0){
      this.cyValidate("anchor-8", "请选择每周吃煎炸食物的次数");
      return;
    }
    if(tState.pickledFoodFrequency.length==0){
      this.cyValidate("anchor-9", "请选择平均一周吃咸菜、腐乳、酱菜的次数");
      return;
    }
    if(tState.breakFastHabit.length==0){
      this.cyValidate("anchor-10", "请选择吃早餐习惯");
      return;
    }
    if(tState.dessert.length==0){
      this.cyValidate("anchor-11", "请选择吃甜点习惯");
      return;
    }
    if(tState.smokeOrNot.length==0){
      this.cyValidate("anchor-12", "请选择是否吸烟");
      return;
    }else{
      var chkAge=/^([1-9]$|^[1-9]\d$|^1\d{2}$|200)/;
      if(tState.isSmoke || tState.isQSmoke){
        if(tState.ageBegainToSmoke.length==0){
          this.cyValidate("anchor-13", "请输入吸烟年龄");
          return;
        }else if(!chkAge.test(tState.ageBegainToSmoke)){
          this.cyValidate("anchor-13", "吸烟年龄的输入范围为1-200的整数");
          return;
        }
      }
      if (tState.isQSmoke){
        if(tState.ageBegainToGiveUpSmoking.length==0){
          this.cyValidate("anchor-14", "请输入戒烟年龄");
          return;
        }else if(!chkAge.test(tState.ageBegainToGiveUpSmoking)){
          this.cyValidate("anchor-14", "戒烟年龄的输入范围为1-200的整数");
          return;
        }
      }
      if(tState.isSmoke || tState.isQSmoke){
        if(tState.dailySmokeNumber.length==0){
          this.cyValidate("anchor-15", "请输入每天吸烟支数");
          return;
        }else if(!chkAge.test(tState.dailySmokeNumber)){
          this.cyValidate("anchor-15", "每天吸烟支数的输入范围为1-200的整数");
          return;
        }
      }

      if (tState.isQSmoke || tState.isNSmoke){
        if(tState.passiveSmoking.length==0){
          this.cyValidate("anchor-16", "请选择是否经常被动吸烟");
          return;
        }
      }
    }
    if(tState.drinkOrNot.length==0){
      this.cyValidate("anchor-17", "请选择是否饮酒");
      return;
    }else{
      if(tState.drinkOrNot==1 || tState.drinkOrNot==3){
        var chkDrink=/^([0-9]|[0-9]\d|[1-9]\d{2,3}|10000)$/;
        if(tState.redWine.length==0){
          this.cyValidate("anchor-18", "请输入红酒量");
          return;
        }else if(!chkDrink.test(tState.redWine)){
          this.cyValidate("anchor-18", "红酒量的输入范围为0-10000的整数");
          return;
        }
        if(tState.yellowWine.length==0){
          this.cyValidate("anchor-18", "请输入黄酒量");
          return;
        }else if(!chkDrink.test(tState.yellowWine)){
          this.cyValidate("anchor-18", "黄酒量的输入范围为0-10000的整数");
          return;
        }
        if(tState.beer.length==0){
          this.cyValidate("anchor-18", "请输入啤酒量");
          return;
        }else if(!chkDrink.test(tState.beer)){
          this.cyValidate("anchor-18", "啤酒量的输入范围为0-10000的整数");
          return;
        }
        if(tState.wine.length==0){
          this.cyValidate("anchor-18", "请输入白酒量");
          return;
        }else if(!chkDrink.test(tState.wine)){
          this.cyValidate("anchor-18", "白酒量的输入范围为0-10000的整数");
          return;
        }
      }
    }

    var chkDay=/^([0-7])$/;
    var chkTime=/^([0-9]|[0-9]\d|[1-9]\d{2}|1000)$/;
    if(tState.lActivityFreq.length==0){
      this.cyValidate("anchor-19", "请输入轻体力活动天数");
      return;
    }else if(!chkDay.test(tState.lActivityFreq)){
      this.cyValidate("anchor-19", "轻体力活动天数的输入范围为0-7的整数");
      return;
    }
    if(tState.lActTimeLength.length==0){
      this.cyValidate("anchor-19", "请输入轻体力活动时间");
      return;
    }else if(!chkTime.test(tState.lActTimeLength)){
      this.cyValidate("anchor-19", "轻体力活动时间的输入范围为0-1000的整数");
      return;
    }

    if(tState.mActivityFreq.length==0){
      this.cyValidate("anchor-19", "请输入中等体力活动天数");
      return;
    }else if(!chkDay.test(tState.mActivityFreq)){
      this.cyValidate("anchor-19", "中等体力活动天数的输入范围为0-7的整数");
      return;
    }
    if(tState.mActTimeLength.length==0){
      this.cyValidate("anchor-19", "请输入中等体力活动时间");
      return;
    }else if(!chkTime.test(tState.mActTimeLength)){
      this.cyValidate("anchor-19", "中等体力活动时间的输入范围为0-1000的整数");
      return;
    }

    if(tState.hActivityFreq.length==0){
      this.cyValidate("anchor-19", "请输入重体力活动天数");
      return;
    }else if(!chkDay.test(tState.hActivityFreq)){
      this.cyValidate("anchor-19", "重体力活动天数的输入范围为0-7的整数");
      return;
    }
    if(tState.hActTimeLength.length==0){
      this.cyValidate("anchor-19", "请输入重体力活动时间");
      return;
    }else if(!chkTime.test(tState.hActTimeLength)){
      this.cyValidate("anchor-19", "重体力活动时间的输入范围为0-1000的整数");
      return;
    }

    var chkHour=/^(([0-9]\.\d|[0-9])$|^(1\d|1\d.\d)$|^(2[0-3]|2[0-3].\d))$|24$/;
    if(tState.potato.length==0){
      this.cyValidate("anchor-20", "请输入每天静坐时间");
      return;
    }else if(!chkHour.test(tState.potato)){
      this.cyValidate("anchor-20", "每天静坐时间的输入范围为0-24，且最多保留1位小数");
      return;
    }

    if(tState.roughage.length==0){
      this.cyValidate("anchor-21", "请选择每次30分钟以上的运动锻炼次数");
      return;
    }
    if(tState.pollution.length==0){
      this.cyValidate("anchor-22", "请选择居住或工作环境中的污染");
      return;
    }
    if(tState.illuminationTime.length==0){
      this.cyValidate("anchor-23", "请选择每周累积光照时间");
      return;
    }
    if(tState.cook.length==0){
      this.cyValidate("anchor-24", "请选择每周自己炒菜做饭次数");
      return;
    }else{
      if(tState.cook!=1){
        if(tState.hot.length==0){
          this.cyValidate("anchor-25", "请选择炒菜时是否习惯把油烧到冒烟才开始烹调");
          return false;
        }
      }
    }
    axios({
      url:"/personHealthRisk/save",
      data:{
        personId:urlState.personId,
        evaluationId:urlState.evaluationId,
        gender:urlState.gender,
        questionaireKey:urlState.questionaireKey,
        livingHabitsAndEnvironmentalEvaluationQuestionaire:{
          questionaireKey:urlState.questionaireKey,
          dietModule:{
            modelKey: "dietModule",
            corn:tState.corn,
            meat:tState.meat,
            meatType:tState.meatType,
            vegetable:tState.vegetable,
            fruit:tState.fruit,
            soyBean:tState.soyBean,
            egg:tState.egg
          },
          eatingHabitsModule:{
            modelKey: "eatingHabitsModule",
            friedFood:tState.friedFood,
            pickledFoodFrequency:tState.pickledFoodFrequency,
            breakFastHabit:tState.breakFastHabit,
            dessert:tState.dessert
          },
          smokeModule:{
            modelKey: "smokeModule",
            smokeOrNot:tState.smokeOrNot,
            ageBegainToSmoke:tState.ageBegainToSmoke,
            ageBegainToGiveUpSmoking:tState.ageBegainToGiveUpSmoking,
            dailySmokeNumber:tState.dailySmokeNumber,
            passiveSmoking:tState.passiveSmoking

          },
          drinkModule:{
            modelKey: "drinkModule",
            drinkOrNot:tState.drinkOrNot,
            redWine:tState.redWine,
            yellowWine:tState.yellowWine,
            beer:tState.beer,
            wine:tState.wine
          },
          activityAndSportModule:{
            modelKey: "activityAndSportModule",
            hActivityFreq:tState.hActivityFreq,
            hActTimeLength:tState.hActTimeLength,
            mActivityFreq:tState.mActivityFreq,
            mActTimeLength:tState.mActTimeLength,
            lActivityFreq:tState.lActivityFreq,
            lActTimeLength:tState.lActTimeLength,
            potato:tState.potato,
            roughage:tState.roughage,
            ache:tState.ache,
            hardToBreath:tState.hardToBreath,
            dizzy:tState.dizzy,
            pnd:tState.pnd,
            ankleEdema:tState.ankleEdema,
            palpitation:tState.palpitation,
            intermittenClaudication:tState.intermittenClaudication,
            heartMurmur:tState.heartMurmur,
            shortness:tState.shortness
          },
          environmentModule:{
            modelKey: "environmentModule",
            pollution:tState.pollution,
            illuminationTime:tState.illuminationTime,
            cook:tState.cook,
            hot:tState.hot
          }
        }
      },
      method:"put"
    }).then((response)=>{
      var pData=response.data;
        if (pData.code==0){
          Toast.info("保存成功，即将跳转到下一问卷！",1, function(){
            hashHistory.push({
              pathname:'/answer/PsychologyAndSleepQuestionaire',
              state:{
                personId:urlState.personId,
                evaluationId:urlState.evaluationId,
                gender:urlState.gender,
                questionaireKey:"PsychologyAndSleepQuestionaire"
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
              <div  class="title-no">第四部分</div>
              <div  class="title-name">生活习惯与环境评价</div>
            </div>
            <NavList
              pName="LivingHabitsAndEnvironmentalEvaluationQuestionaire"
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
                    1、每日米面、薯类及杂粮类摄入量<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="4" name="corn" checked={this.state.corn=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          不吃主食
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="corn" checked={this.state.corn=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          不足250克
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="corn" checked={this.state.corn=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          约250-400克
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="corn" checked={this.state.corn=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          400克以上
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="app-question-form" id="anchor-2">
                  <div className="app-question-lab">
                    2、平均每日肉类食物摄入量<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="4" name="meat" checked={this.state.meat=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          不吃肉
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="meat" checked={this.state.meat=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          不足50克
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="meat" checked={this.state.meat=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          50-75克
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="meat" checked={this.state.meat=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          75克以上
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                {this.state.isMeat?
                  <div className="app-question-form" id="anchor-3">
                    <div className="app-question-lab">
                      2.1、习惯选择的肉食种类<span className="require">*</span>
                    </div>
                    <div className="app-question-val">
                      <ul className="app-list clearfix">
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="1" name="meatType" checked={this.state.meatType=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            瘦肉
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="2" name="meatType" checked={this.state.meatType=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            肥瘦肉
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="3" name="meatType" checked={this.state.meatType=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            肥肉
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="4" name="meatType" checked={this.state.meatType=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            动物内脏
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                :
                  null
                }

                <div className="app-question-form" id="anchor-4">
                  <div className="app-question-lab">
                    3、每日蔬菜摄入量<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="4" name="vegetable" checked={this.state.vegetable=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          50克以下
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="vegetable" checked={this.state.vegetable=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          50-不足150克
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="vegetable" checked={this.state.vegetable=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          150-不足300克
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="vegetable" checked={this.state.vegetable=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          300-500克或以上
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="app-question-form" id="anchor-5">
                  <div className="app-question-lab">
                    4、每日水果摄入量<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="fruit" checked={this.state.fruit=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          100克以下
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="fruit" checked={this.state.fruit=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          100克-不足200克
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="fruit" checked={this.state.fruit=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          200或以上
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="app-question-form" id="anchor-6">
                  <div className="app-question-lab">
                    5、平均每日大豆及豆制品的摄入量<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="soyBean" checked={this.state.soyBean=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          平均不足每天30克
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="soyBean" checked={this.state.soyBean=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          30-50克（相当于一杯豆浆以上的量）
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="app-question-form" id="anchor-7">
                  <div className="app-question-lab">
                    6、平均每日蛋类的摄入量（按相当于鸡蛋数计）<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="egg" checked={this.state.egg=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          不吃或不足1个
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="egg" checked={this.state.egg=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          1-2个
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="egg" checked={this.state.egg=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          3-5个
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="4" name="egg" checked={this.state.egg=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          5个以上
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="app-question-form" id="anchor-8">
                  <div className="app-question-lab">
                    7、每周吃煎炸食物的次数<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="friedFood" checked={this.state.friedFood=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          每周3次及以上
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="friedFood" checked={this.state.friedFood=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          每周1-2次
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="friedFood" checked={this.state.friedFood=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          不吃或偶尔吃（平均每周不到1次）
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="app-question-form" id="anchor-9">
                  <div className="app-question-lab">
                    8、平均一周吃咸菜，腐乳、酱菜的次数<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="pickledFoodFrequency" checked={this.state.pickledFoodFrequency=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          每周3次及以上
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="pickledFoodFrequency" checked={this.state.pickledFoodFrequency=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          每周1-2次
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="pickledFoodFrequency" checked={this.state.pickledFoodFrequency=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          不吃或偶尔吃（平均每周不到1次）
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="app-question-form" id="anchor-10">
                  <div className="app-question-lab">
                    9、吃早餐习惯<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="breakFastHabit" checked={this.state.breakFastHabit=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          基本每天吃
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="breakFastHabit" checked={this.state.breakFastHabit=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          每周1-3天不吃
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="breakFastHabit" checked={this.state.breakFastHabit=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          每周4天或以上不吃
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="app-question-form" id="anchor-11">
                  <div className="app-question-lab">
                    10、吃甜点习惯<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="dessert" checked={this.state.dessert=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          每周5次及以上
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="dessert" checked={this.state.dessert=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          每周1-4次
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="dessert" checked={this.state.dessert=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          基本不吃
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="app-question-form" id="anchor-12">
                  <div className="app-question-lab">
                    11、您吸烟吗<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="smokeOrNot" checked={this.state.smokeOrNot=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          吸烟
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="smokeOrNot" checked={this.state.smokeOrNot=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          原来吸，已戒
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="smokeOrNot" checked={this.state.smokeOrNot=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          不吸
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                {this.state.isSmoke?
                  <div className="app-question-form">
                    <div className="app-question-form" id="anchor-13">
                      <div className="app-question-lab">
                        11.1、几岁开始吸烟<span className="require">*</span>
                      </div>
                      <div className="app-question-val">
                        <input type="text" name="ageBegainToSmoke" value={this.state.ageBegainToSmoke} placeholder="请输入您的吸烟年龄" className="app-question-txt" onChange={this.handleInputChange} />
                      </div>
                    </div>
                    <div className="app-question-form" id="anchor-15">
                      <div className="app-question-lab">
                        11.2、平均每天吸烟多少支<span className="require">*</span>
                      </div>
                      <div className="app-question-val">
                        <input type="text" name="dailySmokeNumber" value={this.state.dailySmokeNumber} placeholder="请输入每天吸烟支数" className="app-question-txt" onChange={this.handleInputChange} />
                      </div>
                    </div>
                  </div>
                :
                  null
                }

                {this.state.isQSmoke?
                  <div className="app-question-form">
                    <div className="app-question-form" id="anchor-13">
                      <div className="app-question-lab">
                        11.1、几岁开始吸烟<span className="require">*</span>
                      </div>
                      <div className="app-question-val">
                        <input type="text" name="ageBegainToSmoke" value={this.state.ageBegainToSmoke} placeholder="请输入您的吸烟年龄" className="app-question-txt" onChange={this.handleInputChange} />
                      </div>
                    </div>
                    <div className="app-question-form" id="anchor-14">
                      <div className="app-question-lab">
                        11.2、几岁开始戒烟<span className="require">*</span>
                      </div>
                      <div className="app-question-val">
                        <input type="text" name="ageBegainToGiveUpSmoking" value={this.state.ageBegainToGiveUpSmoking} placeholder="请输入您的戒烟年龄" className="app-question-txt" onChange={this.handleInputChange} />
                      </div>
                    </div>
                    <div className="app-question-form" id="anchor-15">
                      <div className="app-question-lab">
                        11.3、平均每天吸烟多少支<span className="require">*</span>
                      </div>
                      <div className="app-question-val">
                        <input type="text" name="dailySmokeNumber" value={this.state.dailySmokeNumber} placeholder="请输入每天吸烟支数" className="app-question-txt" onChange={this.handleInputChange} />
                      </div>
                    </div>
                    <div className="app-question-form" id="anchor-16">
                      <div className="app-question-lab">
                        11.4、您经常被动吸烟吗？（每天15分钟以上）<span className="require">*</span>
                      </div>
                      <div className="app-question-val">
                        <ul className="app-list clearfix">
                          <li class="app-active">
                            <label className="app-radio-box">
                              <input type="radio" value="1" name="passiveSmoking" checked={this.state.passiveSmoking=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                              几乎每天有（6-7天）
                            </label>
                          </li>
                          <li class="app-active">
                            <label className="app-radio-box">
                              <input type="radio" value="2" name="passiveSmoking" checked={this.state.passiveSmoking=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                              经常有（每周4-5天）
                            </label>
                          </li>
                          <li class="app-active">
                            <label className="app-radio-box">
                              <input type="radio" value="3" name="passiveSmoking" checked={this.state.passiveSmoking=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                              有时有（每周1-3天）
                            </label>
                          </li>
                          <li class="app-active">
                            <label className="app-radio-box">
                              <input type="radio" value="4" name="passiveSmoking" checked={this.state.passiveSmoking=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                              偶尔有（不足每周1天）
                            </label>
                          </li>
                          <li class="app-active">
                            <label className="app-radio-box">
                              <input type="radio" value="5" name="passiveSmoking" checked={this.state.passiveSmoking=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                              没有
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                :
                  null
                }
                {this.state.isNSmoke?
                  <div className="app-question-form" id="anchor-16">
                    <div className="app-question-lab">
                      11.1、您经常被动吸烟吗？（每天15分钟以上）<span className="require">*</span>
                    </div>
                    <div className="app-question-val">
                      <ul className="app-list clearfix">
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="1" name="passiveSmoking" checked={this.state.passiveSmoking=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            几乎每天有（6-7天）
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="2" name="passiveSmoking" checked={this.state.passiveSmoking=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            经常有（每周4-5天）
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="3" name="passiveSmoking" checked={this.state.passiveSmoking=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            有时有（每周1-3天）
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="4" name="passiveSmoking" checked={this.state.passiveSmoking=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            偶尔有（不足每周1天）
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="5" name="passiveSmoking" checked={this.state.passiveSmoking=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            没有
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                :
                  null
                }



                <div className="app-question-form" id="anchor-17">
                  <div className="app-question-lab">
                    12、您饮酒吗<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="drinkOrNot" checked={this.state.drinkOrNot=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          喝酒
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="drinkOrNot" checked={this.state.drinkOrNot=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          不喝酒
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                {this.state.isDrink?
                  <div className="app-question-form" id="anchor-18">
                    <div className="app-question-lab">
                      12.1、饮酒类型与每周饮酒量为<span className="require">*</span>
                    </div>
                    <div className="app-question-val">
                      <ul className="app-list clearfix">
                        <li className="app-checked">
                          <div className="app-number">①</div>
                          <div className="app-radio-item">
                            红酒，每周<input type="text" name="redWine" value={this.state.redWine} className="app-txt-mini" onChange={this.handleInputChange} placeholder="红酒"/>两
                          </div>
                        </li>
                        <li className="app-checked">
                          <div className="app-number">②</div>
                          <div className="app-radio-item">
                            黄酒，每周<input type="text" name="yellowWine" value={this.state.yellowWine} className="app-txt-mini" onChange={this.handleInputChange} placeholder="黄酒"/>两
                          </div>
                        </li>
                        <li className="app-checked">
                          <div className="app-number">③</div>
                          <div className="app-radio-item">
                            啤酒，每周<input type="text" name="beer" value={this.state.beer} className="app-txt-mini" onChange={this.handleInputChange} placeholder="啤酒"/>两
                          </div>
                        </li>
                        <li className="app-checked">
                          <div className="app-number">④</div>
                          <div className="app-radio-item">
                            白酒，每周<input type="text" name="wine" value={this.state.wine} className="app-txt-mini" onChange={this.handleInputChange} placeholder="白酒"/>两
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                :
                  null
                }

                <div className="app-question-form" id="anchor-19">
                  <div className="app-question-lab">
                    13、日常体力活动情况<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li className="app-checked-mini">
                        <div className="app-number">①</div>
                        <div className="app-radio-item">
                          轻体力活动（如一般家务、逛街、散步等），每周<input type="text" name="lActivityFreq" value={this.state.lActivityFreq} className="app-txt-mini" onChange={this.handleInputChange}/>天，
                          每天<input type="text" name="lActTimeLength" value={this.state.lActTimeLength} className="app-txt-mini" onChange={this.handleInputChange}/>分钟
                        </div>
                      </li>
                      <li className="app-checked-mini">
                        <div className="app-number">②</div>
                        <div className="app-radio-item">
                          中等体力活动（骑车；跳舞、负重行走），每周<input type="text" name="mActivityFreq" value={this.state.mActivityFreq} className="app-txt-mini" onChange={this.handleInputChange}/>天，
                          每天<input type="text" name="mActTimeLength" value={this.state.mActTimeLength} className="app-txt-mini" onChange={this.handleInputChange}/>分钟
                        </div>
                      </li>
                      <li className="app-checked-mini">
                        <div className="app-number">③</div>
                        <div className="app-radio-item">
                          重体力活动（搬运、挖掘等）；每周<input type="text" name="hActivityFreq" value={this.state.hActivityFreq} className="app-txt-mini" onChange={this.handleInputChange}/>天，
                          每天<input type="text" name="hActTimeLength" value={this.state.hActTimeLength} className="app-txt-mini" onChange={this.handleInputChange}/>分钟
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="app-question-form" id="anchor-20">
                  <div className="app-question-lab">
                    14、每天静坐的时间大约为（单位：小时）<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <input type="text" name="potato" value={this.state.potato} placeholder="请输入每天静坐时间" className="app-question-txt" onChange={this.handleInputChange} />
                  </div>
                </div>

                <div className="app-question-form" id="anchor-21">
                  <div className="app-question-lab">
                    15、每次30分钟以上的运动锻炼<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="roughage" checked={this.state.roughage=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          每周3次以上
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="roughage" checked={this.state.roughage=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          每周1-2次
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="roughage" checked={this.state.roughage=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          每周1次以下或不运动
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="app-question-form">
                  <div className="app-question-lab">
                    16、是否存在影响运动的不适症状或表现
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="ache" checked={this.state.ache=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          疼痛，胸部、颈部、下颌、上肢、或其它代表缺血的部位不适
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="hardToBreath" checked={this.state.hardToBreath=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          休息或轻微运动时呼吸困难
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="dizzy" checked={this.state.dizzy=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          头晕眼花或晕厥
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="pnd" checked={this.state.pnd=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          端坐呼吸或阵发性夜间呼吸困难
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="ankleEdema" checked={this.state.ankleEdema=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          脚踝水肿
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="palpitation" checked={this.state.palpitation=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          心悸或心动过速
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="intermittenClaudication" checked={this.state.intermittenClaudication=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          间歇性跛行
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="heartMurmur" checked={this.state.heartMurmur=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          明确的心脏杂音
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-checkBox-box">
                          <input type="checkbox" value="1" name="shortness" checked={this.state.shortness=='1'?true : false} className="app-checkBox app-checkBox-well" onChange={this.checkboxInputChange}/>
                          正常活动出现的异常疲劳或气短
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="app-question-form" id="anchor-22">
                  <div className="app-question-lab">
                    17、居住或工作环境中的污染<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="pollution" checked={this.state.pollution=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          空气污染
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="pollution" checked={this.state.pollution=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          家具污染
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="pollution" checked={this.state.pollution=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          燃煤污染
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="4" name="pollution" checked={this.state.pollution=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          不清楚
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="5" name="pollution" checked={this.state.pollution=='5'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          无污染
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="app-question-form" id="anchor-23">
                  <div className="app-question-lab">
                    18、每周累积光照时间（至少手、脸裸露）<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="illuminationTime" checked={this.state.illuminationTime=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          不足2小时
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="illuminationTime" checked={this.state.illuminationTime=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          2小时以上
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="illuminationTime" checked={this.state.illuminationTime=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          不确定
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="app-question-form" id="anchor-24">
                  <div className="app-question-lab">
                    19、每周自己炒菜做饭次数<span className="require">*</span>
                  </div>
                  <div className="app-question-val">
                    <ul className="app-list clearfix">
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="1" name="cook" checked={this.state.cook=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          很少做饭
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="2" name="cook" checked={this.state.cook=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          1-3次
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="3" name="cook" checked={this.state.cook=='3'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          4-7次
                        </label>
                      </li>
                      <li class="app-active">
                        <label className="app-radio-box">
                          <input type="radio" value="4" name="cook" checked={this.state.cook=='4'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                          每天一次以上
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                {this.state.isCook?
                  <div className="app-question-form" id="anchor-25">
                    <div className="app-question-lab">
                      19.1、炒菜时习惯把油烧到冒烟才开始烹调<span className="require">*</span>
                    </div>
                    <div className="app-question-val">
                      <ul className="app-list clearfix">
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="1" name="hot" checked={this.state.hot=='1'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            是
                          </label>
                        </li>
                        <li class="app-active">
                          <label className="app-radio-box">
                            <input type="radio" value="2" name="hot" checked={this.state.hot=='2'?true : false} className="app-radio app-radio-well" onChange={this.handleInputChange}/>
                            否
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                :
                  null
                }
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
