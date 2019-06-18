import React from 'react';
import renderer from 'react-test-renderer';
import LogInForm from "../../components/AuthComponent/LogInForm";
import {BrowserRouter} from "react-router-dom";

it('renders without crashing', () => {
    renderer.create(
      <BrowserRouter>
          <LogInForm/>
      </BrowserRouter>
    );
});

it('click log-in button', () => {
    renderer.create(
        <BrowserRouter>
            <LogInForm cbLogin={}/>
        </BrowserRouter>
    );
});
