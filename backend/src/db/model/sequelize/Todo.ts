import { Optional } from 'sequelize';
import { Table, Attribute } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model } from '@sequelize/core';
import ITask from '../../../interface/ITasks';

interface ToDoCreationAttributes
  extends Optional<ITask, 'id' | 'createdAt' | 'updatedAt'> {}

@Table({
  timestamps: true,
  tableName: 'todos',
})
export default class Todo extends Model<ITask, ToDoCreationAttributes> {
  @Attribute({
    type: DataTypes.STRING,
  })
  description!: string;
}
