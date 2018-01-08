import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '@labdat/data-models';


export interface TaskState extends EntityState<Task> { }
export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();
