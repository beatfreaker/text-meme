import test from 'ava';
import pathExists from 'path-exists';
import fn from './';

test('meme', t => {
	await fn('Dont forget to be awesome', {delay: 500, background: '#1d2628', filename: 'out.gif'});

	t.true(pathExists.sync('out.gif'));
});
