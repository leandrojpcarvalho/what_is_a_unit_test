import { Sequelize } from '@sequelize/core';
import IModel from '../../interface/IModel';
import ITasks from '../../interface/ITasks';
import { CreationTask } from '../../types/database';
import { SelectKeyOf } from '../../types/generics';
import { sequelize } from '../configSequelize';
import todoSeeds from './seeds/seed.todo';

import Todo from './sequelize/Todo';

export default class TasksSequelize implements IModel<ITasks> {
  private model = Todo;

  constructor(db = sequelize, model: typeof Todo = Todo) {
    db.addModels([model]);
    this.seedingHardWay(db);
  }

  async getAll() {
    return (await this.model.findAll()).map((task) => task.dataValues);
  }

  async getById(id: number) {
    const data = await this.model.findOne({ where: { id } });
    return data ? data.dataValues : null;
  }

  async insert(data: CreationTask) {
    const newData = await this.model.create(data);
    return (await this.model.findAll()).map((task) => task.dataValues);
  }

  async delete({ id }: SelectKeyOf<ITasks, 'id'>) {
    const newData = await this.model.destroy({ where: { id } });
    return (await this.model.findAll()).map((task) => task.dataValues);
  }

  private async seedingHardWay(db: Sequelize) {
    await db.sync();
    for (let i = 0; i < todoSeeds.length; i += 1) {
      const { description } = todoSeeds[i];
      await Todo.findOrCreate({ where: { description } });
    }
  }
}
