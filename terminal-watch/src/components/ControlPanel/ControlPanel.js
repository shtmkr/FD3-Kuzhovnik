import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {listUnitsEvents, msg} from "../../events/events";

import './ControlPanel.css';
import Button from "../Button/Button";
import Tooltip from "../Tooltip/Tooltip"
import isoFetch from "isomorphic-fetch";
import C from "../../constants";
import {fetchLog} from "../../helpers/fetchLog";

class ControlPanel extends React.PureComponent {

    static propTypes = {
        isControlPanelActive: PropTypes.bool.isRequired,
    };

    componentDidMount = () => {
        listUnitsEvents.addListener('highlightItem',this.highlightItem);
        listUnitsEvents.addListener('itemDeleted', this.itemDeleted);
    };

    componentWillUnmount = () => {
        listUnitsEvents.removeListener('highlightItem',this.highlightItem);
        listUnitsEvents.removeListener('itemDeleted', this.itemDeleted);
    };

    componentWillReceiveProps = (newProps) => {
        if (newProps.selectedDeviceId !== this.props.selectedDeviceId || newProps.isControlPanelActive !== this.props.isControlPanelActive ){
            this.setState({
                selectedDeviceId: newProps.selectedDeviceId,
                isControlPanelActive: newProps.isControlPanelActive,
            })
        }
    };

    highlightItem = (id) => {
        this.setState({selectedDeviceId: id});
    };

    itemDeleted = () => {
        this.setState({selectedDeviceId: ''});
    };

    state = {
        isControlPanelActive: this.props.isControlPanelActive,
        selectedDeviceId: this.props.selectedDeviceId,
        rebootClicked: false,

    };

    hider = () => {
        console.log('hider clicked');
        if (this.controlPanel.style.width === '10%') {
            this.controlPanel.style.width = '30%';
        } else {
            this.controlPanel.style.width = '10%';
        }

    };

    downloadClick = () => {
        console.log(`Конфигурация #${this.selectConf.value} загружена на устройство ${this.state.selectedDeviceId}`);
        msg.emit('log', `Конфигурация #${this.selectConf.value} загружена на устройство ${this.state.selectedDeviceId}`);
    };

    stateClick = () => {
        console.log(`Устройство ${this.state.selectedDeviceId} переведено в ${this.selectState.value}`);
        msg.emit('log', `Устройство ${this.state.selectedDeviceId} переведено в ${this.selectState.value}`);
        listUnitsEvents.emit('changeState', this.state.selectedDeviceId, this.selectState.value); // go to OOS / IS
    };

    reboot = () => {
        /*this.rebootResult.textContent = 'В процессе...';*/
        this.setState({rebootClicked: true});
        setTimeout(() => {
            /*this.rebootResult.textContent = 'Успешно';*/
            console.log(`Устройство ${this.state.selectedDeviceId} отправлено на перезагрузку`);
            msg.emit('log', `Устройство ${this.state.selectedDeviceId} отправлено на перезагрузку`);
            this.setState({rebootClicked: false});
        }, 5000);
    };

    saveLogs = () => {
        /*this.saveLogsResult.textContent = 'В процессе...';*/
        fetchLog('/cmd/download_log', response => console.log(response)); // TODO save txt response to redux logs state
        setTimeout(() => {
            console.log(`С устройства ${this.state.selectedDeviceId} скачаны логи`);
            /*this.saveLogsResult.textContent = 'Успешно';*/
            msg.emit('log', `С устройства ${this.state.selectedDeviceId} скачаны логи`)
        }, 5000);
    };

    add = () => {
        listUnitsEvents.emit('addDevice'); // emit ADD device
    };

    render() {

        console.log("ControlPanel render");

        return (
            <Fragment>
                { this.state.isControlPanelActive
                &&
                <div className='ControlPanel' ref={(el) => {this.controlPanel = el}}>
                    <div className='controls-wrapper'>
                        <select className='controls-select'
                                ref={(el) => {this.selectConf = el}}>
                            <option value="7000">7000</option>
                            <option value="7001">7001</option>
                        </select>
                        <Tooltip tooltipText='Конфига'>
                            <Button disabled={!this.state.selectedDeviceId} classname='mdc-button mdc-button--raised control-panel-button ' iClass='material-icons' cb={this.downloadClick} label='get_app' />
                        </Tooltip>
                    </div>
                    <div className='controls-wrapper'>
                        <select className='controls-select'
                                ref={(el) => {this.selectState = el}}>
                            <option value="In Service">IS</option>
                            <option value="Out Of Service">OOS</option>
                        </select>
                        <Tooltip tooltipText='Толкнуть'>
                            <Button disabled={!this.state.selectedDeviceId} classname='mdc-button mdc-button--raised control-panel-button' iClass='material-icons' cb={this.stateClick} label='arrow_right_alt'/>
                        </Tooltip>
                    </div>
                    <div className='controls-wrapper'>
                        <Tooltip tooltipText='Перезагрузка'>
                            <Button disabled={!this.state.selectedDeviceId} classname='mdc-button mdc-button--raised control-panel-button' iClass={this.state.rebootClicked ? 'material-icons spin' : 'material-icons'} cb={this.reboot} label='autorenew'/>
                        </Tooltip>
                        <Tooltip tooltipText='Скачать логи'>
                            <Button disabled={!this.state.selectedDeviceId} classname='mdc-button mdc-button--raised control-panel-button' iClass='material-icons' cb={this.saveLogs} label='archive'/>
                        </Tooltip>
                        <Tooltip tooltipText='Добавить'>
                            <Button classname='mdc-button mdc-button--raised control-panel-button' iClass='material-icons' cb={this.add} label='add'/>
                        </Tooltip>
                    </div>
                </div>
                }
            </Fragment>


        )
    }
}


export default ControlPanel;
