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
    p: 1,
    limit: 10,
    sort_by: ''
  }
  render() {
    const { articles, total_count, loading, p, limit } = this.state;
    return <div>
      {this.props.path === '/' && <Header2 path='/' text='Currently trending' />}
      {this.props.path === '/articles' && <Header2 text='All articles' />}
      {this.props.path === '/topics/:topic' && <Header2 text={this.props.topic} />}
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
        {articles.map(({ title, author, article_id, created_at, comment_count, votes }) => {
          return <li key={article_id}>
            <Link to={`/articles/${article_id}`}><h4>{title}</h4></Link>
            <p>Author: {author}</p>
            <p>Posted: {created_at}</p>
            <p>Comments: {comment_count}</p>
            <p>Votes: {votes}</p>
          </li>
        })}
      </ul>
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
    // console.log(sort_by)
    api.getArticles({ sort_by, topic, p, limit })
      .then(({ articles, total_count }) => {
        this.setState({ articles, total_count, loading: false, p, limit })
      })
  }

  handleChange = (event) => {
    const sort_by = event.target.value;
    this.setState({ sort_by })
  }
}

export default Articles;