import React, {
  Component
} from "react";
import {
  Toast,
} from 'antd-mobile';
import common from '../../common/common';
import ReportShare from '../../common/reportShare';
import TableList from '../../common/tableList';

var dataList
dataList = [{
  project: '',
  key: 'lungCancerFamily'
}, {
  project: '',
  key: 'cb'
}, {
  project: '',
  key: 'pollution'
}, {
  project: '',
  key: 'smokeStatus'
}, {
  project: '',
  key: 'passiveSmokeStatus'
}, {
  project: '',
  key: 'cokingHabits'
}, {
  project: '',
  key: 'vegetableAndFruit'
}]

let top = {
  padding: "0.3rem 0.3rem 0.3rem 0.3rem"
}
let state = ""

class Identification extends Component {
  render() {
    if (state == '') {
      return false
    } else if (state == "低风险") {
      return (
        <div class="Identification"><span class="statea">{state}</span><span class="statesa"></span></div>
      )
    } else if (state == "较低风险") {
      return (
        <div class="Identification positiona"><span class="statea stateb">{state}</span><span class="statesa statesb"></span></div>
      )
    } else if (state == "中等风险") {
      return (
        <div class="Identification positionb"><span class="statea statec">{state}</span><span class="statesa statesc"></span></div>
      )
    } else if (state == "较高风险") {
      return (
        <div class="Identification positionc"><span class="statea stated">{state}</span><span class="statesa statesd"></span></div>
      )
    } else {
      return (
        <div class="Identification positionc"><span class="statea stated">{state}</span><span class="statesa statesd"></span></div>
      )
    }

  }
}

export default class LungCancerReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      LungCancerReport: '',
      goods: [],
      up_down: true,
      style: {},
      styletwo: {},
      stylethree: {},
      color_state: "",
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
        if (result.reportMap.LungCancerReport != undefined) {
          var res = result.reportMap.LungCancerReport;
          dataList.forEach(function(value, index, array) {
            value.project = res[value.key]
          })
          state = res.riskLevel
          let color_state = "";
          if (state == '') {} else if (state == "低风险") {
            color_state = "stateo"
          } else if (state == "较低风险") {
            color_state = "stateb"
          } else if (state == "中等风险") {
            color_state = "statec"
          } else if (state == "较高风险") {
            color_state = "stated"
          } else {
            color_state = "stated"
          }
          let style, styletwo, stylethree
          if (res.isBeIll == true) {
            style = {
              display: "none"
            }
            styletwo = {
              display: "block"
            }
            stylethree = {
              display: "none"
            }
          } else if (res.isAbnormal == true) {
            style = {
              display: "none"
            }
            styletwo = {
              display: "none"
            }
            stylethree = {
              display: "block"
            }
          } else {
            style = {
              display: "block"
            }
            styletwo = {
              display: "none"
            }
            stylethree = {
              display: "none"
            }
          }
          _this.setState({
            LungCancerReport: res,
            color_state: color_state,
            style: style,
            styletwo: styletwo,
            stylethree: stylethree
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
      style,
      styletwo,
      stylethree
    } = this.state;
    return (
      <div class="app-bd">
      <ReportShare gender={this.props.location.state.gender} />
        <div class="summary_title">肺癌风险评估</div>
        <div class="obesity obesitys">
          <p>肺癌是发病率和死亡率增长最快，对人群健康和生命威胁最大的恶性肿瘤之一。大量资料表明，长期大量吸烟与肺癌的发生有非常密切的关系。大气污染与吸烟对肺癌的发病率可能互相促进，起协同作用。</p>
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
        <div style={style}>
          <div class="Result stroke">
            <div class="resule_in">
              <Identification></Identification>
              <img src={require("static/images/in.png")} alt="" class="resule_in_img"/>
            </div>
          </div>
          <div class="summary_name_title up diabetes">
            
            <span class="summary_name_title_subtitles">您患肺癌的风险等级:</span>
          </div>
          <div class="grade">
              <span class={color_state}>{this.state.LungCancerReport.riskLevel}</span>
          </div>
          <div class="summary_name_title up diabetes">
            
            <span class="summary_name_title_subtitles">当前风险</span>
          </div>
          <div class="obesity">
            <p>{this.state.LungCancerReport.relaRisk}</p>
          </div>
          <div class="summary_name_title up diabetes">
            
            <span class="summary_name_title_subtitles">理想风险</span>
          </div>
          <div class="obesity">
            <p>{this.state.LungCancerReport.ideRisk}</p>
          </div>
        </div>
        <div style={styletwo} class="BeIll">
          <div class="isBeIll">
            <img src={require("static/images/lung.png")} alt=""/>
          </div>
          <div class="summary_name_title up diabetes">
            <span class="summary_name_title_subtitles">您已是：<span style={{color:"#ff6666"}}>肺癌患者</span></span>
          </div>
          <div class="obesity">
            <p>{this.state.LungCancerReport.relaRisk}</p>
          </div>
        </div>
        <div style={stylethree} class="BeIll">
          <div class="isBeIll">
            <img src={require("static/images/lung.png")} alt=""/>
          </div>
          <div class="summary_name_title up diabetes">
            <span class="summary_name_title_subtitles">您患肺癌的风险等级:<span style={{color:"#ff6666"}}>{this.state.LungCancerReport.riskLevel}</span></span>
          </div>
          <div class="obesity">
            <p>{this.state.LungCancerReport.relaRisk}</p>
          </div>
        </div>
        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">预防要点</span>
        </div>
        <ul className="obesity" style={{padding:'0.3rem 0.3rem 0.6rem 0.3rem'}}>
          <li><i></i><p>不吸烟或不被动吸烟，至少减少吸烟量，因每日吸烟量大小和累积吸烟年限长短与肺癌发病有剂量关系，减少吸烟量有助于降低肺癌发病风险。</p></li>
          <li><i></i><p>保护环境，减少大气污染。</p></li>
          <li><i></i><p>居室环境的维护和净化：新装修的房间注意通风，可选择空气净化装置帮助消除污染；注意保持健康的烹调习惯，减少油烟吸入。</p></li>
          <li><i></i><p>增加饮食中蔬菜、水果等有助于预防肺癌。</p></li>
          <li><i></i><p>减少职业致癌物的暴露。</p></li>
          <li><i></i><p>注意情志疏导，保持愉快的心情。</p></li>
        </ul>
      </div>
    )
  }
}