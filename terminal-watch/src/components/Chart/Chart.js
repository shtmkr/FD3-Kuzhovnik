import React from 'react';
import PropTypes from 'prop-types';
import ChartJS from 'chart.js/dist/Chart.js';

class Chart extends React.PureComponent {

    static propTypes = {
        id: PropTypes.string,
        type: PropTypes.string,
        data: PropTypes.object,
        options: PropTypes.object,
        width: PropTypes.string,
        height: PropTypes.string,
        style: PropTypes.object,
        className: PropTypes.string
    };

    init = () => {
        this.chart = new ChartJS(this.canvas, {
            type: this.props.type,
            data: this.props.data,
            options: this.props.options
        });
    };

    refresh  = () => {
        if (this.chart) {
            this.chart.update();
        }
    };

    reinit = () => {
        if (this.chart) {
            this.chart.destroy();
            this.init();
        }
    };

    componentDidMount = () => {
        this.init();
    };

    componentDidUpdate = (prevProps, prevState) => {
        this.reinit();
    };

    componentWillUnmount = () => {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    };

    render() {
        let style = Object.assign({
                width: this.props.width,
                height: this.props.height
        }, this.props.style);

        return (
            <div id={this.props.id} style={style} className='Chart'>
                <canvas ref={(el) => {this.canvas = el}}></canvas>
            </div>
        );
    }
}

export default Chart
