import React, { Component } from 'react';
import { getArticleById } from '../utils/articles';
import '../styles/Single-Article.css';
import { Router } from '@reach/router';
import CommentList from './Comment-List';

export default class SingleArticle extends Component {
	state = {
		article: {}
	};
	componentDidMount() {
		getArticleById(this.props.id).then(article => this.setState({ article }));
	}
	render() {
		const { title, author, body, article_id } = this.state.article;
		return (
			<article>
				<header className="bar">
					<div className="contentContainer">
						<p>{'<'}</p>
						<p>Articles</p>
					</div>
				</header>
				<article className="articleFullContents">
					<p className="articlebodyText">{body}</p>
				</article>
				<footer className="bar bottomBar">
					<div className="contentContainer">
						<h4 className="barTitle">{title}</h4>
						<p className="articleMetaInfo">{author}</p>
					</div>
				</footer>
				<section className="commentSection">
					<CommentList id={article_id} />
				</section>
			</article>
		);
	}
}
