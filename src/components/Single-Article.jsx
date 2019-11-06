import React, { Component } from 'react';
import { getArticleById } from '../utils/articles';
import '../styles/Single-Article.css';
import CommentList from './Comment-List';

export default class SingleArticle extends Component {
	state = {
		article: {}
	};
	componentDidMount() {
		getArticleById(this.props.id).then(article => this.setState({ article }));
	}
	render() {
		const { title, author, body, article_id, created_at } = this.state.article;
		return (
			<article className="singleArticlePage">
				<article className="articleFullContents">
					<p className="articlebodyText">{body}</p>
				</article>
				<footer className="bar">
					<div className="contentContainer">
						<h4 className="barTitle">{title}</h4>
						<div className="articleMetaInfo">

						<p className="">{author}</p>
						<p className="">{created_at}</p>
						</div>
					</div>
				</footer>
				<section className="commentSection">
					<CommentList id={article_id} />
				</section>
			</article>
		);
	}
}
