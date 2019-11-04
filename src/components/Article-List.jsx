import React, { Component } from 'react';
import '../styles/Article-List.css'
import * as api from '../utils/articles';

export default class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true
  };
  getArticles = () => {
    console.log(this.props.token, '<- token');
    api.getArtciles(this.props.token).then(({articles}) => {
      this.setState({articles, isLoading: false})
    });
  }
  componentDidMount() {
    // this.getArticles();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.token !== this.props.token) {
      this.getArticles();
    }
  }
  render() {
    return (
      <main>
        {this.state.isLoading ? (
          <h2>Loading</h2>
        ) : (
          <ul className="article-list">
            {this.state.articles.map(article => {
              return <li key={article.id}>{article.title}</li>
            })}
          </ul>
        )}
      </main>
    );
  }
}
