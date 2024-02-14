import { Sequelize } from '@sequelize/core';
import todoSeeds from './model/seeds/seed.todo';
import Todo from './model/sequelize/Todo';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/db/db.db',
  models: [Todo],
  define: {
    underscored: true,
  },
});

const seedingHard = async () => {
  await sequelize.sync();
  for (let i = 0; i < todoSeeds.length; i += 1) {
    const { description } = todoSeeds[i];
    await Todo.findOrCreate({ where: { description } });
  }
};

seedingHard();
