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
        <Link to={`user/${user.username}`}>
          <div className="userSection">
            <div className="userCard">
              <p>{user.username}</p>
              <button className="headerUserIcon">
                <img src={user.avatar} alt="user avatar" />
              </button>
            </div>
          </div>
        </Link>
      ) : (
        <Link to="/login">
          <button className="headerLoginButton">login</button>
        </Link>
      )}
    </header>
  );
}
