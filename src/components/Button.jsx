import React from 'react';

const Button = (props) => {
  return <button className='btn btn-warning' onClick={props.handleClick}>{props.text}</button>
}

export default Button;