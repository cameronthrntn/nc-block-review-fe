import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { getTopics } from '../utils/topics';

export default class Topics extends Component {
  state = {
    topics: [],
    isLoading: true
  };
  getTopics = async () => {
    const topics = await getTopics();
    this.setState({ topics, isLoading: false });
  };
  componentDidMount() {
    this.getTopics();
  }
  filterTopics = e => {
    navigate(`/topic/${e.target.value}`);
  };
  render() {
    return (
      <select className="filterBy headerButton" onChange={this.filterTopics}>
        <option value="">All Topics</option>
        {this.state.topics.map(topic => {
          return (
            // <Link to={`/topic/${topic.slug}`}>
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
              {/* <Link to={`/topic/${topic.slug}`}>{topic.slug}</Link> */}
            </option>
            // </Link>
          );
        })}
      </select>
    );
  }
}
