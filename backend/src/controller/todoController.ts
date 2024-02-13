import { Request, Response } from 'express';
import IController from '../interface/IController';
import IService from '../interface/IService';
import ITasks from '../interface/ITasks';
import ToDoService from '../service/todoService';

export default class ToDoController implements IController {
  private service: IService<ITasks>;

  constructor(service = new ToDoService()) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response) {
    const { status, data } = await this.service.getAll();
    return res.status(status).json(data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.service.getById(Number(id));
    return res.status(status).json(data);
  }

  async insert(req: Request, res: Response) {
    const { status, data } = await this.service.insert(req.body);
    return res.status(status).json(data);
  }
}
