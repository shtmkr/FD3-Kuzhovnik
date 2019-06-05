import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {msg} from "../../events/events";

import './MessageHistory.css';


class MessageHistory extends React.PureComponent {

    static propTypes = {

    };

    componentDidMount = () => {
        msg.addListener('log',this.log);

    };

    componentWillUnmount = () => {
        msg.removeListener('log', this.log);

    };

    componentWillReceiveProps = (newProps) => {
    };

    state = {
        messages: []
    };

    log = (message) => {
        let newMessages = [...this.state.messages];
        newMessages.unshift(message);

        this.setState({messages: newMessages});
    };


    render() {
        console.log("MessageHistory render");
        return (
            <Fragment>
                <div className='MessageHistory'>
                    <ul className='message-list'>
                        {this.state.messages.map( (message, index) => {
                            return (
                                <li key={index}>{message}</li>
                            )
                        })}
                    </ul>
                </div>
            </Fragment>
        )
    }
}


export default MessageHistory;
