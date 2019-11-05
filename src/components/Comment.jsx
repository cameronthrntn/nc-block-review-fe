import React, { Component } from 'react';
import '../styles/Comment.css';
import {removeComment} from '../utils/comments'

export default class Comment extends Component {
  deleteComment = () => {
    removeComment(this.props.comment.comment_id)
    this.props.removeCommentFromState(this.props.comment.comment_id)
  }
  render() {
    const { author, comment_id, body } = this.props.comment;
    return (
      <li key={comment_id} className="commentCard">
        <header className="commentMeta">{author}</header>
        <p className="commentBody">{body}</p>
        {author === this.props.currentUser && (
          <button onClick={this.deleteComment}>X</button>
        )}
      </li>
    );
  }
}
