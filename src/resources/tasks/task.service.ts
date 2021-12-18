import { ITask } from '../../types/interfaces';
import * as tasksRepo from './task.memory.repository';

/**
 * Queries all tasks by boardId from the database and returns them
 * @param id - The board id
 * @returns Promise object represents the array of all task's oblects in the board
 */
export const getAllByBoardId = (id: string): Promise<ITask[]> =>
  tasksRepo.getAllByBoardId(id);

/**
 * Querie task from the database by taskId and return it
 * @param boardId - The board id
 * @param taskId - The task id
 * @returns Promise object represents the board's oblect
 */
export const getById = (boardId: string, taskId: string): Promise<ITask> =>
  tasksRepo.getById(boardId, taskId);

/**
 * Creates a task in the database
 * @param task - The task object
 * @returns Promise object represents the created task's oblect
 */
export const create = (task: ITask): Promise<ITask> => tasksRepo.create(task);

/**
 * Update a task in the database
 * @param task - The object contains some task's data to update task in database
 * @param boardId - The board id
 * @param id - The task id
 * @returns Promise object represents the updated task's object.
 */
export const update = (
  task: Partial<ITask>,
  boardId: string,
  id: string
): Promise<ITask> => tasksRepo.update(task, boardId, id);

/**
 * Delete the task from the database
 * @param boardId - The board id
 * @param taskId - The task id
 * @returns Promise object represents the deleted task's object.
 */
export const deleteById = (boardId: string, taskId: string): Promise<ITask> =>
  tasksRepo.deleteById(boardId, taskId);
