import test from 'ava';
import pathExists from 'path-exists';
import fn from './';

test('meme', t => {
	await fn('Don\'t forget to be awesome', {delay: 500, background: '#1d2628', filename: 'out.gif'});

	t.true(pathExists.sync('out.gif'));
});
