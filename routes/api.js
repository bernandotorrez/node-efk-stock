var express = require('express');
var router = express.Router();

// Call Model
var LoginModel = require('../models/login');
var AnggotaModel = require('../models/anggota');
// Call Model

var md5 = require('md5');

// CSRF Protection
var csrf = require('csurf');
var csrfProtection = csrf({
  cookie: true
});
// CSRF Protection

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.status(200).write('API OK')
});

// Handle API for Login Route
router.post('/login', csrfProtection, (req, res) => {

  let {
    no_hp,
    password
  } = req.body;

  LoginModel.findOne({
      where: {
        no_hp: `${no_hp}`,
        password: `${md5(password)}`
      }
    })
    .then(result => {
      if (!result) {
        res.status(200).send({
          status: 'Gagal',
          result: null
        })
      } else {
        req.session.level = result.level;

        // Get Nama
        getNama(result.no_hp, (hasil) => {
          let nama;
          if (hasil.nama !== 'undefined' || hasil.nama != '') {
            nama = hasil.nama_anggota;
          } else {
            nama = result.no_hp;
          }

          req.session.nama = nama;
          res.status(200).send({
            status: 'Success',
            result: result
          })
        })
        // Get Nama

      }
    })
    .catch(err => {
      res.send(500).send(err);
    })
})
// Handle API for Login Route

function getNama(no_hp, callback) {
  AnggotaModel.findOne({
      where: {
        no_hp: no_hp
      }
    })
    .then(result => {
      callback(result)
    })
}

module.exports = router;