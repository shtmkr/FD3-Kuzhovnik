import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';

class MobileClient extends React.PureComponent {

    static propTypes = {
        client: PropTypes.object.isRequired,
    };

    state = {
        client: this.props.client,
    };

    componentWillReceiveProps = (newProps) => {
        //console.log("MobileClient id="+this.props.id+" componentWillReceiveProps");
        //this.setState({FIO:newProps.FIO,balance:newProps.balance});
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
                    <button ref='del' onClick={this.controlsHandler}  disabled={this.props.productCardMode > 1}>Редактировать</button>
                </td>
                <td className='MobileClient__controls_delete'>
                    <button ref='edit' onClick={this.controlsHandler} disabled={this.props.productCardMode > 2 || this.props.isProductChanged}>Удалить</button>
                </td>
            </tr>
        );

    }

}

export default MobileClient;
