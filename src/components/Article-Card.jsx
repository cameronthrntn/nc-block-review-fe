import React, { Component } from 'react';
import '../styles/Article-Card.css';
import { Link } from '@reach/router';
import { articleVote } from '../utils/articles';

export default class ArticleCard extends Component {
  state = {
    article: {},
    isLoading: true
  };
  componentDidMount() {
    this.setState({ article: this.props.article, isLoading: false });
  }
  vote = val => {
    articleVote(val, this.state.article.article_id).then(article =>
      this.setState(curr => {
        return {
          article: { ...article, comment_count: curr.article.comment_count }
        };
      })
    ).then(() => {
      this.props.updateArticleVotes(this.state.article)
    })
  };
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
              <div className="boundContents">
                <p>{author}</p>
                <p>{comment_count} comments</p>
                <div className="votes">
                  <button onClick={() => this.vote(-1)}>{'<'}</button>
                  <p>{votes}</p>
                  <button onClick={() => this.vote(1)}>></button>
                </div>
              </div>
            </footer>
          </>
        )}
      </li>
    );
  }
}
