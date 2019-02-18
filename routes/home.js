var express = require('express');
var router = express.Router();
var config = require('../config/constants');
var general_function = require('../config/function');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.redirect('/home/index')
});

router.get('/index', (req, res, next) => {
    let {
        level,
        nama
    } = req.session;
    let url = req.url;
    
    res.render('layout', {
        title: config.title,
        nama: nama,
        content: '/user/index',
        title: config.title,
        title_page: 'User',
        body_class: 'no-skin',
        div_id: 'home',
        level: level,
        url: req.url,
        menu: general_function.cek_level(level)
    })
})
module.exports = router;