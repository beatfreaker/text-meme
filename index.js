'use strict';
var fs = require('fs');
var Canvas = require('canvas');
var GIFEncoder = require('gifencoder');
var randomInt = require('random-int');
var Promise = require('pinkie-promise');
var pathExists = require('path-exists');
var canvasW = 600;
var canvasH = 600;

var getEncoder = function (opts) {
	var encoder = new GIFEncoder(canvasW, canvasH);
	encoder.createReadStream().pipe(fs.createWriteStream(opts.filename));
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

var generateFileName = function (opts) {
	return new Promise(function (resolve) {
		var flag = true;
		while (flag) {
			if (opts.filename !== undefined && !pathExists.sync(opts.filename)) {
				flag = false;
				resolve(opts);
			} else {
				opts.filename = 'meme-' + randomInt(100, 99999) + '.gif';
			}
		}
	});
};

module.exports = function (text, opts) {
	return new Promise(function (resolve, reject) {
		if (typeof text !== 'string' || text === '') {
			reject(new Error('Expected some string value'));
		}

		opts = opts || {};
		opts.repeat = 0;
		// 0 to repeat and 1 to not repeat
		opts.quality = 10;
		text = text.split(' ');

		if (opts.background === undefined) {
			opts.background = '#000000';
		}

		if (opts.fontcolor === undefined) {
			opts.fontcolor = '#FFFFFF';
		}

		if (opts.delay === undefined) {
			opts.delay = 600;
		}

		if (opts.fontsize === undefined) {
			opts.fontsize = '50px';
		}

		generateFileName(opts).then(function (opts) {
			var canvas = new Canvas(canvasW, canvasH);
			var ctx = canvas.getContext('2d');
			var encoder = getEncoder(opts);

			for (var i = 0; i < text.length; i++) {
				addFrame(encoder, ctx, text[i], opts);
				if (i === text.length - 1) {
					encoder.finish();
					resolve(opts.filename);
				}
			}
		});
	});
};
