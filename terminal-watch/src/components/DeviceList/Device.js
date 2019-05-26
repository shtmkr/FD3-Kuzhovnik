import React from 'react';
import PropTypes from 'prop-types';

class Device extends React.PureComponent {

    static propTypes = {
        device: PropTypes.object.isRequired,
    };

    state = {
        device: this.props.device,
        editMode: false,
    };

    componentWillReceiveProps = (newProps) => {
        if (newProps.device !== this.props.device){
            this.setState({
                device: newProps.device,
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
        /*clientEvents.emit('delete', this.state.client.id);*/
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
        /*clientEvents.emit('edit', editedClient);*/
    };

    render() {

        console.log("Device id="+this.state.device.serialNum+" render");
        return (
            <tr key={this.state.device.id} className='Device'>
                {!this.state.editMode &&
                Object.keys(this.state.device)
                    .filter(p => p !== 'id')
                    .map((col, index) => {
                        return <td key={index}>{this.state.device[col]}</td> // base td
                    })
                }
                {/*{this.state.editMode &&
                Object.keys(this.state.device)
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
                </td>*/}
            </tr>
        );

    }

}

export default Device;
