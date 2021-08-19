import React, {Component} from 'react';
import '../../styles/ShowArticle.css'

class ShowArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            article: "",
        }
        let id = this.props.match.params.id;


        fetch('http://localhost:5000/show_article?id=' + id, {
            method: 'POST',
            mode: 'cors'
        }).then(response => {
            response.json().then(body => {
                let text = body['content'];
                let title = body['title'];
                this.setState({article: text, title: title})
            })
        });

    }

    render() {


        return (
            <div>
                <div className="head-title">
                    <img src={'/images/HiLo--logo.png'} alt="HiLo logo"/>
                    <h1 className="title">
                        {this.state.title}
                    </h1>
                    <div className="rectangle"/>
                </div>

                <div className="article-text">
                    {this.state.article}
                </div>
            </div>
        );
    }
}

export default ShowArticle;