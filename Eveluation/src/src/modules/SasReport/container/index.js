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
  key: 'age'
}, {
  project: '',
  key: 'gender'
}, {
  project: '',
  key: 'bmi'
}, {
  project: '',
  key: 'hypnotics'
}, {
  project: '',
  key: 'smokeStatus'
}, {
  project: '',
  key: 'drunkStatus'
}, {
  project: '',
  key: 'airwayAbnormal'
}, {
  project: '',
  key: 'stroke'
}]

let top = {
  padding: "0.3rem 0.3rem 0.3rem 0.3rem"
}
let state = ""

class Identification extends Component {
  render() {
    if (state == '') {
      return false
    } else if (state == "没有明显风险") {
      return (
        <div class="Identification"><span class="statea">{state}</span><span class="statesa"></span></div>
      )
    } else if (state == "较低风险") {
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

export default class SasReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SasReport: '',
      goods: [],
      up_down: true,
      color_state: "",
      "th_props": [{
        th_width: "30%",
        th_name: "危险因素",
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
        if (result.reportMap.SasReport != undefined) {
          var res = result.reportMap.SasReport;
          dataList.forEach(function(value, index, array) {
            value.project = res[value.key];
          })
          state = res.riskLevel
          let color_state = "";
          if (state == '') {} else if (state == "没有明显风险") {
            color_state = "stateo"

          } else if (state == "较低风险") {
            color_state = "stateb"
          } else {
            color_state = "statec"
          }
          _this.setState({
            SasReport: res,
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
        <div class="summary_title">睡眠呼吸暂停综合征风险评估</div>
        <div class="obesity obesitys">
          <p>睡眠呼吸暂停综合征（OSAHS）是一种常见的睡眠呼吸疾患，与高血压、心律失常及心脑血管病有密切关系，危害极大。通过简单快捷的方式筛查出高危人群，有针对性的进行多导睡眠监测，可提高OSAHS的诊断率和治疗率。</p>
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
          
          <span class="summary_name_title_subtitles">您在睡眠呼吸暂停方面的评估结果为：</span>
        </div>
        <div class="grade">
          <span class={color_state}>{this.state.SasReport.riskLevel}</span>
        </div>
        <div class="obesity stroke">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;柏林问卷评估模型对睡眠呼吸暂停综合征的筛查有一定意义，尤其是对重度睡眠呼吸暂停的诊断和病情评价有一定参考价值。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;睡眠呼吸暂停综合征是指每晚睡眠过程中呼吸暂停反复发作30次以上，每次口鼻呼吸气流完全停止10秒以上；或睡眠呼吸暂停低通气指数（AHI）≥5次/小时并伴有嗜睡等临床症状。低通气是指睡眠过程中呼吸气流强度（幅度）较基础水平降低50%以上，并伴有血氧饱和度较基础水平下降≥4%或微醒觉；睡眠呼吸暂停低通气指数是指每小时睡眠时间内呼吸暂停加低通气的次数。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存在较高风险的人群应通过睡眠呼吸监测明确诊断。
          </p>
        </div>
        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">预防要点</span>
        </div>
        <ul className="obesity"  style={{padding:'0.3rem 0.3rem 0.6rem 0.3rem'}}>

          <li><i></i><p>加强运动锻炼，保持良好的生活习惯，控制体重，减轻体重的5%-10%以上。</p></li>

          <li><i></i><p>睡眠体位改变：侧位睡眠，抬高床头。</p></li>

          <li><i></i><p>避免烟酒嗜好，因为吸烟能引起呼吸道症状加重，饮酒加重打鼾、夜间呼吸紊乱及低氧血症。尤其不要睡前饮酒。</p></li>

          <li><i></i><p>避免服用镇静剂，以免加重对呼吸中枢调节的抑制。</p></li>

          <li><i></i><p>注意监测血压及血粘度，高血压者按时服用降压药。</p></li>
        </ul>
      </div>
    )
  }
}