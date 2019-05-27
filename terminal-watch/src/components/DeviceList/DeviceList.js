import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import './DeviceList.css'
import Device from "./Device";
import ContextMenu from '../UI/ContextMenu/ContextMenu'
import {listUnitsEvents} from "../../events/events";

const titles = ['Номер устройства','Модель устройства', 'Адрес установки', 'Статус'];

class DeviceList extends React.PureComponent {

    static propTypes = {
        evt: PropTypes.object.isRequired,
        devices: PropTypes.array.isRequired,
        devicesPerPage: PropTypes.number.isRequired,
    };

    state = {
        devices: this.props.devices,
        pagesCount: Math.round(this.props.devices.length/this.props.devicesPerPage),
        currentPage: 1,
        selectedItemIdx: '',
    };

    componentDidMount = () => {
        listUnitsEvents.addListener('highlightItem',this.highlightItem);
    };

    componentWillUnmount = () => {
        listUnitsEvents.removeListener('highlightItem', this.highlightItem);
    };

    highlightItem = (id) => {
        this.setState({selectedItemIdx: id})
    };

    paginatorHandler = (e) => {
        const {first, prev, next, last} = this.refs;
        console.log(e.target.textContent);
        switch (e.target) {
            case first: {
                console.log('to first');
                this.setState({currentPage: 1}); //first page
                break;
            }
            case prev: {
                console.log('to prev');
                if (this.state.currentPage > 1) {
                    this.setState({currentPage: this.state.currentPage - 1});
                }
                break;
            }
            case next: {
                console.log('to next');
                if (this.state.currentPage < this.state.pagesCount) {
                    this.setState({currentPage: this.state.currentPage + 1});
                }
                break;
            }
            case last: {
                console.log('to last');
                this.setState({currentPage: this.state.pagesCount}); // last page
                break;
            }
            default: {
                this.setState({currentPage: parseInt(e.target.textContent)}); // numeric pages
            }
        }
    };

    createPaginator = () => {
        let pages = [];
        for (let i = 1; i <= this.state.pagesCount; i++ ) {
            pages.push(
                <button className={this.state.currentPage === i ? 'paginator-page-index active' : 'paginator-page-index'}
                               key={`paginator-page-index-${i}`}
                               onClick={this.paginatorHandler}
                >{i}</button>)
        }
        let paginator = (
            <div className='paginator-bottom'>
                <button className='paginator-first material-icons' key={'paginator-first'} ref='first' onClick={this.paginatorHandler}>first_page</button>
                <button className='paginator-prev material-icons' key={'paginator-prev'} ref='prev' onClick={this.paginatorHandler}>chevron_left</button>
                {pages}
                <button className='paginator-next material-icons' key={'paginator-next'} ref='next' onClick={this.paginatorHandler}>chevron_right</button>
                <button className='paginator-last material-icons' key={'paginator-last'} ref='last' onClick={this.paginatorHandler}>last_page</button>
            </div>);
        console.log(paginator);
        return paginator
    };

    createHead = () => {
        return titles.map(title => {
                return (
                    <th key={title}>
                        <span>{title}</span>
                        <input/>
                    </th>
                )
            }
        )
    };

    createPage = (currentPage) => {
        const { devices } = this.state;
        const indexOfLast = currentPage * this.props.devicesPerPage;
        const indexOfFirst = indexOfLast - this.props.devicesPerPage;
        const currentDevices = devices.slice(indexOfFirst, indexOfLast);

        return currentDevices.map(device => (this.state.selectedItemIdx === device.serialNum)
            ? <Device device={device} key={device.serialNum} selected={this.state.selectedItemIdx}/>
            : <Device device={device} key={device.serialNum}/>)
    };

    render () {
        console.log('DeviceList render');

        return (
            <Fragment>
                <table className='DeviceList'>
                    <thead>
                    <tr>{this.createHead()}</tr>
                    </thead>
                    <tbody>{this.createPage(this.state.currentPage)}</tbody>
                </table>
                {this.createPaginator()}
                <ContextMenu/>
            </Fragment>

        );
    }
}

export default DeviceList
