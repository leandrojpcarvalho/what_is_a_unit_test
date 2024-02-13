import ITasks from '../interface/ITasks';
import { Creation } from './generics';

export type CreationTask = Creation<ITasks, 'description'>;
