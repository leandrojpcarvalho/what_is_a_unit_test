import ToDo from '../db/models/sequelize/Todo';


export default class ToDoSequelize {
  private model;
  constructor() {
    this.model = ToDo;
  }

  getAll() {
    return this.model.findAll();
  }

  getById(id: number) {
    return this.model.findByPk(id);
  }
}
