import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import './Toolbar.css';

class Toolbar extends React.PureComponent {

    static propTypes = {

    };

    componentDidMount = () => {

    };

    componentWillUnmount = () => {

    };

    state = {

    };

    render() {

        console.log("Toolbar render");

        return (
            <div className='Toolbar'>
                <ul className='toolbar-list'>
                    <li className='toolbar-item'>
                        <a className='toolbar-item-link' href="#">
                            <span className='toolbar-item-icon material-icons md-18'>device_hub</span>
                            <span className='toolbar-item-text'>Devices</span>
                            <span className='toolbar-item-arrow material-icons md-18'>arrow_drop_down</span>
                        </a>
                    </li>
                </ul>
                <div className='toolbar-additional'>
                    <input className='toolbar-input-search' type='text' placeholder='Search...'/>
                    <button className="mdc-button mdc-button--raised toolbar-logout ">Logout</button>
                </div>
            </div>
        );
    }

}

export default Toolbar;
