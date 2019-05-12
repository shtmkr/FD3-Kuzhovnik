import React from 'react';
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {

    static propTypes = {
        colors: PropTypes.array.isRequired,
    };

    createRainbowFrame = () => {
        let {children, colors} = this.props;
        for (let i = 0; i < colors.length; i++) {
            children =
                <div style={{padding: '5px',textAlign: 'center',border: `solid 4px ${colors[i]}`}}>
                    {children}
                </div>
        }
        return children
    };

    render() {
        return this.createRainbowFrame();
    }

}

export default RainbowFrame;

