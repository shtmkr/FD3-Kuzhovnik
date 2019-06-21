import React from 'react';
import PropTypes from 'prop-types';
import './Tooltip.css'

class Tooltip extends React.Component {

    static propsTypes =  {
        tooltipText: PropTypes.string.isRequired,
    };

    static defaultProps = {
    };

    state = {
        isEntered: false,
        zoomerXpos: 0,
        zoomerYpos: 0,
        targetSrc: '',
        cursorXpos: 0,
        cursorYpos: 0,
    };

    componentDidMount() {
        if (this.props.zoomOnClick){
            if (!this.state.zoomOnClick){
                this.setState({zoomOnClick: this.props.zoomOnClick})
            }
        }
    }

    mouseHandler = (e) => {
        let target = e.target;
        switch (e.type) {
            case 'click' :
                if (this.state.zoomOnClick) {
                    if (target.nodeName === 'BUTTON') {
                        this._setPos(target, e.pageX, e.pageY);
                        this.setState({isEntered: !this.state.isEntered,  targetSrc: target.src});
                    }
                }
                break;
            case 'mousemove' :
                if (!this.state.zoomOnClick) {
                    if (target.nodeName === 'BUTTON') {
                        this._setPos(target, e.pageX, e.pageY);
                        this.setState({isEntered: true,  targetSrc: target.src});
                    }
                }
                if (this.state.isEntered) {
                    if (target.nodeName === 'BUTTON') {
                        this._setPos(target, e.pageX, e.pageY);
                        this.setState({targetSrc: target.src});
                    }
                }
                break;
            case 'mouseleave' :
                this.setState({isEntered: false, targetSrc: ''});
                break;
        }
    };

    _setPos = (target, x, y) => {
        const offset = 100;
        const { left, top, width, height } = target.getBoundingClientRect();
        const xPos = (x - left) / width * 100;
        const yPos = (y - top) / height * 100;
        this.setState({
            zoomerXpos: xPos,
            zoomerYpos: yPos,
            cursorXpos: x + offset / 2,
            cursorYpos: y - offset * 1.2,
        });
    };

    render() {
        return (
            <div className='Tooltip'
                 onMouseMove={this.mouseHandler}
                 onMouseLeave={this.mouseHandler}
                 onClick={this.mouseHandler}>
                {
                    (this.state.isEntered) &&
                    <div className='tooltip' style={{
                        left: this.state.cursorXpos - 100,
                        top: this.state.cursorYpos + 150,
                    }}>
                        <span className='tooltip-text'>{this.props.tooltipText}</span>
                    </div>
                }
                {this.props.children}
            </div>
        )
    }
}

export default Tooltip;