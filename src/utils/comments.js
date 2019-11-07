const axios = require('axios');

const getComments = async id => {
  const { data } = await axios.get(
    `https://shubwub-nc-news.herokuapp.com/api/articles/${id}/comments`
  );
  return data.comments;
};

const postComment = async (comment, id) => {
  const { data } = await axios.post(
    `https://shubwub-nc-news.herokuapp.com/api/articles/${id}/comments`,
    { username: comment.username, body: comment.body }
  );
  return data.comment;
};

const removeComment = async id => {
  await axios.delete(
    `https://shubwub-nc-news.herokuapp.com/api/comments/${id}`
  );
};

export { removeComment, postComment, getComments };
