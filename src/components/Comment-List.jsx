import React, { Component } from 'react';
import '../styles/Comment-List.css';

import { getComments } from '../utils/comments';

export default class CommentList extends Component {
	state = {
		comments: []
	};
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.id !== this.props.id) {
			getComments(this.props.id).then(comments => this.setState({ comments }));
		}
	}
	render() {
		const { comments } = this.state;
		return (
			<ul className="commentList">
				{comments.map(comment => {
					return <li key={comment.comment_id}>{comment.body}</li>;
				})}
			</ul>
		);
	}
}
