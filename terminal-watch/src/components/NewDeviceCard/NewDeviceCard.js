import React, {Fragment} from "react";
import PropTypes from 'prop-types';

import './NewDeviceCard.css';
import Button from "../Button/Button";
import {listUnitsEvents} from "../../events/events";

class NewDeviceCard extends React.PureComponent {

    static propTypes = {
        isActive: PropTypes.bool.isRequired,
        proceed: PropTypes.func.isRequired,
    };

    state = {
        isBankValid: false,
        isIdValid: false,
        isAddressValid: false,
        isSerialValid: false,
        isModelValid:false,
        isIpValid: false,
        result: '',
    };

    close = () => {
        listUnitsEvents.emit('hideCard');
    };

    add = (e) => {
        let form = e.target;
        e.preventDefault();
        let newDeviceData = {
            type: form[0].value,
            Bank: form[1].value,
            Id: form[2].value,
            Address: form[3].value,
            Serial: form[4].value,
            Model: form[5].value,
            IP: form[6].value,
        };
        /*this.setState({result: 'Device added'})*/
        this.props.proceed(newDeviceData);
    };

    validate = (e) => {
        const input = e.target;
        console.log('validating.... ' + e.target);
        if (input.placeholder === 'Наименование банка'){
            if (input.value !== ''){
                this.setState({isBankValid: true});
                console.log(input.placeholder + ' valid');
            }
        }
        if (input.placeholder === 'Номер устройства'){
            if (input.value !== ''){
                this.setState({isIdValid: true});
                console.log(input.placeholder + ' valid');
            }
        }
        if (input.placeholder === 'Адрес устрановки'){
            if (input.value !== ''){
                this.setState({isAddressValid: true});
                console.log(input.placeholder + ' valid');
            }
        }
        if (input.placeholder === 'Серийный номер'){
            if (input.value !== ''){
                this.setState({isSerialValid: true});
                console.log(input.placeholder + ' valid');
            }
        }
        if (input.placeholder === 'Модель устройства'){
            if (input.value !== ''){
                this.setState({isModelValid: true});
                console.log(input.placeholder + ' valid');
            }
        }
        if (input.placeholder === 'IP'){
            if (input.value !== ''){
                this.setState({isIpValid: true});
                console.log(input.placeholder + ' valid');
            }
        }

    };

    placeholders = [
        'Наименование банка', 'Номер устройства', 'Адрес устрановки', 'Серийный номер',
        'Модель устройства', 'IP',
    ];

    render () {
        console.log('NewDeviceCard render');
        return (
            <Fragment>
                {
                    this.props.isActive
                    &&
                    <div className='screen'>
                        <div className='Card'>
                            <div className='card-header'>
                            </div>
                            <div className='card-body'>
                                <form className="validate-form" onSubmit={this.add}>

                                    <select className='controls-select'>
                                        <option value="ATM">Банкомат</option>
                                        <option value="KIOSK">Инфокиоск</option>
                                    </select>

                                    {
                                        this.placeholders.map( (p, index) => (
                                            <div className="wrap-input" key={index}>
                                                <input className="input" type="text" placeholder={p} onBlur={this.validate}/>
                                            </div>
                                        ))
                                    }

                                    <div className="container-login-form-btn">
                                        <div className="wrap-login-form-btn">
                                            <div className="login-form-bgbtn"></div>
                                            <input disabled={!this.state.isBankValid
                                            || !this.state.isIdValid
                                            || !this.state.isAddressValid
                                            || !this.state.isIdValid
                                            || !this.state.isSerialValid
                                            || !this.state.isModelValid
                                            || !this.state.isIpValid
                                            }
                                                   className="login-form-btn" type="submit" value="Добавить" />
                                        </div>
                                    </div>
                                    <span>{this.state.result}</span>
                                </form>
                            </div>
                            <div className='card-footer'>
                              {/*  <Button disabled={!this.state.isFormValid} classname='mdc-button mdc-button--raised control-panel-button' iClass='material-icons' cb={this.add} label='add' text={'Добавить'}/>*/}
                                <Button classname='mdc-button mdc-button--raised control-panel-button' iClass='material-icons' cb={this.close} label='close' text={'Закрыть'}/>
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}

export default NewDeviceCard
