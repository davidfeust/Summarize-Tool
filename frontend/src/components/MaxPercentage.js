import React from 'react';
import '../styles/Max.css'

class MaxPercentage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "PPPercentage of summary!!"
        };
    }

    render() {
        return <div className="max-bg">
            <select className="max-input" style={{paddingTop: "13px"}} id="percentage-max"
                    onChange={this.props.onChange1} required={this.props.required}
            >
                <option value="">Percentage of summary</option>
                <option value="0.10">10%</option>
                <option value="0.15">15%</option>
                <option value="0.2">20%</option>
                <option value="0.25">25%</option>
            </select>
        </div>;
    }
}

export default MaxPercentage;