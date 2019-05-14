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
        editMode: false,
    };

    componentWillReceiveProps = (newProps) => {
       //console.log("MobileClient id="+newProps.client.id+" componentWillReceiveProps");
        if (newProps.client !== this.props.client){
            this.setState({
                client: newProps.client,
            })
        }
    };

    delete = () => {
        console.log('delete event handle');
        clientEvents.emit('delete', this.state.client.id);
    };

    edit = () => {
        console.log('edit event handle');
        this.setState({editMode: true});

    };

    save = () => {
        const {dataIM, dataFAM, dataOTCH, dataBALANCE} = this.refs;
        /*let editedClient = {
            im: dataIM.value,
            fam: dataFAM.value,
            otch: dataOTCH.value,
            balance: dataBALANCE.value
        };*/
        let editedClient = {
            id: this.state.client.id,
            fam: dataFAM.value,
            im: dataIM.value,
            otch: dataOTCH.value,
            balance: parseInt(dataBALANCE.value),
            status: (parseInt(dataBALANCE.value) > 0) ? 'active': 'blocked',
        };
        this.setState({editMode: false});
        clientEvents.emit('edit', editedClient);
    };

    render() {

        console.log("MobileClient id="+this.state.client.id+" render");

        return (
            <tr key={this.state.client.id} className='MobileClient'>
                {!this.state.editMode &&
                    Object.keys(this.state.client)
                        .filter(p => p !== 'id')
                        .map((col, index) => <td key={index}>{this.state.client[col]}</td>)
                }
                {this.state.editMode &&
                Object.keys(this.state.client)
                    .filter(p => p !== 'id')
                    .map((col, index) =>
                        <td key={index}>
                            <input className="editClient" defaultValue={this.state.client[col]} ref={`data${col.toUpperCase()}`}/>
                        </td>)
                }
                <td className='MobileClient__controls_edit'>
                    <button ref='del' onClick={this.edit}>Редактировать</button>
                </td>
                <td className='MobileClient__controls_delete'>
                    <button ref='edit' onClick={this.delete}>Удалить</button>
                </td>
                <td className='MobileClient__controls_edit'>
                    <button ref='del' onClick={this.save} disabled={!this.state.editMode}>Сохранить</button>
                </td>
            </tr>
        );

    }

}

export default MobileClient;
