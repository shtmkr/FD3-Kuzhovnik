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

    controlsHandler = (e) => {
        const {del, edit, save} = this.refs;
        switch (e.target) {
            case del:
                this.delete();
                break;
            case edit:
                this.edit();
                break;
            case save:
                this.save();
                break;
        }
    };

    delete = () => {
        clientEvents.emit('delete', this.state.client.id);
    };

    edit = () => {
        this.setState({editMode: true});
    };

    save = () => {
        const {dataIM, dataFAM, dataOTCH, dataBALANCE} = this.refs;
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
                        .map((col, index) => {
                            if (col === 'status') {
                                if (this.state.client['balance'] > 0){
                                    return <td key={index} className='active'>{this.state.client[col]}</td>// active td
                                } else {
                                    return <td key={index} className='blocked'>{this.state.client[col]}</td>// blocked td
                                }
                            } else {
                                return <td key={index}>{this.state.client[col]}</td> // base td
                            }
                        })
                }
                {this.state.editMode &&
                Object.keys(this.state.client)
                    .filter(p => p !== 'id')
                    .map((col, index) => {
                        if (col !== 'status') {
                            return (
                                    <td key={index}>
                                        <input className="editClient" defaultValue={this.state.client[col]} ref={`data${col.toUpperCase()}`}/>
                                    </td>
                            )
                        } else {
                            return <td key={index} className='editing'>editing...</td>// active td
                        }
                    }
                        )
                }
                {!this.state.editMode &&
                <td className='MobileClient__controls_edit'>
                    <button ref='edit' onClick={this.controlsHandler}>Редактировать</button>
                </td>
                }
                {this.state.editMode &&
                <td className='MobileClient__controls_edit'>
                    <button ref='save' onClick={this.controlsHandler}>Сохранить</button>
                </td>
                }
                <td className='MobileClient__controls_delete'>
                    <button ref='del' onClick={this.controlsHandler}>Удалить</button>
                </td>
            </tr>
        );

    }

}

export default MobileClient;
