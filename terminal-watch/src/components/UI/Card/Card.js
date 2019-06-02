import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {listUnitsEvents} from "../../../events/events";

import './Card.css'
import TabMenu from "../TabMenu/TabMenu";

let tabMenu = require('./tabMenu');
class Card extends React.PureComponent {

    static propTypes = {
        isActive: PropTypes.bool.isRequired,
    };

    state = {
    };

    componentDidMount = () => {
    };

    componentWillUnmount = () => {
    };

    close = () => {
        listUnitsEvents.emit('hideCard');
    };

    render () {
        return (
            <Fragment>
                {
                    this.props.isActive
                    &&
                    <div className='screen'>
                        <div className='Card'>
                            <div className='card-header'>
                                <TabMenu tabMenuItems={tabMenu} activeItem={0}/>
                            </div>
                            <div className='card-body'>
                                <span>text</span>
                                <span>text</span>
                                <span>text</span>
                                <span>text</span>
                                <span>text</span>
                                <span>text</span>
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
