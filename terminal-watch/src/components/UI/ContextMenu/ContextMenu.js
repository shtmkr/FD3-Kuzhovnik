import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {listUnitsEvents} from "../../../events/events";

import './ContextMenu.css'
const contextMenu = require('./contextMenu.json');

class ContextMenu extends React.PureComponent {

    static propTypes = {
        forElement: PropTypes.string,
    };

    state = {
        enabled: false,
        style: {
            top: '',
            left: ''
        }
    };

    componentDidMount = () => {
        listUnitsEvents.addListener('showContext',this.show);
        listUnitsEvents.addListener('hideContext',this.hide);
    };

    componentWillUnmount = () => {
        listUnitsEvents.removeListener('showContext', this.show);
        listUnitsEvents.removeListener('hideContext', this.hide);
    };

    show = (e) => {
        console.log('contextMenu show');
        let location = this.calculateLocation(e);
        this.setState({
            enabled: true,
            style: location
        })
    };

    hide = (e) => {
        console.log('contextMenu hide');
        this.setState({enabled: false})

    };

    calculateLocation = (e) => {
        return {top: e.nativeEvent.clientY, left: e.nativeEvent.clientX}
    };

    handleContextMenuItemClick = (e) => {
        let li;
        (e.target.tagName !== 'LI') ? li = e.target.parentElement :  li = e.target; // selected context menu li
        let id = parseInt(li.id.match(/\d+/)[0]);
        let selectedContextMenu = contextMenu.find( (contextMenuItem, index) => (index === id) ? contextMenuItem : false);

        listUnitsEvents.emit('performFn', selectedContextMenu.fn, this.props.forElement); // emit event for DeviceList
    };

    render () {
        console.log('ContextMenu render');
        return (
            <Fragment>
                {this.state.enabled
                &&
                <div className='ContextMenu' style={this.state.style}>
                    <ul className='context-list'>
                        {contextMenu.map((contextMenuItem, index) => {
                            return (
                                <li className='context-list-item'
                                    key={`context-item-${index}`}
                                    id={`context-item-${index}`}
                                    onClick={this.handleContextMenuItemClick}>
                                    <span className='material-icons'>{contextMenuItem.icon}</span>
                                    <span className=''>{contextMenuItem.label}</span>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
                }
            </Fragment>
        );
    }
}

export default ContextMenu
