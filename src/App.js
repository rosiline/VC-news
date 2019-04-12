import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Articles from './components/Articles';
import UserInfo from './components/UserInfo';
import Footer from './components/Footer';
import { Router, navigate } from '@reach/router';
import Article from './components/Article';
import Topics from './components/Topics';
import Users from './components/Users';
import ArticleAdder from './components/ArticleAdder';
import UserPage from './components/UserPage';
import Login from './components/Login';
import NotFound from './components/NotFound';
import ls from 'local-storage';
import * as api from './api';

class App extends Component {
  state = {
    username: '',
    loggedIn: false
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <Header text="VC News" />
        </div>
        <UserInfo username={this.state.username} signOut={this.signOut} loggedIn={this.state.loggedIn} />
        <NavBar />
        <Router className="main overlay" tabIndex="" >
          <Articles path='/' sort_by='comment_count' />
          <Topics path="/topics" username={this.state.username} />
          <Articles path="/articles" sort_by='created_at' />
          <Articles path="/topics/:topic" sort_by='created_at' />
          <Article path="/articles/:article_id" username={this.state.username} />
          <Users path="/users" />
          <ArticleAdder path="/addarticle" username={this.state.username} />
          <UserPage path="/users/:username" />
          <Login path="/login" changeUser={this.changeUser} />
          <NotFound default path="/not-found" />
        </Router>
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    const username = ls.get('username');
    if (username) this.setState({ username, loggedIn: true });
  }

  changeUser = (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    api.getUsers()
      .then(({ users }) => {
        const userList = users.map(user => user.username);
        return userList;
      })
      .then(userList => {
        if (userList.includes(username)) {
          this.setState({ username, loggedIn: true });
          ls.set('username', username);
          navigate('/');
        } else {
          alert('There was a problem logging in. Please check the username is valid');
        }
      })
    // if (username )
    // this.setState({ username, loggedIn: true });
    // ls.set('username', username);
    // navigate('/');
  }

  signOut = () => {
    ls.remove('username');
    this.setState({ username: '', loggedIn: false });
  }
}

export default App;
