import SqLite3 from 'sqlite3';
import fs from 'fs/promises';

class Sqlite {
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
          created_at TIMESTAMP DEFAULT TEXT,
          updated_at TIMESTAMP DEFAULT TEXT);
      `;

      this.db.run(table);

      const stmp = this.db.prepare(
        'INSERT INTO tasks (description, created_at, updated_at) VALUES (?,?,?)'
      );
      const date = new Date().toLocaleString('pt-br');
      console.log(date);
      for (let i = 0; i < 3; i++) {
        stmp.run(`task ${i + 1}`, date, date);
      }
    });
  }

  private async readSqlQuery(pathOfSqlQuery: string) {
    try {
      return await fs.readFile(pathOfSqlQuery, 'utf-8');
    } catch (error) {
      console.log(error);
    }
  }

  async run(sql: string) {
    return this.db.run(sql);
  }

  async listen() {
    this.db.all('SELECT * FROM tasks', (error: string, result: string) => {
      if (error) {
        console.log('Erro', error);
      }
      console.log('SQL Ready');
    });
  }

  stop() {
    this.db.close();
  }
}

export default new Sqlite();
