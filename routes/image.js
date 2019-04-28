const express = require('serverless-express/express');
var router = express.Router();
const Jimp = require('jimp');
const mime = require('mime-types')
const promisify = require("promisify-node");
Jimp.prototype.getBase64Promise = promisify(Jimp.prototype.getBase64)

/* GET users listing. */
router.get('/:filename', function (req, res) {
	var source, data;
	console.log('params', req.params);
	source = './public/images/'+req.params.filename;
	console.log(source);
	Jimp.read(source)
	.then(image => {
		return image.getBase64Promise(Jimp.AUTO);
	})
	.then(base64 => {
		data = {
			type: mime.lookup(source),
			data: base64 
		}
		return data;
	})
	.then(data => {
  	res.send(data);
	});
})

module.exports = router;
