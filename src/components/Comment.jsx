import React, { Component } from 'react';
import Button from './Button';
import IconImage from './IconImage';
import like_icon from '../icons/like_icon.png';
import dislike_icon from '../icons/dislike_icon.png';
import * as api from '../api';

class Comment extends Component {
  state = {
    comment: {},
    voteChange: 0
  }
  render() {
    const { comment_id, author, body, votes, created_at } = this.state.comment;
    const { voteChange } = this.state;
    return <div>
      <p>{author}: {body}</p>
      <p>Posted: {created_at}</p>
      <p>Votes: {votes}</p>
      {author === this.props.username && <Button text='Delete comment' handleClick={() => this.props.deleteComment(comment_id)} />}
      <IconImage src={like_icon} description='like' vote={() => this.handleCommentVote(1, voteChange, comment_id)} />
      <IconImage src={dislike_icon} description='dislike' vote={() => this.handleCommentVote(-1, voteChange, comment_id)} />
    </div>
  }

  componentDidMount() {
    const { comment } = this.props;
    this.setState({ comment });
  }

  handleCommentVote = (vote, voteChange, comment_id) => {
    if (voteChange + vote < 2 && voteChange + vote > -2) {
      api.updateCommentVote(comment_id, vote)
        .then((comment) => {
          this.setState(prevState => {
            return { comment: { ...prevState.comment, votes: prevState.comment.votes + vote }, voteChange: prevState.voteChange + vote }
          })
        })
        .catch(err => {
          this.props.navigate('/not-found')
        })
    }
  }
}

export default Comment;