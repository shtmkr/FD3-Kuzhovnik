import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

it('renders without crashing', () => {
  renderer.create(<App/>);
});

it('logged in', () => {
  let app = renderer.create(<App/>);
  app.getInstance().login();
});

it('logged out', () => {
  let app = renderer.create(<App/>);
  app.getInstance().logout();
});
