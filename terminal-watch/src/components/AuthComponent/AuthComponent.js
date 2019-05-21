import React from 'react';
import PropTypes from 'prop-types';

import './AuthComponent.css';

//import {clientEvents} from './events';

class AuthComponent extends React.PureComponent {

    static propTypes = {
    };

    state = {
    };

    componentWillReceiveProps = (newProps) => {
    };

    logIn = (e) => {
        // TODO: send data to host; => Receive access for user
        e.preventDefault();
        const {username, password} = this.refs;
        console.log('logged');
        console.log(username.value);
        console.log(password.value);
    };

    render() {

        console.log("AuthComponent render");
        return (
            <div className="container-login">
                <div className="wrap-login">
                    <form className="login-form validate-form" id="form-in" onSubmit={this.logIn}>
                        <span className="login-form-title">Sign In</span>
                        <div className="wrap-input validate-input" data-validate="Username is required">
                            <span className="label-input">Username</span>
                            <input id="user_sign_in" className="input form_in_input" type="text" name="username"
                                   placeholder="Enter Your Username" ref="username"/>
                            <span className="focus-input"></span>
                        </div>
                        <div className="wrap-input validate-input" data-validate="Password is required">
                            <span className="label-input">Password</span>
                            <input className="input form_in_input" type="password" name="pass"
                                   placeholder="Enter password" ref="password"/>
                            <span className="focus-input"></span>
                        </div>
                        <div className="container-login-form-btn">
                            <div className="wrap-login-form-btn">
                                <div className="login-form-bgbtn"></div>
                                <input className="login-form-btn" id="signin" type="submit" value="Sign In"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AuthComponent
