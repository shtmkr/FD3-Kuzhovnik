import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';
// ************** data for tests **************
let clientsArr = [
    {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200, status: 'active'},
    {id:105, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:250, status: 'active'},
    {id:110, fam:"Петров", im:"Пётр", otch:"Петрович", balance:-2, status: 'blocked'},
    {id:120, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:-150000, status: 'blocked'},
];
const titles = ["Фамилия", "Имя", "Отчество", "Баланс", "Статус", "Редактировать", "Удалить" ];

// ************** test for DELETE client **************

test('MobileCompany DELETE client', () => {
    const component = renderer.create(<MobileCompany clients={clientsArr} titles={titles}/>);
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

    //deleting... last client
    component.getInstance().delete(120);
    componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
    //deleting... first client
    component.getInstance().delete(101);
    componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
});

// ************** test for EDIT client **************

test('MobileCompany EDIT client', () => {
    const component = renderer.create(<MobileCompany clients={clientsArr} titles={titles}/>);
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

    //editing... last client
    let editedClient = {
        id: 120,
        fam: 'Лешечкин',
        im: 'Алеша',
        otch: 'Алешевич',
        balance: 1500,
        status: 'active',
    };
    component.getInstance().edit(editedClient);
    componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

});

// ************** test for ADD client **************

test('MobileCompany ADD client', () => {
    const component = renderer.create(<MobileCompany clients={clientsArr} titles={titles}/>);
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

    //adding... new client
    let newClient = {
        id: 121,
        fam: 'Лешечкин',
        im: 'Алеша',
        otch: 'Алешевич',
        balance: 1500,
        status: 'active',
    };
    component.getInstance().addClient(newClient);
    componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

});

// ************** test for FILTER clients **************

test('MobileCompany FILTER BLOCKED clients', () => {
    const component = renderer.create(<MobileCompany clients={clientsArr} titles={titles}/>);
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

    //filter... BLOCKED clients
    component.getInstance().filter({target: 'blocked'});
    componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

});

test('MobileCompany FILTER ACTIVE clients', () => {
    const component = renderer.create(<MobileCompany clients={clientsArr} titles={titles}/>);
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

    //filter... ACTIVE clients
    component.getInstance().filter({target: 'active'});
    componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

});

test('MobileCompany FILTER ALL clients', () => {
    const component = renderer.create(<MobileCompany clients={clientsArr} titles={titles}/>);
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

    //filter... ALL clients
    component.getInstance().filter({target: 'all'});
    componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

});

