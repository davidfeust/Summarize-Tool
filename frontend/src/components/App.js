import '../styles/App.css';
import HeadTitle from "./HeadTitle";
import Form from "./Form";
import TextArea from "./TextArea";
import ShareButtonsGroup from "./ShareButtonsGroup";
import {Component} from "react";
import * as React from 'react'
import {Route, Switch} from "react-router-dom";
import OriginalFile from "./OriginalFile";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            summary: "",
            fileName: "",
            done: false,
            link: "",
            selectedFile: null,
            title: ""
        };
        // this.setStateOfParentSum.bind(this);
        this.setStateOfParentSum = this.setStateOfParentSum.bind(this);
        this.setStateOfParentName = this.setStateOfParentName.bind(this);
        this.setStateOfParentDone = this.setStateOfParentDone.bind(this);
        this.setStateOfParentLink = this.setStateOfParentLink.bind(this);
        this.setStateOfParentFile = this.setStateOfParentFile.bind(this);
        this.setStateOfParentTitle = this.setStateOfParentTitle.bind(this);
    }

    setStateOfParentSum = (newSummary) => {
        this.setState({summary: newSummary});
    }
    setStateOfParentName = (newName) => {
        this.setState({fileName: newName});
    }
    setStateOfParentDone = () => {
        this.setState({done: true});
    }
    setStateOfParentLink = (link) => {
        this.setState({link: link});
    }

    setStateOfParentFile = (file) => {
        this.setState({selectedFile: file});
    }

    setStateOfParentTitle = (title) => {
        this.setState({title: title});
    }

    render() {
        return (
            <div className="Page" id="Page">
                <div className="Frame" id="Frame">
                    <HeadTitle/>
                    <Switch>
                        <Route exact path="/">

                            <Form setStateOfParentSum={this.setStateOfParentSum}
                                  setStateOfParentName={this.setStateOfParentName}
                                  setStateOfParentDone={this.setStateOfParentDone}
                                  setStateOfParentLink={this.setStateOfParentLink}
                                  setStateOfParentFile={this.setStateOfParentFile}
                                  setStateOfParentTitle={this.setStateOfParentTitle}
                            />

                            <div className="bottom-area">

                                <TextArea setSummary={this.state.summary} setTitle={this.state.title}/>
                                <OriginalFile isDone={this.state.done} file={this.state.selectedFile}/>
                                <ShareButtonsGroup setSummary={this.state.summary} name={this.state.fileName}
                                                   isDone={this.state.done} link={this.state.link}/>
                            </div>


                        </Route>

                        <Route path="/summary/:id">
                            <div className="bottom-area">

                                <TextArea setSummary={this.state.summary} setTitle={this.state.title}
                                          setStateOfParentDone={this.setStateOfParentDone}
                                          setStateOfParentSum={this.setStateOfParentSum}
                                          setStateOfParentLink={this.setStateOfParentLink}
                                          setStateOfParentTitle={this.setStateOfParentTitle}
                                />
                                <ShareButtonsGroup setSummary={this.state.summary} name={this.state.fileName}
                                                   isDone={this.state.done} link={this.state.link}/>
                            </div>

                        </Route>

                    </Switch>

                </div>
            </div>
        );
    }
}

export default App;
