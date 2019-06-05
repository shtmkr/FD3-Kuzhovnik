import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {msg} from "../../../events/events";

import './ControlPanel.css';

class ControlPanel extends React.PureComponent {

    static propTypes = {
        isControlPanelActive: PropTypes.bool.isRequired,
        selectedDeviceId: PropTypes.string.isRequired,
    };

    componentDidMount = () => {
    };

    componentWillUnmount = () => {

    };

    componentWillReceiveProps = (newProps) => {
        if (newProps.selectedDeviceId !== this.props.selectedDeviceId || newProps.isControlPanelActive !== this.props.isControlPanelActive ){
            this.setState({
                selectedDeviceId: newProps.selectedDeviceId,
                isControlPanelActive: newProps.isControlPanelActive,
            })
        }
    };

    state = {
        isControlPanelActive: this.props.isControlPanelActive,
        selectedDeviceId: this.props.selectedDeviceId,
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
    };

    reboot = () => {
        this.rebootResult.textContent = 'В процессе...';
        setTimeout(() => {
            this.rebootResult.textContent = 'Успешно';
            console.log(`Устройство ${this.state.selectedDeviceId} отправлено на перезагрузку`);
            msg.emit('log', `Устройство ${this.state.selectedDeviceId} отправлено на перезагрузку`);
        }, 5000);
    };

    saveLogs = () => {
        this.saveLogsResult.textContent = 'В процессе...';
        setTimeout(() => {
            console.log(`С устройства ${this.state.selectedDeviceId} скачаны логи`);
            this.saveLogsResult.textContent = 'Успешно';
            msg.emit('log', `С устройства ${this.state.selectedDeviceId} скачаны логи`)
        }, 5000);
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
                        <button className="mdc-button mdc-button--raised control-panel-button "
                                onClick={this.downloadClick}
                        >
                            <i className="material-icons">get_app</i>Загрузить
                        </button>
                    </div>
                    <div className='controls-wrapper'>
                        <select className='controls-select'
                                ref={(el) => {this.selectState = el}}>
                            <option value="In Service">IS</option>
                            <option value="Out Of Service">OOS</option>
                        </select>
                        <button className="mdc-button mdc-button--raised control-panel-button "
                                onClick={this.stateClick}
                        >
                            <i className="material-icons">arrow_right_alt</i>Отправить</button>
                    </div>
                    <div className='controls-wrapper'>
                        <button className="mdc-button mdc-button--raised control-panel-button "
                                onClick={this.reboot}
                        >
                            <i className="material-icons">autorenew</i>Перезагрузить</button>
                        <span className='result' ref={(el) => {this.rebootResult = el}}> </span>
                    </div>
                    <div className='controls-wrapper'>
                        <button className="mdc-button mdc-button--raised control-panel-button "
                                onClick={this.saveLogs}
                        >
                            <i className="material-icons">archive</i>Скачать логи</button>
                        <span className='result' ref={(el) => {this.saveLogsResult = el}}> </span>
                    </div>
                    <span className='hider' onClick={this.hider}><i className="material-icons">compare_arrows</i></span>
                </div>
                }
            </Fragment>


        )
    }
}


export default ControlPanel;
