import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import './Message.css';
import {appEvents} from '../../App'

class Message extends React.PureComponent {

    static propTypes = {
    };

    componentDidMount = () => {
        appEvents.addListener('loaded',this.show);
        appEvents.addListener('info',this.show);
        appEvents.addListener('atmLoaded',this.show);
    };

    componentWillUnmount = () => {
        appEvents.removeListener('loaded', this.show);
        appEvents.removeListener('atmLoaded', this.show);
        appEvents.removeListener('info', this.show);
    };

    state = {
        isShowed: false,
        messageText: '',
        style: {
            background: ''
        },
        icon: 'verified_user'
    };

    show = (messageData) => {
        if (messageData.type === 'success'){
            this.setState({isShowed: true,
                messageText: messageData.message,
                style: {background: 'rgba(51, 170, 51, .4)'}}, () => {
                setTimeout(this.hide, 5000)
            })
        }
        if (messageData.type === 'warning'){
            this.setState({isShowed: true,
                messageText: messageData.message,
                style: {background: 'rgba(255, 204, 0, .4)'},
                icon: 'warning'
            }, () => {
                setTimeout(this.hide, 5000)
            })
        }
        if (messageData.type === 'error'){
            this.setState({isShowed: true,
                messageText: messageData.message,
                style: {background: 'rgba(226, 0, 0, .4)'},
                icon: 'error'
            }, () => {
                setTimeout(this.hide, 5000)
            })
        }
    };

    hide = () => {
        this.setState({isShowed: false})
    };

    render() {

        console.log("Message render");

        return (
            this.state.isShowed
            &&
            <div className='Message' style={this.state.style}>
                <i className="material-icons message-icon">{this.state.icon}</i>
                <span>{this.state.messageText}</span>
                <i className="material-icons message-clear" onClick={this.hide}>clear</i>
            </div>
        );
    }

}

export default Message;
