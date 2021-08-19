import React, {Component} from 'react';
import '../styles/ShareButton.css'
import {Link} from "react-router-dom";

class ShareButton extends Component {
    render() {
        return (
            <Link to="/" className="share-btn" id={this.props.id} onClick={this.props.onClick}>
                <div className="outer">
                    <img
                        src={this.props.logo}
                        alt="logo"
                        className="logo"

                    />
                </div>
            </Link>
        );
    }
}

export default ShareButton;