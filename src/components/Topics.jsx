import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';

class Topics extends Component {
  state = {
    topics: [],
    loading: true,
    slug: '',
    description: ''
  }
  render() {
    const { topics, loading } = this.state;
    const { username } = this.props;
    return <div>
      <h3>Topics</h3>
      {!username && <p>Please <Link to='/login' >log in</Link> to add a topic. Feel free to browse existing articles anonymously</p>}
      {username && <form onSubmit={this.handleSubmit}>
        <div className='form-group' >
          <label htmlFor="slug">Topic</label>
          <input className='form-control' type="text" id="slug" required onChange={this.handleChange} />
        </div>
        <div className='form-group' >
          <label htmlFor="description">Description</label>
          <input className='form-control' type="text" id="description" required onChange={this.handleChange} />
        </div>
        <button className='btn btn-warning' type="submit" value="Add New Topic" >Add Topic</button>
      </form>}
      {loading && 'Loading...'}
      <ul>
        {topics.map(({ slug, description }) => {
          return <Link key={slug} to={`/topics/${slug}`}><li>{slug} - {description}</li></Link>
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
      .catch(err => {
        this.props.navigate('/not-found')
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { slug, description } = this.state;
    api.addTopic(slug, description)
      .then(topic => {
        this.setState(prevState => {
          return { topics: [...prevState.topics, topic] }
        })
      })
      .catch(err => {
        this.props.navigate('/not-found')
      });
  }

  handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    this.setState({ [key]: value })
  }
};

export default Topics;