import React, { Component } from 'react';
import { Link } from '@reach/router';
import '../styles/Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <Link to="/">
          <p className="Np">{'<N'}</p>
          <p>{'EWS />'}</p>
        </Link>
      </header>
    );
  }
}
