import App from './app';
import express, { Response, Request } from 'express';

const PORT = 3002;
const expressServer = express();

const route = express.Router();

function firstRoute(req: Request, res: Response) {
  return res.status(200).send('Bem vindo a nossa api!');
}

route.use('/', firstRoute);

const routes = {
  '': route,
};

const app = new App(expressServer, routes);

app.startServer(PORT);
