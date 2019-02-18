var express = require('express');
var router = express.Router();
var config = require('../config/constants');

// CSRF Protection
var csrf = require('csurf');
var csrfProtection = csrf({
    cookie: true
});
// CSRF Protection

/* GET users listing. */
router.get('/', csrfProtection, function (req, res, next) {

    let url = config.url;

    res.render('./Pages/login', {
        url: url,
        title: config.title,
        title_page: 'LOGIN',
        csrfToken: req.csrfToken()
    });
});

router.get('/logout', (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }

})


module.exports = router;