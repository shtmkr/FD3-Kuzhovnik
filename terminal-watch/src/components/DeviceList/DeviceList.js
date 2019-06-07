import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import './DeviceList.css'
import Device from "./Device";
import ContextMenu from '../ContextMenu/ContextMenu'
import {listUnitsEvents} from "../../events/events";
import Card from "../Card/Card";
import DetailsContainer from "../DetailsContainer/DetailsContainer";

const fullDetails = require('./fullDetails.json');

const titles = ['Номер устройства','Модель устройства', 'Адрес установки', 'Статус'];

class DeviceList extends React.PureComponent {

    static propTypes = {
        evt: PropTypes.object.isRequired,
        devices: PropTypes.array.isRequired,
        devicesPerPage: PropTypes.number.isRequired,
        resizable: PropTypes.bool,
    };

    state = {
        devices: this.props.devices,
        pagesCount: Math.ceil(this.props.devices.length/this.props.devicesPerPage),
        currentPage: 1,
        selectedItemIdx: '',
        filter: '',
        filterIdx: null,
        isItemCardActive: false,
        isControlPanelActive: false,
    };

    componentWillReceiveProps = (newProps) => {
        if (newProps.devices !== this.props.devices){
            this.setState({
                devices: newProps.devices,
            })
        }
    };

    componentDidMount = () => {
        listUnitsEvents.addListener('highlightItem',this.highlightItem);
        listUnitsEvents.addListener('performFn', this.contextMenuHandler);
        listUnitsEvents.addListener('hideCard', this.hideCard);
    };

    componentWillUnmount = () => {
        listUnitsEvents.removeListener('highlightItem', this.highlightItem);
        listUnitsEvents.removeListener('performFn', this.contextMenuHandler);
        listUnitsEvents.removeListener('hideCard', this.hideCard);
    };

    highlightItem = (id) => {
        this.setState({selectedItemIdx: id, isControlPanelActive: true});
    };

    contextMenuHandler = (fn, id) => {
        console.log(fn, id);
        switch (fn) {
            case 'deleteElement': {
                let f = this.state.devices.filter(device => device.serialNum !== id);
                let conf = window.confirm(`Вы действительно хотите удалить ${id}?`); //TODO create modal message component?
                if (conf){
                    this.props.evt.emit('info', {type: 'success', message: `Устройство ${id} удалено`});
                    this.setState({devices: f, });
                }
                listUnitsEvents.emit('hideContext');
                break;
            }
            case 'viewElement': {
                console.log('need a element card');
                this.setState({isItemCardActive: true});
                listUnitsEvents.emit('hideContext');
            }
        }
    };

    hideCard = () => {
        this.setState({isItemCardActive: false});
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

    filter = () => {
        let list;
        let colName;
        if (this.state.filter !== ''){
            list = this.props.devices.filter( (device) => {
                colName = Object.keys(device)[this.state.filterIdx]; // get a specific col name by index for filtering
                if(~device[colName].indexOf(this.state.filter)) return true
            });
            if (list.length === 0 || list === undefined) { // if filter no results
                this.props.evt.emit('info', {type: 'error', message: `Нет такого устройства`});
            }
        }
        else {
            list = [...this.props.devices];
        }
        /*if (this.state.sorted){ //TODO sort?
            list.sort();
        }*/
        this.setState({devices: list});
    };

    filterHandler = (e) => {
        this.setState({
            filter: e.target.value,
            filterIdx: parseInt(e.target.id.match(/\d+/)[0]), // filter input index
        },  this.filter)
    };

    dragStartResizer = (e) => {
        console.log('resizing.....');
        e.target.style.opacity = '0.3';
        e.target.style.backgroundColor = 'darkred';
    };

    dragEndResizer = (e) => {
        console.log('resizing..... end');
        let resizers = []; // all resizers from refs
        for (let prop in this.refs) {
            if (prop.match(/resizer/)){
                resizers.push(this.refs[prop])
            }
        }
        let currResizer = resizers.find((resizer) => resizer === e.target ); // current resizer
        currResizer.style.backgroundColor = "transparent";
        let colWidth = currResizer.offsetParent.clientWidth;
        let offsetX = e.nativeEvent.offsetX;
        currResizer.parentElement.style.width = (colWidth + offsetX).toString() + 'px';
    };

    createPaginator = () => {
        let pages = [];
        let count = Math.ceil(this.state.devices.length/this.props.devicesPerPage);
        for (let i = 1; i <= count; i++ ) {
            pages.push(
                <button className={this.state.currentPage === i ? 'paginator-page-index active' : 'paginator-page-index'}
                               key={`paginator-page-index-${i}`}
                               onClick={this.paginatorHandler}
                >{i}</button>)
        }
        return (
            <div className='paginator-bottom'>
                <button className='paginator-first material-icons' key={'paginator-first'} ref='first'
                        onClick={this.paginatorHandler}>first_page
                </button>
                <button className='paginator-prev material-icons' key={'paginator-prev'} ref='prev'
                        onClick={this.paginatorHandler}>chevron_left
                </button>
                {pages}
                <button className='paginator-next material-icons' key={'paginator-next'} ref='next'
                        onClick={this.paginatorHandler}>chevron_right
                </button>
                <button className='paginator-last material-icons' key={'paginator-last'} ref='last'
                        onClick={this.paginatorHandler}>last_page
                </button>
            </div>)
    };

    createHead = () => {
        if (this.props.resizable) {
            return titles.map((title, index) => {
                    return (
                        <th key={title}>
                            <span className='resizer'
                                  ref={`resizer-${index}`}
                                  onDragStart={this.dragStartResizer}
                                  onDragEnd={this.dragEndResizer}
                                  draggable
                            />
                            <span>{title}</span>
                            <input onKeyUp={this.filterHandler} id={`filterInput${index}`}/>
                        </th>
                    )
                }
            )
        }
        return titles.map((title, index) => {
                return (
                    <th key={title}>
                        <span>{title}</span>
                        <input onKeyUp={this.filterHandler} id={`filterInput${index}`}/>
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

    devForCard = []; //// extended terminal data initial is empty

    prepareChartDataForCard = () => {
        if (this.devForCard[0] !== undefined) {
            return {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                datasets: [
                    {
                        label: 'Спорные ситуации',
                        data: this.devForCard[0].Stats.Sp,
                        fill: false,
                        backgroundColor: '#f54f2a',
                        borderColor: '#f54f2a'
                    },
                    {
                        label: 'Ремонты',
                        data: this.devForCard[0].Stats.Repairs,
                        fill: false,
                        backgroundColor: '#3292bb',
                        borderColor: '#3292bb'
                    },
                    {
                        label: 'Инкассации',
                        data: this.devForCard[0].Stats.Ink,
                        fill: false,
                        backgroundColor: '#66BB6A',
                        borderColor: '#66BB6A'
                    }
                ]
            };
        }
    };

    render () {
        console.log('DeviceList render');
        this.devForCard = fullDetails.filter( device => (this.state.selectedItemIdx === device.Info.Id) ? device : false); // extended terminal data
        return (
            <Fragment>
                <table className='DeviceList'>
                    <thead>
                    <tr>{this.createHead()}</tr>
                    </thead>
                    <tbody>{this.createPage(this.state.currentPage)}</tbody>
                </table>
                {this.createPaginator()}
                <ContextMenu forElement={this.state.selectedItemIdx}/>
                <Card isActive={this.state.isItemCardActive}
                          device={this.devForCard[0]}
                          chartData={this.prepareChartDataForCard()}
                />
                {this.state.selectedItemIdx && <DetailsContainer chartData={this.prepareChartDataForCard()} repairs={this.devForCard[0].Repairs} />}
            </Fragment>
        );
    }
}

export default DeviceList
