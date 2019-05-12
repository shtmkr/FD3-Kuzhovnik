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

        console.log("MobileClient id="+this.props.id+" render");

        return (
            /*<div className='MobileClient'>
                <span className='MobileClientBalance'>{this.state.client.balance}</span>
                <span className='MobileClientFIO'>{this.state.client.fam+" "+this.state.client.im+" "+this.state.client.otch}</span>
            </div>*/
        <tr key={this.state.client.id}>
            {
                Object.keys(this.state.client)
                    .filter(p => p !== 'id')
                    .map((col, index) => {
                        if (col !== 'img') return <td key={index}>{this.state.client[col]}</td>;
                        else return (
                            <td key={index}>
                                <img key={index} src={item[col]} alt='img'/>
                            </td>
                        )
                    })
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