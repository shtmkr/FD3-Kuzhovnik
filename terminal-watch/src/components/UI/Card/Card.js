import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {listUnitsEvents} from "../../../events/events";

import './Card.css';
import Chart from "../../Chart/Chart"
import TabMenu from "../TabMenu/TabMenu";
import Info from "../TabMenu/tabs/Info";

let tabMenu = require('./tabMenu');
class Card extends React.PureComponent {

    static propTypes = {
        isActive: PropTypes.bool.isRequired,
        device: PropTypes.object,
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

    prepareDataChart = () => {
        return {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            datasets: [
                {
                    label: 'Спорные ситуации',
                    data: this.state.device.Stats.Sp,
                    fill: false,
                    backgroundColor: '#f54f2a',
                    borderColor: '#f54f2a'
                },
                {
                    label: 'Ремонты',
                    data: this.state.device.Stats.Repairs,
                    fill: false,
                    backgroundColor: '#3292bb',
                    borderColor: '#3292bb'
                },
                {
                    label: 'Инкассации',
                    data: this.state.device.Stats.Ink,
                    fill: false,
                    backgroundColor: '#66BB6A',
                    borderColor: '#66BB6A'
                }
            ]
        };
    };

    render () {
        console.log('Card render');
        console.log(this.state.device);
        let data;
        if (this.state.device) {
            data = this.prepareDataChart();
        }
        let info = <Info device={this.props.device}/>; // TODO: get from state?
        let events = <div><span>events</span></div>;
        let repairs = <div><span>repairs</span></div>;
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
