import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {listUnitsEvents} from "../../events/events";

import './Card.css';
import Chart from "../Chart/Chart"
import TabMenu from "../TabMenu/TabMenu";
import Info from "../TabMenu/tabs/Info";
import Repair from "../TabMenu/tabs/Repair";
import EventList from "../EventList/EventList";

let tabMenu = require('./tabMenu');
class Card extends React.PureComponent {

    static propTypes = {
        isActive: PropTypes.bool.isRequired,
        device: PropTypes.object,
        chartData: PropTypes.object,
    };

    state = {
        device: this.props.device,
        tabSelected: 0,
    };

    componentWillReceiveProps = (newProps) => {
        if (newProps.device !== this.props.device){
            this.setState({
                device: newProps.device,
            })
        }
    };

    componentDidMount = () => {
    };

    componentWillUnmount = () => {
    };

    close = () => {
        listUnitsEvents.emit('hideCard');
    };

    tabSelector = (tabId) => {
        console.log('tab selected ' + tabId);
        this.setState({tabSelected: tabId});
    };

    render () {
        console.log('Card render');
        console.log(this.state.device);
        let data;
        let repairs;
        let info;
        let events;
        if (this.props.chartData) {
            data = this.props.chartData;
        }
        if (this.props.device !== undefined) {
            repairs = <Repair repairs={this.props.device.Repairs}/>
        }
        if (this.props.device !== undefined) {
            info = <Info device={this.props.device}/>;
        }
        if (this.props.device !== undefined) {
            events = <EventList dataPath='/data/devices_events' eType={this.props.device.Info.Id}/>;
        }
        let stats =  <div><Chart type="line" data={data}/></div>;
        let cardBody;

        switch (this.state.tabSelected) {
            case 0 :
                cardBody = info;
                break;
            case 1 :
                cardBody = events;
                break;
            case 2 :
                cardBody = repairs;
                break;
            case 3 :
                cardBody = stats;
                break;
        }
        return (
            <Fragment>
                {
                    this.props.isActive
                    &&
                    <div className='screen'>
                        <div className='Card'>
                            <div className='card-header'>
                                <TabMenu tabMenuItems={tabMenu} cdTabSelected={this.tabSelector}/>
                            </div>
                            <div className='card-body'>
                                {cardBody}
                            </div>
                            <div className='card-footer'>
                                <button className="mdc-button mdc-button--raised toolbar-logout " onClick={this.close}><i className="material-icons">check</i>Закрыть</button>
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}

export default Card
