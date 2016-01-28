'use strict';
var fs = require('fs');
var Canvas = require('canvas');
var GIFEncoder = require('gifencoder');
var randomInt = require('random-int');
var pathExists = require('path-exists');
var objectAssign = require('object-assign');
var path = require('path');
var twemoji = require('twemoji');
var Promise = require('pinkie-promise');
var get = require('simple-get');
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

var addImage = function (encoder, ctx, img) {
	return new Promise(function (resolve, reject) {
		var rex = /<img.*?src="(.*?)"/; // http://stackoverflow.com/questions/12393671/substring-regex-to-get-a-src-value-held-in-a-string
		get.concat('http:' + rex.exec(img)[1], function (err, src) {
			if (err) {
				reject(err);
			}
			var img = new Canvas.Image();
			img.src = src;
			ctx.drawImage(img, (canvasW / 2) - 18, (canvasH / 2) - 18); // to put image in center => canvas/2 - image/2
			encoder.addFrame(ctx);
			resolve();
		});
	});
};

var fillText = function (encoder, ctx, word) {
	ctx.fillText(word, canvasW / 2, canvasH / 2);
	encoder.addFrame(ctx);
};

var addFrame = function (encoder, ctx, word, opts) {
	return new Promise(function (resolve) {
		ctx.fillStyle = opts.background;
		ctx.fillRect(0, 0, opts.canvasW, opts.canvasH);
		ctx.font = opts.fontsize + ' Impact';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = opts.fontcolor;

		var emoji = twemoji.parse(word);
		if (emoji.split(' ').length > 1) {
			addImage(encoder, ctx, emoji, opts).then(function () {
				resolve();
			});
		} else {
			fillText(encoder, ctx, word, opts);
			resolve();
		}
	});
};

var generateFileName = function () {
	var filename;
	while (filename === undefined || pathExists.sync(filename)) {
		filename = 'meme-' + randomInt(100, 99999) + '.gif';
	}

	return filename;
};

var processText = function (encoder, canvas, text, opts) {
	return text.reduce(function (promise, word) {
		return promise.then(function () {
			return addFrame(encoder, canvas, word, opts);
		});
	}, Promise.resolve());
};

module.exports = function (text, opts) {
	if (typeof text !== 'string' || text === '') {
		return Promise.reject(new Error('Expected some string value'));
	}

	opts = objectAssign({
		background: '#000000',
		fontcolor: '#FFFFFF',
		delay: 600,
		fontsize: '50px',
		filename: generateFileName(),
		dest: ''
	}, opts, {repeat: 0, quality: 10});

	text = text.split(' ');

	console.log(opts.dest);
	if (opts.dest !== '' && !pathExists.sync(opts.dest)) {
		return Promise.reject(new Error('Please provide valid path'));
	}

	if (opts.imagesize !== undefined) {
		canvasW = opts.imagesize;
		canvasH = opts.imagesize;
	}
	opts.canvasW = canvasW;
	opts.canvasH = canvasH;
	var canvas = new Canvas(canvasW, canvasH);
	var ctx = canvas.getContext('2d');
	var encoder = getEncoder(opts);

	return new Promise(function (resolve) {
		processText(encoder, ctx, text, opts).then(function () {
			encoder.finish();
			resolve(opts.filename);
		});
	});
};
