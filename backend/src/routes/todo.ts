import { Router } from 'express';
import ToDoController from '../controller/todoController';

const controller = new ToDoController();

const todoRoute = Router();

todoRoute.get('/', (req, res) => controller.getAll(req, res));
todoRoute.get('/:id', (req, res) => controller.getById(req, res));

export default todoRoute;
