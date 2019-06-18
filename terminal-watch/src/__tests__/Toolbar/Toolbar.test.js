import React from 'react';
import renderer from 'react-test-renderer';
import Toolbar from '../../components/Toolbar/Toolbar';
import {BrowserRouter} from 'react-router-dom';
import {EventEmitter} from "events";
import { shallow, mount} from 'enzyme';

const appEvents = new EventEmitter(); /// Main stream of events
const menu = require('./menu.json');

it('renders without crashing', () => {
    renderer.create(
        <BrowserRouter>
            <Toolbar menu={menu} evt={appEvents}/>
        </BrowserRouter>
    );
});
