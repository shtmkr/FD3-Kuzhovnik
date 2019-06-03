import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Link, Redirect, withRouter, Switch} from "react-router-dom";

import Toolbar from '../UI/Toolbar/Toolbar'
import Message from "../UI/Message/Message";
import DeviceList from "../DeviceList/DeviceList";

const menu = require('./menu.json');
const atm = require('./devicesATM.json');

class Admin extends React.PureComponent {

    static propTypes = {
        evt: PropTypes.object.isRequired,
    };

    state = {
        list: '',
    };

    componentDidMount = () => {
        this.props.evt.emit('loaded', {type: 'success', message: 'Welcome to tWatch!'});
        this.props.evt.addListener('subMenuSelected', this.startSubMenuProcess)
    };

    componentWillUnmount = () => {
        this.props.evt.removeListener('subMenuSelected', this.startSubMenuProcess)
    };

    startSubMenuProcess = (submenu) => {
        if (submenu.textContent === 'Банкоматы'){
            this.props.history.push(`${this.props.history.location.pathname}/devices_atm`);
            this.setState({list: submenu.textContent})
        }
    };

    render () {
        console.log('Admin render');
        return (
            <Fragment>
                <Toolbar menu={menu} evt={this.props.evt}/>
                <Message/>
                <Switch>
                    <Route path="/admin/devices_atm"
                           render={ props => <DeviceList evt={this.props.evt} devices={atm} devicesPerPage={10} resizable={true}/> } />
                </Switch>
            </Fragment>
        );
    }
}

export default withRouter(Admin)
