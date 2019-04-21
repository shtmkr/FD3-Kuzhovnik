import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ProductsRow from './ProductsRowComponent';
import ProductCard from './ProductCardComponent';
import AddProductForm from './AddProductFormComponent';

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
        productCardMode: 1, // 1- View mode; 2 - Edit mode; 3 - Add mode
        isProductCardValid: true,
        isProductChanged: false
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
            case "add":
                console.log('add');
                this.setState({productCardMode: 3, isProductChanged: true})
        }
    };

    saveData = (input, newProduct = false) => {
        if (!newProduct){   // modified product
            if (input !== null){
                let mod = this._modRow([...this.state.items], input);
                this.setState({productCardMode: 1, items: mod, isProductChanged: false})
            } else {
                this.setState({productCardMode: 1, isProductChanged: false})
            }
        } else {        // new product
            if (input !== null){
                console.log('adding new product....');
                let items = [...this.state.items];
                items.push(input);
                this.setState({productCardMode: 1, items: items, isProductChanged: false})
            } else {
                this.setState({productCardMode: 1, isProductChanged: false})
            }

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

    addProduct = (e) => {
        e.stopPropagation();
        this.controlsHandleClick(null, 'add');
    };

    productChanged = (e) => {
        console.log(e)
        console.log('product changed');
        this.setState({isProductChanged: true})
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
                     productCardMode={ this.state.productCardMode}
                     cb_rowHandleClick={ this.rowHandleClick }
                     cb_controlsClick={ this.controlsHandleClick }
                     isProductChanged = { this.state.isProductChanged }
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
                <div>
                    <button onClick={this.addProduct} disabled={this.state.productCardMode > 1}>New product</button>
                </div>
                <AddProductForm
                    productCardMode={this.state.productCardMode}
                    cb_saveData={ this.saveData }
                    rows = {rows}
                    isProductChanged = { this.state.isProductChanged }
                    cb_isProductChanged = { this.productChanged }

                />
                {
                    (this.state.selectedRow !== null)
                        && <ProductCard
                            row={this._getRow(rows, this.state.selectedRow)}
                            productCardMode={this.state.productCardMode}
                            cb_saveData={ this.saveData }
                            isProductChanged = { this.state.isProductChanged }
                            cb_isProductChanged = { this.productChanged }
                        />
                }
            </Fragment>
        )
    }
}

export default ProductsTable;
