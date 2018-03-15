import React, {
  Component
} from "react";
import {
  Toast,
} from 'antd-mobile';
import common from '../../common/common';
import ReportShare from '../../common/reportShare';
import '../style/index';
let top = {
  padding: "0.3rem 0.3rem 0.3rem 0.3rem"
}
let state = ""

class Identification extends Component {
  render() {
    if (state == '') {
      return false
    } else if (state == "没有抑郁症" || state == "可能有轻度抑郁倾向") {
      return (<div class="Identification"><span class="statea">{state}</span><span class="statesa"></span></div>)
    } else if (state == "可能有中度抑郁倾向") {
      return (
        <div class="Identification positiona"><span class="statea stateb">{state}</span><span class="statesa statesb"></span></div>
      )
    } else if (state == "可能有中重度抑郁倾向") {
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
export default class DepressionReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      DepressionReport: '',
      goods: [],
      color_state: "",
    }
  }

  componentDidMount() {
    let _this = this;
    common.getAxios("/personHealthRisk/load", this.props.location.state, function(result) {
      if (result.questionaireMap != undefined) {
        if (result.reportMap.DepressionReport != undefined) {
          var res = result.reportMap.DepressionReport;
          state = res.riskLevel
          let color_state = "";
          if (state == '') {} else if (state == "没有抑郁症" || state == "可能有轻度抑郁倾向") {
            color_state = "statea"
          } else if (state == "可能有中度抑郁倾向") {
            color_state = "stateb"
          } else if (state == "可能有中重度抑郁倾向") {
            color_state = "statec"
          } else {
            color_state = "stated"
          }
          _this.setState({
            DepressionReport: res,
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
    let {
      color_state
    } = this.state
    return (
      <div class="app-bd">
      <ReportShare gender={this.props.location.state.gender} />
        <div class="summary_title">抑郁倾向风险评估</div>
        <div class="obesity obesitys">
          <p>抑郁障碍是导致社会功能残疾的主要原因之一。抑郁障碍的典型的表现包括三个维度活动的降低：情绪低落、思维迟缓、意志活动减退，另外一些患者会以躯体症状表现出为主。具有抑郁障碍的人群，多因躯体不适症状就诊，容易忽略精神方面的问题而不能得到及时干预和治疗，以致于延误治疗时机。通过评估有助于早期发现抑郁倾向，及时给予干预和治疗。</p>
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
          <span class="summary_name_title_subtitles">您在抑郁风险方面的评估结果为</span>
        </div>
        <div class="grade">
        <span class={color_state}>{state}</span>
        </div>
        <div class="obesity stroke" >
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PHQ-9被认为是非常良好的具有有效性、可靠性和可行性的评估量表，具有较高的灵敏度和特异度，常用于抑郁障碍的症状筛查，辅助诊断及病情评定。但由于参评人对问题理解上的差异，可能结果存在一定的偏差或假阳性，故评估结果只能做为参考，不能做为诊断依据。<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果评估结果提示中、重度抑郁倾向，或发现自己的症状影响到你的家庭生活, 工作, 人际关系等，可进行专业的心理咨询，获取心理咨询师的指导。
          </p>
        </div>
        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">预防要点</span>
        </div>
        <ul className="obesity" style={{padding:'0.3rem 0.3rem 0.6rem 0.3rem'}}>
          <li><i></i><p>在自然中陶冶心情，保持乐观、现实的生活态度。</p></li>

          <li><i></i><p>转移注意力，在心情不好时，可用外出散步，观景或参加自己喜欢的群体活动等方式进行调节。</p></li>

          <li><i></i><p>多和亲人及好朋友聚会，多说话会帮助自己调节情绪。</p></li>

          <li><i></i><p>多做适合自己体能强度的运动，通过运动可疏解和宣泄心中郁闷，使自己心情变得愉快。</p></li>
        </ul>
      </div>
    )
  }
}