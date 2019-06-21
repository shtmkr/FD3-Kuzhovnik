import React from 'react';
import Message from "../components/Message/Message";
import { shallow } from 'enzyme';

it('Message  show', () => {
    let comp = shallow(
        <Message/>
    );
    let tree = comp.html();
    expect(tree).toMatchSnapshot();
    comp.instance().show({type: 'success', message: 'Welcome to tWatch!'});

    comp.instance().hide();
    tree = comp.html();
    expect(tree).toMatchSnapshot();
});
