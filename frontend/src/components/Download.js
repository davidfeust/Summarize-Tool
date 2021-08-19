import React from 'react';
import '../styles/Download.css'
import Login from "./pages/Login";


class Download extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wasShown: false,
            visible: false,
            reg: false
        }
    }

    onDownload = () => {
        this.setState({visible: false})
        const a = document.createElement("a");
        const type = 'text/plain';
        let content = 'Summary: ' + this.props.name + '\n' + this.props.setSummary;
        const file = new Blob([content], {type: type});
        a.href = URL.createObjectURL(file);
        a.download = 'Summary: ' + this.props.name + '.txt';
        a.click();
    }

    onClick = () => {
        if (!this.state.wasShown) {
            this.setState({visible: true});
        }
        if (localStorage.getItem('pop_status')) {
            this.onDownload()
        }
    }

    setVisible = () => {
        this.setState({visible: false});
    }
    setWasShown = () => {
        this.setState({wasShown: true});
    }

    render() {


        return (
            <>
                {this.state.visible ? <Login onDownload={this.onDownload.bind(this)}
                                             changeVisible={this.setVisible.bind(this)}
                                             changeWasShown={this.setWasShown.bind(this)}
                /> : ""}

                <button className={this.props.class} id="download-btn"
                        onClick={this.onClick}
                        disabled={!this.props.isDone}
                >
                    <div className="download-label" id="download-label">
                        Download
                    </div>
                </button>
            </>
        );
    }
}

export default Download;