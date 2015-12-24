'use strict';
var fs = require('fs');
var Canvas = require('canvas');
var GIFEncoder = require('gifencoder');
var randomInt = require('random-int');
var pathExists = require('path-exists');
var objectAssign = require('object-assign');
var path = require('path');
var canvasW = 600;
var canvasH = 600;

var getEncoder = function (opts) {
	var encoder = new GIFEncoder(canvasW, canvasH);
	encoder.createReadStream().pipe(fs.createWriteStream(path.join(opts.dest, opts.filename)));
	encoder.start();
	encoder.setRepeat(opts.repeat);
	encoder.setDelay(opts.delay);
	encoder.setQuality(opts.quality);
	return encoder;
};

var addFrame = function (encoder, canvas, word, opts) {
	canvas.fillStyle = opts.background;
	canvas.fillRect(0, 0, canvasW, canvasH);
	canvas.font = opts.fontsize + ' Impact';
	canvas.textAlign = 'center';
	canvas.textBaseline = 'middle';
	canvas.fillStyle = opts.fontcolor;
	canvas.fillText(word, canvasW / 2, canvasH / 2);
	encoder.addFrame(canvas);
};

var generateFileName = function () {
	var filename;
	while (filename === undefined || pathExists.sync(filename)) {
		filename = 'meme-' + randomInt(100, 99999) + '.gif';
	}

	return filename;
};

module.exports = function (text, opts) {
	if (typeof text !== 'string' || text === '') {
		throw new Error('Expected some string value');
	}

	opts = objectAssign({
		background: '#000000',
		fontcolor: '#FFFFFF',
		delay: 600,
		fontsize: '50px',
		filename: generateFileName(),
		dest: ''
	}, opts, {repeat: 1, quality: 10});

	text = text.split(' ');

	console.log(opts.dest);
	if (opts.dest !== '' && !pathExists.sync(opts.dest)) {
		throw new Error('Please provide valid path');
	}

	if (opts.imagesize !== undefined) {
		canvasW = opts.imagesize;
		canvasH = opts.imagesize;
	}

	var canvas = new Canvas(canvasW, canvasH);
	var ctx = canvas.getContext('2d');
	var encoder = getEncoder(opts);

	for (var i = 0; i < text.length; i++) {
		addFrame(encoder, ctx, text[i], opts);
	}

	encoder.finish();

	return opts.filename;
};
