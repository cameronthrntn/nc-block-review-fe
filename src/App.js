import React, { Component } from 'react';
import './styles/App.css';
import Login from './components/Login';
import ArticleList from './components/Article-List';
import { Router } from '@reach/router';
import Header from './components/Header';
import SingleArticle from './components/Single-Article';
import { UserProvider } from './components/UserContext';

export default class App extends Component {
  state = {
    user: {
      username: '',
      token: ''
    }
  };
  setToken = (token, username) => {
    this.setState({ user: { token, username } });
  };
  render() {
    return (
      <div className="App">
        <UserProvider value={this.state.user}>
          <Header />
          <Router>
            <Login path="/login" setToken={this.setToken} />
            <ArticleList path="/" />
            <ArticleList path="/articles" />
            <ArticleList path="/topic" />
            <ArticleList path="/topic/:topic" />
            <SingleArticle path="/article/:id" setToken={this.setToken} />
          </Router>
        </UserProvider>
      </div>
    );
  }
}
