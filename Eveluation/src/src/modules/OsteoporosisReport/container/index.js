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
  key: "fractureHistory"
}, {
  project: '',
  key: "raHistory"
}, {
  project: '',
  key: "opHistory"
}, {
  project: '',
  key: "cortisone"
}, {
  project: '',
  key: "smokeStatus"
}, {
  project: '',
  key: "drunkStatus"
}, {
  project: '',
  key: "bmi"
}, {
  project: '',
  key: "illuminationTime"
}];


var ideal, current

export default class OsteoporosisReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      OsteoporosisReport: [],
      goods: [],
      up_down: false,
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
      if (result.questionaireMap != undefined) {
        if (result.reportMap.OsteoporosisReport != undefined) {
          var res = result.reportMap.OsteoporosisReport;
          dataList.forEach(function(value, index, array) {
            value.project = res[value.key]
          })
          var zrColor = require('zrender/lib/tool/color');
          var colorList = [
            '#ff7f50', '#87cefa'
          ];
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
            style: style,
            styletwo: styletwo,
            stylethree: stylethree
          })

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
              data: ['主要部位骨折风险', '髋部骨折风险']
            }],
            yAxis: [{
              type: 'value',
              name: "单位：%"
            }],
            series: [{
              name: '2010',
              type: 'bar',
              itemStyle: itemStyle,
              data: [res.majorFracture, res.hipFracture]
            }]
          });
          _this.setState({
            OsteoporosisReport: res
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
      style,
      styletwo,
      stylethree
    } = this.state;
    return (
      <div class="app-bd">
      <ReportShare gender={this.props.location.state.gender} />
        <div class="summary_title">骨质疏松风险评估</div>
        <div class="obesity obesitys">
          <p>骨质疏松症（osteoporosis）是由于多种原因导致的骨密度和骨质量下降，骨微结构破坏，造成骨脆性增加的全身性骨病。随着人口的老龄化，骨质疏松症已经成为世界范围的、越来越引起人们重视的健康问题，其发病率已跃居常见病、多发病的第四位。骨质疏松患者容易骨折，给健康和生活带来严重影响，所以正确认识、早期诊断、早期预防显得尤为重要。</p>
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
          <div id="diabetes"></div>
          <div class="summary_name_title up diabetes">
            
            <span class="summary_name_title_subtitles">当前的骨密度检查指标Ｔ值：{this.state.OsteoporosisReport.tscore}</span>
          </div>
          <div class="summary_name_title up diabetes">
            
            <span class="summary_name_title_subtitles">主要部位骨折的风险</span>
          </div>
          <div class="obesity">
            <p>{this.state.OsteoporosisReport.majorFractureRisk}</p>
          </div>
          <div class="summary_name_title up diabetes">
            
            <span class="summary_name_title_subtitles">髋部骨折的风险</span>
          </div>
          <div class="obesity">
            <p>{this.state.OsteoporosisReport.hipFractureRisk}</p>
          </div>
        </div>
        <div style={styletwo} class="BeIll">
          <div class="isBeIll">
            <img src={require("static/images/osteoporosis.png")} alt=""/>
          </div>
          <div class="summary_name_title up diabetes">
            <span class="summary_name_title_subtitles">您已是：<span style={{color:"#ff6666"}}>骨质疏松患者</span></span>
          </div>
          <div class="obesity">
            <p>{this.state.OsteoporosisReport.relaRisk}</p>
          </div>
        </div>
        <div style={stylethree} class="BeIll">
          <div class="isBeIll">
            <img src={require("static/images/DM.png")} alt=""/>
          </div>
          <div class="summary_name_title up diabetes">
            <span class="summary_name_title_subtitles">当前的骨密度检查指标Ｔ值：<span style={{color:"#ff6666"}}>{this.state.OsteoporosisReport.tscore}</span></span>
          </div>
          <div class="obesity">
            <p>{this.state.OsteoporosisReport.relaRisk}</p>
          </div>
        </div>
        <div class="summary_name_title">
          <span class="summary_name_title_subtitle">预防要点</span>
        </div>
        <ul className="obesity"  style={{padding:'0.3rem 0.3rem 0.6rem 0.3rem'}}>
          <li><i></i><p>运动：多种类型的运动有助于骨量的维持，还能提高灵敏度以及平衡能力，减少摔倒几率。　</p></li>

          <li><i></i><p>营养：良好的营养对于预防骨质疏松症具有重要意义，包括足量的钙、维生素D、维生素C以及蛋白质。从儿童时期起，日常饮食应有足够的钙摄入，钙影响骨峰值的获得。欧美学者们主张钙摄入量成人为800～1，000mg，绝经后妇女每天1，000～1，500mg，65岁以后男性以及其他具有骨质疏松症危险因素的患者，推荐钙的摄入量为1500mg/天。维生素D的摄入量为400～800U/天。　</p></li>

          <li><i></i><p>预防摔跤：尽量减少骨质疏松症患者摔倒几率，以减少髋骨骨折以及Colles骨折。</p></li>

          <li><i></i><p>保持充足的阳光接触：充足的阳光照射皮肤可增加自身维生素D的转化，有助于维持骨质密度。</p></li>
        </ul>
      </div>
    )
  }
}