const router = require('express').Router();
const { Comment } = require('../../models');

// CREATE new comment
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
        body: req.body.body,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
    });

    res.status(200).json(commentData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;