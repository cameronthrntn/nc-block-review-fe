import React, { Component } from 'react';
import { navigate } from '@reach/router';

import { login } from '../utils/login';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    err: null
  };
  formInput = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };
  formSubmit = async e => {
    e.preventDefault();
    try {
      const token = await login(this.state);
      this.props.setToken(token, this.state.username);
      if (this.props.redir) navigate(`/`);
    } catch (err) {
      this.setState({ err });
    }
  };
  render() {
    if (this.state.err)
      alert('Sorry, you could not be looged in at this time...');
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
