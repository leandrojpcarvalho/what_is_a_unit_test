import { Sequelize, Options } from '@sequelize/core';

const config: Options = {
  dialect: 'sqlite',
  storage: './src/db/db.db',
  models: [],
  define: {
    underscored: true,
  },
};

export const sequelize = new Sequelize(config);
