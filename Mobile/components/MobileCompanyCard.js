import React from 'react';
import './MobileCompanyCard.css';

import {cardEvents} from './events'

class MobileCompanyCard extends React.PureComponent {

    save = () => {
        const {clientName, clientSurname, clientOtch, clientBalance} = this.refs;
        const clientData = {
            im: clientName.value,
            fam: clientSurname.value,
            otch: clientOtch.value,
            balance: clientBalance.value
        };
        if (this._isValid(clientData)) {
            cardEvents.emit('saveData', clientData);
        } else {
            alert('please enter values');
        }

    };

    cancel = () => {
        cardEvents.emit('cancel');
    };

    _isValid = (input) => {
        let result;
        for (let data in input){
            if (input[data] !== ''){
                result = true;
            } else {
                return false
            }
        }
        return result
    };

    render() {
        console.log("MobileCompanyCard render");
        return (
                <div className='MobileCompanyCard'>
                    <label>Имя</label><input ref='clientName' />
                    <label>Фамилия</label><input ref='clientSurname' />
                    <label>Отчество</label><input ref='clientOtch'  />
                    <label>Баланс</label><input ref='clientBalance'  />
                    <div className='MobileCompanyCard__controls'>
                        <button ref='save' onClick={this.save}>Сохранить</button>
                        <button ref='cancel' onClick={this.cancel}>Отменить</button>
                    </div>
                </div>
        )
    }
}

export default MobileCompanyCard;
