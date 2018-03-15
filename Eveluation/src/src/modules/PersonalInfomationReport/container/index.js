import React, {
  Component
} from "react";
import {
  Link,
  IndexLink,
  hashHistory,
  Router,
  Route
} from "react-router";
import common from '../../common/common';
import qs from "qs";
import $ from "jquery";
import {
  Toast
} from 'antd-mobile';
import '../style/index';


var parameters = {}
const disease = [{
  name: "肥胖症评估",
  avartar: "",
  Jump: "/ObesityReport",
  key: "fatAssess"
}, {
  name: "糖尿病风险评估",
  avartar: "",
  Jump: "/DiabReport",
  key: "diabAssess"

}, {
  name: "高血压风险评估",
  avartar: "",
  Jump: "/HbpReport",
  key: "hbpAssess"
}, {
  name: "缺血性心血管病风险评估",
  avartar: "",
  Jump: "/CvdReport",
  key: "cvdAssess"
}, {
  name: "脑卒中风险评估",
  avartar: "",
  Jump: "/StrokeReport",
  key: "strokeAssess"
}, {
  name: "骨质疏松性骨折风险评估",
  avartar: "",
  Jump: "/OsteoporosisReport",
  key: "opAssess"
}, {
  name: "代谢综合征风险评估",
  avartar: "",
  Jump: "/MetabolicSyndromeReport",
  key: "msAssess"
}, {
  name: "抑郁症风险评估",
  avartar: "",
  Jump: "/DepressionReport",
  key: "depressionAssess"
}, {
  name: "睡眠呼吸暂停风险评估",
  avartar: "",
  Jump: "/SasReport",
  key: "apneaAssess"
}, {
  name: "血脂异常风险评估",
  avartar: "",
  Jump: "/DyslipidemiaReport",
  key: "bloodFatAssess"
}]
const tumour = [{
  name: "肺癌",
  avartar: "",
  key: 'lungCancerRisk',
  Jump: "/LungCancerReport"
}, {
  name: "前列腺癌",
  avartar: "",
  key: 'prostateRisk',
  Jump: "/PcReport"
}]
class DiseaseMain extends Component {
  render() {
    return (<table>
      <tbody>
        {
          this.props.todos.map(function (item, index) {
            var reportKeys = item.Jump.substring(1, item.Jump.length)
            var type = "" // 定义样式类型
            var path = {
              pathname: item.Jump,
              state: {
                "personId": parameters.personId,
                "evaluationId": parameters.evaluationId,
                "gender": parameters.gender,
                "reportKey": reportKeys
              }
            }
            if (item.avartar == '较低风险' || item.avartar == '低风险' || item.avartar == "没有抑郁症" || item.avartar == '暂无风险' || item.avartar == '低危' || item.avartar == "低危人群" || item.avartar == '体重偏低' || item.avartar == "正常" || item.avartar == "没有明显风险" || item.avartar == "暂无风险" || item.avartar == "低运动风险" || item.avartar == "没有抑郁症" || item.avartar == "体重偏低" || item.avartar == "腰围正常") {
              type = "low";
            } else if (item.avartar == "中等风险"|| item.avartar == "中危"|| item.avartar == "中度运动风险" || item.avartar == "可能有轻度抑郁倾向" || item.avartar == '可能有中度抑郁倾向'|| item.avartar == "中心性肥胖1级" || item.avartar == "中危人群" || item.avartar == "中危") {
              type = "in";
            } else{
              type = "high";
            }
            if(item.key == 'prostateRisk' && parameters.gender!= "1"){ //当用户是女性的时候没有前列腺这一项
               return null;
            }
            return <tr key={index}>
              <td width='40%'>{item.name}</td>
              <td>
                <div class={type}>{item.avartar}</div>
                <Link to={path}>
                  <div>详情 &gt;</div>
                </Link>
              </td>
            </tr>
          })}
      </tbody>
    </table>)
  }
}
export default class PersonalInfomationReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      PersonalInfomationReport: "",
      marriage: '',
      gender: this.props.location.query.gender,
      personId: this.props.location.query.personId,
      evaluationId: this.props.location.query.evaluationId,
      reportKey: this.props.location.query.reportKey
    }
  }
  //获取个人健康信息汇总
  getPersonalInfomationReport() {
    let _this = this;
    parameters = {
      "personId": this.state.personId,
      "evaluationId": this.state.evaluationId,
      "gender": this.state.gender,
      "reportKey": this.state.reportKey
    }
    common.getAxios("/personHealthRisk/load", parameters, function(result) {
      if (result.reportMap != undefined) {
        if (result.reportMap.PersonalInfomationReport != undefined) {
          var res = result.reportMap.PersonalInfomationReport;
          disease.forEach(function(value, index, array) {
            value.avartar = res[value.key];
          })
          tumour.forEach(function(value, index, array) {
            
            value.avartar = res[value.key];
          })
          var marriage = ''
          if (result.reportMap.PersonalInfomationReport.marriage == '1') {
            marriage = '未婚'
          } else {
            marriage = '已婚(含同居)'
          }

          _this.setState({
            PersonalInfomationReport: result.reportMap.PersonalInfomationReport,
            marriage: marriage
          })

        } else {
          Toast.fail(response.data.msg, 3, '', true);
        }
      } else {
        Toast.fail(response.data.msg, 3, '', true);
      }
    })
  };
  //跳转到其他2级报告界面
  //这里是参数放state里面 如果是state 2级报告界面用 this.props.location.state 获取
  //如果2级报告可以直接访问 就必须要放query url参数里面也行 this.props.location.query 获取
  goToReport(path) {
    hashHistory.push({
      pathname: path,
      state: {
        "personId": this.state.personId,
        "evaluationId": this.state.evaluationId,
        "gender": this.state.gender,
        "reportKey": path,
      }
    })
  }
  componentDidMount() {
    switch (this.props.location.query.gender) {
      case "1":
        common.title('个人健康风险评估报告（男）');
        break;
      case "2":
        common.title('个人健康风险评估报告（女）');
        break;
      default:
        common.title('个人健康风险评估报告');
    }
    this.getPersonalInfomationReport();
    common.reportShare(this.props.location.query.gender);
  }
  render() {
    return (
      <div class="app-doc">
        {common.appShare(this.props.location.query.gender)}
        <div class="app-bd">
          <div class="summary_title">个人健康信息汇总</div>
          <div class="summary_table" style={{ padding: '0 0.3rem 0.6rem 0.3rem' }}>
            <table class="table">
              <tbody>
                <tr>
                  <td>姓名</td>
                  <td>{this.state.PersonalInfomationReport.name}</td>
                  <td>性别</td>
                  <td>{this.state.PersonalInfomationReport.gender}</td>
                </tr>
                <tr>
                  <td>年龄</td>
                  <td>{this.state.PersonalInfomationReport.age}</td>
                  <td>婚否</td>
                  <td>{this.state.marriage}</td>
                </tr>
                <tr>
                  <td>身高</td>
                  <td>{this.state.PersonalInfomationReport.height}</td>
                  <td>体重</td>
                  <td>{this.state.PersonalInfomationReport.weight}</td>
                </tr>
                <tr>
                  <td>BMI</td>
                  <td>{this.state.PersonalInfomationReport.bmi}</td>
                  <td>手机</td>
                  <td>{this.state.PersonalInfomationReport.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="summary_name">
            <div class="summary_name_title">

              <span class="summary_name_title_subtitle">现患疾病</span>
              <span class="summary_name_title_"></span>
            </div>
            <div class="summary_name_centent">
              <p>{this.state.PersonalInfomationReport.nowRisks}</p>
            </div>
            <div class="summary_name_title">

              <span class="summary_name_title_subtitle">异常指标</span>
              <a onClick={() => {
                this.goToReport('MajorPhysiologyIndicatorsReport')
              }}>
                <span class="summary_name_title_">主要生理指标 ></span>
              </a>
            </div>
            <div class="summary_name_centent">
              <p>{this.state.PersonalInfomationReport.majorAbnormal}</p>
            </div>

            {/* 主要是修改此处代码 */}
            <div class="summary_name_title">

              <span class="summary_name_title_subtitle">行为与生活方式</span>
              <a onClick={() => {
                this.goToReport('LifeStyleAssessmentReport')
              }}>
                <span class="summary_name_title_">详情 &gt;</span>
              </a>
              {/* <Link to="/LifeStyleAssessmentReport">
            <span class="summary_name_title_">详情 ></span>
          </Link> */}
            </div>
            <div class="summary_name_centent mode">
              <div class="summary_name_centent_top">
                <div>
                  <span>总评分：</span>
                  <span>{this.state.PersonalInfomationReport.lifeStyleScore}</span>
                </div>
                <div>
                  <span>结论：</span>
                  <span>{this.state.PersonalInfomationReport.lifeStyleconclution}</span>
                </div>
              </div>

              <div class="summary_table">
                <table>
                  <tbody>
                    <tr>
                      <td width='18%'>膳食</td>
                      <td colSpan='3'>{this.state.PersonalInfomationReport.nur}</td>
                    </tr>
                    <tr>
                      <td width='18%'>运动</td>
                      <td colSpan='3'>{this.state.PersonalInfomationReport.sport}</td>
                    </tr>
                    <tr>
                      <td width='18%'>吸烟</td>
                      <td width='32%'>{this.state.PersonalInfomationReport.smoke}</td>
                      <td width='18%' style={{ background: "#f4f8f3" }}>饮酒</td>
                      <td width='32%' >{this.state.PersonalInfomationReport.drunk}</td>
                    </tr>
                    <tr>
                      <td width='18%'>心理</td>
                      <td>{this.state.PersonalInfomationReport.psychological}</td>
                      <td width='18%' style={{ background: "#f4f8f3" }}>环境</td>
                      <td>{this.state.PersonalInfomationReport.environment}</td>
                    </tr>
                    <tr>
                      <td width='18%'>睡眠</td>
                      <td>{this.state.PersonalInfomationReport.sleep}</td>
                      <td width='18%' style={{ background: "#f4f8f3" }}>光照</td>
                      <td>{this.state.PersonalInfomationReport.light}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="summary_name_title">

              <span class="summary_name_title_subtitle">运动风险</span>
              <a onClick={() => {
                this.goToReport('SportRiskReport')
              }}>
                <span class="summary_name_title_">详情 &gt;</span>
              </a>

            </div>

    <div class="summary_name_centent motion">
              <div class="summary_table">
                <table>
                  <tbody>
                    <tr>
                      <td width='35%'>运动风险级别</td>
                      <td width='65%'>{this.state.PersonalInfomationReport.sportRisk}</td>
                    </tr>
                    <tr>
                      <td>适宜运动心率</td>
                      <td>{this.state.PersonalInfomationReport.heartRate}</td>
                    </tr>
                  </tbody>
                </table>
                <div id="bar"></div>
              </div>
            </div>
            <div class="summary_name_title">

              <span class="summary_name_title_subtitle">疾病风险</span>
            </div>
            <div class="summary_name_centent disease">
              <div class="summary_table">
                <DiseaseMain todos={disease}></DiseaseMain>
                <div id="bar"></div>
              </div>
            </div>

            <div class="summary_name_title">

              <span class="summary_name_title_subtitle">肿瘤风险</span>
            </div>
            <div class="summary_name_centent tumour">
              <div class="summary_table">
                <DiseaseMain todos={tumour} gender={this.props.location.query.gender}></DiseaseMain>
                <div id="bar"></div>
              </div>
            </div>

            <div class="summary_name_title up">

              <span class="summary_name_title_subtitles">推荐膳食方案</span>
              <a onClick={() => {
                this.goToReport('NurPrescriptionReport')
              }}>
                <span class="summary_name_title_">详情 &gt;</span>
              </a>
            </div>
            <div class="summary_name_title dow">
              <span class="summary_name_title_subtitles">推荐运动方案</span>
              <a onClick={() => {
                this.goToReport('SportPrescriptionReport')
              }}>
                <span class="summary_name_title_">详情 &gt;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}