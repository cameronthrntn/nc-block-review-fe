import React, { Component } from 'react';
import '../styles/Article-List.css';
import * as api from '../utils/articles';
import { Link } from '@reach/router';
import ArticleCard from './Article-Card';

export default class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true
    // isLoggedIn: false
  };
  getArticles = topic => {
    // console.log(this.props.token, '<- token');
    api.getArtciles(topic, this.props.token).then(({ articles }) => {
      this.setState({ articles, isLoading: false });
    });
  };
  componentDidMount() {
    this.getArticles(this.props.topic);
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
              const date = new Date(article.created_at);
              const displayDate = date.toDateString();
              return (
                <ArticleCard key={article.article_id}>
                  <li className="articleCard">
                    <Link to={`/article/${article.article_id}`}>
                      <header className="articleBound">
                        <div className="boundContents">
                          <p className="articleTitle">{article.title}</p>
                          <p className="subHeading">-{article.topic}-</p>
                          <p className="subHeading">{displayDate}</p>
                        </div>
                      </header>
                      <div className="articleContents">
                        <p>{article.body.substring(0, 100).concat('...')}</p>
                      </div>
                      <footer className="articleBound">
                        <div className="boundContents">
                          <p>{article.author}</p>
                          <p>{article.comment_count} comments</p>
                          <div className="votes">
                            <p>{'<'}</p>
                            <p>{article.votes}</p>
                            <p>></p>
                          </div>
                        </div>
                      </footer>
                    </Link>
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
