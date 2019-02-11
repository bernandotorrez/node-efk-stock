var express = require('express');
var router = express.Router();
var config = require('../config/constants');
var general_function = require('../config/function');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect('/admin')
});

router.get('/index', function(req, res, next) {
    res.render('layout', 
    { 	
        title: config.title,
        nama: 'a',
        content: '/admin/index',
        title_page: 'ADMIN',
        body_class: 'no-skin',
        div_id: 'home',
        level: 'Admin',
        url: req.url,
        menu: general_function.cek_level(level)
    })

});

module.exports = router;
