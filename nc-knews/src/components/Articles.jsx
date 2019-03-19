import React from 'react';
import { Link } from '@reach/router';

const Articles = (props) => {
  console.dir(props)
  return <div>
    {props.path === '/' && <h2>Currently trending</h2>}
    {props.path === '/articles' && <h2>All articles</h2>}
    <Link to="/articles/1"><h3>Article 1</h3></Link>
    <Link to="/articles/2"><h3>Article 2</h3></Link>
  </div>
}

export default Articles;