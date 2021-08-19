import React, {Component} from 'react';
import '../styles/ShareButtonsGroup.css'
import ShareButton from "./ShareButton";
import ShareLabel from "./ShareLabel";
import Download from "./Download";
import {
    EmailShareButton,
    LinkedinShareButton,
    TwitterShareButton
} from "react-share";


class ShareButtonsGroup extends Component {


    render() {
        const share_text = 'I just summarized an article on HiLo! Try it for yourself on here'
        const title = 'HiLo Summarize Tool'

        let current_url = window.location.href;
        let url_link = current_url + 'summary/' + this.props.link;

        return (
            <div className="Group-share" id="Group-share">
                <ShareLabel/>
                <div className="Group-btns">

                    <LinkedinShareButton disabled={!this.props.isDone} url={url_link} subject={title}
                                         body={share_text}>
                        <ShareButton logo={'/images/logo--linkedin.png'} id={'linkedin'}/>
                    </LinkedinShareButton>

                    <TwitterShareButton disabled={!this.props.isDone} url={url_link} title={share_text}>
                        <ShareButton logo={'/images/logo--twitter.png'} id={'twitter'}/>
                    </TwitterShareButton>

                    <EmailShareButton disabled={!this.props.isDone} url={url_link} title={title}
                                      summary={share_text}>
                        <ShareButton logo={'/images/logo--mail.png'} id={'mail'}/>
                    </EmailShareButton>

                </div>
                <Download setSummary={this.props.setSummary} name={this.props.name}
                          isDone={this.props.isDone} class={"download-btn"}/>
            </div>
        );
    }
}

export default ShareButtonsGroup;