import express, { Request, Response } from 'express';
import routeToDo from './Todo.sequelize';

const defaultRoute = express.Router();

function firstRoute(req: Request, res: Response) {
  return res.status(200).send('Bem vindo a nossa api!');
}

defaultRoute.get('/', firstRoute);

const routes = {
  '': defaultRoute,
  todo: routeToDo,
};

export default routes;
