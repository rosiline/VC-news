import React from 'react';

const Topic = (props) => {
  console.log(props)
  return <div>
    <h3>Topic {props.topic}</h3>
  </div>
}

export default Topic;