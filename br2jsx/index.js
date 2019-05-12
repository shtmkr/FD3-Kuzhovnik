import React from 'react';
import ReactDOM from 'react-dom';
import Br2jsx from './components/Br2jsxComponent'

const appContainer = document.querySelector('#app');
const text = 'первый<br>второй<br/>третий<br />последний';

ReactDOM.render(
    <Br2jsx text={text}/>, appContainer
);
