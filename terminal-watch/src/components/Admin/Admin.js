import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Link, Redirect, withRouter, Switch} from "react-router-dom";

import Toolbar from '../UI/Toolbar/Toolbar'
import Message from "../UI/Message/Message";
import DeviceList from "../DeviceList/DeviceList";
import EventList from "../EventList/EventList";
import MessageHistory from "../MessageHistory/MessageHistory";

const menu = require('./menu.json');
const atm = require('./devicesATM.json');
const kiosk = require('./devicesKIOSK.json');
const deviceEvents = require('./deviceEvents.json');

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
        let submenuText = submenu.children[0].children[1].textContent;
        console.log(submenuText);
        if (submenuText === 'Банкоматы'){
            /*this.props.history.push(`${this.props.history.location.pathname}/devices_atm`);*/
            this.props.history.push(`/`);
            this.props.history.push(`admin/devices_atm`);
            this.setState({list: submenuText})
        }
        if (submenuText === 'Инфокиоски'){
            this.props.history.push(`/`);
            this.props.history.push(`admin/devices_kiosk`);
            this.setState({list: submenuText})
        }
        if (submenuText === 'Ошибки'){
            this.props.history.push(`/`);
            this.props.history.push(`admin/events_error`);
            this.setState({list: submenuText})
        }
        if (submenuText === 'Предупреждения'){
            this.props.history.push(`/`);
            this.props.history.push(`admin/events_warn`);
            this.setState({list: submenuText})
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
                    <Route path="/admin/devices_kiosk"
                           render={ props => <DeviceList evt={this.props.evt} devices={kiosk} devicesPerPage={10} resizable={true}/> } />
                    <Route path="/admin/events_error"
                           render={ props => <EventList evt={this.props.evt} events={deviceEvents} resizable={true} eType={'error'}/> } />
                    <Route path="/admin/events_warn"
                           render={ props => <EventList evt={this.props.evt} events={deviceEvents} resizable={true} eType={'warn'}/> } />
                </Switch>
                <MessageHistory/>
            </Fragment>
        );
    }
}

export default withRouter(Admin)
