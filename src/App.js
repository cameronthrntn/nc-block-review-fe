import React, { Component } from 'react';
import './styles/App.css';
import Login from './components/Login';
import ArticleList from './components/Article-List';
import { Router } from '@reach/router';
import Header from './components/Header';
import SingleArticle from './components/Single-Article';
import { UserProvider } from './components/UserContext';
import ErrorHandling from './components/ErrorHandling';

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
          <Router className="mainContents">
            <Login path="/login" setToken={this.setToken} redir={true} />
            <ArticleList path="/" />
            <ArticleList path="/articles" />
            <ArticleList path="/topic" />
            <ArticleList path="/topic/:topic" />
            <SingleArticle path="/article/:id" setToken={this.setToken} />
            <ErrorHandling
              default
              err={{
                response: { status: 404, data: { msg: 'path not found!' } }
              }}
            />
          </Router>
        </UserProvider>
      </div>
    );
  }
}
