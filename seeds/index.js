const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const { Post, Comment } = require('../models');

const sequelize = require('../config/connection');

const dropTables = async () => {
  await Comment.drop();
  await Post.drop();  
  console.log('\n----- SELECTED TABLES DROPED -----\n');

  process.exit(0);
};

const seedAll = async () => {
  //await sequelize.sync({ force: true });
  await Comment.sync({ force: false });
  await Post.sync({ force: false });
  
  console.log('\n----- SELECTED TABLES SYNCED -----\n');

  await seedPosts();
  console.log('\n----- POSTS SEEDED -----\n');

  await seedComments();
  console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

seedAll();
//dropTables();
