import React, { Component } from 'react';
import '../styles/Header.css';
import { getTopics } from '../utils/topics';
import { Link } from '@reach/router';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <p className="Np">{'<N'}</p>
        <p>{'EWS />'}</p>
      </header>
    );
  }
}
