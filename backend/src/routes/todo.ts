import { Router } from 'express';

const todoRoute = Router();

todoRoute.get('/', (req, res) =>
  res.status(200).send('essa é a rota /todo no método get')
);

export default todoRoute;
