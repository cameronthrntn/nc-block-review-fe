import React, { Component } from 'react';
import '../styles/Article-List.css';
import { getArticles, sortArticlesQuery, formatDates } from '../utils/articles';
import { getTopics } from '../utils/topics';
import { Link } from '@reach/router';
import ArticleCard from './Article-Card';

export default class ArticleList extends Component {
  state = {
    articles: [],
    topics: [],
    topic: '',
    sort: 'created_at',
    isLoading: true
    // isLoggedIn: false
  };
  getArticles = topic => {
    // console.log(this.props.token, '<- token');
    getArticles(topic, this.props.token).then(({ articles }) => {
      return this.setState({ articles: formatDates(articles), isLoading: false });
    });
  };
  getTopics = () => {
    getTopics().then(topics => this.setState({ topics }));
  };
  filterArticles = e => {
    this.setState({ topic: e.target.value });
  };
  sortArticles = e => {
    this.setState({ sort: e.target.value });
  };
  commitSortArticles = (sort, topic) => {
    sortArticlesQuery(sort, topic).then(articles => this.setState({ articles: formatDates(articles) }));
  };
  orderArticles = e => {
    const order = e.target.value;
    this.setState(curr => {
      const { sort } = this.state;
      return order === 'asc'
        ? {
            articles: curr.articles.sort((a, b) => {
              return sort !== 'created_at'
                ? a[sort] - b[sort]
                : new Date(a[sort]) - new Date(b[sort]);
            })
          }
        : {
            articles: curr.articles.sort((a, b) => {
              return sort !== 'created_at'
                ? b[sort] - a[sort]
                : new Date(b[sort]) - new Date(a[sort]);
            })
          };
    });
  };
  componentDidMount() {
    const promises = [getArticles(this.props.topic), getTopics()];
    Promise.all(promises).then(data =>
      this.setState({
        articles: formatDates(data[0].articles),
        topics: data[1],
        isLoading: false
      })
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.token !== this.props.token) {
      // if (this.props.token !== '') {
      //   this.setState({ isLoggedIn: true }, () => this.getArticles());
      // }
      // this.getArticles();
    }
    if (prevState.topic !== this.state.topic) {
      this.getArticles(this.state.topic);
    }
    if (prevState.sort !== this.state.sort) {
      this.commitSortArticles(this.state.sort, this.state.topic);
    }
  }
  render() {
    return (
      <main>
        {/* {!this.state.isLoggedIn ? <link } */}
        {this.state.isLoading ? (
          <h2>Loading</h2>
        ) : (
          <>
            <nav className="articleSorting">
              <select
                className="filterBy headerButton"
                onChange={this.filterArticles}
              >
                <option value="">All Topics</option>
                {this.state.topics.map(topic => {
                  return (
                    <option key={topic.slug} value={topic.slug}>
                      {topic.slug}
                    </option>
                  );
                })}
              </select>
              <div className="sortBy">
                <select className="headerButton" onChange={this.sortArticles}>
                  <option value="created_at">Date Created</option>
                  <option value="comment_count">Comment Count</option>
                  <option value="votes">Votes</option>
                </select>
                <select className="headerButton" onChange={this.orderArticles}>
                  <option value="desc">desc</option>
                  <option value="asc">asc</option>
                </select>
              </div>
            </nav>
            <ul className="article-list">
              {this.state.articles.map(article => {
                return (
                  <ArticleCard key={article.article_id} article={article} />
                );
              })}
            </ul>
          </>
        )}
      </main>
    );
  }
}
