import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import phyInit from '../../common/phy.init';
import axios from "../../common/httpAjax";
import qs from "qs";
import $ from "jquery";


export default class Index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  render() {
    return (
      <div>这个是个性推荐列表</div>
    )
  }
}
