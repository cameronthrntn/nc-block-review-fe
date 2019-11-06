import React, { Component } from 'react';
import '../styles/AddComment.css';
import { postComment } from '../utils/comments';
import Login from './Login';

export default class AddComment extends Component {
  state = {
    showingForm: false,
    token: '',
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
    console.log(this.state.token, '<- token');
    console.log(this.state.token == false, '<- token');
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
            {!this.props.token && !this.state.token ? (
              <Login setToken={this.setToken} toggleForm={this.toggleForm}/>
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
            )}
          </div>
        )}
      </>
    );
  }
}
