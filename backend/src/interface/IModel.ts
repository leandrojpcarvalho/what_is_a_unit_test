import { DataOrNull, SelectKeyOf } from '../types/generics';

export default interface IModel<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<DataOrNull<T>>;
  insert(data: Omit<T, 'id'>): Promise<T[] | Error>;
  delete(data: SelectKeyOf<T & { id: number }, 'id'>): Promise<T[] | Error>;
}
