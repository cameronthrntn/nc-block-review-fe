import React, { Component } from 'react';
import { login } from '../utils/login';

export default class Login extends Component {
  state = {
    username: '',
    password: ''
  };
  formInput = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };
  formSubmit = e => {
    e.preventDefault();
    login(this.state).then(token => {
      this.props.setToken(token, this.state.username)
      // this.props.toggleForm();
    });
  };
  render() {
    return (
      <form className="commentForm" onSubmit={this.formSubmit}>
        <h3>Please log in.</h3>
        <label htmlFor="username">
          <input
            type="text"
            id="username"
            className="commentInput"
            value={this.state.username}
            onChange={this.formInput}
            placeholder="username..."
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            className="commentInput"
            value={this.state.password}
            onChange={this.formInput}
            placeholder="password..."
          />
        </label>
        <button className="formSubmit" type="submit">
          log in
        </button>
      </form>
    );
  }
}
