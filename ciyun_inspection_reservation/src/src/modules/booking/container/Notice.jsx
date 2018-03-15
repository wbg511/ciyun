import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import phyInit from '../../common/phy.init';
import axios from "../../common/httpAjax";
import qs from "qs";
import $ from "jquery";
import {Toast} from 'antd-mobile';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      precautions: ""
    }
  }
  createMarkup(str) {
    return {__html: str};
  }
  //获取体检注意事项
  getNotice(type) {
    //预约记录里面传参数1： recordId 其他传2： reservationId
    if (type == "booking") {
      var data = {
        "reservationId": this.props.params.id
      }
    } else if (type == "histroy") {
      var data = {
        "recordId": this.props.params.id
      }
    }
    axios({url: "/package/precautions.json", data: data, method: "post"}).then((response) => {
      if (response.data.code == 0) {
        if(response.data.result.precautions!=""){
          this.setState({precautions: response.data.result.precautions})
        }else{
          this.setState({precautions: '体检注意事项未设置内容'})
        }

      } else {
        Toast.fail(response.data.msg, 3, '', true);
      }
    });
  }
  componentDidMount() {
    this.getNotice(this.props.params.type);
    phyInit.title("体检注意事项");
  }
  render() {
    return (<div class="app-doc">
      <div class="app-bd">
        <div class="app-notice-doc"  dangerouslySetInnerHTML={this.createMarkup(this.state.precautions)}></div>
      </div>
    </div>)
  }
}
