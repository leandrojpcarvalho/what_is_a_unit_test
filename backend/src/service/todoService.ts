import IModel from '../interface/IModel';
import IService from '../interface/IService';
import ITasks from '../interface/ITasks';
import ToDoModel from '../model/todoModel';
import { ServiceType } from '../types/generics';

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
}
