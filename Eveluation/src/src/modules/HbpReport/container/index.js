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
  key: "hbpFamilyHistory"
}, {
  project: '',
  key: "sbp"
}, {
  project: '',
  key: "dbp"
}, {
  project: '',
  key: "bmi"
}, {
  project: '',
  key: "smokeStatus"
}, {
  project: '',
  key: "drunkStatus"
}, {
  project: '',
  key: "highSaltHabit"
}, {
  project: '',
  key: "psychologicStatus"
}];

var ideal, current

export default class HbpReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      HbpReport: [],
      goods: [],
      color_state: "",
      up_down: true,
      style: {},
      styletwo: {},
      stylethree: {},
      "th_props": [{
        th_width: "25%",
        th_name: "危险因素",
      }, {
        th_width: "25%",
        th_name: "本次",
      }, {
        th_width: "25%",
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
      if (result.reportMap != undefined) {
        if (result.reportMap.HbpReport != undefined) {
          var res = result.reportMap.HbpReport;
          let state = res.riskLevel
          let color_state = "";
          let style, styletwo, stylethree
          if (state == '') {} else if (state == "低风险") {
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
          } else if (res.isAbnormal == false) {
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

              data: ['理想风险', '未来1年', '未来2年', '未来4年'],
              //   axisLabel: {
              //     interval: 0,
              //     rotate: 20
              // }

            }],
            yAxis: [{
              type: 'value',
              name: "单位：%"
            }],
            series: [{
              name: '2010',
              type: 'bar',
              itemStyle: itemStyle,
              data: [res.ideAbs, res.hbponeyear, res.hbptwoyear, res.hbpfouryear]
            }]
          });
          _this.setState({
            HbpReport: res
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
        <div class="summary_title">高血压风险评估</div>
        <div class="obesity obesitys">
          <p>根据2015年国家调查数据统计，我国成人高血压患病率已达到28%，并且还在不断增长。中国每年350 万人死于心血管病，其中58% 与高血压有关；血压水平升高20/10mmHg,  心血管危险会增加1倍。控制高血压相关的危险因素可有效降低患病风险。</p>
        </div>
        <div class="summary_name_title">

          <span class="summary_name_title_subtitle">危险因素</span>
        </div>
        <div class="summary_table one Results ">

          <TableList todos={dataList} up_down={up_down} th_props={th_props} ></TableList>
        </div>

        <div class="summary_name_title">

          <span class="summary_name_title_subtitle">评估结果</span>
        </div>
        <div style={style}>
          <div id="diabetes"></div>
          <div class="summary_name_title up diabetes">

            <span class="summary_name_title_subtitles">您患高血压的风险等级</span>
          </div>
          <div class="grade">
            <span  class={color_state}>{this.state.HbpReport.riskLevel}</span>
          </div>
          <div class="summary_name_title up diabetes">

            <span class="summary_name_title_subtitles">当前风险</span>
          </div>
          <div class="obesity">
            <p>{this.state.HbpReport.relaRisk}</p>
          </div>
          <div class="summary_name_title up diabetes">

            <span class="summary_name_title_subtitles">理想风险</span>
          </div>
          <div class="obesity">
            <p>{this.state.HbpReport.ideRisk}</p>
          </div>
        </div>
        <div style={styletwo} class="BeIll">
          <div class="isBeIll">
            <img src={require("static/images/hypertension.png")} alt=""/>
          </div>
          <div class="summary_name_title up diabetes">
            <span class="summary_name_title_subtitles">您已是：<span style={{color:"#ff6666"}}>高血压患者</span></span>
          </div>
          <div class="obesity">
            <p>{this.state.HbpReport.relaRisk}</p>
          </div>
        </div>

        <div style={stylethree} class="BeIll">
          <div class="isBeIll">
            <img src={require("static/images/DM.png")} alt=""/>
          </div>
          <div class="summary_name_title up diabetes">
            <span class="summary_name_title_subtitles">您患高血压的风险等级:<span style={{color:"#ff6666"}}>{this.state.HbpReport.riskLevel}</span></span>
          </div>
          <div class="obesity">
            <p>{this.state.HbpReport.relaRisk}</p>
          </div>
        </div>
        <div class="summary_name_title">

          <span class="summary_name_title_subtitle">预防要点</span>
        </div>
        <ul className="obesity" style={{ padding: '0.3rem 0.3rem 0.6rem 0.3rem' }}>
          <li><i></i><p>倡导合理膳食、适量运动、戒烟限酒、心理平衡的生活方式，降低高血压的患病风险。</p></li>

          <li><i></i><p>控制每日食盐摄入量不超过6克，可使平均血压下降2-8mmHg。</p></li>

          <li><i></i><p>通过合理膳食，控制每日摄入总热量，规律运动，保持体重在理想水平。</p></li>

          <li><i></i><p>不过量饮酒。</p></li>

          <li><i></i><p>35岁以上成年人至少每2年测一次血压；有高血压风险者，至少每6个月测一次血压。</p></li>
        </ul>
      </div>
    )
  }
}