var express = require('express');
var router = express.Router();
var LoginModel = require('../models/login');
var md5 = require('md5');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).write('API OK')
});

// Handle API for Login Route
router.post('/login', (req, res) => {

    let {no_hp, password} = req.body;
    
    LoginModel.findOne({ 
      where: {
          no_hp: `${no_hp}`,
          password: `${md5(password)}`
      } 
      })
      .then(result => {
        if(!result) {
          res.status(200).send({status: 'Gagal', result: null})
        } else {
          res.status(200).send({status: 'Success', result: result})
        }
      })
      .catch(err => {
        res.send(500).send(err);
      }) 

      
})
// Handle API for Login Route

module.exports = router;
