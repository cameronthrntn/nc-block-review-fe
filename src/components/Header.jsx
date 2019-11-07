import React, { useContext } from 'react';
import { Link } from '@reach/router';
import '../styles/Header.css';
import UserContext from './UserContext';

export default function Header() {
  const user = useContext(UserContext);
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <p className="Np">{'<N'}</p>
          <p>{'EWS />'}</p>
        </Link>
      </div>
      {user.username ? (
        <p className="headerUsername">{user.username}</p>
      ) : (
        <Link to="/login">
          <button className="headerLoginButton">login</button>
        </Link>
      )}
    </header>
  );
}
