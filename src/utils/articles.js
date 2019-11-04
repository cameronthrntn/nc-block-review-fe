const axios = require('axios');

exports.getArtciles = token => {
  return axios({
    method: 'GET',
    headers: { Authorization: `BEARER ${token}` },
    url: 'https://shubwub-nc-news.herokuapp.com/api/articles'
  })
    .then(({ data }) => {
      return data;
    })
    .catch(console.log);
};
