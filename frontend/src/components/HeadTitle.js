import React from 'react';
import '../styles/HeadTitle.css'

function HeadTitle() {
    return (
        <div className="bg-head">
            <div className="text" id="text-1">
                <h1 className="title" id="HiLo-Summarize-Tool">
                    HiLo Summarize <br/>Tool
                </h1>
            </div>
            <div className="rectangle"/>
            <div className="text-explanation" id="text">
                Why not leverage technology to save the little time you have, and allow you to focus on what really matters?
            </div>
        </div>
    );
}

export default HeadTitle;