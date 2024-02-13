import ITasks from '../interface/ITasks';
import { Creation } from './generics';

export type CreationTask = Creation<Omit<ITasks, 'id'>, 'description'>;
