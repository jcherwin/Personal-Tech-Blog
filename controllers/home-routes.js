const router = require('express').Router();
const { Post } = require('../models');
//const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try
    {
        const postData = await Post.findAll();
      
        const posts = postData.map((post) => post.get({ plain: true }));

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
    res.render('dashboard', {
        loggedIn: req.session.loggedIn,
        dashboard: true
    });
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