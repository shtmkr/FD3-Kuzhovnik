import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import './EventList.css'
import Event from "./Event";
import ContextMenu from '../UI/ContextMenu/ContextMenu'
import {listUnitsEvents} from "../../events/events";
import Card from "../UI/Card/Card";

/*const fullDetails = require('./fullDetails.json');*/

const titles = ['ID события','ID устройства', 'Код статуса', 'Описание'];

class EventList extends React.PureComponent {

    static propTypes = {
        evt: PropTypes.object.isRequired,
        events: PropTypes.array.isRequired,
        eType: PropTypes.string.isRequired,
        devicesPerPage: PropTypes.number.isRequired,
        resizable: PropTypes.bool,
    };

    state = {
        events: this.props.events,
        pagesCount: Math.ceil(this.props.events.length/this.props.devicesPerPage),
        currentPage: 1,
        selectedItemIdx: '',
        filter: '',
        filterIdx: null,
        isItemCardActive: false,
    };

    componentWillReceiveProps = (newProps) => {
        if (newProps.events !== this.props.events){
            this.setState({
                events: newProps.events,
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
        this.setState({selectedItemIdx: id})
    };

    contextMenuHandler = (fn, id) => {
        console.log(fn, id);
        switch (fn) {
            case 'deleteElement': {
                let f = this.state.events.filter(ev => ev.eDeviceId !== id);
                let conf = window.confirm(`Вы действительно хотите удалить ${id}?`); //TODO create modal message component?
                if (conf){
                    this.props.evt.emit('info', {type: 'success', message: `Устройство ${id} удалено`});
                    this.setState({events: f, });
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
            list = this.props.events.filter( (ev) => {
                colName = Object.keys(ev)[this.state.filterIdx]; // get a specific col name by index for filtering
                if(~ev[colName].indexOf(this.state.filter)) return true
            });
            if (list.length === 0 || list === undefined) { // if filter no results
                this.props.evt.emit('info', {type: 'error', message: `Нет такого устройства`});
            }
        }
        else {
            list = [...this.props.events];
        }
        /*if (this.state.sorted){ //TODO sort?
            list.sort();
        }*/
        this.setState({events: list});
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
        let count = Math.ceil(this.state.events.length/this.props.devicesPerPage);
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
        const events  = this.state.events.filter(ev => ev.eType === this.props.eType);
        const indexOfLast = currentPage * this.props.devicesPerPage;
        const indexOfFirst = indexOfLast - this.props.devicesPerPage;
        const currentEvents = events.slice(indexOfFirst, indexOfLast);

        return currentEvents.map(ev => (this.state.selectedItemIdx === ev.eId)
            ? <Event event={ev} key={ev.eId} selected={this.state.selectedItemIdx}/>
            : <Event event={ev} key={ev.eId}/>)
    };

    render () {
        console.log('EventList render');
      /*  let devForCard = fullDetails.filter( event => (this.state.selectedItemIdx === event.Info.Id) ? event : false);*/

        return (
            <Fragment>
                <table className='EventList'>
                    <thead>
                    <tr>{this.createHead()}</tr>
                    </thead>
                    <tbody>{this.createPage(this.state.currentPage)}</tbody>
                </table>
                {this.createPaginator()}
                <ContextMenu forElement={this.state.selectedItemIdx}/>
               {/* <Card isActive={this.state.isItemCardActive} event={devForCard[0]}/>*/}
            </Fragment>

        );
    }
}

export default EventList
