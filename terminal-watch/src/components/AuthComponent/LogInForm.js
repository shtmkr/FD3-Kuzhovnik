import React from 'react';
import {withRouter} from "react-router-dom";

import './AuthComponent.css';
import {sendRequest} from "../../helpers/sendRequest";

class LogInForm extends React.PureComponent {

    state = {
        result: '',
    };

    componentDidMount() {
        sendRequest('/auth/login', response => {
            console.log(response);
            if (response.result === 'logged'){
                this.props.cbLogin();
              /*  sendRequest('/auth/getPath', response => this.props.history.push(response.path));*/
            }
        })
    }

    login = (e) => {
        e.preventDefault() ; // AJAX PLACE HERE ->>>>>> then
        let userData = {login: this.loginInput.value, password: this.passwordInput.value};
        sendRequest('/auth/signin', response => {
            console.log(response);
            if (response.result === 'ok'){
                this.props.cbLogin();
                this.props.history.push('/admin');
            } else {
                this.setState({result: 'password or user name are WRONG'});
            }
        }, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)});
    };

    render() {
        return (
            <div className="container-login">
                <div className="wrap-login">
                    <form className="login-form validate-form" id="form-in" onSubmit={this.login}>
                        <span className="login-form-title">Войти</span>
                        <div className="wrap-input validate-input" data-validate="Username is required">
                            <span className="label-input">Логин</span>
                            <input id="user_sign_in" className="input form_in_input" type="text" ref={(el) => {this.loginInput = el}}
                                   placeholder="Ввведите логин" />
                            <span className="focus-input"></span>
                        </div>
                        <div className="wrap-input validate-input" data-validate="Password is required">
                            <span className="label-input">Пароль</span>
                            <input className="input form_in_input" type="password" ref={(el) => {this.passwordInput = el}}
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
                    <div className='result'>
                        {this.state.result}
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(LogInForm)
