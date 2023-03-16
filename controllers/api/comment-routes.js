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

//UPDATE one comment
router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update(
        {
            body: req.body.body,
        },
        {
            where: { id: req.params.id },
        });

        res.status(200).json(commentData);
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//DELETE route for a comment with a matching id
router.delete('/:id', async (req, res) => {   
    try {
        const commentData = await Comment.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json(commentData);
    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;