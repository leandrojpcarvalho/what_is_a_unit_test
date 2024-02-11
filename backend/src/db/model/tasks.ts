import IModel from '../../interface/IModel';
import Sqlite from '../../db/';
import ITasks from '../../interface/ITasks';

export default class Tasks implements IModel<ITasks> {
  private db: Sqlite;

  constructor(db = new Sqlite()) {
    this.db = db;
  }

  async getAll() {
    return this.transformData('SELECT * FROM tasks');
  }

  async getById(id: number) {
    const data = await this.transformData(`SELECT * FROM tasks WHERE id=${id}`);
    return data.find(({ id: taskId }) => taskId === id) || null;
  }

  private async transformData(sql: string) {
    const raw = await this.db.all(sql);
    if (raw instanceof Error) {
      throw new Error('algo deu errado');
    }
    return raw;
  }
}
