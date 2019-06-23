export const isPalindrome = (phrase: string): boolean => {
	phrase = phrase.replace(/\W/g, '').toLowerCase();

	for (let i = 0; i < phrase.length / 2; i++) {
		if (phrase[i] !== phrase[phrase.length - 1 - i]) {
			return false;
		}
	}
	return true;
};
