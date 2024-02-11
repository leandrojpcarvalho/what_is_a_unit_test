import Tasks from '../db/model/tasks';
import IModel from '../interface/IModel';
import ITasks from '../interface/ITasks';

export default class ToDoModel implements IModel<ITasks> {
  private model: IModel<ITasks>;

  constructor(model = new Tasks()) {
    this.model = model;
  }

  getAll() {
    return this.model.getAll();
  }

  getById(id: number) {
    return this.model.getById(id);
  }
}
