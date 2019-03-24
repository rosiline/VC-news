import React, { Component } from 'react';
import Button from './Button';
import IconImage from './IconImage';
import like_icon from '../icons/like_icon.png';
import dislike_icon from '../icons/dislike_icon.png';
import * as api from '../api';

class Comment extends Component {
  state = {
    comment: {}
  }
  render() {
    const { comment_id, author, body, votes } = this.state.comment;
    return <div>
      <p>{author}: {body}</p>
      <p>Votes: {votes}</p>
      {author === this.props.username && <Button text='Delete comment' handleClick={() => this.props.deleteComment(comment_id)} />}
      <IconImage src={like_icon} description='like' vote={() => this.handleCommentVote(comment_id, 1)} />
      <IconImage src={dislike_icon} description='dislike' vote={() => this.handleCommentVote(comment_id, -1)} />
    </div>
  }

  componentDidMount() {
    const { comment } = this.props;
    this.setState({ comment });
  }

  handleCommentVote = (comment_id, voteChange) => {
    api.updateCommentVote(comment_id, voteChange)
      .then((comment) => {
        this.setState(prevState => {
          return { comment: { ...prevState.comment, votes: prevState.comment.votes + voteChange } }
        })
      })
  }
}

export default Comment;