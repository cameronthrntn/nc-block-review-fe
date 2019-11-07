import React, { Component } from 'react';
import '../styles/AddComment.css';
import { postComment } from '../utils/comments';
import Login from './Login';
import { UserConsumer } from './UserContext';

export default class AddComment extends Component {
  state = {
    showingForm: false,
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
      this.setState({ commentInput: '', showingForm: false });
    });
  };
  setToken = token => {
    this.setState({
      token
    });
  };
  render() {
    return (
      <>
        {!this.state.showingForm ? (
          <button className="showForm" onClick={this.toggleForm}>
            +
          </button>
        ) : (
          <div className="formContainer">
            <button className="closeForm" onClick={this.toggleForm}>
              x
            </button>
            <UserConsumer>
              {user => {
                return !user.token ? (
                  <Login
                    setToken={this.props.setToken}
                    toggleForm={this.toggleForm}
                  />
                ) : (
                  <form className="commentForm" onSubmit={this.formSubmit}>
                    <label htmlFor="commentInput">
                      <textarea
                        rows="4"
                        className="commentInput"
                        id="commentInput"
                        type="textarea"
                        placeholder="comment..."
                        value={this.state.comment}
                        onChange={this.formChange}
                        required
                      ></textarea>
                    </label>
                    <button className="formSubmit" type="submit">
                      post
                    </button>
                  </form>
                );
              }}
            </UserConsumer>
          </div>
        )}
      </>
    );
  }
}
