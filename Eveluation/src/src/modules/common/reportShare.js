import React, {
  Component
} from "react";
import common from './common';

class ReportShare extends Component {
  constructor(props) {
		super(props);
	}
  componentDidMount() {
    common.reportShare(this.props.gender||localStorage.getItem("genter"));
  }
  render() {
    
    return (
      <div>
          {common.appShare(this.props.gender||localStorage.getItem("gender"))}
      </div>
    )
  }
}

export default ReportShare;