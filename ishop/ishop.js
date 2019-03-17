const appContainer = document.querySelector('#app');

const products = [
    {name: 'TV', price: '1200 USD', img: 'https://cdn.shopify.com/s/files/1/2422/7737/products/LT-65M877_Smart_TV_-_front_2048x.jpg?v=1534444343', count: 1000, key: 1},
    {name: 'Radio', price: '12 USD', img: 'https://www.panasonic.com/content/dam/pim/mi/en/RF/RF-562/RF-562DDGC/RF-562DDGC-Product_ImageGlobal-1_mi_en.png', count: 10, key: 2},
    {name: 'Toaster', price: '100 USD', img: 'https://media.ao.com/en-GB/Productimages/Images/rvMedium/russellhobbs_18782_bk_01_m_p.jpg', count: 1000, key: 3},
    {name: 'CD-ROM', price: '1 USD', img: 'https://ae01.alicdn.com/kf/HTB1axBaSVXXXXXsXVXXq6xXFXXXG/Full-new-for-ASUS-Black-12X-BD-ROM-16X-DVD-ROM-48X-CD-ROM-SATA-Internal.jpg_640x640.jpg', count: 500, key: 4}
];

class ProductsTable extends React.Component {
    render(){
        const items = this.props.items;
        const inner = items.map(function (item, index) {
            return (
                React.DOM.li({className: 'item', key: items[index].key},
                    React.DOM.img({className:'item-img', src: items[index].img}),
                    React.DOM.div({className:'item-description'},
                        React.DOM.h2({}, items[index].name),
                        React.DOM.p({className:'item-p-price'}, `price: ${items[index].price}`),
                        React.DOM.small({className:'item-small-count'}, `count: ${items[index].count}`),
                    )
                )
            )
        });

        return React.DOM.ul({className: 'productsTable'}, inner);
    }
}

ReactDOM.render(
    React.createElement(ProductsTable, {name: "ishop", items: products}), appContainer,
);

