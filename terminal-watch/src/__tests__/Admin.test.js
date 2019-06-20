import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {EventEmitter} from "events";
import Admin from '../components/Admin/Admin';

const appEvents = new EventEmitter(); /// Main stream of events

it('renders without crashing', () => {
    renderer.create(
    <BrowserRouter>
        <Admin evt={appEvents}/>
    </BrowserRouter>
    );
});
