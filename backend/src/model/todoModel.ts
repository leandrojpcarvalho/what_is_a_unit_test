import Tasks from '../db/model/tasks';
import IModel from '../interface/IModel';
import ITasks from '../interface/ITasks';
import { SelectKeyOf } from '../types/generics';

export default class ToDoModel implements IModel<ITasks> {
  private model: IModel<ITasks>;

  constructor(model: IModel<ITasks> = new Tasks()) {
    this.model = model;
  }

  async getAll() {
    return this.model.getAll();
  }

  async getById(id: number) {
    return this.model.getById(id);
  }

  async insert(data: Omit<ITasks, 'id'>) {
    return this.model.insert(data);
  }

  async delete(data: SelectKeyOf<ITasks, 'id'>) {
    return this.model.delete(data);
  }
}
