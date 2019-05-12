import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './Br2jsxComponent.css';

/*class Br2jsx extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
    };

    render() {
        let arr = this.props.text.split(/<br>|<br\/>|<br \/>/);
        console.log(arr);
        return (
            <div className='br2jsx'>
                {
                    arr.map ((row, index) => (index !== arr.length - 1) ? <Fragment>{row}<br/></Fragment> : row)
                }
            </div>
        )
    }

}

export default Br2jsx;*/

const Br2jsx = props => {
    let arr = props.text.split(/<br>|<br\/>|<br \/>/);
    console.log(props);
    return (
        <div className='br2jsx'>
            {
                arr.map ((row, index) => (index !== arr.length - 1) ? <Fragment key={index}>{row}<br/></Fragment> : row)
            }
        </div>
    )
};

Br2jsx.propTypes = {
    text: PropTypes.string.isRequired
};

export default Br2jsx
