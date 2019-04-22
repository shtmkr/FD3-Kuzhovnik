import React from 'react';
import ReactDOM from 'react-dom';
import RainbowFrame from './components/RainbowFrameComponent'

const appContainer = document.querySelector('#app');
const colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

ReactDOM.render(
    <RainbowFrame colors={colors}>
        hello
    </RainbowFrame>, appContainer
);
