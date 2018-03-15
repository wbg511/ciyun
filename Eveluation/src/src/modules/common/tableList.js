import React, {
    Component
} from "react";
export default class TableList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            up_down: true,
            is_up_down: this.props.up_down,
        }
        this.up_down = this.up_down.bind(this);
    }
    up_down() {
        var {
            up_down
        } = this.state;
        this.setState({
            up_down: !up_down
        });
    }
    render() {
        let {
            up_down,
            is_up_down
        } = this.state;
        is_up_down = this.props.todos.length > 6 ? true : false;
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            {this.props.th_props.map(function (item, index) {
                                return <th key={index} width={item.th_width}>{item.th_name}</th>
                            })}
                        </tr>
                        {this.props.todos.map(function (item, index) {
                            if (!item.project) { return }
                            var color = item.project.hasOwnProperty('normal')?item.project.normal?null:{color:"red"}:null;
                            var o_color = item.project.hasOwnProperty('normal_o')?item.project.normal_o?null:{color:"red"}:null;
                            var value_o = item.project.value_o?item.project.value_o:"--";
                            return <tr className={is_up_down ? index > 5 ? up_down ? "none" : "" : "" : null} key={item.key}><td>{item.project.name}</td><td style={color}>{item.project.value}</td><td style={o_color}>{value_o}</td><td>{item.project.scope}</td></tr>
                        })}
                    </tbody>
                </table>
                {
                    is_up_down ?
                        <div className={up_down ? "up_down_content" : "active up_down_content"} onClick={this.up_down}>
                            {up_down ? "展开" : "收起"}
                        </div> : null
                }

            </div>
        )
    }
}