import React, { Component } from 'react';
import { getArticleById, formatDates } from '../utils/articles';
import '../styles/Single-Article.css';
import CommentList from './Comment-List';
import Loader from './Loader';

export default class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true
  };
  componentDidMount() {
    getArticleById(this.props.id).then(article =>
      this.setState({ article, isLoading: false })
    );
  }
  render() {
    const { title, author, body, article_id } = this.state.article;
    return this.state.isLoading ? (
      <Loader page="article" />
    ) : (
      <article className="singleArticlePage">
        <article className="articleFullContents">
          <p className="articlebodyText">{body}</p>
        </article>
        <footer className="bar">
          <div className="contentContainer">
            <h4 className="barTitle">{title}</h4>
            <div className="articleMetaInfo">
              <p className="">{author}</p>
              <p className="">
                {formatDates([this.state.article])[0].created_at}
              </p>
            </div>
          </div>
        </footer>
        <section className="commentSection">
          <CommentList id={article_id} setToken={this.props.setToken} />
        </section>
      </article>
    );
  }
}
