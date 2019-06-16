import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './EventList.css';
import Event from "./Event";
import {listUnitsEvents} from "../../events/events";
import {sendRequest} from "../../helpers/sendRequest";
import {eventsLoadingAC, loadEventsAC} from "../../redux/reducers/eventsAC";
import Loader from "../Loader/Loader";
const titles = ['ID события','ID устройства', 'Код статуса', 'Описание', 'Дата'];

class EventList extends React.PureComponent {

    static propTypes = {
        evt: PropTypes.object.isRequired,
        eType: PropTypes.string.isRequired,
    };

    state = {
        selectedItemIdx: '',
    };

    componentWillReceiveProps = (newProps) => {
        if (newProps.dataPath !== this.props.dataPath){
            if (newProps.dataPath){
                this.props.dispatch( eventsLoadingAC() );
                sendRequest(newProps.dataPath, result => {
                    if (result){
                        this.props.dispatch(loadEventsAC(result));
                        this.setState({dataPath: newProps.dataPath})
                    }
                });
            }
        }
    };

    componentDidMount = () => {
        listUnitsEvents.addListener('highlightItem',this.highlightItem);
        if (this.props.events !== undefined){
            if (this.props.dataPath){
                this.props.dispatch( eventsLoadingAC() );
                sendRequest(this.props.dataPath, result => {
                    if (result){
                        this.props.dispatch(loadEventsAC(result))
                    }
                });
            } else {
                console.log('no path')
            }
        }
    };

    componentWillUnmount = () => {
        listUnitsEvents.removeListener('highlightItem', this.highlightItem);
    };

    highlightItem = (id) => {
        this.setState({selectedItemIdx: id})
    };

    createHead = () => {
        return titles.map((title, index) => {
                return (
                    <th key={title}>
                        <span>{title}</span>
                    </th>
                )
            }
        )
    };

    createBody = () => {
        if (this.props.events !== undefined){
            const events  = this.props.events.events.filter(ev => ev.eType === this.props.eType);
            console.log(events);
            return events.map(ev => (this.state.selectedItemIdx === ev.eId)
                ? <Event event={ev} key={ev.eId} selected={this.state.selectedItemIdx}/>
                : <Event event={ev} key={ev.eId}/>)
        }
    };

    render () {
        if ( this.props.events.status <= 1 )
            return <Loader/>;

        if ( this.props.events.status === 2 )
            return "ошибка загрузки данных";

        console.log('EventList render');
        return (
            <Fragment>
                <div className='EventList'>
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
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = ( {events} )  => {
    return {
        events,
    };
};

export default connect(mapStateToProps)(EventList);
