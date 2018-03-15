import React, {
  Component
} from "react";
import {
  Toast,
} from 'antd-mobile';
import common from '../../common/common';
import ReportShare from '../../common/reportShare';
import '../style/index';

export default class LifeStyleAssessmentReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      LifeStyleAssessmentReport: ''
    }
  }
  componentDidMount() {
    //获取行为与生活方式评价
    let _this = this;
    common.getAxios("/personHealthRisk/load", this.props.location.state, function(result) {
      if (result.reportMap != undefined) {
        if (result.reportMap.LifeStyleAssessmentReport != undefined) {
          var res = result.reportMap.LifeStyleAssessmentReport;
          _this.setState({
            LifeStyleAssessmentReport: res
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
    return (
      <div class="app-bd">
        <ReportShare gender={this.props.location.state.gender} />
        <div class="summary_title">行为与生活方式评价</div>
        <div class="summary_table top" style={{padding:'0 0.3rem 0.6rem 0.3rem'}}>
          <ul className="todo-list">
            <li class="list" style={{borderLeft:"0"}}>
              <span class="tabl_title">生活方式总评分</span>
              <span class="table_content">
                <div class="low">{this.state.LifeStyleAssessmentReport.scroe}</div>
                <div class="Ideal">理想值80-100</div>
              </span>
            </li>
            <li class="list" style={{borderLeft:"0"}}>
              <span class="tabl_title">生活方式总评分</span>
              <span class="table_content">
                <div class="low">{this.state.LifeStyleAssessmentReport.conclution}</div>
              </span>
            </li>
          </ul>
        </div>
        <div class="summary_name_title">

          <span class="summary_name_title_subtitle">行为与生活方式评价</span>
          <span class="summary_name_title_"></span>
        </div>
        <div class="behavior">
          <img src={require("static/images/pie.png")} alt=""/>
          <p>行为与生活方式是影响健康的主要因素。据世界卫生组织统计，影响健康的各种因素中，行为与生活方式占60%。只要有效的控制和改善行为危险因素，就能减少多种疾病风险，由此减少40%-70%的早死，1/3的急性残疾，2/3的慢性疾病，健康需要行动，尽早行动起来，为您的健康加分。</p>
        </div>
        <div class="summary_table behavior">
          <table>
            <tbody>
              <tr>
                <th width="34%">项目</th>
                <th width="34%">现状</th>
                <th width="32%">健康推荐</th>
              </tr>
              <tr>
                <td>谷类摄入水平</td>
                <td>{this.state.LifeStyleAssessmentReport.cornIntake}</td>
                <td>每天摄入主食不低于150克，热量占比约60%</td>
              </tr>
              <tr>
                <td>蔬菜摄入水平</td>
                <td>{this.state.LifeStyleAssessmentReport.vegetableIntake}</td>
                <td>每天摄入新鲜蔬菜量不低于500克</td>
              </tr>
              <tr>
                <td>水果摄入水平</td>
                <td>{this.state.LifeStyleAssessmentReport.fruitIntake}</td>
                <td>每天摄入新鲜水果200-400克</td>
              </tr>
              <tr>
                <td>肉类摄入水平</td>
                <td>{this.state.LifeStyleAssessmentReport.meatIntake}</td>
                <td>每天摄入摄入肉类50-75克，最多不超过200克</td>
              </tr>
              <tr>
                <td>高盐膳食习惯</td>
                <td>{this.state.LifeStyleAssessmentReport.highSaltHabit}</td>
                <td>不吃高盐食品</td>
              </tr>
              <tr>
                <td>煎炸膳食习惯</td>
                <td>{this.state.LifeStyleAssessmentReport.friedFoodHabit}</td>
                <td>最好少吃，每周最多不超过2次</td>
              </tr>
              <tr>
                <td>不吃早餐习惯</td>
                <td>{this.state.LifeStyleAssessmentReport.noBreakFastHabit}</td>
                <td>每天吃早餐</td>
              </tr>
              <tr>
                <td>甜点习惯</td>
                <td>{this.state.LifeStyleAssessmentReport.dessertHabit}</td>
                <td>尽量少吃，每周最多不要超过两次</td>
              </tr>
              <tr>
                <td>体力活动水平</td>
                <td>{this.state.LifeStyleAssessmentReport.sportLevel}</td>
                <td>轻体力劳动者，不要长时间静坐</td>
              </tr>
              <tr>
                <td>运动锻炼</td>
                <td>{this.state.LifeStyleAssessmentReport.psysicalExercise}</td>
                <td>每周运动不少于3次，每次不少于30分钟</td>
              </tr>
              <tr>
                <td>运动风险级别</td>
                <td>{this.state.LifeStyleAssessmentReport.sportRisk}</td>
                <td>选择适合自已的运动级别，减少运动风险</td>
              </tr>
              <tr>
                <td>吸烟状况</td>
                <td>{this.state.LifeStyleAssessmentReport.smokeStatus}</td>
                <td>不吸烟</td>
              </tr>
              <tr>
                <td>饮酒状况</td>
                <td>{this.state.LifeStyleAssessmentReport.drunkStatus}</td>
                <td>可适量饮用葡萄酒</td>
              </tr>
              <tr>
                <td>生活环境污染</td>
                <td>{this.state.LifeStyleAssessmentReport.environmentPolution}</td>
                <td>尽量减少或不接触污染物</td>
              </tr>
              <tr>
                <td>光照时间</td>
                <td>{this.state.LifeStyleAssessmentReport.illuminationTime}</td>
                <td>每天累计光照时间不少于2小时</td>
              </tr>
              <tr>
                <td>心理状况</td>
                <td>{this.state.LifeStyleAssessmentReport.psychologicStatus}</td>
                <td></td>
              </tr>
              <tr>
                <td>睡眠质量</td>
                <td>{this.state.LifeStyleAssessmentReport.sleepQuality}</td>
                <td>保持充足的睡眠时间和良好的睡眠质量</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}