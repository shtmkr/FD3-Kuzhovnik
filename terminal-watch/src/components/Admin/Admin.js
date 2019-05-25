import React, {Fragment} from "react";
import Toolbar from '../UI/Menu/Toolbar'
import Message from "../UI/Message/Message";

const menu = require('./menu');

class Admin extends React.PureComponent {

    componentDidMount = () => {
        this.props.evt.emit('loaded', {type: 'success', message: 'Welcome to tWatch!'});
    };

    render () {
        return (
            <Fragment>
                <Toolbar menu={menu}/>
                <Message/>
            </Fragment>
        );
    }
}

export default Admin
