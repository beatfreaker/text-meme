# text-meme

> Generate text meme

<img src="meme.gif" width="300">

## Install

```
$ npm install --save text-meme
```


## Usage

```js
const textMeme = require('text-meme');

textMeme('unicorns');
//=> 'generated text-meme > filename.gif'

textMeme(input, {delay: 600, filename: 'quote', background: '#4f656d'});
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

##### fontsize

Type: `integer`  
Default: 30

font's size

#### Related

- [text-meme-cli](https://github.com/beatfreaker/text-meme-cli) - CLI for this module

#### Note

This module uses [canvas](https://www.npmjs.com/package/canvas) module as dependency which requires `Cairo` check [here](https://www.npmjs.com/package/canvas#installation) how to install it.


## License

MIT © [beatfreaker](https://beatfreaker.github.io)
