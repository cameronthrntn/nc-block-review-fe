import React, { Component } from 'react';
import { getArticleById } from '../utils/articles';
import '../styles/Single-Article.css';

export default class SingleArticle extends Component {
  state = {
    article: {}
  };
  componentDidMount() {
    getArticleById(this.props.id).then(article => this.setState({ article }));
  }
  render() {
    const { title, author, body } = this.state.article;
    return (
      <article>
        <header className="topBar">
          <p>{'<'}</p>
          <p>Articles</p>
        </header>
        <article className="articleFullContents">
          <p className="articlebodyText">{body}</p>
        </article>
        <footer className="topBar">
          <h4 className="barTitle">{title}</h4>
          <p className="articleMetaInfo">{author}</p>
        </footer>
        <section className="commentSection"></section>
      </article>
    );
  }
}
