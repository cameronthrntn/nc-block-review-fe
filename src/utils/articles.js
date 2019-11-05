const axios = require('axios');

exports.getArticles = (topic, token) => {
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

exports.sortArticlesQuery = async (sort_by, order, topic) => {
  const { data } = await axios.get(
    `https://shubwub-nc-news.herokuapp.com/api/articles`,
    { params: { topic, sort_by, order } }
  );
  return data.articles;
};

exports.articleVote = async (val, id) => {
  const { data } = await axios.patch(
    `https://shubwub-nc-news.herokuapp.com/api/articles/${id}`,
    { inc_votes: val }
  );
  return exports.formatDates([data.article])[0];
};

exports.formatDates = articles => {
  return articles.map(article => {
    const date = new Date(article.created_at);
    const displayDate = date.toDateString();
    article.created_at = displayDate;
    return article;
  });
};
