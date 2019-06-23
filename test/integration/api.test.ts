import request from 'supertest';

import app from '../../src/index';
import * as palindrome from '../../src/lib/palindrome';
import * as score from '../../src/lib/score';

describe('GET /', () => {
	test('should return 200', async () => {
		const response = await request(app)
		.get('/');

		expect(response.status).toEqual(200);
	});
});

describe('GET /api/getScores', () => {
	test('should return 200 and the high scores', async () => {
		const response = await request(app)
		.post('/api/submitEntry')
		.send({name: 'Matt', word: 'aaaa'})
		.set('Accept', 'application/json')
		.then(() => {
			return request(app)
			.get('/api/getScores');
		});

		expect(response.status).toEqual(200);
		expect(response.body).toEqual([{
			name: 'Matt',
			points: 4,
		}]);
	});
});

describe('POST /api/submitEntry', () => {
	let isNewHighScoreSpy: jest.SpyInstance;
	let isPalindromeSpy: jest.SpyInstance;
	let updateHighScoresSpy: jest.SpyInstance;

	beforeAll(() => {
		isPalindromeSpy = jest.spyOn(palindrome, 'isPalindrome');
		isNewHighScoreSpy = jest.spyOn(score, 'isNewHighScore');
		updateHighScoresSpy = jest.spyOn(score, 'updateHighScores');
	});

	afterEach(() => {
		isPalindromeSpy.mockReset();
		isNewHighScoreSpy.mockReset();
		updateHighScoresSpy.mockReset();
	});

	test('with valid body should return 200 and points', async () => {
		const response = await request(app)
		.post('/api/submitEntry')
		.send({name: 'Matt', word: 'aaaa'})
		.set('Accept', 'application/json');

		expect(response.status).toEqual(200);
		expect(response.body.points).toEqual(4);
		expect(isPalindromeSpy).toHaveBeenCalledTimes(1);
		expect(isNewHighScoreSpy).toHaveBeenCalledTimes(1);
		expect(updateHighScoresSpy).toHaveBeenCalledTimes(1);
	});

	test('with invalid body should return 400', async () => {
		const response = await request(app)
		.post('/api/submitEntry')
		.send({name: 'Matt'})
		.set('Accept', 'application/json');

		expect(response.status).toEqual(400);
		expect(isPalindromeSpy).toHaveBeenCalledTimes(0);
		expect(isNewHighScoreSpy).toHaveBeenCalledTimes(0);
		expect(updateHighScoresSpy).toHaveBeenCalledTimes(0);
	});
});
