# text-meme [![Build Status](https://travis-ci.org/beatfreaker/text-meme.svg?branch=master)](https://travis-ci.org/beatfreaker/text-meme)

> Generate text meme

<img src="meme.gif" width="400">

## Install

```
$ npm install --save text-meme
```


## Usage

```js
const textMeme = require('text-meme');

textMeme('unicorns');
//=> 'generated text-meme > filename.gif'

textMeme(input, {delay: 600, filename: 'quote', background: '#4f656d'})
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

frame delay

##### background

Type: `string`  
Default: #000000

image's background color in hex

##### fontcolor

Type: `string`  
Default: #ffffff

font's color in hex

##### filename

Type: `string`  
Default: meme-randomInt

expected name of the file (without file extension)

##### fontszies

Type: `integer`  
Default: 30

font's size


## License

MIT © [beatfreaker](https://beatfreaker.github.io)
