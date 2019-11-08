const axios = require('axios');

const login = data => {
  return axios
    .post('https://shubwub-nc-news.herokuapp.com/api/login', data)
    .then(({ data }) => {
      return data.token;
    });
};

const getUser = async uname => {
  const {
    data: { user }
  } = await axios.get(
    `https://shubwub-nc-news.herokuapp.com/api/users/${uname}`
  );
  return { username: user.username, name: user.name, avatar: user.avatar_url };
};

export { login, getUser };
