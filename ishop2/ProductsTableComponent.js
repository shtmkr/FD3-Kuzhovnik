const ProductsTable = React.createClass ({
    displayName: 'productsTable',
    propsTypes: {
        name:   React.PropTypes.string.isRequired,
        items:  React.PropTypes.arrayOf(React.PropTypes.object),
        titles: React.PropTypes.array,
    },
    getDefaultProps() {
        return {
            items: [
                {name: 'Product', price: '999 USD', img: 'No image', count: 999},
                {name: 'Product', price: '999 USD', img: 'No image', count: 999},
                {name: 'Product', price: '999 USD', img: 'No image', count: 999},
                {name: 'Product', price: '999 USD', img: 'No image', count: 999}],
            name: 'shop',
            titles: ['title1','title2','title3','title4'],
        }
    },
    getInitialState(){
        return {
            selectedRow: null,
            items: this.props.items,
        }
    },
    rowHandleClick(id){
        this.setState({selectedRow: id});
    },
    rowDeleteClick(id){
        this.setState({items: this.state.items.filter( (item) => item.uid !== id)});
    },
    render(){
        const
            items = this.state.items,
            titles = this.props.titles;
        this.displayName = this.props.name;
        return (
            React.DOM.table({className: 'productsTable'},
                React.DOM.thead(null,
                    React.DOM.tr(null,
                        titles.map(title => React.DOM.th({key: title}, title))
                    )
                ),
                React.DOM.tbody(null,
                    items.map(item => React.createElement(ProductsRow, {
                        key: item.uid,
                        selected: this.state.selectedRow,
                        item: item,
                        cb_rowHandleClick: this.rowHandleClick,
                        cb_rowDeleteClick: this.rowDeleteClick,
                    }))
                )
            )
        )
    }
});

