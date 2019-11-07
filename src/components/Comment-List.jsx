import React, { Component } from 'react';
import '../styles/Comment-List.css';
import { UserConsumer } from './UserContext';
import { getComments } from '../utils/comments';
import Comment from './Comment';
import AddComment from './AddComment';
import Loader from './Loader';
import ErrorHandling from './ErrorHandling';

export default class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
    err: null
  };
  async componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      try {
        const comments = await getComments(this.props.id);
        this.setState({ comments, isLoading: false });
      } catch (err) {
        this.setState({ err });
      }
    }
  }
  updateComments = comment => {
    console.log(comment, '<- comm');
    
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
  async componentDidMount() {
    try {
      const comments = await getComments(this.props.id);
      this.setState({ comments, isLoading: false });
    } catch (err) {
      this.setState({ err });
    }
  }
  render() {
    const { comments } = this.state;
    return this.state.err ? (
      <ErrorHandling err={this.state.err} />
    ) : this.state.isLoading ? (
      <Loader page="comments" />
    ) : (
      <>
        <UserConsumer>
          {user => {
            return (
              <AddComment
                updateComments={this.updateComments}
                article={this.props.id}
                setToken={this.props.setToken}
                user={user}
              />
            );
          }}
        </UserConsumer>
        <ul className="commentList">
          {comments.map(comment => {
            return (
              <UserConsumer key={comment.comment_id}>
                {user => {
                  return (
                    <Comment
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
