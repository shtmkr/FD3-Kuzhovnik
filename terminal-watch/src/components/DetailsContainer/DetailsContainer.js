import React from 'react';

import './DetailsContainer.css';
import Chart from "../Chart/Chart";
import Repair from "../TabMenu/tabs/Repair";
const style = {
    width: '50%',
    animation: 'fadein 0.5s',
};
const DetailsContainer = props =>
    <div className='DetailsContainer'>
        <Chart type='line' data={props.chartData} style={style}/>
        <Repair repairs={props.repairs} style={style}/>
    </div>;

export default DetailsContainer

