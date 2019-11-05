const axios = require('axios');

exports.getTopics = async () => {
  const { data } = await axios.get(
    `https://shubwub-nc-news.herokuapp.com/api/topics`
  );
  return data.topics;
};
