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
// 引入柱状图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import '../style/index';

const dataList = [{
  project: '',
  key: 'height'
}, {
  project: '',
  key: 'weight'
}, {
  project: '',
  key: 'bmi'
}, {
  project: '',
  key: 'waistLine'
}, {
  project: '',
  key: 'fatRate'
}, {
  project: '',
  key: 'visceralFatRate'
}, {
  project: '',
  key: 'bp'
}, {
  project: '',
  key: 'fastingBg'
}, {
  project: '',
  key: 'bloodSuger'
}, {
  project: '',
  key: 'chol'
}, {
  project: '',
  key: 'trig'
}, {
  project: '',
  key: 'ldlc'
}, {
  project: '',
  key: 'hdlc'
}, {
  project: '',
  key: 'ua'
}, {
  project: '',
  key: 'homocysteine'
}, {
  project: '',
  key: 'hs_CRP'
}, {
  project: '',
  key: 'microalbumin'
}, {
  project: '',
  key: 'pro'
}, {
  project: '',
  key: 'tscore'
}];

export default class MajorPhysiologyIndicatorsReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      MajorPhysiologyIndicatorsReport: [],
      goods: [],
      up_down: true,
      "th_props": [{
        th_width: "29%",
        th_name: "项目",
      }, {
        th_width: "18%",
        th_name: "本次",
      }, {
        th_width: "18%",
        th_name: "上次",
      }, {
        th_width: "39%",
        th_name: "参考范围",
      }, ]
    }
  }
  // 点击收起展开操作回调
  up_down() {
    var {
      up_down
    } = this.state;
    this.setState({
      up_down: !up_down
    });
  }
  componentDidMount() {
    //获取主要生理指标数据
    let _this = this;
    common.getAxios("/personHealthRisk/load", this.props.location.state, function(result) {
      if (result.reportMap != undefined) {
        if (result.reportMap.MajorPhysiologyIndicatorsReport != undefined) {
          var res = result.reportMap.MajorPhysiologyIndicatorsReport;
          dataList.forEach(function(value, index, array) {
            if (res[value.key] == undefined) {
              return
            } else {
              value.project = res[value.key]
            }

          })
          var weights = []
          var weight_time = [];
          for (var i = 0; i < res.weightTrend.length; i++) {
            weights.push(res.weightTrend[i].weight)
            weight_time.push(new Date(res.weightTrend[i].time).toLocaleDateString())
          }
          var weight = echarts.init(document.getElementById('weight'));
          // 绘制图表体重
          weight.setOption({
            tooltip: {
              trigger: 'axis'
            },
            color: ["#ff9900"],
            legend: {
              data: ['体重'],
              itemWidth: 20,
              itemHeight: 10,
              itemGap: 10,
              right: '4%',
              textStyle: {
                fontSize: 14,
                color: '#666666'
              }
            },
            grid: {
              top: 30,
              left: 20,
              bottom: 10,
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: weight_time
            },
            yAxis: {
              type: 'value',
              name: '单位：kg'
            },
            series: {
              name: '体重',
              type: 'line',
              stack: '总量',
              data: weights
            }
          });

          var sbp = []
          var dbp = [];
          var bp_time = []
          for (var i = 0; i < res.bpTrend.length; i++) {
            dbp.push(res.bpTrend[i].dbp)
            sbp.push(res.bpTrend[i].sbp)
            bp_time.push(new Date(res.bpTrend[i].time).toLocaleDateString())
          }
          //绘制图表血压
          var blood_pressure = echarts.init(document.getElementById('blood_pressure'));
          blood_pressure.setOption({
            tooltip: {
              trigger: 'axis'
            },
            color: ["#ff6666", '#8dd8ca'],
            legend: {
              data: ['收缩压', '舒张压'],
              right: 10,
              textStyle: {
                fontSize: 14,
                color: '#666666'
              }
            },
            grid: {
              top: 30,
              left: 20,
              bottom: 10,
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: bp_time
            },
            yAxis: {
              type: 'value',
              name: '单位：mmHg'
            },
            series: [{
              name: '收缩压',
              type: 'line',
              data: sbp
            }, {
              name: '舒张压',
              type: 'line',
              data: dbp
            }]
          });

          var fastingBg = []
          var bloodSuger = [];
          var bg_time = []
          for (var i = 0; i < res.bpTrend.length; i++) {
            fastingBg.push(res.bgTrend[i].fastingBg)
            bloodSuger.push(res.bgTrend[i].bloodSuger)
            bg_time.push(new Date(res.bgTrend[i].time).toLocaleDateString())
          }
          //绘制图表血糖
          var GIs = echarts.init(document.getElementById('GIs'));
          GIs.setOption({
            tooltip: {
              trigger: 'axis'
            },
            color: ['#6fba2c', '#ff99cc'],
            legend: {
              data: ['空腹', '餐后2h'],
              right: 10,
              textStyle: {
                fontSize: 14,
                color: '#666666'
              }
            },
            grid: {
              top: 30,
              left: 40,
              bottom: 10,
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: bg_time
            },
            yAxis: {
              type: 'value',
              name: '单位：mmHg'
            },
            series: [{
              name: '空腹',
              type: 'line',
              data: fastingBg
            }, {
              name: '餐后2h',
              type: 'line',
              data: bloodSuger
            }]
          });

          var chol = []
          var hdlc = [];
          var ldlc = []
          var trig = []
          var bfT_time = []
          for (var i = 0; i < res.bfTrend.length; i++) {
            chol.push(res.bfTrend[i].chol)
            hdlc.push(res.bfTrend[i].hdlc)
            ldlc.push(res.bfTrend[i].ldlc)
            trig.push(res.bfTrend[i].trig)
            bfT_time.push(new Date(res.bfTrend[i].time).toLocaleDateString())
          }
          //绘制图表血脂
          var fat = echarts.init(document.getElementById('fat'));
          fat.setOption({
            tooltip: {
              trigger: 'axis'
            },
            color: ['#ff9900', '#66cccc', '#6fba2c', '#ff99cc'],
            legend: {
              data: ['总胆固醇', '低密度脂蛋白胆固醇', '甘油三酯', '高密度脂蛋白胆固醇'],
              right: 0,
              width: 270,
              size: 10,
              textStyle: {
                fontSize: 12,
                color: '#666666'
              }
            },
            grid: {
              top: 50,
              left: 40,
              bottom: 10,
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: bfT_time
            },
            yAxis: {
              type: 'value',
              name: '单位：mmol/L'
            },
            series: [{
              name: '总胆固醇',
              type: 'line',
              data: chol
            }, {
              name: '低密度脂蛋白胆固醇',
              type: 'line',
              data: ldlc
            }, {
              name: '甘油三酯',
              type: 'line',
              data: trig
            }, {
              name: '高密度脂蛋白胆固醇',
              type: 'line',
              data: hdlc
            }]
          });

          _this.setState({
            MajorPhysiologyIndicatorsReport: res
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
      th_props
    } = this.state;
    return (
      <div class="app-bd" style={{ height: this.state.height + 'px' }}>
        <ReportShare gender={this.props.location.state.gender} />
        <div class="summary_title">主要生理指标</div>
        <div class="summary_name_title">

          <span class="summary_name_title_subtitle">主要指标结果</span>
          <span class="summary_name_title_"></span>
        </div>
        <div class="summary_table one">
          <TableList todos={dataList} up_down={up_down} th_props={th_props}></TableList>
        </div>
        <div class="summary_name">
          <div class="summary_name_title">

            <span class="summary_name_title_subtitle">重要指标变化趋势（图）</span>
            <span class="summary_name_title_"></span>
          </div>
          <div class="summary_name_centent two">
            <div class="summary_name_centent_title" style={{ "backgroundPosition": ".25rem .33rem" }}>
              <span class="summary_name_title_subtitles">体重</span>
            </div>
            <div id="weight"></div>

            <div class="summary_name_centent_title" style={{ "backgroundPosition": ".25rem .33rem" }}>

              <span class="summary_name_title_subtitles">血压</span>
            </div>
            <div id="blood_pressure"></div>


            <div class="summary_name_centent_title" style={{ "backgroundPosition": ".25rem .33rem" }}>

              <span class="summary_name_title_subtitles">血糖</span>
            </div>
            <div id="GIs"></div>
            <div class="summary_name_centent_title" style={{ "backgroundPosition": ".25rem .33rem" }}>

              <span class="summary_name_title_subtitles">血脂</span>
            </div>
            <div id="fat"></div>
          </div>
        </div>
      </div>
    )
  }
}