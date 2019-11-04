const axios = require('axios');

exports.getComments = async id => {
  const {
    data
  } = await axios.get(
    `https://shubwub-nc-news.herokuapp.com/api/articles/${id}/comments`
  );
  return data.comments;
};