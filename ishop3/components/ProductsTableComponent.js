import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ProductsRow from './ProductsRowComponent';

class ProductsTable extends React.Component {

    static propsTypes =  {
        name:   PropTypes.string.isRequired,
        items:  PropTypes.arrayOf(PropTypes.object),
        titles: PropTypes.array,
    };

    static defaultProps = {
        items: [
            {name: 'Product', price: '999 USD', img: 'No image', count: 999},
            {name: 'Product', price: '999 USD', img: 'No image', count: 999},
            {name: 'Product', price: '999 USD', img: 'No image', count: 999},
            {name: 'Product', price: '999 USD', img: 'No image', count: 999}],
        name: 'shop',
        titles: ['title1','title2','title3','title4'],
    };

    state = {
        selectedRow: null,
        items: this.props.items,
    };

    rowHandleClick = (id) => {
        this.setState({selectedRow: id});
    };

    rowDeleteClick = (id) => {
        this.setState({items: this.state.items.filter( (item) => item.uid !== id)});
    };

    render(){
        const
            items = this.state.items,
            titles = this.props.titles,
            ths = titles.map(title =>
                <th key={title}>{title}</th>
            ),
            rows = items.map(item =>
                <ProductsRow key={item.uid}
                     selected={this.state.selectedRow}
                     item={item}
                     cb_rowHandleClick={ this.rowHandleClick }
                     cb_rowDeleteClick={ this.rowDeleteClick }
                />
            );

        return (
            <table className='productsTable'>
                <thead>
                    <tr>{ths}</tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

export default ProductsTable;