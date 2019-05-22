import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

import './AuthComponent.css';

class LogInForm extends React.Component {

    login = (e) => {
        e.preventDefault() ; // AJAX PLACE HERE ->>>>>> then
        this.props.history.push('/admin');
        this.props.cbLogin();
    };

    render() {
        return (
            <div className="container-login">
                <div className="wrap-login">
                    <form className="login-form validate-form" id="form-in" onSubmit={this.login}>
                        <span className="login-form-title">Sign In</span>
                        <div className="wrap-input validate-input" data-validate="Username is required">
                            <span className="label-input">Username</span>
                            <input id="user_sign_in" className="input form_in_input" type="text"
                                   placeholder="Enter Your Username" />
                            <span className="focus-input"></span>
                        </div>
                        <div className="wrap-input validate-input" data-validate="Password is required">
                            <span className="label-input">Password</span>
                            <input className="input form_in_input" type="password"
                                   placeholder="Enter password" />
                            <span className="focus-input"></span>
                        </div>
                        <div className="container-login-form-btn">
                            <div className="wrap-login-form-btn">
                                <div className="login-form-bgbtn"></div>
                                <input className="login-form-btn" id="signin" type="submit" value="Sign In" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(LogInForm)