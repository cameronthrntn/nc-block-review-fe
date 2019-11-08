const axios = require('axios');

const getArticles = async (topic, author) => {
  const { data } = await axios({
    method: 'GET',
    params: { topic, author },
    url: 'https://shubwub-nc-news.herokuapp.com/api/articles'
  });
  return data;
};

const getArticleById = async id => {
  const { data } = await axios.get(
    `https://shubwub-nc-news.herokuapp.com/api/articles/${id}`
  );
  return data.article;
};

const sortArticlesQuery = async (sort_by, order, topic, p = 1) => {
  const { data } = await axios.get(
    `https://shubwub-nc-news.herokuapp.com/api/articles`,
    { params: { topic, sort_by, order, p } }
  );
  return data.articles;
};

const handleVote = async (val, id, type) => {
  const { data } = await axios.patch(
    `https://shubwub-nc-news.herokuapp.com/api/${type}s/${id}`,
    { inc_votes: val }
  );
  return data[type];
};

const formatDates = articles => {
  return articles.map(article => {
    const date = new Date(article.created_at);
    const displayDate = date.toDateString();
    article.created_at = displayDate;
    return article;
  });
};

export {
  formatDates,
  handleVote,
  sortArticlesQuery,
  getArticleById,
  getArticles
};
