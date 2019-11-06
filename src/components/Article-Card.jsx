import React, { Component } from 'react';
import '../styles/Article-Card.css';
import { Link } from '@reach/router';
import { articleVote } from '../utils/articles';
import Vote from './Vote';

export default class ArticleCard extends Component {
  state = {
    article: {},
    isLoading: true
  };
  componentDidMount() {
    this.setState({ article: this.props.article, isLoading: false });
  }
  render() {
    const {
      created_at,
      title,
      topic,
      article_id,
      comment_count,
      author,
      votes,
      body
    } = this.state.article;
    return (
      <li className="articleCard">
        {!this.state.isLoading && (
          <>
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
            </Link>
            <footer className="articleBound">
              <div className="boundContents lowerBound">
                <p>{author}</p>
                <p>{comment_count} comments</p>
                <Vote votes={votes} type="article" itemID={article_id} />
              </div>
            </footer>
          </>
        )}
      </li>
    );
  }
}
