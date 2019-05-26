import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import Toolbar from '../UI/Menu/Toolbar'
import Message from "../UI/Message/Message";
import DeviceList from "../DeviceList/DeviceList";

const menu = require('./menu');
const atm = require('./devicesATM');

class Admin extends React.PureComponent {

    static propTypes = {
        evt: PropTypes.object.isRequired,
    };

    state = {
        deviceList: '',
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
            this.setState({deviceList: submenu.textContent})
        }
    };

    render () {
        return (
            <Fragment>
                <Toolbar menu={menu} evt={this.props.evt}/>
                <Message/>
                {this.state.deviceList === 'Банкоматы'
                && <DeviceList evt={this.props.evt} devices={atm} devicesPerPage={10}/>
                }
            </Fragment>
        );
    }
}

export default Admin
