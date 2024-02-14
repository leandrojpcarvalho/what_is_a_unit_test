import SqLite3 from 'sqlite3';
import ITasks from '../interface/ITasks';
import defaultTasks from './model/seeds/seed.todo';
import { CreationTask } from '../types/database';

type ListOfTasks = CreationTask[];

export default class Sqlite {
  public static instance: Sqlite | null = null;
  public db: SqLite3.Database;

  constructor() {
    this.db = new SqLite3.Database('./src/db/db.db');
    this.seedAll();
    this.listen();
  }

  public static getInstance(): Sqlite {
    if (!Sqlite.instance) {
      Sqlite.instance = new Sqlite();
    }
    return Sqlite.instance;
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

      this.db.all('SELECT * FROM tasks', (error, result) => {
        if (error) {
          console.log(error);
        } else if (result.length < 3) {
          this.bulkInsertTasks(defaultTasks);
        }
      });
    });
  }

  bulkInsertTasks(data: ListOfTasks) {
    const stmt = this.db.prepare(
      `INSERT INTO tasks (description, created_at, updated_at) VALUES (?, ?, ?)`
    );
    const date = new Date().toISOString().split('T')[0];
    for (let i = 0; i < data.length; i++) {
      const { description, createdAt, updatedAt } = data[i];
      if (createdAt && updatedAt) {
        stmt.run(description, createdAt, updatedAt);
      } else {
        stmt.run(description, date, date);
      }
    }
    stmt.finalize();
  }

  async run(sql: string, value: Partial<ITasks>) {
    return new Promise<ITasks[] | Error>((resolve, reject) => {
      this.db.run(
        sql,
        Object.values(value),
        (error: string, result: string) => {
          if (error) {
            reject(error);
          } else {
            if (!result) {
              this.db.all<ITasks>('SELECT * FROM tasks', (error, rows) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(rows);
                }
              });
            }
          }
        }
      );
    });
  }

  async all(sql: string) {
    return new Promise<ITasks[] | Error>((resolve, reject) =>
      this.db.serialize(() => {
        this.db.all<ITasks>(sql, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
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
