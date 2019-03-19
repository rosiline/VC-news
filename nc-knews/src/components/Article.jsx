import React from 'react';

const Article = (props) => {
  console.dir(props)
  return <p>Article {props.article_id} shown here</p>
}

export default Article;