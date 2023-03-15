const router = require('express').Router();
const { Post } = require('../../models');

// CREATE new post
router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user_id,
    });

    res.status(200).json(postData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;