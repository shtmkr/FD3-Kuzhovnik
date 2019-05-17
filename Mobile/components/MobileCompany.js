import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import MobileCompanyCard from './MobileCompanyCard';
import {cardEvents, clientEvents} from './events';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

    static propTypes = {
        name: PropTypes.string.isRequired,
        titles: PropTypes.array.isRequired,
        clients:PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                fam: PropTypes.string.isRequired,
                im: PropTypes.string.isRequired,
                otch: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
        ),
        buf: PropTypes.object,
    };

    componentDidMount = () => {
        cardEvents.addListener('saveData',this.saveData);
        cardEvents.addListener('cancel',this.cancel);
        clientEvents.addListener('delete', this.delete);
        clientEvents.addListener('edit', this.edit);
    };

    componentWillUnmount = () => {
        cardEvents.removeListener('saveData',this.saveData);
        cardEvents.removeListener('cancel',this.cancel);
        clientEvents.addListener('delete', this.delete);
        clientEvents.addListener('edit', this.edit);
    };

    state = {
        name: this.props.name,
        clients: [...this.props.clients],
        buf: [...this.props.clients],
        isCardOpened: false,
    };

    defaultId = 120;

    saveData = (clientData) => {
        //console.log('handle save event', clientData);
        this.addClient(clientData);
        this.cardToggler();
    };

    delete = (id) => {
        let f = this.state.clients.filter(client => client.id !== id);
        this.setState({clients: f, buf: f,});
    };

    edit = (client) => {
        let newClients = [...this.state.clients];
        let index = newClients.findIndex(element => element.id === client.id);
        newClients[index] = client;
        this.setState({
            clients: newClients,
            buf: newClients
        });
    };

    cancel = () => {
        this.cardToggler();
    };

    cardToggler = () => {
        this.setState({isCardOpened: !this.state.isCardOpened})
    };

    setName1 = () => {
        this.setState({name:'МТС'});
    };

    setName2 = () => {
        this.setState({name:'Velcom'});
    };

    addClient = (clientData) => {
        let [last] = this.state.clients.slice(-1);
        let newClient = {
            id: (last !== undefined) ? last.id + 1 : this.defaultId, //default first id
            ...clientData,
            balance: parseInt(clientData.balance),
            status: (parseInt(clientData.balance) > 0) ? 'active': 'blocked',
        };
        let newClients = [...this.state.clients, newClient];
        this.setState({
            clients: newClients,
            buf: [...this.state.buf, newClient]
        });
    };

    filter = (e) => {
        const {all, active, blocked} = this.refs;
        let b = [...this.state.buf];// clients buffer
        switch (e.target) {
            case all:
                console.log(this.state.buf);
                this.setState({clients: [...this.state.buf]});
                break;
            case active:
                console.log(this.state.clients.filter(client => client.status === 'active'));
                this.setState({clients: b.filter(client => client.status === 'active')});
                break;
            case blocked:
                console.log(this.state.clients.filter(client => client.status === 'blocked'));
                this.setState({clients: b.filter(client => client.status === 'blocked')});
                break;
        }
    };

    render() {

        console.log("MobileCompany render");


        let clientsCode = this.state.clients.map( client =>
            <MobileClient client={client} key={client.id} />
        );

        let ths = this.props.titles.map(title =>
            <th key={title}>{title}</th>
        );

        return (
            <Fragment>
                <div className='MobileCompany'>
                    <input type="button" value="МТС" onClick={this.setName1} />
                    <input type="button" value="Velcom" onClick={this.setName2} />
                    <div>{`Комнания: ${this.state.name}`}</div>

                    <div className='clients_filter'>
                        <input type="button" value="Все" ref='all' onClick={this.filter} />
                        <input type="button" value="Активные" ref='active' onClick={this.filter} />
                        <input type="button" value="Заблокированные" ref='blocked' onClick={this.filter} />
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
                        <input type="button" value="Добавить клиента" onClick={this.cardToggler} />
                    </div>
                </div>
                {
                    this.state.isCardOpened && <MobileCompanyCard/>
                }
            </Fragment>

        );
    }

}

export default MobileCompany;
