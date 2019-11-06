import React, { Component } from 'react';
import '../styles/Article-List.css';
import { getArticles, sortArticlesQuery, formatDates } from '../utils/articles';
import { getTopics } from '../utils/topics';
// import { Link } from '@reach/router';
import ArticleCard from './Article-Card';
import ErrorHandling from './ErrorHandling';

export default class ArticleList extends Component {
  state = {
    articles: [],
    topics: [],
    topic: '',
    sort: 'created_at',
    isLoading: true,
    err: null
    // isLoggedIn: false
  };
  getArticles = async topic => {
    // console.log(this.props.token, '<- token');
    try {
      const { articles } = await getArticles(topic, this.props.token);
      this.setState({
        articles: formatDates(articles),
        isLoading: false
      });
    } catch (err) {
      this.setState({ err });
    }
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
  orderArticles = e => {
    this.setState({ order: e.target.value });
  };
  sortAndOrderArticles = (sort, order, topic) => {
    sortArticlesQuery(sort, order, topic).then(articles =>
      this.setState({ articles: formatDates(articles) })
    );
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
        console.dir(data);
        return this.setState({
          articles: formatDates(data[0].articles),
          topics: data[1],
          isLoading: false
        });
      })
      .catch(err => this.setState({ err }));
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
        {/* {!this.state.isLoggedIn ? <link } */}
        {this.state.err ? (
          <ErrorHandling err={this.state.err} />
        ) : this.state.isLoading ? (
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
