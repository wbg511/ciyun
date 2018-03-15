import React, {
  Component
} from "react";
import {
  Toast
} from 'antd-mobile';
import common from '../../common/common';
import ReportShare from '../../common/reportShare';
import TableList from '../../common/tableList';

import echarts from 'echarts/lib/echarts';
// 引入折现图
import '../../../../node_modules/echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import '../style/index';

var dataList, json

dataList = [{
  project: '',
  key: "age"
}, {
  project: '',
  key: "diabFamilyHistory"
}, {
  project: '',
  key: "hbpHistory"
}, {
  project: '',
  key: "bmi"
}, {
  project: '',
  key: "waistLine"
}, {
  project: '',
  key: "hdlc"
}, {
  project: '',
  key: "trig"
}, {
  project: '',
  key: "fastingBg"
}, {
  project: '',
  key: "smokeStatus"
}, {
  project: '',
  key: "sportLevel"
}, {
  project: '',
  key: "vegetableIntake"
}, {
  project: '',
  key: "antidepressant"
}, {
  project: '',
  key: "cortisone"
}, {
  project: '',
  key: "pcos"
}];

var ideal, current

export default class DiabReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      DiabReport: [],
      goods: [],
      color_state: "",
      style: {},
      styletwo: {},
      stylethree: {},
      up_down: true,
      "th_props": [{
        th_width: "28%",
        th_name: "危险因素",
      }, {
        th_width: "25%",
        th_name: "本次",
      }, {
        th_width: "25%",
        th_name: "上次",
      }, {
        th_width: "29%",
        th_name: "参考范围",
      }, ]
    }
  }

  componentDidMount() {
    let _this = this;
    common.getAxios("/personHealthRisk/load", this.props.location.state, function(result) {
      if (result.questionaireMap != undefined) {
        if (result.reportMap.DiabReport != undefined) {
          var res = result.reportMap.DiabReport;
          let state = res.riskLevel
          let color_state = "";
          let style, styletwo, stylethree
          if (state == "低风险") {
            color_state = "stateo"
          } else if (state == "较低风险") {
            color_state = "stateb"
          } else if (state == "中等风险") {
            color_state = "statec"
          } else {
            color_state = "stated"
          }
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
            color_state: color_state,
            style: style,
            styletwo: styletwo,
            stylethree: stylethree
          })
          dataList.forEach(function(value, index, array) {
            value.project = res[value.key]
          })
          var zrColor = require('zrender/lib/tool/color');
          var colorList = [
            '#ff7f50', '#87cefa'
          ];
          var itemStyle = {
            normal: {
              color: function(params) {
                if (params.dataIndex < 0) {
                  // for legend
                  return zrColor.lift(
                    colorList[colorList.length - 1], params.seriesIndex * 0.1
                  );
                } else {
                  // for bar
                  return zrColor.lift(
                    colorList[params.dataIndex], params.seriesIndex * 0.1
                  );
                }
              },
              label: {
                show: true,
                position: 'top'
              }
            }
          };
          var diabetes = echarts.init(document.getElementById('diabetes'));
          // 绘制图表柱状图
          diabetes.setOption({
            grid: {
              top: 30,
              left: 10,
              right: 10,
              bottom: 10,
              containLabel: true
            },
            calculable: true,
            xAxis: [{
              type: 'category',
              data: ['理想风险', '当前风险']
            }],
            yAxis: [{
              type: 'value',
              name: "单位：‰"
            }],
            series: [{
              name: '2010',
              type: 'bar',
              itemStyle: itemStyle,
              data: [res.ideAbs, res.relaAbs]
            }]
          });
          _this.setState({
            DiabReport: res
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
        <div class="summary_title">糖尿病风险评估</div>
        <div class="obesity obesitys">
          <p>我国是糖尿病大国，患病人数为全球之冠。根据2013年中华医学会糖尿病学分会公布的调查结果，我国30岁以上人群中糖尿病患病率已达11.6%，且糖尿病前期（IGT）患病率达到50.1%。降低糖尿病患病风险成为国人健康的重中之重。</p>
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
          <div id="diabetes"></div>
          <div class="summary_name_title up diabetes">
            <span class="summary_name_title_subtitles">您患糖尿病的风险等级</span>
          </div>
          <div class="grade">
            <span class={color_state}>{this.state.DiabReport.riskLevel}</span>
          </div>
          <div class="summary_name_title up diabetes">

            <span class="summary_name_title_subtitles">当前风险</span>
          </div>
          <div class="obesity">
            <p>{this.state.DiabReport.relaRisk}</p>
          </div>
          <div class="summary_name_title up diabetes">

            <span class="summary_name_title_subtitles">理想风险</span>
          </div>
          <div class="obesity">
            <p>{this.state.DiabReport.ideRisk}</p>
          </div>
        </div>
        <div style={styletwo} class="BeIll">
          <div class="isBeIll">
            <img src={require("static/images/DM.png")} alt=""/>
          </div>
          <div class="summary_name_title up diabetes">
            <span class="summary_name_title_subtitles">您已是：<span style={{color:"#ff6666"}}>{this.state.DiabReport.riskLevel}</span></span>
          </div>
          <div class="obesity">
            <p>{this.state.DiabReport.relaRisk}</p>
          </div>
        </div>
        <div style={stylethree} class="BeIll">
          <div class="isBeIll">
            <img src={require("static/images/DM.png")} alt=""/>
          </div>
          <div class="summary_name_title up diabetes">
            <span class="summary_name_title_subtitles">您患糖尿病的风险等级：<span style={{color:"#ff6666"}}>{this.state.DiabReport.riskLevel}</span></span>
          </div>
          <div class="obesity">
            <p>{this.state.DiabReport.relaRisk}</p>
          </div>
        </div>
        <div class="summary_name_title">

          <span class="summary_name_title_subtitle">预防要点</span>
        </div>
        <ul className="obesity" style={{ padding: '0.3rem 0.3rem 0.6rem 0.3rem' }}>
          <li><i></i><p>倡导合理膳食、适量运动、戒烟限酒、心理平衡的生活方式，降低糖尿病的患病风险。</p></li>

          <li><i></i><p>控制体重，保持BMI和腰围在理想范围。</p></li>

          <li><i></i><p>持续规律的运动习惯，并注意肌肉训练，可提高胰岛素的敏感性，改善糖代谢水平。</p></li>

          <li><i></i><p>有糖尿病风险者，至少每年去医院做一次静脉血的空腹血糖和/或口服葡萄糖耐量测定。</p></li>
        </ul>
      </div>
    )
  }
}