import React, {
  Component
} from "react";
import {
  Toast
} from 'antd-mobile';
import common from '../../common/common';
import ReportShare from '../../common/reportShare';
import TableList from '../../common/tableList';
import '../style/index';

var dataList
dataList = [{
  project: '',
  key: 'part1'
}, {
  project: '',
  key: 'part2'
}, {
  project: '',
  key: 'age'
}, {
  project: '',
  key: 'chdAndStrokeFamilyHistory'
}, {
  project: '',
  key: 'smokeStatus'
}, {
  project: '',
  key: 'psysicalExercise'
}, {
  project: '',
  key: 'bmi'
}, {
  project: '',
  key: 'hbp'
}, {
  project: '',
  key: 'chol'
}, {
  project: '',
  key: 'ldlc'
}, {
  project: '',
  key: 'hdlc'
}]

let top = {
  padding: "0.3rem 0.3rem 0.3rem 0.3rem"
}
let state = ""

class Identification extends Component {
  render() {
    if (state == '') {
      return false
    } else if (state == "低运动风险") {
      return (
        <div class="Identification"><span class="statea">{state}</span><span class="statesa"></span></div>
      )
    } else if (state == "中度运动风险") {
      return (
        <div class="Identification positiona"><span class="statea stateb">{state}</span><span class="statesa statesb"></span></div>
      )
    } else {
      return (
        <div class="Identification positionb"><span class="statea statec">{state}</span><span class="statesa statesc"></span></div>
      )
    }

  }
}
export default class SportRiskReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SportRiskReport: '',
      goods: [],
      up_down: true,
      color_state: '',
      "th_props": [{
        th_width: "27%",
        th_name: "危险因素",
      }, {
        th_width: "23%",
        th_name: "本次",
      }, {
        th_width: "20%",
        th_name: "上次",
      }, {
        th_width: "27%",
        th_name: "参考范围",
      }, ]
    }
  }
  componentDidMount() {
    let _this = this;
    common.getAxios("/personHealthRisk/load", this.props.location.state, function(result) {
      if (result.questionaireMap != undefined) {
        if (result.reportMap.SportRiskReport != undefined) {
          var res = result.reportMap.SportRiskReport;
          dataList.forEach(function(value, index, array) {
            value.project = res[value.key];
          })
          state = res.riskLevel
          let color_state = "";
          if (state == '') {} else if (state == "低运动风险") {
            color_state = "stateo"
          } else if (state == "中度运动风险") {
            color_state = "stateb"
          } else {
            color_state = "stated"
          }
          _this.setState({
            SportRiskReport: res,
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
    console.log(color_state);
    return (
      <div class="app-bd">
        <ReportShare gender={this.props.location.state.gender} />
        <div class="summary_title">运动风险评估</div>
        <div class="obesity obesitys">
          <p>美国运动医学会指出，在参加运动或进行体适能评测前应对参加者进行运动风险分层，以决定运动前是否需要体检及进行运动能力测试，并按照不同风险制定适合自己的运动处方，或按照医生的指示进行适量的运动，以便改善自己的身体状况，享受较优质的生活。</p>
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
            <img src={require("static/images/in.png")} alt="" class="resule_in_img" />
          </div>
        </div>

        <div class="summary_name_title up diabetes">
          <span class="summary_name_title_subtitles">您的运动风险评估结果为：</span>
        </div>
        <div class="grade">
          <span class={color_state}>{this.state.SportRiskReport.riskLevel}</span>
        </div>
        <div class="summary_name_title up diabetes">
          <span class="summary_name_title_subtitles">运动建议</span>
        </div>
        <div class="obesity stroke">
          <p>{this.state.SportRiskReport.relaRisk}</p>
        </div>
        <div class="summary_name_title">
          <span class="summary_name_title_subtitle">注意事项</span>
        </div>
        <ul className="obesity" style={{ padding: '0.3rem 0.3rem 0.6rem 0.3rem' }}>
          <li><i></i><p>运动量应从小到大，循序渐进，运动前需热身，运动后各肌肉群需拉伸与放松。</p></li>

          <li><i></i><p>运动时宜穿着舒适，易排汗，鞋袜不要对足部产生挤压和磨擦。</p></li>

          <li><i></i><p>注意安全防护，必要时采取安全防护措施。</p></li>

          <li><i></i><p>不要空腹做剧烈运动，以免发生低血糖等危险。</p></li>

          <li><i></i><p>运动强度要适合自己的体质，不要盲目提高运动强度，以免发生运动风险。</p></li>

          <li><i></i><p>运动过程中若出现胸闷、胸痛、呼吸困难等不适情况，请立即停止运动并原地休息，如不能缓解，请及时就医，以免延误病情。</p></li>
        </ul>
      </div>
    )
  }
}