import React, { Component } from 'react';

class Login extends Component {

  render() {
    return <div><form onSubmit={this.props.changeUser}>
      <label htmlFor="username">Username:</label>
      <input type="text" />
      <input type="submit" value="Login" />
    </form>
      <p>For demo purposes please log in as jessjelly</p>
    </div>
  }
}

export default Login;