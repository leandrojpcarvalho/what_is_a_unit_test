import { Router } from 'express';
import ToDoSequelize from '../model/Todo.sequelize';

const routeToDo = Router();

const model = new ToDoSequelize();

routeToDo.get('/', async (req, res) =>
  res.status(200).json(await model.getAll())
);

export default routeToDo;
