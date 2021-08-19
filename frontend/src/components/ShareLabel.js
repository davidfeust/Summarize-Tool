import React, {Component} from 'react';
import '../styles/ShareLabel.css'

class ShareLabel extends Component {
    render() {
        return (
            <div>
                <div className="share-logo">
                    <img
                        src={'/images/share--logo.png'}
                        alt="share logo"
                        className="share-logo-img"
                        id="share-logo"
                    />
                </div>
                <p className="label-share-article">
                    Share Article
                </p>
            </div>
        );
    }
}

export default ShareLabel;