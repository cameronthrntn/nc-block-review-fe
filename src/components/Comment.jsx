import React, { Component } from 'react';
import '../styles/Comment.css'

export default class Comment extends Component {
  render() {
    const { author, comment_id, body } = this.props.comment;
    return (
      <li key={comment_id} className="commentCard">
        <header className="commentMeta">{author}</header>
        <p className="commentBody">{body}</p>
      </li>
    );
  }
}
