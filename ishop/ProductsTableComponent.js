const appContainer = document.querySelector('#app');
const products = [
    {name: 'TV', price: '1200 USD', img: 'https://cdn.shopify.com/s/files/1/2422/7737/products/LT-65M877_Smart_TV_-_front_2048x.jpg?v=1534444343', count: 1000},
    {name: 'Radio', price: '12 USD', img: 'https://www.panasonic.com/content/dam/pim/mi/en/RF/RF-562/RF-562DDGC/RF-562DDGC-Product_ImageGlobal-1_mi_en.png', count: 10},
    {name: 'Toaster', price: '100 USD', img: 'https://media.ao.com/en-GB/Productimages/Images/rvMedium/russellhobbs_18782_bk_01_m_p.jpg', count: 1000},
    {name: 'CD-ROM', price: '1 USD', img: 'https://ae01.alicdn.com/kf/HTB1axBaSVXXXXXsXVXXq6xXFXXXG/Full-new-for-ASUS-Black-12X-BD-ROM-16X-DVD-ROM-48X-CD-ROM-SATA-Internal.jpg_640x640.jpg', count: 500}
];
const titles = ["product name", "price", "img", "count"];

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
            titles: ['title1','title2','title3','title4', 'title5'],
        }
    },
    handleClick(id) {
        this.refs[id].style.display = 'none';
    },
    rowHandleClick(id) {
        if (this.refs[id].style.backgroundColor === 'rgb(243, 183, 64)') { this.refs[id].style.backgroundColor = '#fff';}
        else { this.refs[id].style.backgroundColor = '#f3b740'; }
    },
    render(){
        const
            items = this.props.items,
            titles = this.props.titles;
        this.displayName = this.props.name;
        return (
            React.DOM.table({className: 'productsTable'},
                React.DOM.thead(null,
                    React.DOM.tr(null,
                        titles.map((title) => React.DOM.th({key: title}, title))
                    )
                ),
                React.DOM.tbody(null,
                    items.map((row, index) => {
                        return (
                            React.DOM.tr({key: index, ref: `tr${index}`, onClick: this.rowHandleClick.bind(this, `tr${index}`)},
                                Object.keys(row).map((col, index) => {
                                    if (col !== 'img') return React.DOM.td({key: index}, row[col]);
                                    else return (
                                        React.DOM.td({key: index},
                                            React.DOM.img({key: index, src: row[col]})
                                        )
                                    )
                                }),
                                React.DOM.td({className: 'productsTable__button'},
                                    React.DOM.button({onClick: this.handleClick.bind(this, `tr${index}`)}, "Del")
                                )
                            )
                        );
                    })
                )
            )
        )
    }
});

ReactDOM.render(
    React.createElement(ProductsTable, {name: "ishop", items: products, titles: titles}), appContainer,
);

