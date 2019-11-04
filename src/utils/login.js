const axios = require('axios');

exports.login = data => {
  return axios
    .post('https://shubwub-nc-news.herokuapp.com/api/login', data)
    .then(({ data }) => {
      return data.token;
    })
    .catch(console.log);
};
