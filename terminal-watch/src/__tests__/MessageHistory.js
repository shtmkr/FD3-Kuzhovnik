import React from 'react';
import MessageHistory from "../components/MessageHistory/MessageHistory";
import { shallow } from 'enzyme';

it('render without crashes', () => {
    let comp = shallow(<MessageHistory />);
    let tree = comp.html();
    comp.instance().log('test');
    expect(tree).toMatchSnapshot();
});