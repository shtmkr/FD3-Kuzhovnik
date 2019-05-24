import React from "react";

import Toolbar from '../UI/Menu/Toolbar.js'

const menu = require('./menu');

class Admin extends React.PureComponent {

    render () {
        return (
            <Toolbar menu={menu}/>
        );
    }
}

export default Admin
