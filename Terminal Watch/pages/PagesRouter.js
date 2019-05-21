import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Main from './Main';
import Auth from './Auth';

class PagesRouter extends React.Component {

    render() {

        return (
            <div>
                <Route path="/" exact component={Auth} />
                <Route path="/main" component={Main} />
                {/*<Route path="/client/:clid" component={Page_Client} />*/}
            </div>
        );

    }

}

export default PagesRouter;
