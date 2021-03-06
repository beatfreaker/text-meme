# text-meme [![Build Status](https://travis-ci.org/beatfreaker/text-meme.svg?branch=master)](https://travis-ci.org/beatfreaker/text-meme)

> Generate text meme

<img src="meme.gif" width="300">
<img src="emoji.gif" width="300">

## Install

```
$ npm install --save text-meme
```


## Usage

```js
const textMeme = require('text-meme');

textMeme('unicorns ❤️').then(function (filename) {
    console.log(filename);
});
//=> 'generated text-meme > filename.gif'

textMeme(input, {delay: 600, filename: 'quote.gif', background: '#4f656d'}).then(function (filename) {
    console.log(filename);
});
//=> 'generated text-meme > quote.gif'
```


## API

### textMeme(input, [options])

#### input

Type: `string`

Don't forget to be awesome.

#### options

##### delay

Type: `integer`  
Default: 500

Frame delay.

##### background

Type: `string`  
Default: #000000

Image's background color in hex.

##### fontcolor

Type: `string`  
Default: #ffffff

Font's color in hex.

##### filename

Type: `string`  
Default: meme-randomInt

Expected name of the file (with file extension - .gif).

##### fontsize

Type: `integer`  
Default: 50

Font's size.

##### imagesize

Type: `integer`
Default: 600

Image's size in px (Height = Width = imagesize).

##### dest

Type: `string`
Default: ''

Destination path where you want image to be generated.

#### Related

- [text-meme-cli](https://github.com/beatfreaker/text-meme-cli) - CLI for this module

#### Note

This module uses [canvas](https://www.npmjs.com/package/canvas) module as dependency which requires `Cairo` check [here](https://www.npmjs.com/package/canvas#installation) how to install it.


## License

MIT © [beatfreaker](https://beatfreaker.github.io)
