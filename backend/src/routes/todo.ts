import { Router } from 'express';
import ToDoController from '../controller/todoController';
import ToDoService from '../service/todoService';
import ToDoModel from '../model/todoModel';
import TasksSequelize from '../db/model/tasks.sequelize';

const taskSequelize = new TasksSequelize();

const model = new ToDoModel();
const service = new ToDoService(model);
const controller = new ToDoController(service);

const todoRoute = Router();

todoRoute.delete('/:id', (req, res) => controller.delete(req, res));
todoRoute.get('/:id', (req, res) => controller.getById(req, res));
todoRoute.get('/', (req, res) => controller.getAll(req, res));
todoRoute.post('/', (req, res) => controller.insert(req, res));

export default todoRoute;
