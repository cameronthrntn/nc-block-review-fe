const axios = require('axios');

exports.getArtciles = (topic, token) => {
  return axios({
    method: 'GET',
    // headers: { Authorization: `BEARER ${token}` },
    params: { topic },
    url: 'https://shubwub-nc-news.herokuapp.com/api/articles'
  })
    .then(({ data }) => {
      return data;
    })
    .catch(console.log);
};

exports.getArticleById = async id => {
  const { data } = await axios.get(
    `https://shubwub-nc-news.herokuapp.com/api/articles/${id}`
  );
  return data.article;
};
