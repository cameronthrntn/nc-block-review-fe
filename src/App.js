import React, { Component } from 'react';
import './styles/App.css';
import Login from './components/Login';
import ArticleList from './components/Article-List';
import Header from './components/Header';
import SingleArticle from './components/Single-Article';
import ErrorHandling from './components/ErrorHandling';
import User from './components/User';
import { Router } from '@reach/router';
import { UserProvider } from './components/UserContext';
import { getUser } from './utils/login';

export default class App extends Component {
  state = {
    user: {}
  };
  clearUser = () => {
    this.setState({ user: {} }, () => {
      sessionStorage.clear();
    });
  };
  setUser = async (token, username) => {
    const user = await getUser(username);
    this.setState({ user: { ...user, token } }, () => {
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('avatar', user.avatar);
    });
  };
  componentDidMount() {
    if (sessionStorage.user) {
      const { username, avatar } = sessionStorage;
      this.setState({
        user: { username, avatar }
      });
    }
  }
  render() {
    return (
      <div className="App">
        <UserProvider value={this.state.user}>
          <Header />
          <Router className="mainContents">
            <Login path="/login" setUser={this.setUser} redir={true} />
            <User path="/user/:username" clearUser={this.clearUser} />
            <ArticleList path="/" />
            <ArticleList path="/articles" />
            <ArticleList path="/topic" />
            <ArticleList path="/topic/:topic" />
            <SingleArticle path="/article/:id" setUser={this.setUser} />
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
