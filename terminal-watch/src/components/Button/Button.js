import React from 'react';
const Button = ( {classname, cb, disabled, iClass, label, text} ) =>
    <button className={classname} onClick={cb} disabled={disabled}><i className={iClass}>{label}</i>{text}</button>;
export default Button

