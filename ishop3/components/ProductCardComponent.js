import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './style.css';

class ProductCard extends React.Component {
    static propsTypes = {
        row: PropTypes.any,
        titles: PropTypes.array,
        productCardMode: PropTypes.number,
        cb_saveData: PropTypes.func,
        isProductChanged: PropTypes.bool,
        cb_isProductChanged: PropTypes.func
    };

    static defaultProps = {

    };

    componentDidUpdate(oldProps) {
        console.log(oldProps);
        if (oldProps.row.name !== this.props.row.name ||
            oldProps.row.price !== this.props.row.price ||
            oldProps.row.count !== this.props.row.count ||
            oldProps.row.img !== this.props.row.img)
        this.setState({
            name: this.props.row.name,
            price: this.props.row.price,
            count: this.props.row.count,
            img: this.props.row.img
        })
    }

    state = {
        name:   this.props.row.name,
        price:  this.props.row.price,
        count:  this.props.row.count,
        img:    this.props.row.img,
        validName:  '',
        validPrice: '',
        validCount: '',
        validImg:   '',
        isValidName:    true,
        isValidPrice:   true,
        isValidCount:   true,
        isValidImgUrl:  true,
    };

    userInputsHandler = (e) => {
        const {name, price, quantity, save, cancel, img} = this.refs;
        let valid = '';
        switch (e.target) {
            case name:
                if (this._isValid(name.value)) {
                    valid = '';
                    console.log('edit name');
                    this.props.cb_isProductChanged();
                    this.setState({isValidName: true})
                } else {
                    valid = 'enter name';
                    this.setState({isValidName: false})
                }
                this.setState({name: e.target.value, validName: valid});
                break;
            case price:
                if (this._isValid(price.value)) {
                    valid = '';
                    this.props.cb_isProductChanged();
                    this.setState({isValidPrice: true})
                } else {
                    valid = 'enter price';
                    this.setState({isValidPrice: false})
                }
                this.setState({price: e.target.value, validPrice: valid});
                break;
            case quantity:
                if (!isNaN(quantity.value)) {
                    valid = '';
                   this.props.cb_isProductChanged();
                    this.setState({isValidCount: true})
                } else {
                    valid = 'enter quantity';
                    this.setState({isValidCount: false})
                }
                this.setState({count: e.target.value, validCount: valid});
                break;
            case img:
                if (this._isValid(img.value)) {
                    valid = '';
                    this.props.cb_isProductChanged();
                    this.setState({isValidImgUrl: true})
                } else {
                    valid = 'enter img url';
                    this.setState({isValidImgUrl: false})
                }
                this.setState({img: e.target.value, validImg: valid});
                break;
            case save:// отправить измененный товар
                let newRow = ({
                    ...this.props.row,
                    name: this.state.name,
                    price: this.state.price,
                    count: parseInt(this.state.count),
                    img: this.state.img
                });
                this.props.cb_saveData(newRow);
                console.log('save');
                break;
            case cancel:
                this.setState({
                    validName: '',
                    validPrice: '',
                    validCount: '',
                    validImg: '',
                    name:   this.props.row.name,
                    price:  this.props.row.price,
                    count:  this.props.row.count,
                    img:    this.props.row.img,
                    }, this.props.cb_saveData(null)
                );
                console.log('cancel');
                break;
        }
    };

    _isValid = (input) => {
        return input !== '';
    };

    render() {
        console.log('PROPS-----',this.props.row);
        console.log('STATE-----',this.state);

        let productCard;
        if (this.props.productCardMode === 1) {
            productCard =
                <div className='productCard'>
                    <h2>{this.state.name}</h2>
                    <p>{`Price: ${this.state.price} Quantity: ${this.state.count}`}</p>
                    <img src={this.state.img} alt=''/>
                </div>
        }
        if (this.props.productCardMode === 2) {
            productCard =
                <div className='productCard'>
                    <span>Product Name</span><input ref='name' value={this.state.name || ''} onChange={this.userInputsHandler}/>
                        <span className='warn'>{this.state.validName}</span>
                    <span>Product Price</span>  <input ref='price' value={this.state.price || ''} onChange={this.userInputsHandler}/>
                        <span className='warn'>{this.state.validPrice}</span>
                    <span>Product Quantity</span><input ref='quantity' value={this.state.count || ''} onChange={this.userInputsHandler}/>
                        <span className='warn'>{this.state.validCount}</span>
                    <span>Product image</span><input ref='img' value={this.state.img || ''} onChange={this.userInputsHandler}/>
                        <span className='warn'>{this.state.validImg}</span>
                    <img src={this.state.img} alt=''/>
                    <div className='cardControls'>
                        <button ref='save'
                                onClick={this.userInputsHandler}
                                disabled={!this.state.isValidName ||
                                !this.state.isValidPrice ||
                                !this.state.isValidCount ||
                                !this.state.isValidImgUrl}
                        >Save</button>
                        <button ref='cancel' onClick={this.userInputsHandler}>Cancel</button>
                    </div>
                </div>
        }
        /*if (this.props.productCardMode === 3) {
            productCard =
                <div className='productCard'>
                    <span>Product Name</span><input ref='name' value={this.state.newName || ''} onChange={this.userInputsHandler}/>
                        <span className='warn'>{this.state.validName}</span>
                    <span>Product Price</span>  <input ref='price' value={this.state.newPrice || ''} onChange={this.userInputsHandler}/>
                        <span className='warn'>{this.state.validPrice}</span>
                    <span>Product Quantity</span><input ref='quantity' value={this.state.newCount || ''} onChange={this.userInputsHandler}/>
                        <span className='warn'>{this.state.validCount}</span>
                    <span>Product image</span><input ref='img' value={this.state.newImg || ''} onChange={this.userInputsHandler}/>
                        <span className='warn'>{this.state.validImg}</span>
                    <div className='cardControls'>
                        <button ref='save'
                                onClick={this.userInputsHandler}
                                disabled={!this.state.isValidName ||
                                !this.state.isValidPrice ||
                                !this.state.isValidCount ||
                                !this.state.isValidImgUrl}
                        >Save</button>
                        <button ref='cancel' onClick={this.userInputsHandler}>Cancel</button>
                    </div>
                </div>
        }*/
        return (
            <Fragment>
                {productCard}
            </Fragment>
        )
    }
}

export default ProductCard
