import React from 'react';
import PropTypes from 'prop-types';
import LogInForm from './LogInForm';
import {BrowserRouter, Route, Link, Redirect, withRouter} from "react-router-dom";

import './AuthComponent.css';

//import {clientEvents} from './events';

class LogIn extends React.PureComponent {

    static propTypes = {
    };

    state = {
        logged: false
    };

    login = () => {
        console.log('logged in as admin');
        this.setState({logged: !this.state.logged})
    };

    render() {
        console.log("LogIn render");
        return (
            <BrowserRouter>
                <Route path="/admin" render={ props => this.state.logged ? <Admin/> : <Redirect to="/auth"/>} />
                <Route path="/auth" component={LogInForm} />
                <Route path="/" exact render={ (props) => <LogInForm cbLogin={this.login}/>} />
            </BrowserRouter>
        );
    }
}

class Admin extends React.PureComponent{
    render () {
        return <h3>Welcome to tWatch admin page</h3>;
    }
}


export default LogIn
