export interface Score {
	name: string;
	points: number;
}

export const isNewHighScore = (score: number, highScores: Score[]): boolean => {
	return highScores.length < 5 ||
		score > highScores[highScores.length - 1].points;
};

export const updateHighScores = (newEntry: Score, highScores: Score[]): Score[] => {
	if (highScores[4] && highScores[4].points === newEntry.points) {
		highScores[4] = newEntry;
		return highScores;
	}

	highScores.push(newEntry);

	highScores.sort((a, b) => b.points - a.points);

	return highScores.slice(0, 5);
};
