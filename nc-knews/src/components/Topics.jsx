import React from 'react';
import { Link } from '@reach/router';
import Button from './Button';

const Topics = () => {
  return <div>
    <h3>Topics</h3>
    <Button text="Add New Topic" />
    <Link to="/topics/topic1"><p>topic 1</p></Link>
    <Link to="/topics/topic2"><p>topic 2</p></Link>
  </div>
};

export default Topics;