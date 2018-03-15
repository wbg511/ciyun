import React, {
  Component
} from "react";
import {
  Toast,
} from 'antd-mobile';
import common from '../../common/common';
import ReportShare from '../../common/reportShare';
import TableList from '../../common/tableList';
import '../style/index';

var dataList
dataList = [{
  project: '',
  key: 'strokeFamilyHistory'
}, {
  project: '',
  key: 'afib'
}, {
  project: '',
  key: 'brainBlood'
}, {
  project: '',
  key: 'weight'
}, {
  project: '',
  key: 'bp'
}, {
  project: '',
  key: 'fastingBg'
}, {
  project: '',
  key: 'chol'
}, {
  project: '',
  key: 'hdlc'
}, {
  project: '',
  key: 'ldlc'
}, {
  project: '',
  key: 'trig'
}, {
  project: '',
  key: 'smokeStatus'
}, {
  project: '',
  key: 'psysicalExercise'
}]

let top = {
  padding: "0.3rem 0.3rem 0.3rem 0.3rem"
}
let state = ""

class Identification extends Component {
  render() {
    if (state == '') {
      return false
    } else if (state == "低危人群") {
      return (
        <div class="Identification"><span class="statea">{state}</span><span class="statesa"></span></div>
      )
    } else if (state == "中危人群") {
      return (
        <div class="Identification positiona"><span class="statea stateb">{state}</span><span class="statesa statesb"></span></div>
      )
    } else if (state == "高危人群") {
      return (
        <div class="Identification positionb"><span class="statea statec">{state}</span><span class="statesa statesc"></span></div>
      )
    } else {
      return (
        <div class="Identification positionc"><span class="statea stated">{state}</span><span class="statesa statesd"></span></div>
      )
    }

  }
}

export default class StrokeReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      StrokeReport: '',
      goods: [],
      up_down: true,
      color_state: '',
      "th_props": [{
        th_width: "30%",
        th_name: "项目",
      }, {
        th_width: "20%",
        th_name: "本次",
      }, {
        th_width: "20%",
        th_name: "上次",
      }, {
        th_width: "30%",
        th_name: "参考范围",
      }, ]
    }
  }


  componentDidMount() {
    let _this = this;
    common.getAxios("/personHealthRisk/load", this.props.location.state, function(result) {
      if (result.questionaireMap != undefined) {
        if (result.reportMap.StrokeReport != undefined) {
          var res = result.reportMap.StrokeReport;
          dataList.forEach(function(value, index, array) {
            value.project = res[value.key]
          })
          state = res.riskLevel
          let color_state = "";
          if (state == '') {} else if (state == "低危人群") {
            color_state = "stateo"
          } else if (state == "中危人群") {
            color_state = "stateb"
          } else if (state == "高危人群") {
            color_state = "statec"
          } else {
            color_state = "stated"
          }
          _this.setState({
            StrokeReport: res,
            color_state: color_state,
          })
        } else {
          Toast.fail(response.data.msg, 3, null, true);
        }
      } else {
        Toast.fail(response.data.msg, 3, null, true);
      }
    })

  }
  render() {
    var {
      up_down,
      th_props,
      color_state,
    } = this.state;
    return (
      <div class="app-bd">
        <ReportShare gender={this.props.location.state.gender} />
        <div class="summary_title">脑卒中风险评估</div>
        <div class="obesity obesitys">
          <p>“脑卒中”（cerebral stroke）又称“中风”、“脑血管意外”（cerebralvascular accident，CVA）。是一种急性脑血管疾病，是由于脑部血管突然破裂或因血管阻塞导致血液不能流入大脑而引起脑组织损伤的一组疾病，包括缺血性和出血性卒中。缺血性卒中的发病率高于出血性卒中，占脑卒中总数的60%～70%。脑卒中发病率高、死亡率及致残率高，一旦患病缺乏有效的治疗手段，预防是最好的措施。</p>
        </div>
        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">危险因素</span>
        </div>
        <div class="summary_table one Results ">
        <TableList todos={dataList} up_down={up_down}  th_props={th_props}></TableList>
        </div>

        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">评估结果</span>
        </div>
        <div class="Result stroke">
          <div class="resule_in">
            <Identification></Identification>
            <img src={require("static/images/in.png")} alt="" class="resule_in_img"/>
          </div>
        </div>

        <div class="summary_name_title up diabetes">
          
          <span class="summary_name_title_subtitles">您患脑卒中的风险等级：</span>
        </div>
        <div class="grade">
            <span className={color_state}>{this.state.StrokeReport.riskLevel}</span>
        </div>
        <div class="obesity stroke">
          <p>本评估模型来源于国家卫生部“十二五”医改重大专项——脑卒中筛查与防治项目，通过评估，对具有脑卒中风险的人群可进行早期教育、早期干预、规范监测， 促使风险人群积极改善危险因素，以有效降低脑卒中发病率，保护生命质量。</p>
        </div>
        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">预防要点</span>
        </div>
        <ul className="obesity" style={{padding:'0.3rem 0.3rem 0.6rem 0.3rem'}}>
          <li><i></i><p>平衡膳食： 充足蔬菜水果，适当谷类，胆固醇应少于300mg/d，食用油少于25～30g，不吃动物油。每日饮水量1200ml。限制饮酒。每日啤酒355ml，红酒2两，白酒1两。减少钠盐摄入，每天食盐控制在6g以内，钾盐摄入≥4.7g/d。</p></li>

          <li><i></i><p>规律运动 每周至少5天、每天30分钟的中等强度有氧运动或每周3天、每天20分钟高强度的有氧运动（有运动风险者遵医嘱），避免连续2天不运动。推荐每天快步走>6000步，速度是每分钟100步。</p></li>

          <li><i></i><p>控制体重 维持BMI在18.5～23.9kg/m2。</p></li>

          <li><i></i><p>不吸烟或戒烟。</p></li>

          <li><i></i><p>控制血压、血糖、血脂水平在合适范围并定期监测。</p></li>

          <li><i></i><p>高危人群每3-6个月进行一次脑功分检测。</p></li>
        </ul>
      </div>
    )
  }
}