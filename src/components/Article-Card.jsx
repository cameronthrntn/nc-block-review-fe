import React from 'react';
import '../styles/Article-Card.css';
import { Link } from '@reach/router';

export default function ArticleCard(props) {
  const {
    created_at,
    title,
    topic,
    article_id,
    comment_count,
    author,
    votes,
    body
  } = props.article;
  return (
    <li className="articleCard">
      <Link to={`/article/${article_id}`}>
        <header className="articleBound">
          <div className="boundContents">
            <p className="articleTitle">{title}</p>
            <p className="subHeading">-{topic}-</p>
            <p className="subHeading">{created_at}</p>
          </div>
        </header>
        <div className="articleContents">
          <p>{body.substring(0, 100).concat('...')}</p>
        </div>
        <footer className="articleBound">
          <div className="boundContents">
            <p>{author}</p>
            <p>{comment_count} comments</p>
            <div className="votes">
              <p>{'<'}</p>
              <p>{votes}</p>
              <p>></p>
            </div>
          </div>
        </footer>
      </Link>
    </li>
  );
}
