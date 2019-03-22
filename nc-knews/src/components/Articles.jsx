import React, { Component } from 'react';
import { Link } from '@reach/router';
import Button from './Button';
import * as api from '../api';
import Header2 from './Header2';

class Articles extends Component {
  state = {
    articles: [],
    total_count: 0,
    loading: true,
  }
  render() {
    console.dir(this.props)
    return <div>
      {this.props.path === '/' && <Header2 path='/' text='Currently trending' />}
      {this.props.path === '/articles' && <Header2 text='All articles' />}
      {this.props.path === '/topics/:topic' && <Header2 text={this.props.topic} />}
      <Link to="/addarticle"><Button text="Add new article" /></Link>
      {this.state.loading && 'Loading...'}
      <ul>
        {this.state.articles.map(({ title, author, article_id, created_at, comment_count }) => {
          return <li key={article_id}>
            <Link to={`/articles/${article_id}`}><h4>{title}</h4></Link>
            <p>Author: {author}</p>
            <p>Posted: {created_at}</p>
            <p>Comments: {comment_count}</p>
          </li>
        })}
      </ul>
    </div>
  }

  componentDidMount() {
    console.log('component mounted')
    this.fetchArticles();
  }

  fetchArticles() {
    const { topic, sort_by } = this.props;
    api.getArticles({ sort_by, topic })
      .then(({ articles, total_count }) => {
        this.setState({ articles, total_count, loading: false })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('component updated')
    const topicChanged = this.props.topic !== prevProps.topic
    const sortChanged = this.props.sort_by !== prevProps.sort_by
    if (topicChanged) this.fetchArticles();
    if (sortChanged) this.fetchArticles();
  }
}

export default Articles;