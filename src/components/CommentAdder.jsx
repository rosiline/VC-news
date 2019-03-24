import React from 'react';

const CommentAdder = (props) => {
  return <form onSubmit={props.addComment} >
    <label htmlFor="body">New Comment:</label>
    <input type="text" id="body" />
    <input type="submit" value="Submit" />
  </form >
}

export default CommentAdder;