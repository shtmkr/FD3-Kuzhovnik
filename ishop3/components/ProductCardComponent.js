import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './style.css';

class ProductCard extends React.Component {
    static propsTypes = {
        row: PropTypes.any,
        titles: PropTypes.array,
        productCardMode: PropTypes.number,
        cb_inputChanged: PropTypes.func
    };

    static defaultProps = {

    };

    changeHandler = (e) => {
        const {name, price, quantity} = this.refs;
        switch (e.target) {
            case name:
                console.log('name input changed');
                break;
            case price:
                console.log('price input changed');
                break;
            case quantity:
                console.log('quantity input changed');
                break;
        }
    };

    render() {
        const item = this.props.row;
        return (
            <Fragment>
                {(this.props.productCardMode === 1)
                    ?   <div className='productCard'>
                            <h2>{item.name}</h2>
                            <p>{`Price: ${item.price} Quantity: ${item.count}`}</p>
                            <img src={item.img} alt=''/>
                        </div>
                    :   <div className='productCard'>
                            <input ref='name' value={item.name} onChange={this.changeHandler}/>
                            <input ref='price' value={item.price} onChange={this.changeHandler}/>
                            <input ref='quantity' value={item.count} onChange={this.changeHandler}/>
                            <img src={item.img} alt=''/>
                        </div>
                }

            </Fragment>
        )
    }
}

export default ProductCard