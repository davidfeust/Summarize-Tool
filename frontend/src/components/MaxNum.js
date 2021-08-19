import React from 'react';
import '../styles/Max.css'

function MaxNum(props) {
    return <div className="max-bg" id="max-words">
        <input className="max-input" id="max" type="number" min="1"
               value={props.value !== -1 ? props.value : ''}
               onChange={props.onChange}
               placeholder="Max words length"
               required={props.required}
        />
    </div>;
}

export default MaxNum;