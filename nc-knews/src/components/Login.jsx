import React, { Component } from 'react';

class Login extends Component {

  render() {
    console.dir(this.props)
    return <form onSubmit={this.props.changeUser}>
      <label htmlFor="username">Username:</label>
      <input type="text" />
      <input type="submit" value="Login/Sign up" />
    </form>
  }
}

export default Login;