import React, {
  Component
} from "react";
import {
  Toast,
} from 'antd-mobile';
import common from '../../common/common';
import ReportShare from '../../common/reportShare';
import '../style/index';

var dataList, json, Explain, Sample
dataList = [{
  project: '',
  key: "grain"
}, {
  project: '',
  key: "vegetable"
}, {
  project: '',
  key: "fruit"
}, {
  project: '',
  key: "soy"
}, {
  project: '',
  key: "milk"
}, {
  project: '',
  key: "meatEgg"
}, {
  project: '',
  key: "nut"
}, {
  project: '',
  key: "oil"
}];

class TodoMain extends Component {
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

class Box extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var up_down = this.props.box_up_down;
    return (
      <table>
        <tbody>
            <tr>
              <th width="30%">食物类别</th>
              <th width="35%">食物举例</th>
              <th width="35%">食物类别</th>
            </tr>
            {this.props.todos.map(function(item,index){   
              return item.centent.map(function(i,num){
                if(num == 0){
                  return (<tr className={index>0?up_down?"none":"":""}><td rowSpan={item.centent.length}>{item.category}</td><td>{i.illustrate}</td><td>{i.describe}</td></tr>)
                }else{
                  return (<tr className={index>0?up_down?"none":"":""}><td style={{background:"#fff"}}>{i.illustrate}</td><td>{i.describe}</td></tr>)
                }
                
              })
            })}
        </tbody>
      </table>
    )
  }
}

class TableList extends Component {
  render() {

    return (
      <table>
        <tbody>
          <tr>
              <th>食物类别</th>
              <th>早餐</th>
              <th>中餐</th>
              <th>晚餐</th>
              <th>加餐</th>
          </tr>
          {this.props.todos.map(function(item,index){
            return <tr key={index}><td>{item.project.name}</td><td>{item.project.breakFast}</td><td>{item.project.lunch}</td><td>{item.project.dinner}</td><td>{item.project.snacks}</td></tr>
            })}
        </tbody>
      </table>
    )
  }
}
class TableListtwo extends Component {
  render() {
    var up_down = this.props.up_down;
    return (
      <table>
        <tbody>
          <tr>
              <th width="30%">食物类别</th>
              <th width="70%">说明</th>
          </tr>
          {this.props.todos.map(function(item,index){
            return <tr key={index}  className={index>0?up_down?"none":"":""}><td>{item.category}</td><td>{item.Explain}</td></tr>
            })}
        </tbody>
      </table>
    )
  }
}



let top = {
  padding: "0.3rem 0.3rem 0.6rem 0.3rem"
}

export default class NurPrescriptionReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goods: [],
      NurPrescriptionReport: "",
      up_down: true,
      box_up_down: true,
    }
    this.up_down = this.up_down.bind(this);
    this.box_up_down = this.box_up_down.bind(this);
  }
  up_down() {
    var {
      up_down
    } = this.state;
    this.setState({
      up_down: !up_down
    });
  }
  box_up_down() {
    var {
      box_up_down
    } = this.state;
    this.setState({
      box_up_down: !box_up_down
    });
  }

  componentDidMount() {
    let _this = this;
    common.getAxios("/personHealthRisk/load", this.props.location.state, function(result) {
      var res = result.reportMap.NurPrescriptionReport;
      dataList.forEach(function(value, index, array) {
        value.project = res[value.key]
      })
      _this.setState({
        NurPrescriptionReport: res
      })
    })
  }
  render() {
    var title = this.props.location.state
    var {
      up_down,
      box_up_down
    } = this.state;
    Explain = [{
      category: '谷薯类',
      Explain: '谷薯类食物包括米、面、玉米、杂粮；马铃薯、甘薯、木薯类等，主要提供碳水化合物，少量蛋白质、矿物质及B族维生素'
    }, {
      category: '蔬菜类',
      Explain: '蔬菜类主要提供膳食纤维、矿物质、维生素C和胡萝卜素等营养成分'
    }, {
      category: '水果类',
      Explain: '如苹果、梨、桃、西瓜等可食用的植物果实，主要提供膳食纤维、矿物质、维生素C和胡萝卜素等营养成分'
    }, {
      category: '大豆类',
      Explain: '包括大豆及其他干豆类及豆制品，主要提供优质的植物蛋白质、脂肪、膳食纤维'
    }, {
      category: '奶类',
      Explain: '奶类可以提供较丰富的优质蛋白质、碳水化合物、矿物质及维生素'
    }, {
      category: '肉蛋类',
      Explain: '肉类和蛋主要提供优质的动物蛋白质、脂肪、维生素A和B族维生素等'
    }, {
      category: '坚果、种子类',
      Explain: '主要营养成分分为植物油脂，热量高，不宜多吃'
    }, {
      category: '植物油',
      Explain: '主要提供能量，还可以提供维生素E和必需脂肪酸'
    }]
    json = {
      heading: "推荐膳食方案",
      introduce: "合理膳食是健康“四大基石”中的第一基石。合理膳食是指一日三餐所提供的能量和营养素必须满足人的生长、发育和各种生理、体力活动的需要。合理的膳食可提供充足的营养，能提高人体的健康水平，预防多种疾病的发生发展。不合理的膳食会导致营养过度或不足，给健康带来不同程度的危害。《中国居民膳食指南》推荐：食物多样、谷类为主；多吃蔬菜、水果和薯类；每天吃奶类、大豆或豆制品；适量鱼、禽、蛋和瘦肉；少盐、少油、控糖限酒。",
      Grade_title: "1400kcal",
      Grade: "15份",
      Specifications: [{
        centent: "碗：6寸碗（直径约12cm，高6cm，容量相当于刚好盛1盒240ml的牛奶）"
      }, {
        centent: "杯：240ml容量杯"
      }, {
        centent: "匙：10ml"
      }, {
        centent: "盘：8寸深盘"
      }],
      cruces: [{
        centent: "全谷物食物富含B族维生素、矿物质和膳食纤维，对调节血脂、血糖及肠胃道功能十分重要，需注意粗细搭配。"
      }, {
        centent: "高血压者每天盐摄入量不宜超过6克。控盐方法参考：不吃咸菜等高盐食品；每日含盐的食物如汤类、菜类，总量不要超过600ml。"
      }, {
        centent: "心脑血管疾病者应多吃富含维生素C的食物，如新鲜的绿叶蔬菜、水果等，少吃动物脂肪。"
      }, {
        centent: "高尿酸血症者不要选择高嘌呤食物，如动物内脏，海鲜、啤酒等，畜肉类要注意限量，多吃蔬菜水果，保证充足饮水。"
      }]
    }
    Sample = [{
      category: "谷薯类",
      centent: [{
        illustrate: "米饭,面条",
        describe: "1/3碗"
      }, {
        illustrate: "全麦切片面包",
        describe: "1片(普通CD大小)"
      }, {
        illustrate: "粥",
        describe: "1碗"
      }, {
        illustrate: "馒头、花卷",
        describe: "2寸见方大小"
      }, {
        illustrate: "包子",
        describe: "网球大小一个"
      }, {
        illustrate: "玉米",
        describe: "1根"
      }, {
        illustrate: "饺子",
        describe: "6个"
      }]
    }, {
      category: "蔬菜",
      centent: [{
        illustrate: "煮熟的蔬菜",
        describe: "3碗或1盘"
      }, {
        illustrate: "生的蔬菜",
        describe: "6碗或2盘"
      }, ]
    }, {
      category: "水果类",
      centent: [{
        illustrate: "苹果、梨、桃等",
        describe: "网球大小"
      }, {
        illustrate: "香蕉",
        describe: "中等大小1根"
      }, {
        illustrate: "葡萄",
        describe: "30粒"
      }, {
        illustrate: "草莓",
        describe: "12粒"
      }, {
        illustrate: "纯果汁",
        describe: "200ml"
      }, ]
    }, {
      category: "大豆和豆制品",
      centent: [{
        illustrate: "干大豆",
        describe: "25克"
      }, {
        illustrate: "豆浆",
        describe: "1杯（240ml）"
      }, {
        illustrate: "豆腐",
        describe: "2两（100克）"
      }, ]
    }, {
      category: "肉蛋类",
      centent: [{
        illustrate: "猪、牛、羊等畜肉类",
        describe: "50克（约鸡翅中大小）"
      }, {
        illustrate: "鸡、鸭、等禽类",
        describe: "去皮肉50克"
      }, {
        illustrate: "鱼、贝类",
        describe: "100克（约一副扑克牌大小）"
      }, {
        illustrate: "虾",
        describe: "6只"
      }, ]
    }, {
      category: "奶类",
      centent: [{
        illustrate: "纯牛奶",
        describe: "200ml"
      }, {
        illustrate: "脱脂牛奶",
        describe: "250ml"
      }, {
        illustrate: "酸奶",
        describe: "100ml"
      }, {
        illustrate: "脱脂酸奶",
        describe: "150ml"
      }, {
        illustrate: "干乳酪",
        describe: "1寸见方"
      }, ]
    }, {
      category: "植物油",
      centent: [{
        illustrate: "花生油",
        describe: "10ml"
      }, {
        illustrate: "调和油",
        describe: "10ml"
      }, ]
    }, {
      category: "坚果、种子",
      centent: [{
        illustrate: "杏仁",
        describe: "10粒"
      }, {
        illustrate: "核桃仁",
        describe: "半个"
      }, {
        illustrate: "花生",
        describe: "20粒"
      }, {
        illustrate: "葵花籽仁、芝麻",
        describe: "1匙（约15克）"
      }, ]
    }]
    let {
      NurPrescriptionReport
    } = this.state;
    return (
      <div class="app-bd">
        <ReportShare gender={this.props.location.state.gender} />
        <div class="summary_title">{json.heading}</div>
        <div class="obesity obesitys">
          <p>{json.introduce}</p>
        </div>

        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">推荐方案</span>
        </div>

        <div class="summary_name_title up diabetes">
          
          <span class="summary_name_title_subtitles">每日摄入总热量推荐：<span class="green">{NurPrescriptionReport.totalKcal}</span></span>
        </div>
        <div class="summary_name_title up diabetes">
          
          <span class="summary_name_title_subtitles">食物总份数：<span class="green">{NurPrescriptionReport.totalPart}</span></span>
        </div>
        <div class="summary_table one Results diet">
        <TableList todos={dataList}></TableList>
        
        <div class="summary_name_title up diabetes" style={{"marginLeft":"-0.25rem","marginTop":"0.3rem"}}>
          
          <span class="summary_name_title_subtitles">食物类别说明</span>
        </div>
        <div class="summary_table one Results diet" style={{padding:"0"}}>
          
          <TableListtwo todos={Explain}   up_down={up_down}></TableListtwo>
          <div className={up_down?"up_down_content":"active up_down_content"} onClick={this.up_down}>
            {up_down?"展开":"收起"}
          </div>
        </div>
        </div>
        <div class="summary_name_title up diabetes">
          
          <span class="summary_name_title_subtitles">食物类别说明</span>
        </div>
        <div class="obesity p" style={top}>
            <p>为了方便计算摄入热量和营养素比例，人为将食物分成不同类别，每类食物提供的营养素基本相同，同类别的食物中选择喜欢吃的食物不影响营养素比例的均衡；同时将能够提供的90kcal热量的食物算做1份，同等份量的食物调整，摄入总热量不变。</p>
            <p>用食物交换的方法，按照膳食处方中各类食物应吃的份量进餐，同类食物等份量交换，可达到控制总热量和营养素比例均衡的管理目标。</p>
        </div>
        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">食物示例</span>
        </div>
        <div class="summary_table one Results ">
          <Box todos={Sample} box_up_down={box_up_down}></Box>
          <div className={box_up_down?"up_down_content":"active up_down_content"} onClick={this.box_up_down}>
            {box_up_down?"展开":"收起"}
          </div>
    <div class="Prompt">更多食品份量示例请参考慈云健康App记录饮食里各食物类别内容。</div>
        </div>
        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">餐具规格</span>
        </div>
        <TodoMain todos={json.Specifications}></TodoMain>
        <div class="summary_name_title">
          
          <span class="summary_name_title_subtitle">饮食注意</span>
        </div>
        <TodoMain todos={json.cruces}></TodoMain>
      </div>
    )
  }
}