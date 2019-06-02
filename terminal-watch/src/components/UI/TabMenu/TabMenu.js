import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {listUnitsEvents} from "../../../events/events";

import './TabMenu.css'
class TabMenu extends React.PureComponent {

    static propTypes = {
        tabMenuItems: PropTypes.array.isRequired,
        activeItem: PropTypes.number.isRequired,
    };

    state = {
        activeItem: this.props.activeItem,
    };

    componentDidMount = () => {
    };

    componentWillUnmount = () => {
    };

    render () {
        return (
            <Fragment>
                <div className='TabMenu'>
                    <ul className='tabmenu-list'>
                        {this.props.tabMenuItems.map((item, index) => {
                            return (
                                <li className='tabmenu-item' key={index}
                                    onClick={(e) => this.menuItemClick(e, index)}
                                >
                                    <a className={this.state.activeItem === index ? 'tabmenu-item-link-active' : 'tabmenu-item-link'} href="#">
                                        <span className='tabmenu-item-icon material-icons md-18'>{item.icon}</span>
                                        <span className='tabmenu-item-text'>{item.label}</span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </Fragment>
        );
    }
}

export default TabMenu
