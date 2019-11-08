import React, { Component } from 'react';
import { handleVote } from '../utils/articles';
import { UserConsumer } from './UserContext';
import upChevron from '../images/upChevron.svg';
import downActive from '../images/downActive.svg';
import upActive from '../images/upActive.svg';
import '../styles/Vote.css';

export default class Vote extends Component {
  state = {
    voteChange: 0,
    isLoading: true,
    err: null
  };
  componentDidMount = () => {
    this.setState({ isLoading: false });
  };
  vote = async e => {
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
    try {
      await handleVote(val, this.props.itemID, this.props.type);
      this.setState(curr => {
        return { voteChange: curr.voteChange + val };
      });
    } catch (err) {
      this.setState({ err });
    }
  };
  render() {
    if (this.state.err) alert('There was a problem submitting your vote');
    return (
      <div className="votes">
        {!this.state.isLoading && (
          <UserConsumer>
            {user => {
              return (
                <>
                  {user.username && (
                    <button
                      className="voteButton"
                      id="downvote"
                      onClick={this.vote}
                    >
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
                  )}
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
                  {user.username && (
                    <button
                      className="voteButton"
                      id="upvote"
                      onClick={this.vote}
                    >
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
                  )}
                </>
              );
            }}
          </UserConsumer>
        )}
      </div>
    );
  }
}
