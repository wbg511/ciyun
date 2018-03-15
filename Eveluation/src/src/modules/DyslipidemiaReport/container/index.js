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
  key: 'overFortyAge'
}, {
  project: '',
  key: 'ascvd'
}, {
  project: '',
  key: 'diab'
}, {
  project: '',
  key: 'hbp'
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
  key: 'tcHdlC'
}, {
  project: '',
  key: 'bmi'
}, {
  project: '',
  key: 'smokeStatus'
}]

let top = {
  padding: "0.3rem 0.3rem 0.3rem 0.3rem"
}
let state = ""
class Identification extends Component {
  render() {
    if (state == '') {
      return false
    } else if (state == "暂无风险") {
      return (
        <div class="Identification"><span class="statea">{state}</span><span class="statesa"></span></div>
      )
    }else if (state == "低危") {
      return (
        <div class="Identification positionb"><span class="statea stateb">{state}</span><span class="statesa statesb"></span></div>
      )
    } else if (state == "中危") {
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


export default class DyslipidemiaReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      DyslipidemiaReport: '',
      goods: [],
      up_down: true,
      color_state: "",
      color_stateone: "",
      color_statetwo: "",
      color_stateThree: "",
      "th_props": [{
        th_width: "34%",
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
        if (result.reportMap.DyslipidemiaReport != undefined) {
          var res = result.reportMap.DyslipidemiaReport;
          dataList.forEach(function(value, index, array) {
            value.project = res[value.key]
          })
          state = res.riskLevel;
          let color_state = "";

          let color_stateone: "";
          let color_statetwo = "";
          let color_stateThree = "";
          if (state == '') {} else
          if (state == "暂无风险") {
            color_state = "stateo";
          } else if (state == "低危") {
            color_state = "stateo";
            color_stateone = 'stateo'
          } else if (state == "中危") {
            color_state = "statec"
            color_statetwo = 'statec'
          } else {
            color_state = "stated"
            color_stateThree = 'stated'
          }
          _this.setState({
            DyslipidemiaReport: res,
            color_state: color_state,
            color_stateone: color_stateone,
            color_statetwo: color_statetwo,
            color_stateThree: color_stateThree
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
      color_stateone,
      color_statetwo,
      color_stateThree
    } = this.state;
    return (
      <div class="app-bd">
        <ReportShare gender={this.props.location.state.gender} />
        <div class="summary_title">血脂异常风险评估</div>
        <div class="obesity obesitys">
          <p>血脂异常的主要危害是增加ASCVD（动脉粥样硬化性心血管疾病）的发病危险。在同样的血脂水平下，如果个体存在不同的其它心血管疾病危险因素，则血脂危险度不同。评估个体血脂异常的危险度，有助于确定血脂异常患者调脂治疗的决策，从而最大程度降低患者ASCVD总体危险，对ASCVD防控具有重要意义。</p>
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
          <span class="summary_name_title_subtitles">您本次血脂异常的ASCVD危险评估结果为</span>
        </div>
        <div class="grade">
            <span class={color_state}>{state}</span>
        </div>
        <div class="obesity Standard">
            <div class="Standard_title">不同ASCVD危险级别和血脂异常治疗达标值</div>
            <div class="Standard_table" style={{"border":"0"}}>
            <table>
              <tbody>
                <tr>
                  <th width="30%">危险等级</th>
                  <th width="35%">LDL-c（mmol/L)</th>
                  <th width="35%">TC - HDL-c（mmol/L)</th>
                </tr>
                <tr>
                  <td>极高危</td>
                  <td style={{"background":"#fff"}} class={color_stateThree}>＜1.8</td>
                  <td style={{"background":"#fff"}} class={color_stateThree}>＜2.6</td>
                </tr>
                <tr>
                  <td>高危</td>
                  <td style={{"background":"#fff"}} class={color_statetwo}>＜2.6</td>
                  <td style={{"background":"#fff"}} class={color_statetwo}>＜3.4</td>
                </tr>
                <tr>
                  <td>中/低危</td>
                  <td style={{"background":"#fff"}} class={color_stateone}>＜3.4</td>
                  <td style={{"background":"#fff"}} class={color_stateone}>＜4.1</td>
                </tr>
              </tbody>

            </table>
            <p style={{"width":"100%",'padding':'0.3rem 0'}}>LDL-C升高是导致ASCVD发生、发展的关键因素。大量临床研究反复证实，只要能使血清LDL-C水平下降，就能显著减少ASCVD的发生率、致残率和死亡率。《中国成人血脂异常指南》推荐以LDL-C为首要干预靶点。</p>
            </div>
        </div>
        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">预防要点</span>
        </div>
        <ul className="obesity" style={{padding:'0.3rem 0.3rem 0.6rem 0.3rem'}}>
          <li><i></i><p>限制动物脂肪和高胆固醇食物摄入，如肥肉、动物脑及内脏、蛋黄、蟹黄、咸鸭蛋、鹌鹑蛋、鱼籽等。</p></li>

          <li><i></i><p>增加食物中植物固醇和水溶性膳食纤维的摄入，如菜籽油、坚果、全谷物、蔬菜、水果等。</p></li>

          <li><i></i><p>控制膳食总能量，以使体重控制在理想范围。可参照推荐的膳食方案。</p></li>

          <li><i></i><p>保持规律运动，每周中等强度运动3-5次，每次30分钟以上，每周最低消耗热量2000kcal以上。</p></li>

          <li><i></i><p>年龄在40岁以上的人群应每年检查血脂。ASCVD高危人群及现患有心脑血管疾病的人群应3-6个月检查一次血脂。</p></li>

          <li><i></i><p>ASCVD高危以上人群请及时咨询医生是否需要药物调脂治疗。</p></li>
        </ul>
      </div>
    )
  }
}