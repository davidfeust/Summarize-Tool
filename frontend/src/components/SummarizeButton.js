import React from 'react';
import '../styles/SummarizeButton.css'

function SummarizeButton(props) {
    return <div className="Group-2200" id="Group-2200">
        <input className="btn-sum" id="btn-sum" type="submit" value="Summarize!" disabled={props.disable}/>
    </div>;
}

export default SummarizeButton;