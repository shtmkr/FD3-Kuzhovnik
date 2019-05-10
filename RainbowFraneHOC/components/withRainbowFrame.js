import React from 'react'

function withRainbowFrame(colors) {
    return function (Component) {
        return function (props) {
            let children = <Component {...props}/>;
            for (let i = 0; i < colors.length; i++) {
                children =
                    <div style={{padding: '5px',textAlign: 'center',border: `solid 4px ${colors[i]}`}}>
                        {children}
                    </div>;
            }
            return children
        }
    }
}

export  { withRainbowFrame }
