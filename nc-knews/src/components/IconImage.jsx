import React from 'react';

const IconImage = (props) => {
  return <img className='icon' src={props.src} alt={props.description} onClick={props.vote} />
}

export default IconImage;