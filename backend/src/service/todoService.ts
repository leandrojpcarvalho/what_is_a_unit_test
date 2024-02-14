import IModel from '../interface/IModel';
import IService from '../interface/IService';
import ITasks from '../interface/ITasks';
import ToDoModel from '../model/todoModel';
import { CreationTask } from '../types/database';

export default class ToDoService implements IService<ITasks> {
  private model: IModel<ITasks>;

  constructor(model = new ToDoModel()) {
    this.model = model;
  }

  async getAll() {
    return { status: 200, data: await this.model.getAll() };
  }

  async getById(id: number) {
    return { status: 200, data: await this.model.getById(id) };
  }

  async insert({ description, createdAt, updatedAt }: CreationTask) {
    if (createdAt && updatedAt) {
      return {
        status: 200,
        data: await this.model.insert({ createdAt, description, updatedAt }),
      };
    }
    const date = new Date().toISOString().split('T')[0];
    return {
      status: 200,
      data: await this.model.insert({
        description,
        createdAt: date,
        updatedAt: date,
      }),
    };
  }

  async delete(id: number) {
    return {
      status: 200,
      data: await this.model.delete({ id }),
    };
  }
}
