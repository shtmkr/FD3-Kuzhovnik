import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './style.css';

class AddProductForm extends React.Component {
    static propsTypes = {
        productCardMode: PropTypes.number,
        cb_saveData: PropTypes.func,
        rows: PropTypes.array
    };

    static defaultProps = {

    };

    state = {
        newName: '',
        newPrice: '',
        newCount: null,
        newImg: '',
        validName:  'enter name',
        validPrice: 'enter price',
        validCount: 'enter quantity',
        validImg:   'enter img url',
        isValidName: false,
        isValidPrice: false,
        isValidCount: false,
        isValidImgUrl: false
    };

    userInputsHandler = (e) => {
        const {name, price, quantity, save, cancel, img} = this.refs;
        let valid = '';
        switch (e.target) {
            case name:
                if (this._isValid(name.value)) {
                    valid = '';
                    this.setState({isValidName: true})
                } else {
                    valid = 'enter name';
                    this.setState({isValidName: false})
                }
                this.setState({newName: e.target.value, validName: valid});
                break;
            case price:
                if (this._isValid(price.value)) {
                    valid = '';
                    this.setState({isValidPrice: true})
                } else {
                    valid = 'enter price';
                    this.setState({isValidPrice: false})
                }
                this.setState({newPrice: e.target.value, validPrice: valid});
                break;
            case quantity:
                if (!isNaN(quantity.value)) {
                    valid = '';
                    this.setState({isValidCount: true})
                } else {
                    valid = 'enter quantity';
                    this.setState({isValidCount: false})
                }
                this.setState({newCount: e.target.value, validCount: valid});
                break;
            case img:
                if (this._isValid(img.value)) {
                    valid = '';
                    this.setState({isValidImgUrl: true})
                } else {
                    valid = 'enter img url';
                    this.setState({isValidImgUrl: false})
                }
                this.setState({newImg: e.target.value, validImg: valid});
                break;
            case save:// отправить новый товар
                let newRow = ({
                    /*...this.props.row,*/
                    name: this.state.newName,
                    price: this.state.newPrice,
                    img: this.state.newImg,
                    count: parseInt(this.state.newCount),
                    uid: this.props.rows.length + 1
                });
                this.props.cb_saveData(newRow, true);
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
            (this.props.productCardMode === 3)
            && <div className='productCard'>
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
        )
    }
}

export default AddProductForm
