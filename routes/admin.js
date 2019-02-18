var express = require('express');
var router = express.Router();
var config = require('../config/constants');
var general_function = require('../config/function');

/* GET users listing. */

// router.get('*', (req, res, next) => {

//     if (!req.session.level || req.session.level == '' || req.session.level != 'admin' || !req.session) {
//             // delete session object
//             req.session.destroy(function(err) {
//               if(err) {
//                 return next(err);
//               } else {
//                 return res.redirect('/');
//               }
//             });
//     }

//    next()
// })


router.get('/', function (req, res, next) {
    console.log(req.session.level)
    res.redirect('/admin/index')

});

router.get('/index', function (req, res, next) {

    let {
        level,
        nama
    } = req.session;
    let url = req.url;

    res.render('layout', {
        title: config.title,
        nama: nama,
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