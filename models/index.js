const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment, {
    onDelete: 'CASCADE'
});
Comment.belongsTo(Post);

module.exports = { User, Post, Comment };
