import React, { Component } from 'react';
import '../styles/Comment-List.css';

import { getComments } from '../utils/comments';
import Comment from './Comment';
import AddComment from './AddComment';

export default class CommentList extends Component {
  state = {
    comments: []
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      getComments(this.props.id).then(comments => this.setState({ comments }));
    }
  }
  updateComments = comment => {
    this.setState(curr => {
      return { comments: [comment, ...curr.comments] };
    });
  };
  removeCommentFromState = id => {
    this.setState(curr => {
      return {
        comments: curr.comments.filter(comment => comment.comment_id !== id)
      };
    });
  };
  render() {
    const { comments } = this.state;
    return (
      <>
        <AddComment
          updateComments={this.updateComments}
          article={this.props.id}
          token={this.props.token}
        />
        <ul className="commentList">
          {comments.map(comment => {
            return (
              <Comment
                key={comment.comment_id}
                comment={comment}
                removeCommentFromState={this.removeCommentFromState}
                currentUser="jessjelly"
              />
            );
          })}
        </ul>
      </>
    );
  }
}
