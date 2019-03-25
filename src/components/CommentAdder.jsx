import React from 'react';
import { Link } from '@reach/router';

const CommentAdder = (props) => {
  const { username } = props;
  return <div>
    {!username && <p>Please <Link to='/login' >log in</Link> to add a comment</p>}
    {username && <form onSubmit={props.addComment} >
      <label htmlFor="body">New Comment:</label>
      <input type="text" id="body" required />
      <input type="submit" value="Submit" />
    </form >}
  </div>
}

export default CommentAdder;