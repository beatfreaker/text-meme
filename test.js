var meme = require('./');

meme('Don\'t forget to be awesome', {delay: 600, background: '#1d2628'}).then(function(filename) {
    console.log('generated text-meme > ' + filename);
}, function(err) {
    console.log('error');
});





