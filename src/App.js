import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Login from './components/Login';
import ArticleList from './components/Article-List';

export default class App extends Component {
  state = {
    token: ''
  };
  setToken = token => {
    this.setState({ token });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">Login</header>
        <Login setToken={this.setToken} />
        <ArticleList token={this.state.token} />
      </div>
    );
  }
}
