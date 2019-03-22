import React, { Component } from 'react';
import * as api from '../api';
import { navigate } from '@reach/router';

class ArticleAdder extends Component {
  state = {
    title: '',
    body: '',
    topic: '',
    username: ''
  }
  render() {
    return <form onSubmit={this.handleSubmit}>
      <label>Title</label>
      <input type="text" id='title' /> <br />
      <label>Body</label>
      <input type="text" id='body' /> <br />
      <label>Topic</label>
      {/* <select name="topic" id="topic">
      <option value="topic1">topic1</option>
      <option value="topic2">topic2</option>
      <option value="create-new">create new topic</option>
    </select> */}
      <input type="text" id='topic' /> <br />
      <input type="submit" value="Submit" />
    </form >
  }

  componentDidMount() {
    const { username } = this.props;
    this.setState({ username });
  }

  componentDidUpdate() {

  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username } = this.state;
    const title = event.target.children[1].value;
    const body = event.target.children[4].value;
    const topic = event.target.children[7].value;
    api.addArticle(title, body, topic, username).then(({ article_id }) => {
      console.log(article_id)
      navigate(`/articles/${article_id}`);
    });
  }
};

export default ArticleAdder;