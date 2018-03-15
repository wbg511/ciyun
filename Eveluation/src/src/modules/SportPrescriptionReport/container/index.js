import React, {
  Component

} from "react";
import {
  Toast
} from 'antd-mobile';
import common from '../../common/common';
import ReportShare from '../../common/reportShare';
let top = {
  padding: "0.3rem 0.3rem 0.3rem 0.3rem"
}
let aerobic = [{
  title: "每日热量消耗目标",
  centent: "245kcal",
  key: "actionTarget",
}, {
  title: "推荐运动方式",
  centent: "步行（110-129步/分钟）",
  key: "actionMode",
}, {
  title: "每次持续时间",
  centent: "30-50分钟",
  key: "actionRepeat",
}, {
  title: "运动频率",
  centent: "每周4次",
  key: "actionFreq",
  project: "",
}, {
  title: "适宜运动心率范围",
  centent: "98-125次/分",
  key: "actionIntensity",
}, {
  title: "风险提示",
  centent: "运动前应进行血压、心电图、血糖、血脂、肺功能等检查，并进行运动能力测试，测试也需在医学监督下进行。",
  key: "advice",
}]
let Power = [{
  title: '运动方式',
  centent: '肌肉训练',
  key: "actionTarget",
}, {
  title: '推荐动作',
  centent: '推墙练习、背肌静力抗阻练习、胸肌静力抗阻练习、伸髋练习、深蹲练习、提踵练习',
  key: "actionMode",
}, {
  title: '重复次数',
  centent: '每个动作重复10次为一组，完成1组。',
  key: "actionRepeat",
}, {
  title: '运动强度',
  centent: '以吃力为限',
  key: "actionIntensity",
}, {
  title: '运动频率',
  centent: '每周2天',
  key: "actionFreq",
}]
let flexibility = [{
  title: '运动方式',
  centent: '肌肉训练',
  key: "actionTarget",
}, {
  title: '推荐动作',
  centent: '推墙练习、背肌静力抗阻练习、胸肌静力抗阻练习、伸髋练习、深蹲练习、提踵练习',
  key: "actionMode",
}, {
  title: '重复次数',
  centent: '每个动作重复10次为一组，完成1组。',
  key: "actionRepeat",
}, {
  title: '运动强度',
  centent: '以吃力为限',
  key: "actionIntensity",
}, {
  title: '运动频率',
  centent: '每周2天',
  key: "actionFreq",
}]
let cruces = [{
  centent: "每次运动前应有5-10分钟的热身运动，运动后应做适当放松运动，如慢走，深呼吸，肌肉拉伸等，也可将柔韧性练习做为运动前后的热身和放松运动。"
}, {
  centent: "注意运动心率的把握，低于运动心率范围的运动达不到理想效果；高于运动心率范围则易有运动风险，不应盲目增加运动强度。"
}, {
  centent: "用主观感觉把握运动强度的方法是：高强度感觉很吃力，不能坚持多久；中高强度感觉较吃力，但努力能坚持；中等强度感觉稍吃力，能坚持；中低强度不感觉吃力；低强度感觉很轻松。"
}, {
  centent: "运动时注意调整呼吸，不要憋气，在较轻松的运动时间吸气，较努力时呼气，保证呼吸顺畅。"
}, {
  centent: "用器械辅助力量训练时要注意定期调整重量，当每组重复次数可多完成1-2次时，可增加原重量的2-10%，以提高训练效果。"
}, {
  centent: "运动过程中若出现胸闷、胸痛、呼吸困难等不适情况，请立即停止活动，原地休息，如未能缓解，请及时就医，以免延误病情。"
}]
class TodoMain extends Component {
  render() {
    return (
      <table>
        <tbody>
          {this.props.todos.map(function (item, index) {
            return <tr key={index}><td width="25%">{item.title}</td><td width="75%">{item.centent}</td></tr>
          })}
        </tbody>
      </table>
    )
  }
}
class TodoMaintwo extends Component {
  render() {
    return (
      <ul className="obesity" style={top}>
          {this.props.todos.map(function(item,index){
             return <li key={index}><i></i><p>{item.centent}</p></li>
          })}
        </ul>
    )
  }
}


export default class SportPrescriptionReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goods: []
    }
  }
  componentDidMount() {
    let _this = this;
    common.getAxios("/personHealthRisk/load", this.props.location.state, function(result) {
      var res = result.reportMap.SportPrescriptionReport;

      // dataList.forEach(function(value, index, array) {
      //   value.project = res[value.key]
      // })
      aerobic.forEach(function(value, index, array) {
        value.centent = res.aerobicAction[value.key]
      })
      Power.forEach(function(value, index, array) {
        value.centent = res.strengthAction[value.key]
      })
      flexibility.forEach(function(value, index, array) {
        value.centent = res.flexAction[value.key]
      })
      _this.setState({
        SportPrescriptionReport: res
      })
    })
  }
  render() {
    return (
      <div class="app-bd">
        <ReportShare gender={this.props.location.state.gender} />
        <div class="summary_title">推荐运动方案</div>
        <div class="obesity obesitys">
          <p>日常体力活动只可增加能量消耗，而运用大肌肉进行的有计划、可重复的体力活动（运动），可帮助人体提高适应生活、运动和环境的综合能力，使人头脑清醒，精神愉悦，精力旺盛，有效的舒缓压力，长期坚持可达到调节糖、脂代谢能力，调节血压水平，增强心血管功能，预防疾病的目的。</p>
        </div>
        <div class="summary_name_title">
          <img src={require("static/images/icon1.png")} alt="图片加载失败" class="summary_name_title_icon" />
          <span class="summary_name_title_subtitle">有氧运动</span>
        </div>
        <div class="obesity p" style={top}>
          <p>有氧运动的特点是强度低，有节奏，持续时间较长。要求每次锻炼的时间不少于30分钟，每周坚持3到5次。这种锻炼，氧气能充分燃烧（即氧化）体内的糖分，还可消耗体内脂肪，增强和改善心肺功能，预防骨质疏松，调节心理和精神状态，是健身的主要运动方式。</p>
        </div>
        <div class="summary_table one Results diet">
          <TodoMain todos={aerobic}></TodoMain>
        </div>
        <div class="summary_name_title">
          <img src={require("static/images/icon1.png")} alt="图片加载失败" class="summary_name_title_icon" />
          <span class="summary_name_title_subtitle">力量训练</span>
        </div>
        <div class="obesity p" style={top}>
          <p>肌肉力量是维持日常生活自理、保持从事各种劳动及运动的能力，是速度、耐力、灵敏、协调、平衡等各项身体素质的基础。经常做肌肉力量训练可使瘦体重增加，提高基础代谢水平，有助于减重，同时可提高胰岛素的敏感性，防治2型糖尿病。</p>
        </div>
        <div class="summary_table one Results diet">
          <TodoMain todos={Power}></TodoMain>
        </div>
        <div class="summary_name_title">
          <img src={require("static/images/icon1.png")} alt="图片加载失败" class="summary_name_title_icon" />
          <span class="summary_name_title_subtitle">柔韧性练习</span>
        </div>
        <div class="obesity p" style={top}>
          <p>柔韧性运动的主要作用是保持关节、肌肉活动幅度、维持日常生活自理能力和劳动、运动需要，尤其是肌肉抗阻力运动后会略有缩短，拉伸可使其放松并复原到原来的运动范围，保持肌肉的伸展能力及关节的活动范围，减少肥肉酸痛和紧张，增加柔韧性。常见的运动方式有瑜珈、太极及肌肉群的拉伸等。</p>
        </div>
        <div class="summary_table one Results diet">
          <TodoMain todos={flexibility}></TodoMain>
        </div>
        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">运动建议</span>
        </div>
        <TodoMaintwo todos={cruces}></TodoMaintwo>
      </div>
    )
  }
}