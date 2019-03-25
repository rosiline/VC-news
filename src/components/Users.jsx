import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';

class Users extends Component {
  state = {
    users: [],
    loading: true
  }
  render() {
    const { users, loading } = this.state;
    return <div>
      <h3>Users list</h3>
      {loading && 'Loading...'}
      <ul>
        {users.map(({ username }) => {
          return <Link key={username} to={`/users/${username}`}><li>{username}</li></Link>
        })
        }
      </ul>
    </div >
  }

  componentDidMount() {
    api.getUsers()
      .then(({ users }) => {
        this.setState({ users, loading: false });
      })
      .catch(err => {
        this.props.navigate('/not-found')
      })
  }
}

export default Users;