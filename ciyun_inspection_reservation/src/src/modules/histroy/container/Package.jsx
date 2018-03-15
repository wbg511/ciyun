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
	        amount:"",
	        baseAmount:"",
	        plusAmount:"",
	        baseChargeItemList:[],
	        baseCount:"",
	        plusCount:"",
	        corpName:"",
	        images:"",
	        name:"",
	        plusChargeItemList:[],
	        usePersonStr:"",
	        isBase:"",
			isPlus:"",
      		show:false
	    }

	}
	componentDidMount() {
    	phyInit.title("体检套餐详情");
		var storage=window.localStorage;
		var personId=storage.getItem("personId");
	    var recordId=this.props.params.recordId;
		this.setState({
			personId: personId,
			recordId: recordId
		},function(){
			this.getInpPackage();
		});
	}
	getInpPackage(personId,recordId){
		axios({
        url:"/record/chargeItemInfo.json",
        data:{
          "personId": this.state.personId,
          "recordId": this.state.recordId
        },
        method:"post"
      }).then((response)=>{
        if (response.data.code==0){
        	var baseShow=true, plusShow=true;
        	if (response.data.result.baseChargeItemList.length<=0){
				baseShow=false;
        	}
        	if (response.data.result.plusChargeItemList.length<=0){
				plusShow=false;
        	}
			this.setState({
				amount:response.data.result.amount,
				baseAmount:response.data.result.baseAmount,
				plusAmount:response.data.result.plusAmount,
				baseChargeItemList:response.data.result.baseChargeItemList,
				baseCount:response.data.result.baseCount,
				plusCount:response.data.result.plusCount,
				images:response.data.result.image,
				name:response.data.result.name,
				plusChargeItemList:response.data.result.plusChargeItemList,
				usePersonStr:response.data.result.usePersonStr,
				isBase:baseShow,
				isPlus:plusShow,
      			show:true
			});
        }else{
          Toast.info(response.data.msg, 5);
        }
      });
	}
	packModal(packNeme, remarks, suitPerson, unsuitPerson){
		Modal.alert(packNeme,
			<div style={{ maxHeight:'8rem', overflow: 'scroll' }}>
	            <div className="am-modal-body-text"><span class="title">【项目介绍】：</span><span class="name">{remarks ? remarks :"无特殊说明"}</span></div>
	            <div className="am-modal-body-text"><span class="title">【适宜人群】：</span><span class="name">{suitPerson ? suitPerson : "--"}</span></div>
	            <div className="am-modal-body-text"><span class="title">【禁忌人群】：</span><span class="name">{unsuitPerson ? unsuitPerson : "--"}</span></div>
          	</div>
			, [{
	      text: "知道了"
	    }], "ios")
	}
	render() {
		const baseLest=this.state.baseChargeItemList.map((item,index)=>{
			return(
				<a key={index} className="app-list-item" href="javascript:;" onClick={this.packModal.bind(this,item.name, item.remarks, item.suitPersonRemarks, item.unsuitPersonRemarks)}>
                    <div className="app-item-bd">{item.name}</div>
                </a>
			)
		})
		const plusLest=this.state.plusChargeItemList.map((item,index)=>{
			return(
				<a key={index} className="app-list-item" href="javascript:;" onClick={this.packModal.bind(this,item.name, item.remarks, item.suitPersonRemarks, item.unsuitPersonRemarks)}>
                    <div className="app-item-bd">{item.name}</div>
                </a>
			)
		})
		if (this.state.show){
			return(
				<div className="app-doc">
		        <div className="app-bd bookingDetails-bd">
		            <div className="bookingDetails-Intro">
		                 <div className="booking-infoBox">
		                    <div className="booking-img">
		                        <img src={this.state.images
		                        ? this.state.images
		                        : require('../../static/images/booking-img.png')} />
		                    </div>
		                    <div className="booking-intro">
		                        <h3 className="booking-name app-txt-nowrap-2">{this.state.name}</h3>
		                        <div className="booking-groupPerson">
		                            <p>适宜人群：{this.state.usePersonStr}</p>
		                            {this.state.amount?
		                            <div className="count-price"><em className="rmb">¥</em><span className="count-price-sale">{this.state.amount}</span></div>
									:null
		                            }
		                        </div>
		                    </div>
		                </div>
		           </div>
		           <div class="bookingDetails-notice"></div>
		           <div className="bookingDetails-items">
		                <div className="bookingDetails-items-total">
		                    <div className="total-title">基础项目（{this.state.baseCount}）</div>
		                    {this.state.baseAmount?
		                    	<div className="total-price"><span className="total-price-title">小计：</span><em className="rmb">¥</em><span className="total-price-sale">{this.state.baseAmount}</span></div>
		                    :
		                    null
		                    }
		                </div>
		               <div className="app-list">
		               		{this.state.isBase?
		               			baseLest
		                    :
		               			<a className="app-list-item" href="javascript:;">
				                    <div className="app-item-bd">无体检项目明细！</div>
				                </a>
		               		}
		                </div>
		           </div>
		           {this.state.isPlus?
			           <div className="bookingDetails-itemsOther">
			                <div className="bookingDetails-items-total">
			                    <div className="total-title">已添加项目（{this.state.plusCount}）</div>
			                    {this.state.plusAmount?
			                    <div className="total-price"><span className="total-price-title">小计：</span><em className="rmb">¥</em><span className="total-price-sale">{this.state.plusAmount}</span></div>
			                    :
			                    null
			                    }
			                </div>
			               	<div className="app-list">
			               		{plusLest}
			                </div>
			           </div>
		           	:
	           			null
	           		}
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
