import React, { Component } from 'react';
import '../styles/Comment.css';
import { removeComment, commentVote } from '../utils/comments';

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
    const { author, comment_id, body, votes } = this.state.comment;
    return (
      <li key={comment_id} className="commentCard">
        {!this.state.isLoading && (
          <>
            <header className="commentMeta">
              <h4>{author}</h4>
              <div className="commentVoting">
                <div className="votes">
                  <button onClick={() => this.vote(-1)}>{'<'}</button>
                  <p>{votes}</p>
                  <button onClick={() => this.vote(1)}>></button>
                </div>
              </div>
            </header>
            <p className="commentBody">{body}</p>
            {author === this.props.currentUser && (
              <button onClick={this.deleteComment}>X</button>
            )}
          </>
        )}
      </li>
    );
  }
}
