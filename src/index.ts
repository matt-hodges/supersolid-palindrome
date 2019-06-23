import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import path from 'path';

import { isPalindrome } from './lib/palindrome';
import { isNewHighScore, Score, updateHighScores  } from './lib/score';

const app = express();

let highScores: Score[] = [];

app.use(express.static(path.join(__dirname, '../')));
app.set('view engine', 'html');
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
	res.render('index');
});

const getScores = (req: Request, res: Response) => {
	res.json(highScores);
};

const submitEntry = (req: Request, res: Response) => {
	if (!req.body || !req.body.name || !req.body.word) {
		return res.sendStatus(400);
	}

	let points = 0;

	if (isPalindrome(req.body.word)) {
		const palindrome = req.body.word.replace(/\W/g, '');
		if (isNewHighScore(palindrome.length, highScores)) {
			highScores = updateHighScores({ name: req.body.name, points: palindrome.length }, highScores);
			points = palindrome.length;
		}
	}

	return res.json({
		points,
	});
};

app.get('/api/getScores', getScores);
app.post('/api/submitEntry', submitEntry);

const port = 3000;
app.listen(port, () => {
	// tslint:disable-next-line: no-console
	console.log('Server', process.pid, 'listening on port', port);
});

export default app;
