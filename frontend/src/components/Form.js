import React, {Component} from 'react';
import ChooseFile from "./ChooseFile";
import NumOrPer from "./NumOrPer";
import SummarizeButton from "./SummarizeButton";
import {trackPromise} from "react-promise-tracker";
import {LoadingIndicator} from "./LoadingIndicator";
import Category from "./Category";


class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            maxNum: '',
            maxPer: null,
            category: null,
            working: false
        };

        this.handleSummary.bind(this);
    }


    onFileChange = event => {
        this.setState({selectedFile: event.target.files[0]});
        this.props.setStateOfParentFile(event.target.files[0])
    };

    onNumChange = event => {
        let val = event.target.value;
        this.setState({maxNum: val})
    };

    onPerChange = event => {
        let val = event.target.value;
        this.setState({maxPer: val})
    };

    onCategoryChange = event => {
        this.setState({category: event.target.value})
    };

    handleSummary = sum => {
        this.props.setStateOfParentSum(sum)
        this.props.setStateOfParentDone()
    };

    handleName = name => {
        let res = name.substring(0, name.lastIndexOf('.'))
        this.props.setStateOfParentName(res)
    };

    handleLink = link => {
        this.props.setStateOfParentLink(link)
    };

    handleTitle = title => {
        this.props.setStateOfParentTitle(title)
    };

    // On file upload (click the summarize button)
    onFileUpload = (ev) => {
        ev.preventDefault();
        this.setState({working: true});

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        formData.append('max_num', this.state.maxNum);
        formData.append('max_per', this.state.maxPer);
        formData.append('category', this.state.category);

        this.handleName(this.state.selectedFile.name);
        var route;
        console.log('fetch to', route)

        // Send formData object
        trackPromise(
            fetch(`${process.env.REACT_APP_ROUTE}/summarize`, {
                method: 'POST',
                body: formData,
                mode: 'cors'
            }).then(response => {
                if (!response.ok) {
                    alert('Failed');
                    return;
                }
                response.json().then(body => {
                    this.handleSummary(body['summary']);
                    this.handleLink(body['link'])
                    this.handleTitle(body['title'])
                })
            },).catch(e => alert('Connection error: ' + e))
        ).then(() => this.setState({working: false}))
    };


    render() {
        return (
            <form onSubmit={this.onFileUpload} style={{pointerEvents: 'auto'}} id="form-in">

                <ChooseFile onChange={this.onFileChange}/>
                <NumOrPer value={this.state.maxNum} onChange={this.onNumChange} onChange1={this.onPerChange}/>
                <Category onChange={this.onCategoryChange}/>
                <SummarizeButton disable={this.state.working}/>
                <LoadingIndicator/>
            </form>
        );
    }
}

export default Form;