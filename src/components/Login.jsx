import React, { Component } from 'react';

class Login extends Component {

  render() {
    return <div><form onSubmit={this.props.changeUser}>
      <label htmlFor="username">Username:</label>
      <input type="text" />
      <input className="btn btn-warning" type="submit" value="Login" />
    </form>
      <p>For demo purposes please log in as any of these users(case sensitive):
        jessjelly, tickle122, grumpy19, happyamy2016, cooljmessy or weegembump</p>
    </div>
  }
}

export default Login;