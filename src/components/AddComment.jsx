import React, { Component } from 'react';
import { postComment } from '../utils/comments';

export default class AddComment extends Component {
  state = {
    showingForm: false,
    username: 'jessjelly',
    commentInput: ''
  };
  toggleForm = () => {
    this.setState(curr => {
      return { showingForm: !curr.showingForm };
    });
  };
  formChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  formSubmit = e => {
    e.preventDefault();
    postComment(
      { body: this.state.commentInput, username: this.state.username },
      this.props.article
    ).then(comment => {
      this.props.updateComments(comment);
      this.setState({ commentInput: '' });
    });
  };
  render() {
    return (
      <>
        {!this.state.showingForm ? (
          <button onClick={this.toggleForm}>+</button>
        ) : (
          <form onSubmit={this.formSubmit}>
            <label htmlFor="commentInput">
              <input
                id="commentInput"
                type="text"
                placeholder="comment..."
                value={this.state.comment}
                onChange={this.formChange}
                required
              ></input>
            </label>
            <button>post</button>
          </form>
        )}
      </>
    );
  }
}
