import React from 'react';

const Button = (props) => {
  return <button className="userinfo" onClick={props.handleClick}>{props.text}</button>
}

export default Button;