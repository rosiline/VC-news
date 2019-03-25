import React, { Component } from 'react';
import { Link } from '@reach/router';
import Button from './Button';
import * as api from '../api';
import Header from './Header';

class Articles extends Component {
  state = {
    articles: [],
    total_count: 0,
    loading: true,
    p: 1,
    limit: 10,
    sort_by: ''
  }
  render() {
    const { articles, total_count, loading, p, limit } = this.state;
    return <div>
      {this.props.path === '/' && <Header path='/' text='Currently trending' />}
      {this.props.path === '/articles' && <Header text='All articles' />}
      {this.props.path === '/topics/:topic' && <Header text={this.props.topic} />}
      <Link to="/addarticle"><Button text="Add new article" /></Link> <br />
      {p > 1 && <Button text="Previous page" handleClick={() => this.fetchArticles(p - 1, limit)} />}
      {p < Math.ceil(total_count / limit) && <Button text="Next page" handleClick={() => this.fetchArticles(p + 1, limit)} />} <br />
      <p>Current page: {p} </p>
      {this.props.path !== '/' && <div><p>Sort by:</p>
        <select name="sort" id="sort" onChange={this.handleChange}>
          <option value="created_at">Date created</option>
          <option value="comment_count">Comment count</option>
          <option value="votes">Votes</option>
        </select>
      </div>}
      {loading && 'Loading...'}
      <ul>
        {articles.length === 0 && 'Nothing here yet! Feel free to add an article'}
        {articles.map(({ title, author, article_id, created_at, comment_count, votes, topic }) => {
          return <li key={article_id}>
            <Link to={`/articles/${article_id}`}><h4>{title} - by {author}</h4></Link>
            <p>Topic: {topic}</p>
            <p>Posted: {created_at}</p>
            <p>Comments: {comment_count}</p>
            <p>Votes: {votes}</p>
          </li>
        })}
      </ul>
      {p > 1 && <Button text="Previous page" handleClick={() => this.fetchArticles(p - 1, limit)} />}
      {p < Math.ceil(total_count / limit) && <Button text="Next page" handleClick={() => this.fetchArticles(p + 1, limit)} />} <br />
      <p>Current page: {p} </p>
    </div>
  }

  componentDidMount() {
    this.setState({ sort_by: this.props.sort_by })
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('updated')
    const topicChanged = this.props.topic !== prevProps.topic
    const sortPropChanged = this.props.sort_by !== prevProps.sort_by
    const sortStateChanged = this.state.sort_by !== prevState.sort_by
    if (sortPropChanged) {
      this.setState({ sort_by: this.props.sort_by }, () => {
        this.fetchArticles();
      })
    }
    if (sortStateChanged || topicChanged) {
      this.fetchArticles()
    };
  }

  fetchArticles(p = 1, limit = 10) {
    const { topic } = this.props;
    const { sort_by } = this.state;
    api.getArticles({ sort_by, topic, p, limit })
      .then(({ articles, total_count }) => {
        this.setState({ articles, total_count, loading: false, p, limit })
      })
      .catch(err => {
        this.props.navigate('/not-found')
      })
  }

  handleChange = (event) => {
    const sort_by = event.target.value;
    this.setState({ sort_by })
  }
}

export default Articles;