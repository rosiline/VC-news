import React, { Component } from 'react';
import Button from './Button';
import { Link } from '@reach/router';
import * as api from '../api';

class UserInfo extends Component {
  state = {
    user: {}
  }
  render() {
    const { username, avatar_url, name } = this.state.user;
    return <div className="userinfo">
      <Link to='/login' ><Button text="Log in/Sign up" /></Link>
      <p>Logged in as <em>{username}</em></p>
      <img className='avatar' src={avatar_url} alt="avatar" />
    </div>
  }
  componentDidMount() {
    api.getUser(this.props.username)
      .then(user => {
        this.setState({ user });
      })
  }
}

export default UserInfo;