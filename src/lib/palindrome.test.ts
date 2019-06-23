import { isPalindrome } from './palindrome';

describe('the isPalindrome function', () => {
	test('should return true when given an empty string', () => {
		expect(isPalindrome('')).toBe(true);
	});

	test('should return true phrase for a single character', () => {
		expect(isPalindrome('a')).toBe(true);
	});

	test('should return true with speacial characters', () => {
		expect(isPalindrome('/a/')).toBe(true);
	});

	test('should not be case sensitive', () => {
		expect(isPalindrome('aA')).toBe(true);
	});

	test('should ignore whitespace', () => {
		expect(isPalindrome('a a  a')).toBe(true);
	});

	test('should return false when the phrase is not a palindrome', () => {
		expect(isPalindrome('aAb')).toBe(false);
	});
});
