import React from 'react';
import Button from './Button';

const UserInfo = () => {
  return <div className="userinfo">
    <Button text="Log in/Sign up" />
    <p>Logged in as <em>rosiline</em></p>
    <p>avatar pic</p>
  </div>
}

export default UserInfo;