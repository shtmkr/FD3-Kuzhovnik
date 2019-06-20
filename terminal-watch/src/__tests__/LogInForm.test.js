import React from 'react';
import renderer from 'react-test-renderer';
import LogInForm from "../components/AuthComponent/LogInForm";
import {BrowserRouter} from "react-router-dom";

it('renders without crashing', () => {
    renderer.create(
      <BrowserRouter>
          <LogInForm/>
      </BrowserRouter>
    );
});

it('click log-in button', () => {
    let BR = renderer.create(
        <BrowserRouter>
            <LogInForm/>
        </BrowserRouter>
    ).root;
    let LogIn = BR.findByType(LogInForm);
    console.log(LogIn.state);
    let inputs = LogIn.findAllByType('input');
    let name = inputs[0];
    let pass = inputs[1];

    let form = LogIn.findByType('form');
    //console.log(form.props.onSubmit({preventDefault: () => console.log('preventDefault')}))
});
