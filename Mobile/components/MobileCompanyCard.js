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
        return (
                <div className='MobileCompanyCard'>
                    <span>Имя</span><input ref='clientName'  />
                    <span>Фамилия</span>  <input ref='clientSurname'  />
                    <span>Отчество</span><input ref='clientOtch'  />
                    <span>Баланс</span><input ref='clientBalance'  />
                    <div className='MobileCompanyCard__controls'>
                        <button ref='save' onClick={this.save}>Сохранить</button>
                        <button ref='cancel' onClick={this.cancel}>Отменить</button>
                    </div>
                </div>
        )
    }
}

export default MobileCompanyCard;
