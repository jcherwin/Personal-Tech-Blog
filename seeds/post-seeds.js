const { Post } = require('../models');

const postData = [
  {
    id: 2,
    title: 'Hello World 2',
    body: 'This is my very second post',
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
