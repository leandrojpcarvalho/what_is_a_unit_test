export type ResponseType<T> = {
  status: number;
  data: T | Error;
};

export type DataOrNull<T> = T | null;

export type ServiceType<T> = Promise<ResponseType<T>>;
