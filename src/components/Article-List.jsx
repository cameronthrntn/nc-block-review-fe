import React, { Component } from 'react';
import '../styles/Article-List.css';
import { getArticles, sortArticlesQuery, formatDates } from '../utils/articles';
import { getTopics } from '../utils/topics';
import ArticleCard from './Article-Card';
import ErrorHandling from './ErrorHandling';
import Topics from './Topics';
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroller';

export default class ArticleList extends Component {
  state = {
    articles: [],
    topics: [],
    topic: '',
    sort: 'created_at',
    page: 1,
    hasMore: true,
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
      const articles = await sortArticlesQuery(sort, order, topic);
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
  pageChange = async () => {
    const nextPage = this.state.page + 1;
    try {
      const articles = await sortArticlesQuery(
        this.state.sort,
        this.state.order,
        this.state.topic,
        nextPage
      );
      this.setState(curr => {
        return {
          page: nextPage,
          articles: [...curr.articles, ...formatDates(articles)],
          err: null
        };
      });
    } catch (err) {
      this.setState({ err });
    }
  };
  loadMore = async () => {
    const { articles } = this.state;
    console.log(articles.length);
    articles.length % 10 !== 0
      ? this.setState({ hasMore: false })
      : this.pageChange();
  };

  componentDidMount() {
    const promises = [getArticles(this.props.topic), getTopics()];
    Promise.all(promises)
      .then(data => {
        return this.setState({
          articles: formatDates(data[0].articles),
          topics: data[1],
          topic: this.props.topic,
          isLoading: false
        });
      })
      .catch(err => this.setState({ err }));
  }
  componentDidUpdate(prevProps, prevState) {
    const { sort, order, topic, page } = this.state;
    if (prevProps.topic !== this.props.topic) {
      this.getArticles(this.props.topic).then(() => {
        this.setState({ topic: this.props.topic });
      });
    }
    if (prevState.sort !== sort || prevState.order !== order) {
      this.sortAndOrderArticles(sort, order, topic, page);
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
              {this.state.articles.length > 1 ? (
                <InfiniteScroll
                  loadMore={this.loadMore.bind(this)}
                  hasMore={this.state.hasMore}
                  useWindow={true}
                  loader={<Loader page="articles" />}
                >
                  {this.state.articles.map(article => {
                    return (
                      <ArticleCard
                        key={article.article_id}
                        article={article}
                        updateArticleVotes={this.updateArticleVotes}
                      />
                    );
                  })}
                </InfiniteScroll>
              ) : (
                <ErrorHandling
                  err={{
                    response: {
                      status: 404,
                      data: { msg: 'There are no articles to display' }
                    }
                  }}
                />
              )}
            </ul>
            {/* <footer className="pageChange">
              {this.state.page > 1 && (
                <button id="prevPage" onClick={this.pageChange}>
                  {'<'}
                </button>
              )}
              <h4>{this.state.page}</h4>
              <button id="nextPage" onClick={this.pageChange}>
                >
              </button>
            </footer> */}
          </>
        )}
      </main>
    );
  }
}
