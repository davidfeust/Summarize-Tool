import React from 'react';
import '../styles/Max.css'

class MaxPercentage extends React.Component {

    range = (start, stop, step = 1) =>
        Array(Math.ceil((stop + 1 - start) / step)).fill(start).map((x, y) => x + y * step);

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.percentage_list = this.range(10, 100, 5);
    }

    render() {
        return <div className="max-bg">
            <select className="max-input" style={{paddingTop: "13px"}} id="percentage-max"
                    onChange={this.props.onChange1} required={this.props.required}>
                <option value="">Percentage of summary</option>
                {this.percentage_list.map(x => <option value={x / 100} key={x}>{x}%</option>)}
            </select>
        </div>;
    }
}

export default MaxPercentage;