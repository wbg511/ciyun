import React, {
  Component
} from "react";
import {
  Toast,
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

var dataList, json

dataList = [{
  project: '',
  key: "age"
}, {
  project: '',
  key: "diab"
}, {
  project: '',
  key: "bmi"
}, {
  project: '',
  key: "chol"
}, {
  project: '',
  key: "sbp"
}, {
  project: '',
  key: "smokeStatus"
}];


var ideal, current

export default class CvdReport extends Component {
  constructor(props) {
    super(props)
    this.aa = {}
    this.state = {
      CvdReport: [],
      goods: [],
      color_state: "",
      style: {},
      styletwo: {},
      stylethree: {},
      "th_props": [{
        th_width: "31%",
        th_name: "危险因素",
      }, {
        th_width: "22%",
        th_name: "本次",
      }, {
        th_width: "22%",
        th_name: "上次",
      }, {
        th_width: "25%",
        th_name: "参考范围",
      }, ]
    }
  }

  componentDidMount() {
    let _this = this;
    common.getAxios("/personHealthRisk/load", this.props.location.state, function(result) {
      if (result.questionaireMap != undefined) {
        if (result.reportMap.CvdReport != undefined) {
          var res = result.reportMap.CvdReport;
          let state = res.riskLevel
          let color_state = "";
          let style, styletwo, stylethree
          if (state == "低风险") {
            color_state = "stateo"
          } else if (state == "较低风险") {
            color_state = "stateb"
          } else if (state == "中等风险") {
            color_state = "statec"
          } else if (state == "高风险") {
            color_state = "stated"
          } else {}
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
          // 绘制图表
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
              name: "单位：%"
            }],
            series: [{
              name: '2010',
              type: 'bar',
              itemStyle: itemStyle,
              data: [res.ideAbs, res.relaAbs]
            }]
          });
          _this.setState({
            CvdReport: res
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
      th_props,
      color_state,
      style,
      styletwo,
      stylethree
    } = this.state;
    return (
      <div class="app-bd">
        <ReportShare gender={this.props.location.state.gender} />
        <div class="summary_title">缺血性心血管病风险评估</div>
        <div class="obesity obesitys">
          <p>缺血性心血管病是由于动脉粥样硬化，高脂血症，或血栓形成而导致的心脑血供不足所引起的疾病，如冠心病、脑供血不足及脑卒中、外周血管病等，致残率高，对生命质量影响极大。监控并改状况相关危险因素，可有效降低发病风险。</p>
        </div>
        <div class="summary_name_title">

          <span class="summary_name_title_subtitle">危险因素</span>
        </div>
        <div class="summary_table one Results ">

          <TableList todos={dataList} up_down={false} th_props={th_props}></TableList>
        </div>

        <div class="summary_name_title">
          <span class="summary_name_title_subtitle">评估结果</span>
        </div>
        <div style={style}>
          <div id="diabetes"></div>
          <div class="summary_name_title up diabetes">
            
            <span class="summary_name_title_subtitles">您患缺血性心血管病的风险等级</span>
          </div>
          <div class="grade">
              <span class={color_state}>{this.state.CvdReport.riskLevel}</span>
          </div>
          <div class="summary_name_title up diabetes">
            
            <span class="summary_name_title_subtitles">当前风险</span>
          </div>
          <div class="obesity">
            <p>{this.state.CvdReport.relaRisk}</p>
          </div>
          <div class="summary_name_title up diabetes">
            
            <span class="summary_name_title_subtitles">理想风险</span>
          </div>
          <div class="obesity">
            <p>{this.state.CvdReport.ideRisk}</p>
          </div>
        </div>
        <div style={styletwo} class="BeIll">
          <div class="isBeIll">
            <img src={require("static/images/CVD.png")} alt=""/>
          </div>
          <div class="summary_name_title up diabetes">
            <span class="summary_name_title_subtitles">您已是：<span style={{color:"#ff6666"}}>缺血性心血管病患者</span></span>
          </div>
          <div class="obesity">
            <p>{this.state.CvdReport.relaRisk}</p>
          </div>
        </div>
        <div style={stylethree} class="BeIll">
          <div class="isBeIll">
            <img src={require("static/images/DM.png")} alt=""/>
          </div>
          <div class="summary_name_title up diabetes">
            <span class="summary_name_title_subtitles">您患缺血性心血管病的风险等级:<span style={{color:"#ff6666"}}>{this.state.CvdReport.riskLevel}</span></span>
          </div>
          <div class="obesity">
            <p>{this.state.CvdReport.relaRisk}</p>
          </div>
        </div>
        <div class="summary_name_title">

          <span class="summary_name_title_subtitle">预防要点</span>
        </div>
        <ul className="obesity" style={{ padding: '0.3rem 0.3rem 0.6rem 0.3rem' }}>
          <li><i></i><p>合理膳食，控制每日摄入总热量，减低脂肪摄入，使体重、腰围控制在合适范围。</p></li>

          <li><i></i><p>适当体力活动，规律运动锻炼，提倡每日进行轻至中等强度体力活动30-40分钟。</p></li>

          <li><i></i><p>不吸烟或不被动吸烟，尽量远离污染。</p></li>

          <li><i></i><p>注意血压、血脂的控制和调节，必要时在医生指导下药物治疗。</p></li>

          <li><i></i><p>定期测量体重、腰围、血糖、血压；定期复查空腹血糖、血脂、血尿酸等项目，把握指标变化趋势。</p></li>
        </ul>
      </div>
    )
  }
}