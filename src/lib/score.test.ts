import { isNewHighScore, updateHighScores } from './score';

const highScores = [
	{
		name: 'Matt',
		points: 10,
	},
	{
		name: 'Matt',
		points: 10,
	},
	{
		name: 'Matt',
		points: 10,
	},
	{
		name: 'Matt',
		points: 10,
	},
	{
		name: 'Matt',
		points: 5,
	},
];

describe('the isNewHighScore function', () => {
	test('should return true when there are less than 5 high scores', () => {
		expect(isNewHighScore(4, [
			highScores[0],
			highScores[1],
		])).toBe(true);
	});

	test('should return false when the new score is lower than the lowest high score', () => {
		expect(isNewHighScore(4, highScores)).toBe(false);
	});

	test('should return true when the new score is higher than the lowest high score', () => {
		expect(isNewHighScore(6, highScores)).toBe(true);
	});

	test('should return true when the new score is the same as the lowest high score', () => {
		expect(isNewHighScore(5, highScores)).toBe(true);
	});
});

describe('the updateHighScores function', () => {
	test('should add the new score when it is higher than the 5th high score', () => {
		expect(updateHighScores({
			name: 'Matt',
			points: 20,
		}, [...highScores])).toEqual([
			{
				name: 'Matt',
				points: 20,
			},
			...highScores.slice(0, 4),
		]);
	});

	test('should add the new score when there are less than 5 high scores', () => {
		expect(updateHighScores({
			name: 'Matt',
			points: 5,
		},
		[
			highScores[0],
		])).toEqual([
			highScores[0],
			{
				name: 'Matt',
				points: 5,
			},
		]);
	});

	test('should replace the 5th high score if the new score is the same', () => {
		expect(updateHighScores({
			name: 'Not Matt',
			points: 5,
		}, [...highScores])).toEqual([
			...highScores.slice(0, 4),
			{
				name: 'Not Matt',
				points: 5,
			},
		]);
	});

	test('should not add the new score when it is lower than the 5th high score', () => {
		expect(updateHighScores({
			name: 'Not Matt',
			points: 2,
		}, [...highScores])).toEqual(highScores);
	});
});
