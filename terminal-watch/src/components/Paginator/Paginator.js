import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './Paginator.css';
class Paginator extends React.PureComponent {

    static propTypes = {
        pagesCount: PropTypes.number.isRequired,
        itemsCount: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        cbCurrentPageChanged: PropTypes.func.isRequired,
    };

    componentWillReceiveProps = (newProps) => {

    };

    componentDidMount = () => {
    };

    componentWillUnmount = () => {
    };

    paginatorHandler = (e) => {
        const {first, prev, next, last} = this.refs;
        console.log(e.target.textContent);
        switch (e.target) {
            case first: {
                console.log('to first');
                this.props.cbCurrentPageChanged(1);//first page
                break;
            }
            case prev: {
                console.log('to prev');
                if (this.props.currentPage > 1) {
                    this.props.cbCurrentPageChanged(this.props.currentPage - 1);
                }
                break;
            }
            case next: {
                console.log('to next');
                if (this.props.currentPage < this.props.pagesCount) {
                    this.props.cbCurrentPageChanged(this.props.currentPage + 1);
                }
                break;
            }
            case last: {
                console.log('to last');
                this.props.cbCurrentPageChanged(this.props.pagesCount);// last page
                break;
            }
            default: {
                this.props.cbCurrentPageChanged(parseInt(e.target.textContent));// numeric pages
            }
        }
    };

    createPaginator = () => {
        let pages = [];
        for (let i = 1; i <= this.props.pagesCount; i++ ) {
            pages.push(
                <button className={this.props.currentPage === i ? 'paginator-page-index active' : 'paginator-page-index'}
                        key={`paginator-page-index-${i}`}
                        onClick={this.paginatorHandler}
                >{i}</button>)
        }
        return (
            <div className='Paginator'>
                <div className='paginator-summary'>
                    <span>{`Всего устройств: ${this.props.itemsCount}`}</span>
                </div>
                <div className='paginator-bottom'>
                    <button className='paginator-first material-icons' key={'paginator-first'} ref='first'
                            onClick={this.paginatorHandler}>first_page
                    </button>
                    <button className='paginator-prev material-icons' key={'paginator-prev'} ref='prev'
                            onClick={this.paginatorHandler}>chevron_left
                    </button>
                    {pages}
                    <button className='paginator-next material-icons' key={'paginator-next'} ref='next'
                            onClick={this.paginatorHandler}>chevron_right
                    </button>
                    <button className='paginator-last material-icons' key={'paginator-last'} ref='last'
                            onClick={this.paginatorHandler}>last_page
                    </button>
                </div>
                <div style={{width: '150px'}}>
                    <span></span>
                </div>
            </div>
        )
    };

    render () {
        console.log('Paginator render');
        return this.createPaginator()
    }
}

const mapStateToProps = ( {devices} ) => {
    return {
        itemsCount: devices.devices.length,
    }
};

export default connect(mapStateToProps)(Paginator)
