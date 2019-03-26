import React, { Component } from 'react';
import * as api from '../api';
import { navigate, Link } from '@reach/router';

class ArticleAdder extends Component {
  state = {
    topics: [],
    title: '',
    body: '',
    topic: '',
    description: '',
    username: '',
    newTopicHidden: true
  }
  render() {
    const { topics, username } = this.state;
    return <div>
      {!username && <p>Please <Link to='/login' >log in</Link> to post an article</p>}
      {username && <form onSubmit={this.handleSubmit}>
        <div className='form-group' >
          <label>Title</label>
          <input className='form-control' type="text" id='title' onChange={this.handleChange} required />
        </div>
        <div className='form-group'>
          <label>Body</label>
          <textarea className='form-control' type="text" id='body' onChange={this.handleChange} required />
        </div>
        <div className='form-group'>
          <label>Topic</label>
          <select className='form-control' name="topic" id="topic" onChange={this.handleSelect}>
            <option value="Select Topic">--Select Topic--</option>
            {topics.map(topic => {
              return <option key={topic} value={topic}>{topic}</option>
            })}
            <option value="Create New Topic">Create New Topic</option>
          </select>
        </div>
        <label htmlFor="topic" hidden={this.state.newTopicHidden}>New Topic: </label>
        <input type="text" id='topic' hidden={this.state.newTopicHidden} onChange={this.handleChange} required={!this.state.newTopicHidden} />
        <label htmlFor="description" hidden={this.state.newTopicHidden}>Topic Description:</label>
        <input type="text" id='description' hidden={this.state.newTopicHidden} onChange={this.handleChange} required={!this.state.newTopicHidden} />
        <input className="btn btn-warning" type="submit" value="Submit" />
      </form >}
    </div>
  }

  componentDidMount() {
    const { username } = this.props;
    this.setState({ username });
    this.fetchTopics();
  }

  componentDidUpdate() {

  }

  fetchTopics() {
    api.getTopics()
      .then(topics => {
        const slugs = topics.map(topic => topic.slug)
        this.setState({ topics: slugs })
      })
      .catch(err => {
        this.props.navigate('/not-found')
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, title, body, topic, topics, description } = this.state;
    if (!topics.includes(topic)) {
      api.addTopic(topic, description)
        .then(() => api.addArticle(title, body, topic, username))
        .then(({ article_id }) => {
          navigate(`/articles/${article_id}`);
        })
        .catch(err => {
          this.props.navigate('/not-found')
        })
    } else {
      api.addArticle(title, body, topic, username).then(({ article_id }) => {
        navigate(`/articles/${article_id}`);
      });
    }
  }

  handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    this.setState({ [key]: value })
  }

  handleSelect = (event) => {
    const topic = event.target.value;
    if (topic === 'Create New Topic') {
      this.setState({ newTopicHidden: false })
    } else {
      this.setState({ topic, newTopicHidden: true })
    }
  }
};

export default ArticleAdder;