import SqLite3 from 'sqlite3';
import ITasks from '../interface/ITasks';
import Tasks from './model/tasks';

export default class Sqlite {
  public db: SqLite3.Database;

  constructor() {
    this.db = new SqLite3.Database(':memory:');
    this.seedAll();
    this.listen();
  }

  seedAll() {
    this.db.serialize(async () => {
      const table = `
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          description TEXT NOT NULL,
          created_at REAL NOT NULL,
          updated_at REAL NOT NULL);
      `;

      this.db.run(table);

      const date = '08-10-1999';
      const stmp = this.db.prepare(
        `INSERT INTO tasks (description, created_at, updated_at) VALUES (?, ?, ?)`
      );
      for (let i = 0; i < 3; i++) {
        stmp.run(`task ${i + 1}`, date, date);
      }
      stmp.finalize();
    });
  }

  async run(sql: string) {
    return this.db.run(sql);
  }

  async all(sql: string) {
    return new Promise<ITasks[] | Error>((resolve, reject) =>
      this.db.all<ITasks>(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    );
  }

  private async listen() {
    this.db.all('SELECT * FROM tasks', (error: string, result: string) => {
      if (error) {
        console.log('Erro', error);
      }
      console.log('sql up!');
    });
  }
}
