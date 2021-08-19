import React from 'react';
import '../styles/ChooseFile.css'

function ChooseFile(props) {
    return <div className="choose-file" id="choose-file">
        <label>
            <input accept=".txt, .docx, .doc, .pdf, .html" id="file-selector2" name="file" type="file"
                   onChange={props.onChange} required/>
            <div className="Choose-your-file" key="0">Choose your file</div>
        </label>
    </div>;

}

export default ChooseFile;