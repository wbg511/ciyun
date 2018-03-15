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
  key: 'crpcFamily'
}, {
  project: '',
  key: 'crpc'
}, {
  project: '',
  key: 'bmi'
}, {
  project: '',
  key: 'highFatDiet'
}, {
  project: '',
  key: 'vegetableAndFruitIntake'
}, {
  project: '',
  key: 'soyBeanIntake'
}, ]

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
    } else if (state == "高风险" || state == "现患") {
      return (
        <div class="Identification positionc"><span class="statea stated">{state}</span><span class="statesa statesd"></span></div>
      )
    } else {
      return null
    }

  }
}

export default class PcReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      PcReport: '',
      goods: [],
      up_down: true,
      style: {},
      styletwo: {},
      stylethree: {},
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
        if (result.reportMap.PcReport != undefined) {
          var res = result.reportMap.PcReport;
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
            PcReport: res,
            color_state,
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
        <div class="summary_title">前列腺癌风险评估</div>
        <div class="obesity obesitys">
          <p> 前列腺癌是男性生殖系统最常见的恶性肿瘤，近年来发病率呈迅速上升趋势，其发病率和死亡率仅次于肺癌，居癌症死亡的第二位。前列腺癌发病缓慢，不易发现。早期评估前列腺癌发病风险，对风险因素及时控制，可延缓和减少患病率及死亡率。</p>
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
        <div style={style} >
          <div class="Result stroke">
            <div class="resule_in">
              <Identification></Identification>
              <img src={require("static/images/in.png")} alt="" class="resule_in_img"/>
            </div>
          </div>

          <div class="summary_name_title up diabetes">
            
            <span class="summary_name_title_subtitles">您前列腺癌的风险等级:</span>
          </div>
          <div class="grade">
              <span class={color_state}>{this.state.PcReport.riskLevel}</span>
          </div>
          <div class="summary_name_title up diabetes">
            
            <span class="summary_name_title_subtitles">当前风险</span>
          </div>
          <div class="obesity">
            <p>{this.state.PcReport.relaRisk}</p>
          </div>
          <div class="summary_name_title up diabetes">
            
            <span class="summary_name_title_subtitles">理想风险</span>
          </div>
          <div class="obesity">
            <p>{this.state.PcReport.ideRisk}</p>
          </div>
        </div>
        <div style={styletwo} class="BeIll">
          <div class="isBeIll">
            <img src={require("static/images/Prostate.png")} alt=""/>
          </div>
          <div class="summary_name_title up diabetes">
            <span class="summary_name_title_subtitles">您已是：<span style={{color:"#ff6666"}}>前列腺患者</span></span>
          </div>
          <div class="obesity">
            <p>{this.state.PcReport.relaRisk}</p>
          </div>
        </div>
        <div style={stylethree} class="BeIll">
          <div class="isBeIll">
            <img src={require("static/images/Prostate.png")} alt=""/>
          </div>
          <div class="summary_name_title up diabetes">
            <span class="summary_name_title_subtitles">您前列腺癌的风险等级：<span style={{color:"#ff6666"}}>{this.state.PcReport.riskLevel}</span></span>
          </div>
          <div class="obesity">
            <p>{this.state.PcReport.relaRisk}</p>
          </div>
        </div>
        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">预防要点</span>
        </div>
        <ul className="obesity" style={{padding:'0.3rem 0.3rem 0.6rem 0.3rem'}}>
          <li><i></i><p>饮食因素可以使患前列腺癌的危险增高。多项研究显示，高脂饮食会刺激前列腺癌生长；水果和蔬菜及低脂饮食有助于降低患前列腺癌的危险。平素注意多食用新鲜的蔬菜水果，不要过量饮酒。</p></li>
          <li><i></i><p>大豆含有植物雌激素，在饮食剂量条件下（正常食物中所包含的剂量，而并不是补充剂量）可以降低患前列腺癌的危险。</p></li>
          <li><i></i><p>避免久坐、规律运动、不要长时间憋尿。</p></li>
          <li><i></i><p>避免滥用壮阳药物，不要滥用抗菌药物(抗生素)。</p></li>
          <li><i></i><p>注意情志疏导，保持愉快的心情。</p></li>
        </ul>
      </div>
    )
  }
}