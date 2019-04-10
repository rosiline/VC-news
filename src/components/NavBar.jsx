import React from 'react';
import { Link } from '@reach/router';

const NavBar = () => {
  return <div className="navbar">
    <Link to="/"><h3 className="outerText" id="navBarSmall">Home</h3></Link>
    <Link to="/topics"><h3 className="outerText" id="navBarSmall">Topics</h3></Link>
    <Link to="/articles"><h3 className="outerText" id="navBarSmall">View all articles</h3></Link>
    <Link to="/addarticle"><h3 className="outerText" id="navBarSmall">Add new article</h3></Link>
    <Link to="/users"><h3 className="outerText" id="navBarSmall">View all users</h3></Link>
  </div>
}

export default NavBar;