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

class App extends Component {
  state = {
    username: 'jessjelly'
  }
  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <Router className="main">
          <Articles path='/' sort_by='comment_count' />
          <Topics path="/topics" />
          <Articles path="/articles" />
          <Articles path="/topics/:topic" />
          <Article path="/articles/:article_id" username={this.state.username} />
          <Users path="/users" />
          <ArticleAdder path="/addarticle" username={this.state.username} />
          <UserPage path="/users/:username" />
          <Login path="/login" changeUser={this.changeUser} />
        </Router>
        <UserInfo username={this.state.username} />
        <Footer />
      </div>
    );
  }
  changeUser = (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    console.dir(username)
    this.setState({ username });
    navigate('/');
  }
}

export default App;
