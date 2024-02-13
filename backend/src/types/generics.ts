export type ResponseType<T> = {
  status: number;
  data: T;
};

export type DataOrNull<T> = T | null;

export type ServiceType<T> = Promise<ResponseType<T>>;

export type SelectKeyOf<T, K extends keyof T> = Pick<T, K>;
export type Creation<T, K extends keyof T> = Partial<T> & Pick<T, K>;
