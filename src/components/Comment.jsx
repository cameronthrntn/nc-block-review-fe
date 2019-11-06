import React, { Component } from 'react';
import '../styles/Comment.css';
import { removeComment, commentVote } from '../utils/comments';
import Vote from './Vote';

export default class Comment extends Component {
  state = {
    comment: {},
    isLoading: true
  };
  deleteComment = () => {
    removeComment(this.props.comment.comment_id);
    this.props.removeCommentFromState(this.props.comment.comment_id);
  };
  vote = val => {
    commentVote(val, this.props.comment.comment_id).then(comment =>
      this.setState({ comment })
    );
  };
  componentDidMount() {
    this.setState({ comment: this.props.comment, isLoading: false });
  }
  render() {
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
                <button onClick={this.deleteComment}>X</button>
              )}
            </footer>
          </>
        )}
      </li>
    );
  }
}
