import React from 'react'
const Button = props =>
    <button className={props.classname} onClick={props.cb}><i className={props.iClass}>{props.label}</i>{props.text}</button>;
export default Button

