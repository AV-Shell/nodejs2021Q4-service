import { ITask } from '../../types/interfaces';
import * as tasksRepo from './task.memory.repository';

export const getAllByBoardId = (id: string): Promise<ITask[]> =>
  tasksRepo.getAllByBoardId(id);

export const getById = (boardId: string, taskId: string): Promise<ITask> =>
  tasksRepo.getById(boardId, taskId);

export const create = (task: ITask): Promise<ITask> => tasksRepo.create(task);

export const update = (
  task: Partial<ITask>,
  boardId: string,
  id: string
): Promise<ITask> => tasksRepo.update(task, boardId, id);

export const deleteById = (boardId: string, taskId: string): Promise<ITask> =>
  tasksRepo.deleteById(boardId, taskId);
