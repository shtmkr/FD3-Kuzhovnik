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
        filterType: '',
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
        let newBuffer = [...this.state.buf];
        let indexBuf = newBuffer.findIndex(element => element.id === client.id); // editing id at buffer
        let index = newClients.findIndex(element => element.id === client.id); // editing id at current clients
        newClients[index] = newBuffer[indexBuf] = client;
        this.setState({
            clients: newClients,
            buf: newBuffer,
        }, this.filter);
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
        let [last] = this.state.buf.slice(-1);
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
        }, this.filter);

    };

    filter = (e = {target: this.state.filterType}) => { // e dafault value is fake event = filterType
        const {all, active, blocked} = this.refs;
        let b = [...this.state.buf];// clients buffer
        switch (e.target) {
            case all:
            case 'all': {
                console.log('1');
                this.setState({
                    clients: [...this.state.buf],
                    filterType: 'all',
                });
                break;
            }
            case active:
            case 'active': {
                console.log('2');
                this.setState({
                    clients: b.filter(client => client.status === 'active'),
                    filterType: 'active',
                });
                break;
            }
            case blocked:
            case 'blocked': {
                console.log('3');
                this.setState({
                    clients: b.filter(client => client.status === 'blocked'),
                    filterType: 'blocked',
                });
                break;
            }
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
                        <input type="button" className={this.state.filterType === 'all' ? 'activeFilter' : 'defaultFilter'} value="Все" ref='all' onClick={this.filter} />
                        <input type="button" className={this.state.filterType === 'active' ? 'activeFilter' : 'defaultFilter'} value="Активные" ref='active' onClick={this.filter} />
                        <input type="button" className={this.state.filterType === 'blocked' ? 'activeFilter' : 'defaultFilter'} value="Заблокированные" ref='blocked' onClick={this.filter} />
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
