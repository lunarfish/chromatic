const express = require('serverless-express/express');
var router = express.Router();
const leftPad = require('left-pad');

function hexify(val) {
	var hex;
	switch(true) {
		case (val<0): hex = '00'; break;
		case (val>255): hex = 'FF'; break;
		default: hex = leftPad(val.toString(16),2,'0'); break;
	}

	return hex;
}
/* GET home page. */
router.get('/', function(req, res, next) {
	var r,g,b, bhex, thex, vibrancy, tones, step;
	tones = [];
	step = 16;
	for (r=0; r<=256; r+=step) {
		for (g=0; g<=256; g+=step) {
			for (b=0; b<=256; b+=step) {
				bhex = '#'+hexify(r)+hexify(g)+hexify(b);
				thex = '#'+hexify(256-r)+hexify(256-g)+hexify(256-b);
				vibrancy = Math.floor((Math.max(...[r,g,b]) - Math.min(...[r,g,b])) *100/256);
				tones.push({
					background: bhex,
					foreground: thex,
					vibrancy: vibrancy
				});
			}
		}
	}
  res.render('palette', { title: 'Palette', tones: tones });
});

module.exports = router;