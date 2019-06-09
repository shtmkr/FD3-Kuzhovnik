import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import './DeviceList.css'
import Device from "./Device";
import ContextMenu from '../ContextMenu/ContextMenu'
import {listUnitsEvents} from "../../events/events";
import Card from "../Card/Card";
import DetailsContainer from "../DetailsContainer/DetailsContainer";
import Paginator from "../Paginator/Paginator";

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

    constructor(props) {
        super(props);

        /*if (this.props.history.location.pathname === '/admin/devices_atm'){
            let reg = /admin\/devices_atm/;
            this.props.history.push( this.props.history.location.pathname.replace(reg, `admin/devices_atm/page-${this.state.currentPage}`) );
        }*/
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.devices !== this.props.devices){
            this.setState({
                devices: newProps.devices,
            })
        }
        if (newProps.currentPage !== this.props.currentPage){
            this.setState({currentPage: newProps.currentPage})
        }
    };

    componentDidMount = () => {
        listUnitsEvents.addListener('highlightItem',this.highlightItem);
        listUnitsEvents.addListener('performFn', this.contextMenuHandler);
        listUnitsEvents.addListener('hideCard', this.hideCard);

        let currentUrl = this.props.history.location.pathname;
        let pageNum = currentUrl.match(/\d/);
        if (pageNum) {
            this.setState({currentPage: parseInt(pageNum[0])});// selected page number from URL
        }
    };

    componentWillUnmount = () => {
        listUnitsEvents.removeListener('highlightItem', this.highlightItem);
        listUnitsEvents.removeListener('performFn', this.contextMenuHandler);
        listUnitsEvents.removeListener('hideCard', this.hideCard);
    };

    highlightItem = (id) => {
        this.setState({selectedItemIdx: id, isControlPanelActive: true});
    };

    contextMenuHandler = (fn, id, ref) => {
        console.log(fn, id);
        switch (fn) {
            case 'deleteElement': {
                let conf = window.confirm(`Вы действительно хотите удалить ${id}?`); //TODO create modal message component?
                if (conf){
                    let selectedRow = ref[id];
                    selectedRow.style.fontSize = 0;
                    selectedRow.style.height = 0;
                    setTimeout( () => {
                        let f = this.state.devices.filter(device => device.serialNum !== id);
                        this.props.evt.emit('info', {type: 'success', message: `Устройство ${id} удалено`});
                        this.setState({devices: f, });
                    }, 500);

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

    currentPageChanged = (pageNum) => {
        this.setState({currentPage: pageNum}, this.updateHistory);
    };

    updateHistory = () => {
        console.log('update URL...');
        let page = /(admin\/\w+\/\w+\/\d)/;
        let currentUrl = this.props.history.location.pathname;
        let nextPage = currentUrl.match(page);
        nextPage = `${nextPage[0].replace(/\d/, this.state.currentPage)}`;
        this.props.history.push( this.props.history.location.pathname.replace(page, nextPage) );
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
                <Paginator
                    currentPage={this.state.currentPage}
                    itemsCount={this.state.devices.length}
                    pagesCount={Math.ceil(this.state.devices.length/this.props.devicesPerPage)}
                    cbCurrentPageChanged={this.currentPageChanged}
                />
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
