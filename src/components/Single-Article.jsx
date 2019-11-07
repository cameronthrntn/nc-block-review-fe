import React, { Component } from 'react';
import { getArticleById, formatDates } from '../utils/articles';
import '../styles/Single-Article.css';
import CommentList from './Comment-List';
import Loader from './Loader';
import ErrorHandling from './ErrorHandling';
import Vote from './Vote';

export default class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    err: null
  };
  async componentDidMount() {
    try {
      const article = await getArticleById(this.props.id);
      this.setState({ article, isLoading: false });
    } catch (err) {
      this.setState({ err });
    }
  }
  render() {
    const { title, author, body, article_id, votes } = this.state.article;
    return this.state.err ? (
      <ErrorHandling err={this.state.err} />
    ) : this.state.isLoading ? (
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
              <Vote votes={votes} type="article" itemID={article_id} />
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
