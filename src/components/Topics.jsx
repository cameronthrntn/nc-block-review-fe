import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { getTopics } from '../utils/topics';

export default class Topics extends Component {
  state = {
    topics: [],
    isLoading: true,
    err: null
  };
  getTopics = async () => {
    try {
      const topics = await getTopics();
      this.setState({ topics, isLoading: false });
    } catch (err) {
      this.setState({ err });
    }
  };
  componentDidMount() {
    this.getTopics();
  }
  filterTopics = e => {
    navigate(`/topic/${e.target.value}`);
  };
  render() {
    if(this.state.err) alert('There was a problem fetching topics')
    return (
      <select className="filterBy headerButton" onChange={this.filterTopics}>
        <option value="">All Topics</option>
        {this.state.topics.map(topic => {
          return (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          );
        })}
      </select>
    );
  }
}
