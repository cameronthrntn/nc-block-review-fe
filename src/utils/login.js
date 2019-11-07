const axios = require('axios');

const login = data => {
  return axios
    .post('https://shubwub-nc-news.herokuapp.com/api/login', data)
    .then(({ data }) => {
      return data.token;
    })
    .catch(console.log);
};

export { login };
