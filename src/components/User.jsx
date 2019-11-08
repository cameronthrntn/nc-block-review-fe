import React, { Component } from 'react';
import { UserConsumer } from './UserContext';
import { getUser } from '../utils/login';
import '../styles/User.css';
import ArticleList from './Article-List';
import Loader from './Loader';

export default class User extends Component {
  state = {
    user: {},
    isLoading: true
  };
  componentDidMount = async () => {
    const user = await getUser(this.props.username);
    this.setState({ user, isLoading: false });
  };
  render() {
    const { username, avatar, name } = this.state.user;
    return this.state.isLoading ? (
      <Loader page="user" />
    ) : (
      <div className="userPage">
        <section className="userArticles">
          <ArticleList user={username} />
        </section>
        <aside className="userInfo">
          <div className="userInfoCard">
            <div className="userDetails">
              <h2>{username}</h2>
              <h3>{name}</h3>
            </div>
            <img src={avatar} alt="user avatar" />
          </div>
          <UserConsumer>
            {user => {
              return (
                user.username === this.state.user.username && (
                  <button className="headerLoginButton logout">logout</button>
                )
              );
            }}
          </UserConsumer>
        </aside>
      </div>
    );
  }
}
