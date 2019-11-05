const axios = require('axios');

exports.getComments = async id => {
  const { data } = await axios.get(
    `https://shubwub-nc-news.herokuapp.com/api/articles/${id}/comments`
  );
  return data.comments;
};

exports.postComment = async (comment, id) => {
  const { data } = await axios.post(
    `https://shubwub-nc-news.herokuapp.com/api/articles/${id}/comments`,
    { username: comment.username, body: comment.body }
  );
  return data.comment;
};

exports.removeComment = async id => {
  await axios.delete(
    `https://shubwub-nc-news.herokuapp.com/api/comments/${id}`
  );
};
