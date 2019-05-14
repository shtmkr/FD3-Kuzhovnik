import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';

import {clientEvents} from './events';

class MobileClient extends React.PureComponent {

    static propTypes = {
        client: PropTypes.object.isRequired,
    };

    state = {
        client: this.props.client,
    };

    componentWillReceiveProps = (newProps) => {
       //console.log("MobileClient id="+newProps.client.id+" componentWillReceiveProps");
        if (newProps.client.id !== this.props.client.id){
            this.setState({
                client: newProps.client,
            })
        }
    };

    delete = () => {
        console.log('delete event handle');
        clientEvents.emit('delete', this.state.client.id);
    };

    render() {

        console.log("MobileClient id="+this.state.client.id+" render");

        return (
            <tr key={this.state.client.id} className='MobileClient'>
                {
                    Object.keys(this.state.client)
                        .filter(p => p !== 'id')
                        .map((col, index) => <td key={index}>{this.state.client[col]}</td>)
                }
                <td className='MobileClient__controls_edit'>
                    <button ref='del' onClick={this.edit}>Редактировать</button>
                </td>
                <td className='MobileClient__controls_delete'>
                    <button ref='edit' onClick={this.delete}>Удалить</button>
                </td>
            </tr>
        );

    }

}

export default MobileClient;
