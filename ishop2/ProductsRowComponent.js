const ProductsRow = React.createClass({
    displayName: 'ProductRow',
    propsTypes: {
    },
    getInitialState(){
        return {
            rowStyle: {
                backgroundColor: '#fff'
            },
        }
    },
    row_onClickHandler(e){
      this.props.cb_rowHandleClick(this.props.item.uid);
    },
    button_onClickHandler(e){
      e.stopPropagation();
      confirm('Are you sure?')
          ? this.props.cb_rowDeleteClick(this.props.item.uid)
          : false
      ;
    },
    render(){
        let rowBg = {...this.state.rowStyle};
        const item = this.props.item;
        this.props.selected === item.uid ? rowBg.backgroundColor = '#f3b740': rowBg.backgroundColor = '#fff';
            return (
                React.DOM.tr({key: item.uid, onClick: this.row_onClickHandler, style: rowBg},
                    Object.keys(item)
                        .filter(p => p !== 'uid')
                        .map((col, index) => {
                            if (col !== 'img') return React.DOM.td({key: index}, item[col]);
                            else return (
                                React.DOM.td({key: index},
                                    React.DOM.img({key: index, src: item[col]})
                                )
                            )
                        }),
                    React.DOM.td({className: 'productsRow__button'},
                        React.DOM.button({onClick: this.button_onClickHandler}, "Del")
                    )
                )
            )
    }
});
