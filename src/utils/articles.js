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

exports.sortArticlesQuery = async (sort_by, topic) => {
  const { data } = await axios.get(
    `https://shubwub-nc-news.herokuapp.com/api/articles`,
    { params: { topic, sort_by } }
  );
  return data.articles;
};

exports.formatDates = articles => {
  return articles.map(article => {
    const date = new Date(article.created_at);
    const displayDate = date.toDateString();
    article.created_at = displayDate;
    return article;
  });
};
