import express, { Request, Response } from 'express';

const app = express();

app.use(express.static(__dirname));

app.get('/', (req: Request, res: Response) => {
	res.render('index');
});

const port = 3000;
app.listen(port, () => {
	// tslint:disable-next-line: no-console
	console.log('Server', process.pid, 'listening on port', port);
});
