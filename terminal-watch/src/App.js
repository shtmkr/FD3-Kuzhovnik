import React from 'react';
import LogInForm from './components/AuthComponent/LogInForm';
import Admin from './components/Admin/Admin';
import {BrowserRouter, Route, Redirect} from "react-router-dom";

import './components/AuthComponent/AuthComponent.css';
import {EventEmitter} from "events";

export const appEvents = new EventEmitter(); /// Main stream of events

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
                <Route path="/admin" render={ props => this.state.logged ? <Admin evt={appEvents}/> : <Redirect to="/signin"/>} />
                <Route path="/signin"  render={ props => <LogInForm cbLogin={this.login}/>} />
                <Route path="/" exact render={ props => <Redirect to="/signin"/>} />
            </BrowserRouter>
        );
    }
}

export default App
