import React, { Component } from 'react';
import './styles/App.css';
import Login from './components/Login';
import ArticleList from './components/Article-List';
import { Router } from '@reach/router';
import Header from './components/Header';
import SingleArticle from './components/Single-Article';

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
        <Header />
        <Router>
          <Login path="/login" setToken={this.setToken} />
          <ArticleList path="/" token={this.state.token} />
          <ArticleList path="/topic/:topic" token={this.state.token} />
          <SingleArticle path="/article/:id" />
        </Router>
      </div>
    );
  }
}
