import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import { Route, withRouter, Switch} from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Toolbar from '../Toolbar/Toolbar';
import Message from "../Message/Message";
import DeviceList from "../DeviceList/DeviceList";
import EventList from "../EventList/EventList";
import MessageHistory from "../MessageHistory/MessageHistory";
import combinedReducer from "../../redux/reducers/reducers";
import {sendRequest} from "../../helpers/sendRequest";
import C from '../../constants';

const menu = require('./menu.json');
const store = createStore(combinedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/*
    store state:
        devices :
            devices: Array - array of devices
            device: String - selected device
            status: Number - is loaded
*/

class Admin extends React.PureComponent {

    static propTypes = {
        evt: PropTypes.object.isRequired,
    };

    state = {
        list: '',
    };

    componentDidMount = () => {
        this.props.evt.emit('loaded', {type: 'success', message: 'Welcome to tWatch!'});
        this.props.evt.addListener('subMenuSelected', this.startSubMenuProcess);
    };

    componentWillUnmount = () => {
        this.props.evt.removeListener('subMenuSelected', this.startSubMenuProcess)
    };

    startSubMenuProcess = (submenu) => {
        let submenuText = submenu.children[0].children[1].textContent;
        let currentUrl = this.props.history.location.pathname;
        let reg = /(admin\/\w+\/\w+\/\d)|(admin\/\w+)/; // exmpl /admin/devices_kiosk/page/1 or /admin/devices_kiosk
        let nextPage;
        if (submenuText === 'Банкоматы'){
            nextPage = `admin/devices_atm/page/1`;
            if (currentUrl === '/admin'){
                this.props.history.push(nextPage);
            } else {
                if (currentUrl === "/" + nextPage) {
                    console.log('thre no changes')
                } else {
                    this.props.history.push( currentUrl.replace(reg, nextPage) );
                }
            }
            this.setState({list: submenuText})
        }
        if (submenuText === 'Инфокиоски'){
            nextPage = `admin/devices_kiosk/page/1`;
            if (currentUrl === '/admin'){
                this.props.history.push(nextPage);
            } else {
                if (currentUrl === "/" + nextPage) {
                    console.log('thre no changes')
                } else {
                    this.props.history.push( currentUrl.replace(reg, nextPage) );
                }
            }
            this.setState({list: submenuText})
        }
        if (submenuText === 'Ошибки'){
            if (currentUrl === '/admin'){
                this.props.history.push(`admin/events_error`);
            } else {
                this.props.history.push( currentUrl.replace(reg, 'admin/events_error') );
            }
            this.setState({list: submenuText})
        }
        if (submenuText === 'Предупреждения'){
            if (currentUrl === '/admin'){
                this.props.history.push(`admin/events_warn`);
            } else {
                this.props.history.push( currentUrl.replace(reg, 'admin/events_warn') );
            }
            this.setState({list: submenuText})
        }
    };

    render () {
        console.log('Admin render');
        sendRequest('/auth/setPath', response => console.log(response),
            {...C.OPTIONS_POST, body: JSON.stringify({path: this.props.location.pathname})});
        let currPage;
        if (this.props.history.location.pathname.match(/\d/)){
            currPage = this.props.history.location.pathname.match(/\d/);
        }

        return (
            <Provider store={store}>
                <Fragment>
                    <Toolbar menu={menu} evt={this.props.evt}/>
                    <Message/>
                    <Switch>
                        <Route path="/admin/devices_atm/page/:page"
                               render={ props => <DeviceList evt={this.props.evt} dataPath='/data/devices_atm' devicesPerPage={10} resizable={true} history={this.props.history} currentPage={parseInt(currPage[0])}/> } />
                        <Route path="/admin/devices_kiosk/page/:page"
                               render={ props => <DeviceList evt={this.props.evt} dataPath='/data/devices_kiosk' devicesPerPage={10} resizable={true} history={this.props.history} currentPage={parseInt(currPage[0])}/> } />
                        <Route path="/admin/events_error"
                               render={ props => <EventList dataPath='/data/devices_events' eType={'error'}/> } />
                        <Route path="/admin/events_warn"
                               render={ props => <EventList dataPath='/data/devices_events' eType={'warn'}/> } />
                    </Switch>
                    <MessageHistory/>
                </Fragment>
            </Provider>
        );
    }
}

export default withRouter(Admin)
