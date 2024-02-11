import App from './app';
import express from 'express';
import routes from './routes';

const PORT = 3002;
const expressServer = express();

const app = new App(expressServer, routes);

app.startServer(PORT);
