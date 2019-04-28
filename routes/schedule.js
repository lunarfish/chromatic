const express = require('serverless-express/express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	let now = new Date();
	let timestamp = now.toLocaleString({hour12:false});
	let message = 'hearbeat at ' + timestamp;
	console.log(message);
  res.send(message);
});

module.exports = router;