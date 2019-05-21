import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import AuthComponent from './core/components/AuthComponent/AuthComponent'
import './style.css'

const appContainer = document.querySelector('#app');

ReactDOM.render(
    <BrowserRouter>
        <AuthComponent/>
    </BrowserRouter>
    ,
    appContainer
);
