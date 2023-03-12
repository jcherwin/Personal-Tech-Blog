const { Post } = require('../models');

const postData = [
  {
    title: 'Hello World',
    body: 'This is my very first post',
    user_id: 1,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
