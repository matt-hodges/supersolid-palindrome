import express, { Request, Response } from 'express';
import path from 'path';

import { Score } from './lib/score';

const app = express();

const highScores: Score[] = [];

app.use(express.static(path.join(__dirname, '../')));
app.set('view engine', 'html');

app.get('/', (req: Request, res: Response) => {
	res.render('index');
});

const getScores = (req: Request, res: Response) => {
	res.json(highScores);
};

app.get('/api/getScores', getScores);

const port = 3000;
app.listen(port, () => {
	// tslint:disable-next-line: no-console
	console.log('Server', process.pid, 'listening on port', port);
});

export default app;
