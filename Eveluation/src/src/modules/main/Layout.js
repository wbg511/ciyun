import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import "../style/css/app.lib.css";
import 'antd-mobile/dist/antd-mobile.css';



class Layout extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (<div className="app-doc">
        {this.props.children}
        
    </div>)
  }

}

Layout.contextTypes = {
  router: PropTypes.object
}

export default connect((state) => {
  return {}
})(Layout)
