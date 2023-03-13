const { Comment } = require('../models');

const commentData = [
  {
    id: 2,
    body: 'This is my very second comment',
    post_id: 2,
    user_id: 2,
  },
  {
    id: 3,
    body: 'This is my very third comment',
    post_id: 2,
    user_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
