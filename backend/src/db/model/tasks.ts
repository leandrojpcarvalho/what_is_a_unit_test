import IModel from '../../interface/IModel';
import Sqlite from '../../db/';
import ITasks from '../../interface/ITasks';
import { CreationTask } from '../../types/database';

export default class Tasks implements IModel<ITasks> {
  private db: Sqlite;

  constructor(db = Sqlite.getInstance()) {
    this.db = db;
  }

  async getAll() {
    return this.transformData('SELECT * FROM tasks');
  }

  async getById(id: number) {
    const data = await this.transformData(`SELECT * FROM tasks WHERE id=${id}`);
    return data.find(({ id: taskId }) => taskId === id) || null;
  }

  async insert(data: CreationTask) {
    return this.db.run(
      `INSERT INTO tasks (description, created_at, updated_at) VALUES (?,?,?)`,
      data
    );
  }

  private async transformData(sql: string) {
    const raw = await this.db.all(sql);
    if (raw instanceof Error) {
      throw new Error('algo deu errado');
    }
    return raw;
  }
}
