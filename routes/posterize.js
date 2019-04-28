const express = require('serverless-express/express');
var router = express.Router();
const leftPad = require('left-pad');
const Jimp = require('jimp');

function hexify(val) {
	var hex;
	switch(true) {
		case (val<0): hex = '00'; break;
		case (val>255): hex = 'FF'; break;
		default: hex = leftPad(val.toString(16),2,'0'); break;
	}

	return hex;
}

function decify(hex) {
	return parseInt(hex,16);
}

function getVibrancy(hex) {
	var r,g,b,a,vibrancy;
	r = decify(hex.substring(0,2));
	g = decify(hex.substring(2,4));
	b = decify(hex.substring(4,6));
	//console.log('r:'+r+' g:'+g+' b:'+b);

	vibrancy = Math.floor((Math.max(...[r,g,b]) - Math.min(...[r,g,b])) *100/256);

	return vibrancy;
}
/* GET home page. */
router.get('/', function(req, res, next) {
	var source, target, thumbTarget, output, 
		w, h, x, y, 
		scaleTo = 300, scale = 0.25, tones = 32, 
		palette, c,
		vibrantColour = '000000ff', maxVibrancy = 0,
		coords = {x:0,y:0};
	try {
		
		//console.log(__dirname);
		source = "./public/images/scarborough.jpg";
		target = source.replace(".jpg","_poster.jpg");
		thumbTarget = source.replace(".jpg","_thumb.jpg");
    	
		palette = [];
		
		//console.log(target);

		Jimp.read(source) //, function (err, input) {
		.then(input => {
			//if (err) throw err;
	    // do stuff with the image (if no exception)
	    scale = scaleTo/input.bitmap.width;
	    w = Math.floor(input.bitmap.width*scale);
	    h = Math.floor(input.bitmap.height*scale);
	    output = input.clone().resize(w,h).posterize(tones);

	    output.write(target);

	    for(x=0;x<w;x++) {
	    	for(y=0;y<h;y++) {
	    		c = leftPad(output.getPixelColor(x, y).toString(16),8,'0');
	    		if (palette.indexOf(c) == -1) {
	    			//console.log(c);
	    			palette.push(c);
	    			//console.log('palette length'+palette.length);
	    			vibrancy = getVibrancy(c);
	    			//console.log('vibrancy: '+vibrancy);
	    			if (vibrancy > maxVibrancy) {
	    				maxVibrancy = vibrancy;
	    				vibrantColour = c;
	    				coords.x = Math.floor(x/scale);
	    				coords.y = Math.floor(y/scale);
	    				console.log('colour: ' + vibrantColour + ' vibrancy: ' + maxVibrancy);
	    			}
	    		}
	    	}
	    }
	    return input;
    })
    .then(input => {
    	var thumbSize, halfThumbSize, tileSize = 40;
    	thumbSize = Math.floor(input.bitmap.width / 5);
    	halfThumbSize = Math.floor(thumbSize/2);
    	output = input.clone()
    	.crop(
    		coords.x-halfThumbSize,
    		coords.y-halfThumbSize,
    		thumbSize,
    		thumbSize
    	)
    	.resize(tileSize, tileSize);
    	output.write(thumbTarget);
    	return input;
    }) 
    .then(input => {

    	console.log('final colour: ' + vibrantColour + ' vibrancy: ' + maxVibrancy);

		  res.render('posterize', { 
		  	title: 'Posterize', 
		  	source: source.replace('./public','/assets'), 
		  	target: target.replace('./public','/assets'), 
		  	thumb: thumbTarget.replace('./public', '/assets'),
		  	palette: palette,
		  	vibrancy: maxVibrancy,
		  	colour: vibrantColour 
		  });
    });	  
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;