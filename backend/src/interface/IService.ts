import { CreationTask } from '../types/database';
import { DataOrNull, ServiceType } from '../types/generics';

export default interface IService<T> {
  getAll(): ServiceType<T[]>;
  getById(id: number): ServiceType<DataOrNull<T>>;
  insert(data: CreationTask): ServiceType<DataOrNull<T[] | Error>>;
  delete(data: number): ServiceType<DataOrNull<T[] | Error>>;
}
