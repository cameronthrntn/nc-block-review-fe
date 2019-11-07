import React, { Component } from 'react';
import '../styles/Comment-List.css';
import { UserConsumer } from './UserContext';
import { getComments } from '../utils/comments';
import Comment from './Comment';
import AddComment from './AddComment';
import Loader from './Loader';

export default class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      getComments(this.props.id).then(comments =>
        this.setState({ comments, isLoading: false })
      );
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
  componentDidMount() {
    getComments(this.props.id).then(comments =>
      this.setState({ comments, isLoading: false })
    );
  }
  render() {
    const { comments } = this.state;
    return this.state.isLoading ? (
      <Loader page="comments" />
    ) : (
      <>
        <AddComment
          updateComments={this.updateComments}
          article={this.props.id}
          token={this.props.token}
          setToken={this.props.setToken}
        />
        <ul className="commentList">
          {comments.map(comment => {
            return (
              <UserConsumer>
                {user => {
                  return (
                    <Comment
                      key={comment.comment_id}
                      comment={comment}
                      removeCommentFromState={this.removeCommentFromState}
                      currentUser={user.username}
                    />
                  );
                }}
              </UserConsumer>
            );
          })}
        </ul>
      </>
    );
  }
}
