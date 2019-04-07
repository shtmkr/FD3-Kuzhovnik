import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
class ProductsRow extends React.Component {

    static propsTypes = {
        key: PropTypes.number,
        selected: PropTypes.number,
        item: PropTypes.object,
        cb_rowHandleClick: PropTypes.func,
        cb_rowDeleteClick: PropTypes.func,
    };

    static defaultProps = {

    };

    state = {
        rowStyle: {
            backgroundColor: '#fff'
        },
    };

    row_onClickHandler = () => {
      this.props.cb_rowHandleClick(this.props.item.uid);
    };

    controlsHandler = (e) => {
        e.stopPropagation();
        const {del, edit} = this.refs;
        switch (e.target) {
            case del:
                confirm('Are you sure?')
                    ? this.props.cb_rowDeleteClick(this.props.item.uid)
                    : false
                ;
                break;
            case edit:
                console.log('edit');
                break;
        }
    };

    render(){
        let rowBg = {...this.state.rowStyle};
        const item = this.props.item;
        this.props.selected === item.uid ? rowBg.backgroundColor = '#f3b740': rowBg.backgroundColor = '#fff';
        return (
            <tr key={item.uid}
                onClick={this.row_onClickHandler}
                style={rowBg}>
                {
                    Object.keys(item)
                        .filter(p => p !== 'uid')
                        .map((col, index) => {
                            if (col !== 'img') return <td key={index}>{item[col]}</td>;
                            else return (
                                <td key={index}>
                                    <img key={index} src={item[col]} alt='img'/>
                                </td>
                            )
                        })
                }
                <td className='productsRow__controls'>
                    <button ref='del' onClick={this.controlsHandler}>Del</button>
                    <button ref='edit' onClick={this.controlsHandler}>Edit</button>
                </td>
            </tr>
        )
    }
}

export default ProductsRow;