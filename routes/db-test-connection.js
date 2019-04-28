const express = require('serverless-express/express');
var conn = require('../db/connect.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  data = {};
  conn
  .authenticate()
  .then(() => {
  	data.message = 'Connection has been established successfully.';
    console.log(data.message);
    res.json(data);
  })
  .catch(err => {
  	data.message = 'Unable to connect to the database:';
  	data.error = err;
    console.error(data.message, err);
    res.json(data);
  });
  
});

module.exports = router;
