import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './style.css';

class ProductCard extends React.Component {
    static propsTypes = {
        row: PropTypes.any,
        titles: PropTypes.array,
        productCardMode: PropTypes.number,
        cb_saveData: PropTypes.func
    };

    static defaultProps = {

    };

    UNSAFE_componentWillReceiveProps(props){
        this.setState({
            name:   props.row.name,
            price:  props.row.price,
            count:  props.row.count,
            img:    props.row.img
        })
    }

    state = {
        name:   this.props.row.name,
        price:  this.props.row.price,
        count:  this.props.row.count,
        img:    this.props.row.img,
        validName: '',
        validPrice: '',
        validCount: '',
        validImg: ''
    };

    userInputsHandler = (e) => {
        console.log(e.type);
        /*if (e.type === 'keyup'){
            console.dir(e.target);
            this._isValid(e.target.value) ? e.target.previousSibling.innerHtml='valid' : console.log('please enter a value')
        }*/
        const {name, price, quantity, save, cancel, img} = this.refs;
        let valid = '';
        switch (e.target) {
            case name:
                (this._isValid(name.value)) ? valid = '' :  valid = 'please enter value';
                this.setState({name: e.target.value, validName: valid});
                break;
            case price:
                (this._isValid(price.value)) ? valid = '' :  valid = 'please enter value';
                this.setState({price: e.target.value, validPrice: valid});
                break;
            case quantity:
                (this._isValid(quantity.value)) ? valid = '' :  valid = 'please enter value';
                this.setState({count: e.target.value, validCount: valid});
                break;
            case img:
                (this._isValid(img.value)) ? valid = '' :  valid = 'please enter value';
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
                    validImg: ''}, this.props.cb_saveData(null)
                );
                console.log('cancel');
                break;
        }
    };

    _isValid = (input) => {
        return input !== '';
    };

    render() {
        return (
            <Fragment>
                {
                    (this.props.productCardMode === 1)
                    ?   <div className='productCard'>
                            <h2>{this.state.name}</h2>
                            <p>{`Price: ${this.state.price} Quantity: ${this.state.count}`}</p>
                            <img src={this.state.img} alt=''/>
                        </div>
                    :   <div className='productCard'>
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
                                <button ref='save' onClick={this.userInputsHandler}>Save</button>
                                <button ref='cancel' onClick={this.userInputsHandler}>Cancel</button>
                            </div>
                        </div>
                }
            </Fragment>
        )
    }
}

export default ProductCard