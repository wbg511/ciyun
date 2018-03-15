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
  key: 'waistLine'
}, {
  project: '',
  key: 'bp'
}, {
  project: '',
  key: 'fastingBg'
}, {
  project: '',
  key: 'hdlc'
}, {
  project: '',
  key: 'trig'
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


export default class MetabolicSyndromeReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      MetabolicSyndromeReport: '',
      goods: [],
      up_down: false,
      color_state: "",
      "th_props": [{
        th_width: "34%",
        th_name: "项目",
      }, {
        th_width: "18%",
        th_name: "本次",
      }, {
        th_width: "18%",
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
        if (result.reportMap.MetabolicSyndromeReport != undefined) {
          var res = result.reportMap.MetabolicSyndromeReport;
          dataList.forEach(function(value, index, array) {
            value.project = res[value.key]
          })
          state = res.riskLevel
          let color_state = "";
          if (state == '') {} else if (state == "低危人群") {
            color_state = "statea"
          } else if (state == "高危人群") {
            color_state = "statec"
          } else {
            color_state = "stated"
          }
          _this.setState({
            MetabolicSyndromeReport: res,
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
      MetabolicSyndromeReport
    } = this.state;
    return (
      <div class="app-bd">
        <ReportShare gender={this.props.location.state.gender} />
        <div class="summary_title">代谢综合征风险评估</div>
        <div class="obesity obesitys">
          <p>代谢综合征是导致糖尿病、心脑血管疾病的重要危险因素及病理基础，它集多种代谢紊乱于一身，包括肥胖、高血压、高血糖、高尿酸血症、血脂异常、高脂肪肝发生率和高胰岛素血症，可造成心脑血管疾病、内分泌疾病、恶性肿瘤等疾病发病率增加，须积极预防和改善，以降低疾病风险。</p>
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
          <span class="summary_name_title_subtitles">您患代谢综合征的风险等级</span>
        </div>
        <div class="grade">
            <span class={color_state}>{state}</span>
        </div>
        <div class="obesity stroke">
          <p>{MetabolicSyndromeReport.relaRisk}</p>
        </div>
        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">预防要点</span>
        </div>
        <ul className="obesity" style={{padding:'0.3rem 0.3rem 0.6rem 0.3rem'}}>
          <li><i></i><p>合理饮食，控制每日摄入总热量，减低脂肪摄入，使体重、腰围控制在合适范围。</p></li>

          <li><i></i><p>注意血压、血脂的控制和调节，必要时在医生指导下药物治疗。</p></li>

          <li><i></i><p>控制体重 维持BMI在18.5～23.9kg/m2。</p></li>

          <li><i></i><p>定期测量体重、腰围、血压；定期复查空腹血糖、血脂、血尿酸等项目，把握指标变化趋势。</p></li>
        </ul>
      </div>
    )
  }
}