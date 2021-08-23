import MaxNum from "./MaxNum";
import MaxPercentage from "./MaxPercentage";
import {Component} from "react";

class NumOrPer extends Component {

    unmarked = {
        background: "transparent",
        color: "#000358",
        cursor: "pointer"
    }
    marked = {
        background: "#458CFE",
        color: "#FFFFFF",
        pointerEvents: "none"
    }


    constructor(props) {
        super(props);

        this.state = {
            numMark: false,
            perMark: true
        }
    }

    change() {
        this.setState({
            numMark: !this.state.numMark,
            perMark: !this.state.perMark
        })
        this.props.isPer()
    }

    render() {

        let A = this.state.numMark ? this.marked : this.unmarked;
        let B = this.state.perMark ? this.marked : this.unmarked;


        return <>
            <div className="rec">
                <div className="choice" style={Object.assign({left: "88px"}, B)}
                     onClick={this.change.bind(this)}>
                    <div className="text-label">Percentages</div>
                </div>
                <div className="choice" style={Object.assign({right: "-78px"}, A)}
                     onClick={this.change.bind(this)}>
                    <div className="text-label">Max Words</div>
                </div>
            </div>

            {this.state.numMark ?
                <MaxNum value={this.props.value} onChange={this.props.onChange} required={this.state.numMark}/> :
                <MaxPercentage onChange1={this.props.onChange1} required={!this.state.numMark}/>}
        </>;
    }


}

export default NumOrPer;