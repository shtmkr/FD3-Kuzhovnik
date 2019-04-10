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
        img:    this.props.row.img
    };

    userInputsHandler = (e) => {
        const {name, price, quantity, save, cancel, img} = this.refs;
        switch (e.target) {
            case name:
                console.log('name input changed');
                this.setState({name: e.target.value});
                break;
            case price:
                console.log('price input changed');
                this.setState({price: e.target.value});
                break;
            case quantity:
                console.log('quantity input changed');
                this.setState({count: e.target.value});
                break;
            case img:
                console.log('img input changed');
                this.setState({img: e.target.value});
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
                console.log('cancel');
                break;
        }
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
                            <span>Product Price</span>  <input ref='price' value={this.state.price || ''} onChange={this.userInputsHandler}/>
                            <span>Product Quantity</span><input ref='quantity' value={this.state.count || ''} onChange={this.userInputsHandler}/>
                            <span>Product image</span><input ref='img' value={this.state.img || ''} onChange={this.userInputsHandler}/>
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
