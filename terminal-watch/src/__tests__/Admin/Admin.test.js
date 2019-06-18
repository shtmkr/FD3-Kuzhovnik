import React from 'react';
import renderer from 'react-test-renderer';
import Admin from '../../components/Admin/Admin';

it('renders without crashing', () => {
    renderer.create(<Admin/>);
});
