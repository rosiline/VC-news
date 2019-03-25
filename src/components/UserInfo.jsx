import React, { Component } from 'react';
import Button from './Button';
import { Link, navigate } from '@reach/router';
import * as api from '../api';

class UserInfo extends Component {
  state = {
    user: {},
    loggedIn: false
  }
  render() {
    const { user, loggedIn } = this.state;
    return <div className="userinfo">
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
    if (userChange && username) this.fetchUser(username);
  }

  fetchUser(username) {
    console.log(username)
    api.getUser(username)
      .then(user => {
        console.dir(user)
        this.setState({ user, loggedIn: true });
      })
      .catch(err => {
        navigate('/not-found')
      })
  }
}

export default UserInfo;