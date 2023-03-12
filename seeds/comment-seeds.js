const { Comment } = require('../models');

const commentData = [
  {
    body: 'This is my very first comment',
    post_id: 1,
    user_id: 1,
  },

];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
