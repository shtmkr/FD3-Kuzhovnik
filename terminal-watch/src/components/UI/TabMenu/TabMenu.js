import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {listUnitsEvents} from "../../../events/events";

import './TabMenu.css'
class TabMenu extends React.PureComponent {

    static propTypes = {
        tabMenuItems: PropTypes.array.isRequired,
        cdTabSelected: PropTypes.func.isRequired,
    };

    state = {
        activeItem: 0,
    };

    componentDidMount = () => {
    };

    componentWillUnmount = () => {
    };

    handleTabMenuItemClick = (e) => {
        e.preventDefault(); // prevent <a> click
        let activeItem = parseInt(e.target.parentElement.id.match(/\d+/)[0]);
        this.props.cdTabSelected(activeItem);
        this.setState({activeItem: activeItem});
    };

    render () {
        console.log('TabMenu render');
        return (
            <Fragment>
                <div className='TabMenu'>
                    <ul className='tabmenu-list'>
                        {this.props.tabMenuItems.map((item, index) => {
                            return (
                                <li className='tabmenu-item' key={index}
                                    onClick={this.handleTabMenuItemClick}
                                    id={`tab-item-${index}`}
                                >
                                    <a className={this.state.activeItem === index ? 'tabmenu-item-link-active' : 'tabmenu-item-link'} href="#" id={`tab-item-a-${index}`}>
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
