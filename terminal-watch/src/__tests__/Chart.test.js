import React from 'react';
import Chart from "../components/Chart/Chart";
import { shallow } from 'enzyme';

const data = {
    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    datasets: [
        {
            label: 'Спорные ситуации',
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            fill: false,
            backgroundColor: '#f54f2a',
            borderColor: '#f54f2a'
        },
        {
            label: 'Ремонты',
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            fill: false,
            backgroundColor: '#3292bb',
            borderColor: '#3292bb'
        },
        {
            label: 'Инкассации',
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            fill: false,
            backgroundColor: '#66BB6A',
            borderColor: '#66BB6A'
        }
    ]
};

it('render without crashes', () => {
    let comp = shallow(<Chart type="line" data={data}/>);
    let tree = comp.html();
    expect(tree).toMatchSnapshot();
});