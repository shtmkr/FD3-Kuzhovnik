import React from 'react';
import Message from "../components/Message/Message";
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    let output = shallow(
        <Message/>
    ).html();
    expect(output).toMatchSnapshot();
});
