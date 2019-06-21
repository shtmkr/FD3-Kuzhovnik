import React from 'react';
import Button from "../components/Button/Button";
import { shallow, mount} from 'enzyme';

it('render without crashes', () => {
    let comp = shallow(<Button classname='test' cb={() => console.log('test button')} iClass={'test'} label='tesxt' text={'none'} disabled={false}/>);
    let tree = comp.html();
    expect(tree).toMatchSnapshot();
});