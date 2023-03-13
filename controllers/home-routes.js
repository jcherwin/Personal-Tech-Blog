const router = require('express').Router();
const { User, Post, Comment } = require('../models');
//const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try
    {
        const postData = await Post.findAll({ 
            include: 
            [
                { model: User, attributes: { exclude: ['password'] } },
                { model: Comment, include: { model: User } }
            ]
        });
      
        const posts = postData.map((post) => post.get({ plain: true }));

        console.log(posts);

        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }
    catch (err)
    {
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    try
    {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.userId
            }            
        });
      
        const posts = postData.map((post) => post.get({ plain: true }));

        console.log(posts);

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
            dashboard: true
        });
    }
    catch (err)
    {
        res.status(500).json(err);
    }    
});

router.get(['/login','/signup'], (req, res) => {
    if(req.path == '/signup'){signup = true}
    else{signup = false}

    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login', {
        signUp: signup
    });
});

module.exports = router;