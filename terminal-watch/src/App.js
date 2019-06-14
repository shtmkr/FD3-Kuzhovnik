import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import LogInForm from './components/AuthComponent/LogInForm';
import Admin from './components/Admin/Admin';
import {BrowserRouter, Route, Redirect} from "react-router-dom";

import './App.css'
import './components/AuthComponent/AuthComponent.css';
import {EventEmitter} from "events";
import {sendRequest} from "./helpers/sendRequest";

export const appEvents = new EventEmitter(); /// Main stream of events

class App extends React.PureComponent {

    static propTypes = {
    };

    state = {
        logged: false,
    };

    componentDidMount() {
        appEvents.addListener('logout', this.logout);
    }

    componentWillUnmount() {
        appEvents.removeListener('logout', this.logout);
    }

    logout = () => {
        sendRequest('/auth/logout', response => {
            console.log(response);
            if (response.result !== 'logged'){
                this.setState({logged: false})
            }
        })
    };

    login = () => {
        console.log('logged in as admin');
        this.setState({logged: !this.state.logged})
    };

    render() {
        console.log("App render");
        return (
            <Fragment>
                <BrowserRouter>
                    <Route path="/admin" render={ props => this.state.logged ? <Admin evt={appEvents}/> : <Redirect to="/signin"/>} />
                    <Route path="/signin"  render={ props => <LogInForm cbLogin={this.login}/>} />
                    <Route path="/" exact render={ props => <Redirect to="/signin"/>} />
                </BrowserRouter>
            </Fragment>

        );
    }
}

export default App
