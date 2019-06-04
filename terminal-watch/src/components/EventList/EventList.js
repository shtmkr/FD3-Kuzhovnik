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
        resizable: PropTypes.bool,
    };

    state = {
        events: this.props.events,
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
        currResizer.parentElement.parentElement.style.width = (colWidth + offsetX).toString() + 'px';
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

    createBody = () => {
        const events  = this.state.events.filter(ev => ev.eType === this.props.eType);
        return events.map(ev => (this.state.selectedItemIdx === ev.eId)
            ? <Event event={ev} key={ev.eId} selected={this.state.selectedItemIdx}/>
            : <Event event={ev} key={ev.eId}/>)
    };

    render () {
        console.log('EventList render');
      /*  let devForCard = fullDetails.filter( event => (this.state.selectedItemIdx === event.Info.Id) ? event : false);*/

        return (
            <Fragment>
                <div className='EventList__scroll_header'>
                    <div className='EventList__scroll_header_box'>
                        <table className='EventList__scroll_table'>
                            <thead>
                                <tr>{this.createHead()}</tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div className='EventList__scroll_body'>
                    <table className='EventList__scroll_table'>
                        <tbody>{this.createBody()}</tbody>
                    </table>
                    <ContextMenu forElement={this.state.selectedItemIdx}/>
                </div>

            </Fragment>

        );
    }
}

export default EventList
