const router = require('express').Router();
const withAuth = require('../utils/auth');


router.get('/', (req, res) => {
    //console.log('HOME');
    res.render('home', {
        loggedIn: req.session.loggedIn
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