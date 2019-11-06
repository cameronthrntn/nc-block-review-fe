import React, { Component } from 'react';
import { handleVote } from '../utils/articles';
import upChevron from '../images/upChevron.svg';
import downActive from '../images/downActive.svg';
import upActive from '../images/upActive.svg';

export default class Vote extends Component {
  state = {
    voteChange: 0,
    isLoading: true
  };
  componentDidMount = () => {
    this.setState({ isLoading: false });
  };
  vote = e => {
    const voteType = e.currentTarget.id;
    const { voteChange } = this.state;
    let val = 0;
    if (voteChange > 0) {
      val = voteType === 'upvote' ? -1 : -2;
    } else if (voteChange < 0) {
      val = voteType === 'upvote' ? 2 : 1;
    } else {
      val = voteType === 'upvote' ? 1 : -1;
    }
    handleVote(val, this.props.itemID, this.props.type).then(() => {
      this.setState(curr => {
        return { voteChange: curr.voteChange + val };
      });
    });
  };
  render() {
    return (
      <div className="votes">
        {!this.state.isLoading && (
          <>
            <button className="voteButton" id="downvote" onClick={this.vote}>
              {this.state.voteChange < 0 ? (
                <img
                  className="downvote"
                  src={downActive}
                  alt="active Downvote arrow"
                />
              ) : (
                <img
                  className="downvote"
                  src={upChevron}
                  alt="inactive Downvote arrow"
                />
              )}
            </button>
            <p
              className={
                this.state.voteChange > 0
                  ? 'increase'
                  : this.state.voteChange < 0
                  ? 'decrease'
                  : 'voteCount'
              }
            >
              {this.props.votes + this.state.voteChange}
            </p>
            <button className="voteButton" id="upvote" onClick={this.vote}>
              {this.state.voteChange > 0 ? (
                <img
                  className="upvote"
                  src={upActive}
                  alt="active upvote arrow"
                />
              ) : (
                <img
                  className="upvote"
                  src={upChevron}
                  alt=" inactive upvote arrow"
                />
              )}
            </button>
          </>
        )}
      </div>
    );
  }
}
