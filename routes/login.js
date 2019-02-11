var express = require('express');
var router = express.Router();
var config = require('../config/constants');

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    let url = config.url;

    res.render('./Pages/login',
                {
                    url: url,
                    title: config.title+'LOGIN'
                }    
            );
});

module.exports = router;
