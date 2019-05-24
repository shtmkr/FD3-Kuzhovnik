import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import './Message.css';
import {toolbarEvents} from '../../Admin/Admin'

class Message extends React.PureComponent {

    static propTypes = {
    };

    componentDidMount = () => {
        toolbarEvents.addListener('loaded',this.show);
    };

    componentWillUnmount = () => {
        toolbarEvents.removeListener('loaded');
    };

    state = {
        isShowed: false,
        messageText: '',
    };

    show = (data) => {
        this.setState({isShowed: true, messageText: data}, () => {
            setTimeout(this.hide, 3000)
        })
    };

    hide = () => {
        this.setState({isShowed: false})
    };

    render() {

        console.log("Message render");

        return (
            this.state.isShowed && <div className='Message'><span>{this.state.messageText}</span></div>
        );
    }

}

export default Message;
