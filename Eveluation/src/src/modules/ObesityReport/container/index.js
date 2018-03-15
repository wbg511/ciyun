import React, {
  Component
} from "react";
import {
  Toast,
} from 'antd-mobile';
import common from '../../common/common';
import ReportShare from '../../common/reportShare';
import {
  Link,
  IndexLink,
  hashHistory,
  Router,
  Route
} from "react-router";
import '../style/index';

const dataList = [{
  project: '胰岛素抵抗及2型糖尿病',
  present: '高血压',
  Recommend: '乳腺癌/子宫癌（女）前列腺癌/结直肠癌（男）'
}, {
  project: '胆囊疾病',
  present: '冠心病',
  Recommend: '生殖激素异常/生育功能受损'
}, {
  project: '血脂异常',
  present: '高尿酸血症及痛风',
  Recommend: '多囊卵巢综合征'
}, {
  project: '睡眠呼吸暂停综合征',
  present: '脂肪肝',
  Recommend: '背下部疼痛'
}, {
  project: '气喘',
  present: '骨关节病',
  Recommend: '麻醉并发症'
}];

const dataListtwo = [{
  project: '最大氧吸取量（VO₂max)',
  present: '降低',
  Recommend: '改善'
}, {
  project: '瘦体重（FFM）',
  present: '损失',
  Recommend: '增加或保持'
}, {
  project: '体脂肪（%）',
  present: '下降少',
  Recommend: '下降多'
}, {
  project: '营养缺乏',
  present: '容易发生',
  Recommend: '一般不会发生'
}, {
  project: '胰岛素敏感度',
  present: '不确定',
  Recommend: '改善'
}, {
  project: '肌肉和韧带力量',
  present: '降低',
  Recommend: '改善'
}, {
  project: '体力',
  present: '下降',
  Recommend: '改善，耐力提高'
}, {
  project: '静息代谢率（RMR）',
  present: '下降',
  Recommend: '保持或增加'
}, {
  project: '减重计划',
  present: '不易坚持',
  Recommend: '容易坚持'
}, {
  project: '减重后反弹',
  present: '易发生',
  Recommend: '不易发生'
}, {
  project: '精神状态',
  present: '不佳',
  Recommend: '改善'
}];
// 肥胖者放生相关疾病的危险度
class TableList extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th width='32%'>发病危险高3倍以上的疾病</th>
            <th width='36%'>发病危险高2-3倍的疾病</th>
            <th width='32%'>发病危险高1-2倍的疾病</th>
          </tr>
          {this.props.todos.map(function(item,index){
            return <tr key={index}><td>{item.project}</td><td>{item.present}</td><td>{item.Recommend}</td></tr>
          })}
        </tbody>
      </table>
    )
  }
}
// 不同减重措施对健康指标的影响
class TableListtwo extends Component {
  render() {
    var up_down = this.props.up_down;
    return (
      <table>
        <tbody>
          <tr>
            <th>指标</th>
            <th>单独控制饮食</th>
            <th>适当控制饮食结合运动</th>
          </tr>
          {this.props.todos.map(function(item,index){
        return <tr key={index} className={index>6?up_down?"none":"":""}><td width='38%'>{item.project}</td><td>{item.present}</td><td>{item.Recommend}</td></tr>
          })}
        </tbody>
      </table>
    )
  }
}
let state = {
  Whole: "",
  center: "",
}
// 全身性肥胖评估状态判断
class Identification extends Component {
  render() {
    if (state.Whole == "") {
      return false
    } else if (state.Whole == "体重偏低") {
      return (
        <div class="Identification"><span class="statea">{state.Whole}</span><span class="statesa"></span></div>
      )
    } else if (state.Whole == "正常") {
      return (
        <div class="Identification positiona"><span class="statea stateb">{state.Whole}</span><span class="statesa statesb"></span></div>
      )
    } else if (state.Whole == "超重") {
      return (
        <div class="Identification positionb"><span class="statea statec">{state.Whole}</span><span class="statesa statesc"></span></div>
      )
    } else {
      return (
        <div class="Identification positionc"><span class="statea stated">{state.Whole}</span><span class="statesa statesd"></span></div>
      )
    }

  }
}
// 中心性肥胖评估状态判断
class Identificationtwo extends Component {
  render() {
    if (state.center == "") {
      return false
    } else if (state.center == "腰围正常") {
      return (
        <div class="Identification"><span class="statea">{state.center}</span><span class="statesa"></span></div>
      )
    } else if (state.center == "中心性肥胖1级") {
      return (
        <div class="Identification positiona"><span class="statea stateb">{state.center}</span><span class="statesa statesb"></span></div>
      )
    } else if (state.center == "中心性肥胖2级") {
      return (
        <div class="Identification positionb"><span class="statea statec">{state.center}</span><span class="statesa statesc"></span></div>
      )
    }

  }
}

let top = {
  padding: "0.3rem 0.3rem 0.6rem 0.3rem"
}
export default class ObesityReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ObesityReport: '',
      goods: [],
      up_down: true,
    }
    this.up_down = this.up_down.bind(this);
  }
  // 点击展开收起操作时调用
  up_down() {
    var {
      up_down
    } = this.state;
    this.setState({
      up_down: !up_down
    });
  }

  componentDidMount() {
    //获取肥胖症风险评估数据渲染页面调用
    let _this = this;
    common.getAxios("/personHealthRisk/load", this.props.location.state, function(result) {
      if (result.reportMap != undefined) {
        if (result.reportMap.ObesityReport != undefined) {
          var res = result.reportMap.ObesityReport;
          state.Whole = res.riskLevel
          state.center = res.centerObesityRiskLevel
          _this.setState({
            ObesityReport: res
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
      up_down
    } = this.state;
    return (
      <div class="app-bd">
        <ReportShare gender={this.props.location.state.gender} />
        <div class="summary_title">肥胖症风险评估</div>
        <div class = "obesity obesitys">
          <p>肥胖症（obesity）是由于体内脂肪的体积和（或）脂肪细胞数量的增加导致的体重增加，或体脂占体重的百分比异常增高，并在某些局部过多沉积脂肪。判定肥胖的指标通常有体重指数（BMI）、腰围（WC）、腰臀比（WHR）及体脂肪率、内脏脂肪指数等。</p>
          <p>肥胖是糖尿病、心血管疾病及其他代谢性疾病和肿瘤的潜在危险因素。健康肥胖者不会一直健康，随着年龄增长，他们患病的风险会逐渐加大。</p>
        </div>
        <div class="summary_name_title">
         
          <span class="summary_name_title_subtitle">评估结果</span>
        </div>
        <div class="Result">
          <div class="summary_name_centent_title">
            <span>全身性肥胖评估</span>
          </div>
          <div class="resule_in">
            <Identification></Identification>
            <img src={require("static/images/in.png")} alt="" class="resule_in_img"/>
          </div>
          <div class="summary_name_centent_title">
            <img src={require("static/images/icon2.png")} alt=""  class="icon"/>
            <span>中心性肥胖评估</span>
          </div>
          <div class="resule_in">
            <Identificationtwo></Identificationtwo>
            <img src={require("static/images/in.png")} alt="" class="resule_in_img"/>
          </div>

        </div>
        <div class="summary_name_title">
         
          <span class="summary_name_title_subtitle">肥胖者发生相关疾病的危险度</span>
        </div>
        <div class="summary_table one Results ">
        <TableList todos={dataList}></TableList>
        
        </div>


        <div class="summary_name_title">
         
          <span class="summary_name_title_subtitle">不同减重措施对健康指标的影响</span>
        </div>
        <div class="summary_table one Results">
          <TableListtwo todos={dataListtwo} up_down={up_down}></TableListtwo>
          <div className={up_down?"up_down_content":"active up_down_content"} onClick={this.up_down}>
            {up_down?"展开":"收起"}
          </div>
        </div>

        <div class="summary_name_title">
         
          <span class="summary_name_title_subtitle">体重控制建议</span>
        </div>
        <div class="obesity p" style={top}>
          <p>每天安排进行体力活动的量和时间应按减体重目标计算，对于需要亏空的能量，一般多考虑采用增加体力活动量和控制饮食相结合的方法，其中 50%（40%−60%）应该由增加体力活动的能量消耗来解决，其他 50% 可由减少饮食总能量和减少脂肪的摄入量以达到需要亏空的总能量。增加体力活动的时间，可以有意识地结合日常活动来安排。</p>

        </div>
      </div>
    )
  }
}