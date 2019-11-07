import React, { Component } from 'react';
import '../styles/Comment.css';
import { removeComment } from '../utils/comments';
import Vote from './Vote';
import bin from '../images/bin.svg';

export default class Comment extends Component {
  state = {
    comment: {},
    isLoading: true,
    err: null
  };
  deleteComment = async () => {
    try {
      await removeComment(this.props.comment.comment_id);
      this.props.removeCommentFromState(this.props.comment.comment_id);
    } catch (err) {
      this.setState({ err });
    }
  };
  componentDidMount() {
    this.setState({ comment: this.props.comment, isLoading: false });
  }
  render() {
    if (this.err) alert('There was a problem performing this action');
    const { author, comment_id, body, votes, created_at } = this.state.comment;
    const date = new Date(created_at);
    const displayDate = date.toDateString();
    return (
      <li key={comment_id} className="commentCard">
        {!this.state.isLoading && (
          <>
            <header className="commentMeta">
              <h4>{author}</h4>
              <p>{displayDate}</p>
            </header>
            <p className="commentBody">{body}</p>
            <footer className="commentFooter">
              <div className="commentVoting">
                <Vote votes={votes} type="comment" itemID={comment_id} />
              </div>
              {author === this.props.currentUser && (
                <button
                  className="voteButton"
                  id="bin"
                  onClick={this.deleteComment}
                >
                  <img className="bin" src={bin} alt="deletion icon" />
                </button>
              )}
            </footer>
          </>
        )}
      </li>
    );
  }
}
