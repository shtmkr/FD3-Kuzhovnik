import React from "react";
import {EventEmitter} from 'events';

import Toolbar from '../UI/Menu/Toolbar.js'


export const toolbarEvents = new EventEmitter();
const menu = require('./menu');

class Admin extends React.PureComponent {

    render () {
        return (
            <Toolbar menu={menu} evt={toolbarEvents}/>
        );
    }
}

export default Admin
