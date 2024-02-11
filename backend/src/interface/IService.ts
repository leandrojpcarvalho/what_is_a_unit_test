import { DataOrNull, ServiceType } from '../types/generics';

export default interface IService<T> {
  getAll(): ServiceType<T[]>;
  getById(id: number): ServiceType<DataOrNull<T>>;
}
