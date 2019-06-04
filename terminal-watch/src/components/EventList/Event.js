import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {listUnitsEvents} from "../../events/events";

class Event extends React.PureComponent {

    static propTypes = {
        event: PropTypes.object.isRequired,
        selected: PropTypes.string,
    };

    state = {
        event: this.props.event,
        editMode: false,
        style: {
            backgroundColor: '#fff',
            color: '#000'
        },
        selected: this.props.selected,
    };

    itemRightClick = (e) => {
        e.preventDefault();
        listUnitsEvents.emit('showContext', e);
       /* listUnitsEvents.emit('highlightItem', this.state.event.eId);*/
    };

    itemLeftClick = (e) => {
        /*listUnitsEvents.emit('highlightItem', this.state.event.eId); // request highlight on click*/
        listUnitsEvents.emit('hideContext', e); // request hide context menu on click
    };

    render() {

        console.log("Event id="+this.state.event.eId+" render");
        let style = {...this.state.style};
        (this.props.hasOwnProperty('selected')) ? style.backgroundColor = '#d2d2d2' : style.backgroundColor = '#fff';
        return (
            <Fragment>
                <tr key={this.state.event.eId}
                    className='Event'
                    onContextMenu={this.itemRightClick}
                    onClick={this.itemLeftClick}
                    style={style}
                >
                    {!this.state.editMode &&
                    Object.keys(this.state.event)
                        .filter(p => p !== 'eType')
                        .map((col, index) => {
                            return <td key={index}>{this.state.event[col]}</td> // base td
                        })
                    }
                </tr>
            </Fragment>
        );

    }

}

export default Event;
