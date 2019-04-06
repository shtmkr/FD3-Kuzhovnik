import React from 'react';
import ReactDOM from 'react-dom';
import ProductsTable from './components/ProductsTableComponent';

const products = require('./products');
const appContainer = document.querySelector('#app');
const titles = ["product name", "price", "img", "count", 'control' ];

ReactDOM.render(
    <ProductsTable name="ishop" titles={titles} items={products}/>, appContainer
);