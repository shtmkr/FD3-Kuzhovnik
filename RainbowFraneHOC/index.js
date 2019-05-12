import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {withRainbowFrame} from "./components/withRainbowFrame";

const appContainer = document.querySelector('#app');
let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let FramedFragment = withRainbowFrame(colors)(Fragment);

ReactDOM.render(
    <FramedFragment>
        <span>hellosd</span>
    </FramedFragment>, appContainer
);
