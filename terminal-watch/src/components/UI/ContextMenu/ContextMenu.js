import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {listUnitsEvents} from "../../../events/events";

import './ContextMenu.css'
const contextMenu = require('./contextMenu.json');

class ContextMenu extends React.PureComponent {

    static propTypes = {
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
        console.log('context menu ' + e.target + ' clicked')
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
                                <li className='context-list-item' key={`context-item-${index}`} onClick={this.handleContextMenuItemClick}>
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
