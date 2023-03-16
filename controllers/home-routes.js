const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try
    {
        const postData = await Post.findAll({ 
            include: 
            [
                { model: User, attributes: { exclude: ['password'] } }
            ]
        });
      
        const posts = postData.map((post) => post.get({ plain: true }));

        //console.log(posts);

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

router.get('/post/:id', async (req, res) => {
    try
    {
        const postData = await Post.findAll({
            where: {
                id: req.params.id
            },
            include: 
            [
                { model: User, attributes: { exclude: ['password'] } },
                { model: Comment, include: { model: User } }
            ]
        });
      
        const post = postData.map((post) => post.get({ plain: true }));

        console.log(post);
        console.log(req.session.user_id);

        res.render('post', {
            post,
            loggedIn: req.session.loggedIn,
            currentUserId: req.session.user_id,
            page_post: true
        });
    }
    catch (err)
    {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try
    {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }            
        });
      
        const posts = postData.map((post) => post.get({ plain: true }));

        console.log(posts);

        //console.log("User ID is:");
        //console.log(req.session.userId);

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
            currentUserName: req.session.username,
            currentUserId: req.session.user_id,
            page_dashboard: true
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
        res.redirect('/dashboard');
        return;
    }
    res.render('login', {
        signUp: signup
    });
});

module.exports = router;