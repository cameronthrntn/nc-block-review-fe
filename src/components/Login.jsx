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
    login(this.state).then(token => 
      this.props.setToken(token))
  };
  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <label htmlFor="username">
          <input
            type="text"
            id="username"
            value={this.state.username}
            onChange={this.formInput}
            placeholder="username..."
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.formInput}
            placeholder="password..."
          />
        </label>
        <button>SUBMIT</button>
      </form>
    );
  }
}
