var express = require('express');
var router = express.Router();
var config = require('../config/constants');
var general_function = require('../config/function');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect('/admin/index')
    
});

router.get('/index', function(req, res, next) {

    let {level} = req.session;
    console.log(level)
    let url = req.url;

    console.log(url)

    res.render('layout', 
    { 	
        title: config.title,
        nama: 'a',
        content: '/admin/index',
        title: config.title,
        title_page: 'Admin',
        body_class: 'no-skin',
        div_id: 'home',
        level: level,
        url: req.url,
        menu: general_function.cek_level(level)
    })

});

router.get('/profile', (req, res, next) => {
    req.session.level = 'tes';
})

module.exports = router;
