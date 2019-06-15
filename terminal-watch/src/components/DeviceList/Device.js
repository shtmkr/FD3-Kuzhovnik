import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {listUnitsEvents} from "../../events/events";

class Device extends React.PureComponent {

    static propTypes = {
        device: PropTypes.object.isRequired,
        selected: PropTypes.string,
        lastEdited: PropTypes.object,
    };

    state = {
        device: this.props.device,
        editMode: false,
        style: {
            backgroundColor: '#fff',
            color: '#000'
        },
        selected: this.props.selected,
    };

    componentWillReceiveProps = (newProps) => {
        if (newProps.lastEdited === this.props.lastEdited) {
            this.setState({lastEdited: newProps.lastEdited})
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

    itemRightClick = (e) => {
        e.preventDefault();
        listUnitsEvents.emit('showContext', e, {...this.refs});
        listUnitsEvents.emit('highlightItem', this.state.device.Id);
    };

    itemLeftClick = (e) => {
        listUnitsEvents.emit('highlightItem', this.state.device.Id); // request highlight on click
        listUnitsEvents.emit('hideContext', e); // request hide context menu on click
    };

    render() {

        console.log("Device id="+this.state.device.Id+" render");
        let style = {...this.state.style};
        (this.props.hasOwnProperty('selected')) ? style.backgroundColor = '#d2d2d2' : style.backgroundColor = '#fff';
        return (
            <Fragment>
                <tr key={this.state.device.Id}
                    ref={this.state.device.Id}
                    className='Device'
                    onContextMenu={this.itemRightClick}
                    onClick={this.itemLeftClick}
                    style={style}
                >
                    {!this.state.editMode &&
                    Object.keys(this.state.device)
                        .filter(p => p !== 'Bank').filter(p => p !== 'Serial')
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
            </Fragment>
        );

    }

}

export default Device;
