import { DataOrNull } from '../types/generics';

export default interface IModel<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<DataOrNull<T>>;
}
