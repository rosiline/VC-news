import React, { Component } from 'react';
import Button from './Button';
import { Link, navigate } from '@reach/router';
import * as api from '../api';

class UserInfo extends Component {
  state = {
    user: {}
  }
  render() {
    const { user } = this.state;
    const { loggedIn } = this.props;
    return <div className="userinfo outerText">
      {!loggedIn && <Link to='/login' ><Button text="Log in" /></Link>}
      {loggedIn && <Link to='/' onClick={this.props.signOut}><Button text='Sign out' /></Link>}
      {loggedIn && <p>Welcome back {user.name}</p>}
      {loggedIn && <p>Username: <em>{user.username}</em></p>}
      {loggedIn && <img className='avatar' src={user.avatar_url} alt="avatar" />}
    </div>
  }
  componentDidMount() {
    const { username } = this.props;
    if (username) this.fetchUser(username);
  }

  componentDidUpdate(prevProps, PrevState) {
    const { username } = this.props;
    const userChange = prevProps.username !== this.props.username;
    console.log(userChange, username);
    if (userChange && username) this.fetchUser(username);
  }

  fetchUser(username) {
    api.getUser(username)
      .then(user => {
        this.setState({ user });
      })
      .catch(err => {
        navigate('/not-found')
      })
  }
}

export default UserInfo;