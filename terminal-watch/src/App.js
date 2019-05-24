import React from 'react';
import PropTypes from 'prop-types';
import LogInForm from './components/AuthComponent/LogInForm';
import Admin from './components/Admin/Admin';
import {BrowserRouter, Route, Link, Redirect, withRouter} from "react-router-dom";

import './components/AuthComponent/AuthComponent.css';

//import {clientEvents} from './events';

class App extends React.PureComponent {

    static propTypes = {
    };

    state = {
        logged: true
    };

    login = () => {
        console.log('logged in as admin');
        this.setState({logged: true})
    };

    render() {
        console.log("App render");
        return (
            <BrowserRouter>
                <Route path="/admin" render={ props => this.state.logged ? <Admin/> : <Redirect to="/auth"/>} />
                <Route path="/auth"  render={ props => <LogInForm cbLogin={this.login}/>} />
                <Route path="/" exact render={ props => <LogInForm cbLogin={this.login}/>} />
            </BrowserRouter>
        );
    }
}

export default App
