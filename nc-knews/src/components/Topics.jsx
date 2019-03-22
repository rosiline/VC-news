import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';

class Topics extends Component {
  state = {
    topics: [],
    loading: true
  }
  render() {
    const { topics, loading } = this.state;
    return <div>
      <h3>Topics</h3>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="slug">Topic</label>
        <input type="text" id="slug" required /> <br />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" required /> <br />
        <input type="submit" value="Add New Topic" />
      </form>
      {loading && 'Loading...'}
      <ul>
        {topics.map(({ slug }) => {
          return <Link key={slug} to={`/topics/${slug}`}><li>{slug}</li></Link>
        })}
      </ul>
    </div>
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics() {
    api.getTopics().then(topics => {
      this.setState({ topics, loading: false })
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const slug = event.target.children[1].value;
    const description = event.target.children[4].value;
    api.addTopic(slug, description).then(topic => {
      this.setState(prevState => {
        return { topics: [...prevState.topics, topic] }
      })
    });
  }
};

export default Topics;