import React, { Component } from 'react';
import UserContext from './UserContext';

export default class UserProvider extends Component {
  state = {
    user: {
      username: '',
      token: ''
    }
  };
  render() {
    return <UserContext.Provider value={this.state.user} />;
  }
}
