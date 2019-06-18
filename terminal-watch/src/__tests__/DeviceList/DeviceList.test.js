import React from 'react';
import renderer from 'react-test-renderer';
import {EventEmitter} from "events";
import {BrowserRouter} from 'react-router-dom';
import { shallow, mount} from 'enzyme';
import DeviceList from "../../components/DeviceList/DeviceList";
import combinedReducer from "../../redux/reducers/reducers";
import {Provider} from "react-redux";
import {createStore} from "redux";

const store = createStore(combinedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const appEvents = new EventEmitter(); /// Main stream of events

it('renders without crashing', () => {
    const BR = renderer.create(<BrowserRouter/>);
    const history = BR.getInstance().history;

    renderer.create(
        <Provider store={store}>
            <DeviceList evt={appEvents} dataPath='/data/devices_atm' devicesPerPage={10} resizable={true} history={history} currentPage={1}/>
        </Provider>
    );
});
