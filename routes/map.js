const express = require('serverless-express/express');
var router = express.Router(); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('map', { title: 'Map' });
});

module.exports = router;