import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './style.css'

const appContainer = document.querySelector('#app');

ReactDOM.render(
    <BrowserRouter>
        <div id='test'>THIS IS TERMINAL WATCH</div>
    </BrowserRouter>
    ,
    appContainer
);
