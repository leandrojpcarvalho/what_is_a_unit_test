import { Optional } from 'sequelize';
import { Table, Attribute } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model } from '@sequelize/core';

interface IToDo {
  id: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ToDoCreationAttributes
  extends Optional<IToDo, 'id' | 'createdAt' | 'updatedAt'> {}

@Table({
  timestamps: true,
  tableName: 'todos',
})
export default class Todo extends Model<IToDo, ToDoCreationAttributes> {
  @Attribute({
    type: DataTypes.STRING,
  })
  description!: string;
}
