import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

    static propTypes = {
        name: PropTypes.string.isRequired,
        titles: PropTypes.array,
        clients:PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                fam: PropTypes.string.isRequired,
                im: PropTypes.string.isRequired,
                otch: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
        ),
    };

    state = {
        name: this.props.name,
        clients: this.props.clients,
    };

    setName1 = () => {
        this.setState({name:'МТС'});
    };

    setName2 = () => {
        this.setState({name:'Velcom'});
    };

    setBalance = (clientId,newBalance) => {
        let changed=false;
        let newClients=[...this.state.clients]; // копия самого массива клиентов
        newClients.forEach( (c,i) => {
            if ( c.id==clientId && c.balance!=newBalance ) {
                let newClient={...c}; // копия хэша изменившегося клиента
                newClient.balance=newBalance;
                newClients[i]=newClient;
                changed=true;
            }
        } );
        if ( changed )
            this.setState({clients:newClients});
    };

    setBalance1 = () => {
        this.setBalance(105,230);
    };

    setBalance2 = () => {
        this.setBalance(105,250);
    };

    render() {

        console.log("MobileCompany render");


        let clientsCode=this.state.clients.map( client => {
                return <MobileClient client={client} />;
            }
        );

        let ths = this.props.titles.map(title =>
            <th key={title}>{title}</th>
        );

        return (
            <div className='MobileCompany'>
                <input type="button" value="МТС" onClick={this.setName1} />
                <input type="button" value="Velcom" onClick={this.setName2} />
                <div>{`Комнания: ${this.state.name}`}</div>

                <div className='clients_filter'>
                    <input type="button" value="Все"  />
                    <input type="button" value="Активные"  />
                    <input type="button" value="Заблокированные"  />
                </div>
                <table className='MobileCompanyClients'>
                    <thead>
                    <tr>{ths}</tr>
                    </thead>
                    <tbody>
                    {clientsCode}
                    </tbody>
                </table>
                <div className='addClient'>
                    <input type="button" value="Добавить клиента"  />
                </div>

            </div>
        )
            ;

    }

}

export default MobileCompany;