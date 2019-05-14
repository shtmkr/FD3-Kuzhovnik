import React from 'react';
import ReactDOM from 'react-dom';
import MobileCompany from './components/MobileCompany';

let companyName = 'Velcom';
let clientsArr = [
    {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200, status: 'active'},
    {id:105, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:250, status: 'active'},
    {id:110, fam:"Петров", im:"Пётр", otch:"Петрович", balance:-2, status: 'blocked'},
    {id:120, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:-150000, status: 'blocked'},
];
const titles = ["Фамилия", "Имя", "Отчество", "Баланс", "Статус", "Редактировать", "Удалить" ];
const appContainer = document.querySelector('#app');

ReactDOM.render(
    <MobileCompany name={companyName} clients={clientsArr} titles={titles}
    />,
    appContainer
);
