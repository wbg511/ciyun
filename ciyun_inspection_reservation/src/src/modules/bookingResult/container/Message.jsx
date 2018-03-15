import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import { Toast, Modal} from 'antd-mobile';
import axios from "../../common/httpAjax";
import phyInit from "../../common/phy.init";
import qs from "qs";
import $ from "jquery";


export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: "",
      recordId: "",
      inspName:"",
      inspTel:"",
      name:"",
      typeStr:"",
      hmoName:"",
      corpName:"",
      medAddress:"",
      inspDate:"",
      inspTime:"",
      precautions:"",
      inspState:"",
      type:"",
      recordWay:"",
      payFlag:"",
      corpId:"",
      title:"",
      userInfoList:[]
    }
  }

  componentDidMount() {
    var storage=window.localStorage;
    let personId=storage.getItem("personId");
    let recordId=this.props.location.query.recordId;
    this.getInspRecord(personId,recordId);
    this.setState({
      personId: personId,
      recordId: recordId
    });
  }
  //查询预约记录
  getInspRecord(personId,recordId){
    axios({
      url:"/record/info.json",
      data:{
        "personId": personId,
        "recordId": recordId
      },
      method:"post"
    }).then((response)=>{
      if (response.data.code==0){
        let titleType="";
        switch (response.data.result.type){
          case 1:
            titleType="体检套餐预约";
            break;
          case 2:
            titleType="单位体检预约";
            break;
          case 3:
            titleType="个性推荐预约";
            break;
          default:
            titleType="预约表单";
            break;
        }
        phyInit.title(titleType);
        this.setState({
          title:titleType,
          inspName:response.data.result.inspName,
          inspTel:response.data.result.inspTel,
          name:response.data.result.name,
          typeStr:response.data.result.typeStr,
          hmoName:response.data.result.hmoName,
          corpName:response.data.result.corpName,
          medAddress:response.data.result.medAddress,
          inspDate:response.data.result.inspDate,
          inspTime:response.data.result.inspTime,
          precautions:response.data.result.precautions,
          inspState:response.data.result.state,
          type:response.data.result.type,
          recordWay:response.data.result.recordWay,
          payFlag:response.data.result.payFlag,
          userInfoList:response.data.result.userInfoList
        });
      }else{
        Toast.info(response.data.msg, 1);
      }
    });
  }

  //跳转到预约记录
  setHistroy(){
    hashHistory.push({
      pathname: '/histroy'
    })
  }
  //跳转到立即支付
  orderPay(recordId){
    window.location.href=phyInit.host.url+'#/orderPay/'+recordId
    // hashHistory.push({
    //   pathname:'/orderPay/'+recordId
    // })
  }
  render() {
    const userInfoHtml=this.state.userInfoList.map((item,index)=>{
      if (item.infoValue=='' || item.infoValue==null){
        return('');
      }else{
        return(
          <div key={index} className="app-list-item">
            <div className="app-item-hd">{item.infoName}：</div>
            <div className="app-item-bd">
              {item.infoValue}
            </div>
          </div>
        )
      }
    });
    return (
      <div className="app-doc">
        <div className="app-bd bookingForm-bd">
            <div className="bookingForm-message">
                <div className="app-list app-list-form">
                    {userInfoHtml}
                    {this.state.type==1 ?
                      <div className="app-list-item">
                          <div className="app-item-hd">体检套餐：</div>
                          <div className="app-item-bd">{this.state.name}</div>
                      </div>
                    :
                      null
                    }
                    <div className="app-list-item">
                        <div className="app-item-hd">预约类型：</div>
                        <div className="app-item-bd">{this.state.typeStr}</div>
                    </div>
                    <div className="app-list-item">
                        <div className="app-item-hd">体检机构：</div>
                        <div className="app-item-bd">{this.state.hmoName}</div>
                    </div>
                    <div className="app-list-item">
                        <div className="app-item-hd">体检中心：</div>
                        <div className="app-item-bd">{this.state.corpName}</div>
                    </div>
                    <div className="app-list-item">
                        <div className="app-item-hd">体检地址：</div>
                        <div className="app-item-bd">{this.state.medAddress}</div>
                    </div>
                    <div className="app-list-item">
                        <div className="app-item-hd">预约时间：</div>
                        <div className="app-item-bd">{this.state.inspDate} {this.state.inspTime}</div>
                    </div>
                </div>
            </div>
            {this.state.precautions.length==0 ?
              null
            : 
              <div className="bookingDetails-notice">
                  <div className="app-list">
                      <div className="app-list-item">
                          <div className="app-item-hd">
                              <p className="notice-title-normal">体检注意事项</p>
                          </div>
                      </div>
                  </div>
                  <div className="bookingDetails-notice-intro" dangerouslySetInnerHTML={{__html:this.state.precautions}}>
                  </div>
             </div>
            } 
        </div>
        <div className="app-ft phy-ft">
            {this.state.recordWay==2 ?
              <div className="app-tips">
                <span className="icon-notice">只有支付成功才能完成预约</span>
              </div>
            :
              null
            }
            <div className="phy-ft-btn-group">
              {this.state.type==2?
                <botton type="botton" className="phy-btn phy-btnHistroy" onClick={()=>{this.setHistroy()}}>查看预约记录</botton>
                :null
              }
              {this.state.type!=2 && this.state.recordWay==1 ?
                <botton type="botton" className="phy-btn phy-btnHistroy" onClick={()=>{this.setHistroy()}}>预约记录</botton>
                :null
              }
              {this.state.type!=2 && this.state.payFlag==2 ?
                <botton type="botton" className="phy-btn phy-btnGoPay"  onClick={()=>{this.orderPay(this.state.recordId)}}>立即支付</botton>
                :null
              }
            </div>
          </div>
      </div>
    )
  }
}
