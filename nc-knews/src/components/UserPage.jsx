import React, { Component } from 'react';
import * as api from '../api';

class UserPage extends Component {
  state = {
    user: {},
    loading: true
  }
  render() {
    const { user: { username, avatar_url }, loading } = this.state;
    return <div>
      {loading && 'Loading...'}
      <p>Username: {username}</p>
      <img className='avatar' src={avatar_url} alt='avatar' />
    </div>
  }

  componentDidMount() {
    api.getUser(this.props.username).then(user => {
      this.setState({ user, loading: false });
    })
  }
}

export default UserPage;