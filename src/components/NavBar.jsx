import React from 'react';
import { Link } from '@reach/router';

const NavBar = () => {
  return <div className="navbar">
    <Link to="/"><h3>Home</h3></Link>
    <Link to="/topics"><h3>Topics</h3></Link>
    <Link to="/articles"><h3>View all articles</h3></Link>
    <Link to="/addarticle"><h3>Add new article</h3></Link>
    <Link to="/users"><h3>View all users</h3></Link>
  </div>
}

export default NavBar;