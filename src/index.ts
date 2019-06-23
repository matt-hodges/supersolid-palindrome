import express, { Request, Response } from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '../')));
app.set('view engine', 'html');

app.get('/', (req: Request, res: Response) => {
	res.render('index');
});

const port = 3000;
app.listen(port, () => {
	// tslint:disable-next-line: no-console
	console.log('Server', process.pid, 'listening on port', port);
});
