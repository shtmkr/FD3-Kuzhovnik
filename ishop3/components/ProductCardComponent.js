import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class ProductCard extends React.Component {
    static propsTypes = {
        rows: PropTypes.any,
        titles: PropTypes.array,
        selected: PropTypes.number
    };

    static defaultProps = {

    };

    render() {
        const item = this.props.rows[this.props.selected].props.item;
        return (
            <div className='productCard'>
                <h2>{item.name}</h2>
                <p>{`Price: ${item.price} Quantity: ${item.count}`}</p>
                <img src={item.img} alt=''/>
            </div>
        )
    }
}

export default ProductCard