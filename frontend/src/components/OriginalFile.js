import React from 'react';
import '../styles/OriginalFile.css'


class OriginalFile extends React.Component {


    onClick = () => {
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file",
            this.props.file,
            this.props.file.name
        );

        fetch(`${process.env.REACT_APP_ROUTE}/original`, {
            method: 'POST',
            body: formData,
            mode: 'cors'
        }).then(response => {
            if (!response.ok) {
                alert('Failed');
                return;
            }
            response.json().then(body => {
                let id = body['job_id'];
                let win = window.open('/show/' + id, '_blank');
                win.focus();
            })
        });


    }


    render() {
        return (
            <button className="original-btn"
                    onClick={this.onClick}
                    disabled={this.props.file == null}
            >
                <div className="original-label">
                    Open the original file
                </div>
            </button>
        );
    }
}

export default OriginalFile;