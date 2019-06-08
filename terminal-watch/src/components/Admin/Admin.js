import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Link, Redirect, withRouter, Switch} from "react-router-dom";

import Toolbar from '../Toolbar/Toolbar'
import Message from "../Message/Message";
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
        let reg = /admin\/\w+/; // TODO: проверка
        if (submenuText === 'Банкоматы'){
            if (this.props.history.location.pathname === '/admin'){
                this.props.history.push(`admin/devices_atm/page/1`);
            } else {
               this.props.history.push( this.props.history.location.pathname.replace(reg, 'admin/devices_atm/page/1') );
            }
            this.setState({list: submenuText})
        }
        if (submenuText === 'Инфокиоски'){
            if (this.props.history.location.pathname === '/admin'){
                this.props.history.push(`admin/devices_kiosk`);
            } else {
                this.props.history.push( this.props.history.location.pathname.replace(reg, 'admin/devices_kiosk') );
            }
            this.setState({list: submenuText})
        }
        if (submenuText === 'Ошибки'){
            if (this.props.history.location.pathname === '/admin'){
                this.props.history.push(`admin/events_error`);
            } else {
                this.props.history.push( this.props.history.location.pathname.replace(reg, 'admin/events_error') );
            }
            this.setState({list: submenuText})
        }
        if (submenuText === 'Предупреждения'){
            if (this.props.history.location.pathname === '/admin'){
                this.props.history.push(`admin/events_warn`);
            } else {
                this.props.history.push( this.props.history.location.pathname.replace(reg, 'admin/events_warn') );
            }
            this.setState({list: submenuText})
        }
    };

    render () {
        console.log('Admin render');
        let currPage;
        if (this.props.history.location.pathname.match(/\d/)){
            currPage = this.props.history.location.pathname.match(/\d/);
        }

        return (
            <Fragment>
                <Toolbar menu={menu} evt={this.props.evt}/>
                <Message/>
                <Switch>
                    <Route path="/admin/devices_atm/page/:page"
                           render={ props => <DeviceList evt={this.props.evt} devices={atm} devicesPerPage={10} resizable={true} history={this.props.history} currentPage={parseInt(currPage[0])}/> } />
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
