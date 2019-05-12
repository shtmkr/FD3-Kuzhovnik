import React from 'react'

function withRainbowFrame(colors){
    return function (Comp) {
        return function WrappedWithRainbowFrame(props) {
            let hoc = <Comp {...props}/>;
            for (let i = 0; i < colors.length; i++) {
                hoc =
                    <div style={{padding: '5px',textAlign: 'center',border: `solid 4px ${colors[i]}`}}>
                        {hoc}
                    </div>;
            }
            return hoc
        }
    }
}

export {withRainbowFrame}
