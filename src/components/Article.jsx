import React, { Component } from 'react';
import CommentAdder from './CommentAdder';
import * as api from '../api';
import Button from './Button';
import { navigate } from '@reach/router';
import IconImage from './IconImage';
import like_icon from '../icons/like_icon.png';
import dislike_icon from '../icons/dislike_icon.png';
import Comment from './Comment';

class Article extends Component {
  state = {
    article: {},
    comments: [],
    loading: true,
    commentPage: 1,
    commentLimit: 10,
    voteChange: 0
  }
  render() {
    const { username, article_id } = this.props;
    const { article, comments, loading, commentPage, commentLimit, voteChange } = this.state;
    return <div>
      <h3>{article.title}</h3>
      {loading && 'Loading...'}
      <h4>Created by {article.author}, {article.created_at}</h4>
      <p>{article.body}</p>
      <p>Votes: {article.votes}</p>
      {username === article.author && <Button text='Delete article' handleClick={this.handleClick} />}
      <IconImage src={like_icon} description='like' vote={() => this.handleVoteClick(1, voteChange, article_id)} />
      <IconImage src={dislike_icon} description='dislike' vote={() => this.handleVoteClick(-1, voteChange, article_id)} />
      <h4>{comments.length} Comments:</h4>
      <CommentAdder addComment={this.addComment} username={this.props.username} />
      {commentPage > 1 && <Button text='Previous comments' handleClick={() => this.fetchComments(commentPage - 1, commentLimit)} />}
      {commentPage < Math.ceil(article.comment_count / commentLimit) && <Button text='Next comments' handleClick={() => this.fetchComments(commentPage + 1, commentLimit)} />}
      {comments.map(comment => {
        return <Comment key={comment.comment_id} comment={comment} username={username} deleteComment={this.deleteComment} />
      })}
    </div>
  }

  componentDidMount() {
    this.fetchArticle();
    this.fetchComments();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('update!!')
  }

  fetchArticle() {
    const { article_id } = this.props;
    api.getArticle(article_id)
      .then(article => {
        this.setState({ article, loading: false })
      })
      .catch(err => {
        this.props.navigate('/not-found')
      });
  }
  fetchComments(p = 1, limit = 10) {
    const { article_id } = this.props;
    api.getComments(article_id, p, limit)
      .then(comments => {
        console.log(comments)
        this.setState({ comments, commentPage: p, commentLimit: limit })
      })
      .catch(err => {
        this.props.navigate('/not-found')
      })
  }
  addComment = (event) => {
    event.preventDefault();
    const { article_id, username } = this.props;
    const body = event.target[0].value;
    api.addComment(article_id, username, body)
      .then(comment => {
        this.setState(prevState => {
          return { comments: [comment, ...prevState.comments] }
        })
      })
      .catch(err => {
        this.props.navigate('/not-found')
      })
    event.target[0].value = '';
  }

  deleteComment = (comment_id) => {
    api.deleteComment(comment_id)
      .then(() => this.fetchComments())
      .catch(err => {
        this.props.navigate('/not-found')
      });
  }

  handleClick = () => {
    const { article_id } = this.props;
    api.deleteArticle(article_id)
      .then(() => {
        navigate('/articles');
      })
      .catch(err => {
        this.props.navigate('/not-found')
      })
  }

  handleVoteClick = (vote, voteChange, article_id) => {
    if (voteChange + vote < 2 && voteChange + vote > -2) {
      api.updateArticleVote(article_id, vote)
        .then(() => {
          this.setState(prevState => {
            return { article: { ...prevState.article, votes: prevState.article.votes + vote }, voteChange: prevState.voteChange + vote }
          })
        })
        .catch(err => {
          this.props.navigate('/not-found')
        })
    }
  }
}

export default Article;