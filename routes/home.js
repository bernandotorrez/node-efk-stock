var express = require('express');
var router = express.Router();
var config = require('../config/constants');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect('/home/index')
});

router.get('/index', (req, res, next) => {
    
})
module.exports = router;
