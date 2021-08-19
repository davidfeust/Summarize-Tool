import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import App from './components/App';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ShowArticle from "./components/pages/ShowArticle";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route exact path="/show/:id" render={(props) => <ShowArticle {...props} /> }>
                </Route>

                <Route path="/">
                    <App/>
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
