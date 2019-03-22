import axios from 'axios';

const request = axios.create({
  baseURL: 'https://nc-knews-vik.herokuapp.com/api'
});

export const getTopics = async () => {
  const { data } = await request.get('/topics')
  return data.topics;
}
export const addTopic = async (slug, description) => {
  const { data } = await request.post('/topics', { slug, description });
  return data.topic;
}

export const getArticles = async ({ sort_by, topic }) => {
  const { data } = await request.get('/articles', { params: { sort_by, topic } });
  return data;
}

export const getArticle = async (article_id) => {
  const { data } = await request.get(`/articles/${article_id}`);
  return data.article;
}

export const addArticle = async (title, body, topic, username) => {
  const { data } = await request.post('/articles', { title, body, topic, username });
  return data.article;
}

export const updateArticleVote = async (article_id, voteChange) => {
  const { data } = await request.patch(`/articles/${article_id}`, { inc_votes: voteChange });
  return data.article;
}

export const deleteArticle = async (article_id) => {
  const { data } = await request.delete(`/articles/${article_id}`);
  return data;
}

export const getUsers = async () => {
  const { data } = await request.get('/users');
  return data;
}

export const getUser = async (username) => {
  const { data } = await request.get(`/users/${username}`);
  return data.user;
}

export const getComments = async (article_id) => {
  const { data } = await request.get(`/articles/${article_id}/comments`);
  return data.comments;
}

export const addComment = async (article_id, username, body) => {
  const { data } = await request.post(`/articles/${article_id}/comments`, { username, body });
  return data.comment;
}

export const deleteComment = async (comment_id) => {
  const { data } = await request.delete(`/comments/${comment_id}`);
  return data;
}

export const updateCommentVote = async (comment_id, voteChange) => {
  const { data } = await request.patch(`comments/${comment_id}`, { inc_votes: voteChange });
  return data.comment;
}