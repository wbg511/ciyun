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
import axios from "./httpAjax";
import common from './common';
import qs from "qs";
import $ from "jquery";
import {
	Modal
} from 'antd-mobile';

export default class NavList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navList: [],
			isNavList: false,
			isNavShow: false,
			questionaireKey: "",
			progress: ""
		};
		this.openPopup = this.openPopup.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.hashUrl = this.hashUrl.bind(this);
	}
	componentDidMount() {
		this.getHealthRisk();

		//微信分享 可以根据实际情况处理
		var gender = this.props.gender;
		var sharetitle = gender == 1 ? common.wxShareInfo.sharename + "(男)" : common.wxShareInfo.sharename + "(女)";
		var sharelinkUrl = common.wxShareInfo.shareurl;
		var shareimgUrl = common.wxShareInfo.shareimage;
		var sharedesc = common.wxShareInfo.sharedesc;
		common.wxShare(sharetitle, sharelinkUrl, shareimgUrl, sharedesc, "", "");

	}

	//查询导航
	getHealthRisk() {
		axios({
			url: "/personHealthRisk/state?personId=" + this.props.personId + "&evaluationKey=" + this.props.evaluationKey + "&gender=" + this.props.gender + "&evaluationId=" + this.props.evaluationId,
			method: "get"
		}).then((response) => {
			var paramsMap = '';
			var gData = response.data;
			if (gData.data.questionarieParams != undefined) {
				paramsMap = gData.data.questionarieParams;
			}
			if (gData.code == 0 && paramsMap.length > 0) {
				var isNavShow = false;
				if (gData.data.progress > 0) {
					isNavShow = true;
				}
				this.setState({
					navList: paramsMap,
					isNavShow: isNavShow,
					questionaireKey: gData.data.questionaireKey,
					progress: gData.data.progress
				});
			} else {
				this.setState({
					isNavShow: false
				});
			}
		});
	}
	openPopup() {
		this.setState({
			isNavList: !this.state.isNavList
		});
	}
	closePopup() {
		this.setState({
			isNavList: false
		});
	}
	hashUrl(pName) {
		Modal.alert("跳转问卷", "问卷跳转后当前修改的内容不会保存，确定要跳转问卷吗？", [{
			text: "取消",
			onPress: () => {
				this.setState({
					isNavList: false
				});
			}
		}, {
			text: "确定",
			onPress: () => {
				hashHistory.push({
					pathname: '/answer/' + pName,
					state: {
						personId: this.props.personId,
						evaluationId: this.props.evaluationId,
						gender: this.props.gender,
						questionaireKey: pName
					}
				});
			}
		}], "ios")
	}
	render() {
		if (this.state.isNavShow) {
			console.log();
			const navItemList = this.state.navList.map((item, index) => {
				var curClass = '',
					progressVal = '';
				if (item.key == this.props.pName) {
					curClass = 'cur';
				}

				if (this.state.navList.length <= this.state.progress) {
					progressVal = this.state.navList.length;
				} else {
					progressVal = this.state.progress;
				}
				if (curClass == '' && (index) <= progressVal) {
					return (
						<li key={index}
		           onClick={(event)=>{
		             this.hashUrl(item.key)
		           }}
		          >{item.name}</li>
					)
				} else if ((index) <= progressVal) {
					return (
						<li key={index}
		           class={curClass}
		          >{item.name}</li>
					)
				}

			})
			return (
				<div className="app-popup-list">						
		        <div className="app-edit">
		          <a href="javascript:;" onClick={this.openPopup}>
		            <img src={require("static/images/icon-edit.png")} alt="" />
		          </a>
		        </div>
		        {this.state.isNavList?
					<div className="app-popup">
			          <ul>
			            {navItemList}
			          </ul>
			        </div>
		        :
		        	null
		       	}
						{this.state.isNavList?
			      	<div className="sortmask" onClick={this.closePopup} style={this.state.isNavList?{display:''}:{display:'none'}}></div>
			      :
			        null
			      }
		      </div>

			)
		} else {
			return (
				<div className="app-popup-list">
					
	      		</div>
			)
		}
	}
}