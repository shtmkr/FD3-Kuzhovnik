import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ProductsRow from './ProductsRowComponent';
import ProductCard from './ProductCardComponent';

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
        productCardMode: 1,
        isProductCardValid: true
    };

    rowHandleClick = (id) => {
        this.setState({selectedRow: id, productCardMode: 1});
    };

    controlsHandleClick = (id, fn) => {
        switch (fn) {
            case "del":
                this.setState({
                    items: this.state.items.filter( (item) => item.uid !== id),
                    selectedRow: this.state.selectedRow ? this.state.selectedRow - 1 : null
                });
                break;
            case "edit":
                console.log('edit ' +  id);
                this.setState({
                    productCardMode: 2,
                    selectedRow: id
                });
                break;
        }
    };

    saveData = (input) => {
        if (input !== null){
            let mod = this._modRow([...this.state.items], input);
            this.setState({productCardMode: 1, items: mod})
        } else {
            this.setState({productCardMode: 1})
        }

    };

    setFormValid = (input) => {
        if (input === ''){
            this.setState({isProductCardValid: true })
        } else {
            this.setState({isProductCardValid: false })
        }
    };

    _modRow = (rows, newRow) => {
        let index = rows.findIndex(row => row.uid === newRow.uid);
        rows[index] = newRow;
        return rows;
    };

    _getRow = (rows, id) => {
        return rows.filter( row => parseInt(row.key) === id)[0].props.item;
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
                     cb_controlsClick={ this.controlsHandleClick }
                />
            );

        return (
            <Fragment>
                <table className='productsTable'>
                    <thead>
                        <tr>{ths}</tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                {
                    (this.state.selectedRow !== null)
                        ? <ProductCard
                            row={this._getRow(rows, this.state.selectedRow)}
                            productCardMode={this.state.productCardMode}
                            cb_saveData={ this.saveData }
                            isFormValid = {this.state.isProductCardValid}
                            cb_isFormValid = {this.setFormValid}
                        />
                        : false
                }
            </Fragment>
        )
    }
}

export default ProductsTable;
