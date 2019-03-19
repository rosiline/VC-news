import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Articles from './components/Articles';
import UserInfo from './components/UserInfo';
import Footer from './components/Footer';
import { Router } from '@reach/router';
import Article from './components/Article';
import Topics from './components/Topics';
import Users from './components/Users';
import Topic from './components/Topic';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <Router className="main">
          <Articles path="/" />
          <Topics path="/topics" />
          <Topic path="/topics/:topic" />
          <Articles path="/articles" />
          <Article path="/articles/:article_id" />
          <Users path="/users" />
        </Router>
        <UserInfo />
        <Footer />
      </div>
    );
  }
}

export default App;
