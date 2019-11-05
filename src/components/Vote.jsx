import React, { Component } from 'react';
import { articleVote } from '../utils/articles';
import upChevron from '../images/upChevron.svg';
import downActive from '../images/downActive.svg';
import upActive from '../images/upActive.svg';

export default class Vote extends Component {
  state = {
    item: {},
    isDownvoted: false,
    isUpvoted: false,
    isLoading: true
  };
  componentDidMount = () => {
    this.setState({ item: this.props.item, isLoading: false });
  };
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
    return (
      <div className="votes">
        {!this.state.isLoading && (
          <>
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
            <p>{this.state.item.votes}</p>
            <button className="voteButton" onClick={this.upvote}>
              {this.state.isUpvoted ? (
                <img className="upvote" src={upActive} alt="upvote arrow" />
              ) : (
                <img className="upvote" src={upChevron} alt="upvote arrow" />
              )}
            </button>
          </>
        )}
      </div>
    );
  }
}
