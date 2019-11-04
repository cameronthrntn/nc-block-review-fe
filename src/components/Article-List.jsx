import React, { Component } from 'react';
import '../styles/Article-List.css';
import * as api from '../utils/articles';
import ArticleCard from './Article-Card';

export default class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true
    // isLoggedIn: false
  };
  getArticles = () => {
    // console.log(this.props.token, '<- token');
    api.getArtciles(this.props.token).then(({ articles }) => {
      this.setState({ articles, isLoading: false });
    });
  };
  componentDidMount() {
    this.getArticles();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.token !== this.props.token) {
      // if (this.props.token !== '') {
      //   this.setState({ isLoggedIn: true }, () => this.getArticles());
      // }
      // this.getArticles();
    }
  }
  render() {
    return (
      <main>
        {/* {!this.state.isLoggedIn ? <link } */}
        {this.state.isLoading ? (
          <h2>Loading</h2>
        ) : (
          <ul className="article-list">
            {this.state.articles.map(article => {
              return (
                <ArticleCard>
                  <li key={article.id} className="articleCard">
                    <header className="articleHeader">
                      <h3>{article.title}</h3>
                    </header>
                    <div className="articleContents">
                      <p>{article.body.substring(0, 100).concat('...')}</p>
                    </div>
                    <footer className="articleFooter">
                      <div className="footerContents">
                        <p>{article.author}</p>
                        <p>{article.comment_count} comments</p>
                        <div className="votes">
                          <p>{'<'}</p>
                          <p>{article.votes}</p>
                          <p>></p>
                        </div>
                      </div>
                    </footer>
                  </li>
                </ArticleCard>
              );
            })}
          </ul>
        )}
      </main>
    );
  }
}
