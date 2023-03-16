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

//UPDATE one post
router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(
        {
            title: req.body.title,
            body: req.body.body,
        },
        {
            where: { id: req.params.id },
        });

        res.status(200).json(postData);
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//DELETE route for a post with a matching id
router.delete('/:id', async (req, res) => {   
    try {
        const postData = await Post.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json(postData);
    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;