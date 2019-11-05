import React, { Component } from 'react';
import '../styles/Article-Card.css';
import { Link } from '@reach/router';
import { articleVote } from '../utils/articles';
import upChevron from '../images/upChevron.svg';
import downActive from '../images/downActive.svg';
import upActive from '../images/upActive.svg';
import Vote from './Vote';

export default class ArticleCard extends Component {
  state = {
    article: {},
    isLoading: true,
    isDownvoted: false,
    isUpvoted: false
  };
  componentDidMount() {
    this.setState({ article: this.props.article, isLoading: false });
  }
  upvote = () => {
    let val = this.state.isDownvoted ? 2 : 1;
    if (this.state.isUpvoted) val = -1;
    articleVote(val, this.state.article.article_id)
      .then(article =>
        this.setState(curr => {
          return {
            article: { ...article, comment_count: curr.article.comment_count },
            isDownvoted: false,
            isUpvoted: !curr.isUpvoted
          };
        })
      )
      .then(() => {
        this.props.updateArticleVotes(this.state.article);
      });
  };
  downvote = () => {
    let val = this.state.isUpvoted ? -2 : -1;
    if (this.state.isDownvoted) val = 1;
    articleVote(val, this.state.article.article_id)
      .then(article =>
        this.setState(curr => {
          return {
            article: { ...article, comment_count: curr.article.comment_count },
            isDownvoted: !curr.isDownvoted,
            isUpvoted: false
          };
        })
      )
      .then(() => {
        this.props.updateArticleVotes(this.state.article);
      });
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
                <Vote item={this.state.article}/>
                {/* <div className="votes">
                  <button className="voteButton" onClick={this.downvote}>
                    {this.state.isDownvoted ? (
                      <img
                        className="downvote"
                        src={downActive}
                        alt="Downvote arrow"
                      />
                    ) : (
                      <img
                        className="downvote"
                        src={upChevron}
                        alt="Downvote arrow"
                      />
                    )}
                  </button>
                  <p>{votes}</p>
                  <button className="voteButton" onClick={this.upvote}>
                    {this.state.isUpvoted ? (
                      <img
                        className="upvote"
                        src={upActive}
                        alt="upvote arrow"
                      />
                    ) : (
                      <img
                        className="upvote"
                        src={upChevron}
                        alt="upvote arrow"
                      />
                    )}
                  </button>
                </div> */}
              </div>
            </footer>
          </>
        )}
      </li>
    );
  }
}
