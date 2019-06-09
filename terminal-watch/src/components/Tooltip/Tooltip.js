import React from 'react'

function withTooltip(){
    return function (Comp) {
        return function WrappedWithTooltip(props) {
            let hoc = <Comp {...props}/>;
                hoc = <div style={{padding: '5px',textAlign: 'center',border: `solid 4px red`}}>{hoc}</div>;
            return hoc
        }
    }
}

export {withTooltip}