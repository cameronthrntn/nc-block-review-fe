import React, { Component } from 'react';
import '../styles/Article-List.css';
import { getArticles, sortArticlesQuery, formatDates } from '../utils/articles';
import { getTopics } from '../utils/topics';
import ArticleCard from './Article-Card';
import ErrorHandling from './ErrorHandling';
import Topics from './Topics';
import Loader from './Loader';

export default class ArticleList extends Component {
  state = {
    articles: [],
    topics: [],
    topic: '',
    sort: 'created_at',
    isLoading: true,
    err: null
  };
  getArticles = async topic => {
    try {
      const { articles } = await getArticles(topic);
      this.setState({
        articles: formatDates(articles),
        isLoading: false,
        err: null
      });
    } catch (err) {
      this.setState({ err });
    }
  };
  sortArticles = e => {
    this.setState({ sort: e.target.value });
  };
  orderArticles = e => {
    this.setState({ order: e.target.value });
  };
  sortAndOrderArticles = async (sort, order, topic) => {
    try {
      const { articles } = await sortArticlesQuery(sort, order, topic);
      this.setState({ articles: formatDates(articles), err: null });
    } catch (err) {
      this.setState({ err });
    }
  };
  updateArticleVotes = article => {
    this.setState(curr => {
      return {
        articles: curr.articles.map(item => {
          if (item.article_id === article.article_id) {
            item = article;
          }
          return item;
        })
      };
    });
  };

  componentDidMount() {
    const promises = [getArticles(this.props.topic), getTopics()];
    Promise.all(promises)
      .then(data => {
        return this.setState({
          articles: formatDates(data[0].articles),
          topics: data[1],
          isLoading: false
        });
      })
      .catch(err => this.setState({ err }));
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      this.getArticles(this.props.topic);
    }
    if (
      prevState.sort !== this.state.sort ||
      prevState.order !== this.state.order
    ) {
      this.sortAndOrderArticles(
        this.state.sort,
        this.state.order,
        this.state.topic
      );
    }
  }
  render() {
    return (
      <main>
        {this.state.err ? (
          <ErrorHandling err={this.state.err} />
        ) : this.state.isLoading ? (
          <Loader page="articles" />
        ) : (
          <>
            <nav className="articleSorting">
              <Topics />
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
                  <ArticleCard
                    key={article.article_id}
                    article={article}
                    updateArticleVotes={this.updateArticleVotes}
                  />
                );
              })}
            </ul>
          </>
        )}
      </main>
    );
  }
}
