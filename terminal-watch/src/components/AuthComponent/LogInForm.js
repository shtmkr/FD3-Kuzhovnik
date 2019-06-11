import React from 'react';
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
                        <span className="login-form-title">Войти</span>
                        <div className="wrap-input validate-input" data-validate="Username is required">
                            <span className="label-input">Логин</span>
                            <input id="user_sign_in" className="input form_in_input" type="text"
                                   placeholder="Ввведите логин" />
                            <span className="focus-input"></span>
                        </div>
                        <div className="wrap-input validate-input" data-validate="Password is required">
                            <span className="label-input">Пароль</span>
                            <input className="input form_in_input" type="password"
                                   placeholder="Введите пароль" />
                            <span className="focus-input"></span>
                        </div>
                        <div className="container-login-form-btn">
                            <div className="wrap-login-form-btn">
                                <div className="login-form-bgbtn"></div>
                                <input className="login-form-btn" id="signin" type="submit" value="Войти" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(LogInForm)
