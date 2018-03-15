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
    this.cancelHistroy=this.cancelHistroy.bind(this);
    this.state = {
      personId: "",
      recordId: "",
      hmoId:"",
      id:"",
      inspName:"",
      inspTel:"",
      name:"",
      medTel:"",
      typeStr:"",
      hmoName:"",
      corpName:"",
      medAddress:"",
      inspDate:"",
      inspTime:"",
      precautions:"",
      images:"",
      inspState:"",
      payFlag:"",
      userInfoList:[],
      source:"",
      type:"",
      show:false
    }
  }
  initPhyInfo(){
    var urlParms, personId, recordId;
    var hmoId,payOpenId,isWx;
    urlParms =this.props.location.query;
    personId = urlParms.personId;
    recordId=this.props.params.recordId;
    if (typeof(personId)!='undefined'){
      window.localStorage.clear();
      hmoId = urlParms.hmoId;
      payOpenId = urlParms.payOpenId;
      isWx = urlParms.isWx;
      localStorage.setItem("personId",personId);
      localStorage.setItem("isWx",isWx);
      if (isWx=="true"){
        localStorage.setItem("hmoId",hmoId);
        localStorage.setItem("payOpenId",payOpenId);
      }else{
        localStorage.setItem("hmoId","");
      }
    }
    this.setState({
      recordId: recordId,
      personId:localStorage.getItem("personId"),
      hmoId:localStorage.getItem("hmoId")
    },function(){
      this.getInspRecord();
    });
  }
  componentDidMount() {
    phyInit.title("预约信息详情");
    this.initPhyInfo();
  }
  //查询体检预约信息
  getInspRecord(){
      axios({
        url:"/record/info.json",
        data:{
          "personId": this.state.personId,
          "recordId": this.state.recordId
        },
        method:"post"
      }).then((response)=>{
        if (response.data.code==0){
          this.setState({
            id:response.data.result.id,
            inspName:response.data.result.inspName,
            inspTel:response.data.result.inspTel,
            name:response.data.result.name,
            medTel:response.data.result.medTel,
            typeStr:response.data.result.typeStr,
            hmoName:response.data.result.hmoName,
            corpName:response.data.result.corpName,
            medAddress:response.data.result.medAddress,
            inspDate:response.data.result.inspDate,
            inspTime:response.data.result.inspTime,
            precautions:response.data.result.precautions,
            images:response.data.result.image,
            inspState:response.data.result.state,
            payFlag:response.data.result.payFlag,
            userInfoList:response.data.result.userInfoList,
            source:response.data.result.source,
            type:response.data.result.type,
            show:true
          });
        }else{
          Toast.info(response.data.msg, 5);
        }
      });
  }
  //取消预约记录
  cancelHistroy(){
    Modal.alert("取消预约", "确定要取消预约吗？", [{
      text: "取消"
    },{
      text: "确定",
      onPress: () => {
        axios({
          url:"/record/cancel.json",
          data:{
            "recordId": this.state.recordId,
            "personId": this.state.personId
          },
          method:"post"
        }).then((response)=>{
            hashHistory.push({
              pathname: '/histroy'
            })
        });
      }
    }], "ios")
  }
  //体检注意事项
  getNotice(recordId){
    hashHistory.push({
      pathname: '/booking/notice/histroy/'+recordId
    })
  }
  //跳转体检套餐()=>{详情
  getPackage(state){
    if (state.source==0 || (state.source==1 && state.type==2)){
      return;
    }else{
      hashHistory.push({
        pathname: '/histroy/package/'+state.id
      })
    }
  }
  //跳转到立即支付
  //{payFlag==2 && type!=2 && inspState==2 ?<span className="status1-phyedno">未线上支付</span>:null}
  orderPay(oId){
    window.location.href=phyInit.host.url+'#/orderPay/'+oId
  }

  render() {
    const { inspState,payFlag,type,source } = this.state;
    const userInfoHtml=this.state.userInfoList.map((item,index)=>{
      if (item.infoValue=='' || item.infoValue==null){
        return('');
      }else{
        return(
          <div key={index} className="app-list-item">
            <div className="app-item-hd">{item.infoName}</div>
            <div className="app-item-bd">
              {item.infoValue}
            </div>
          </div>
        )
      }
    });
    if (this.state.show){
      return (
        <div className="app-doc">
          <div className="app-bd phyDetails-bd">
                <a
                  className={source==0 || (source==1 && type==2)?"bookingDetails-Intro":"bookingDetails-Intro app-active"}
                  href="javascript:;" onClick={()=>{this.getPackage(this.state)}}>
                   <div className="booking-infoBox">
                      <div className="booking-img">
                          <img src={this.state.images
                          ? this.state.images
                          : require('../../static/images/booking-img.png')} />
                      </div>
                      <div className="booking-intro">
                          <h3 className="booking-name app-txt-nowrap-2">{this.state.name}</h3>
                          <div className="booking-status">
                              {inspState==2?<span className="status1-phyed">已预约</span>:null}
                              {inspState==3?<span className="status1-phyed">已体检</span>:null}
                              {inspState==4?<span className="status1-cancel">已取消</span>:null}
                              {inspState==5?<span className="status1-cancel">已过期</span>:null}
                              {payFlag==1 && type!=2 ?<span className="status1-phyed">已线上支付</span>:null}  
                          </div>
                      </div>
                  </div>
                  {source==0 || (source==1 && type==2)?null:
                    <div className="app-arr-phy"></div>
                  }
             </a>
             <div className="bookingForm-introItem">
                  <div className="app-list app-list-form">
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
                          <div className="app-item-hd">联系电话：</div>
                          <div className="app-item-bd">{this.state.medTel}</div>
                      </div>
                  </div>
              </div>
              <div className="bookingForm-item-notice">
              {this.state.precautions.length==0 ?
                null
              :
              <a href="javascript:;" className="icon-notice" onClick={()=>{this.getNotice(this.state.recordId)}}>体检注意事项</a>
              }
                
              </div>
               <div className="bookingForm-phyForm">
                  <div className="app-list app-list-form">
                    <div className="app-list-item">
                      <div className="app-item-hd">预约时间</div>
                      <div className="app-item-bd">
                        {this.state.inspDate} {this.state.inspTime}
                      </div>
                    </div>
                    {userInfoHtml}
                  </div>
              </div>

          </div>
          <div className="app-ft phy-ft">
              <div className="phy-ft-btn-group">
                {inspState==2 && payFlag!=1 && !(source==2 && type ==2)?
                  <botton type="botton" className="phy-btn phy-btnHistroy" onClick={this.cancelHistroy}>取消预约</botton>
                  :null
                }
                {type!=2 && payFlag==2 && inspState==2 ?
                  <botton type="botton" className="phy-btn phy-btnGoPay" onClick={()=>{this.orderPay(this.state.id)}}>立即支付</botton>
                  :null
                }
              </div>
            </div>
        </div>
      )
    }else{
      return(
        <div className="app-doc">
          
        </div>
      )
    }
  }
}
