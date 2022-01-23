import { Task } from '../../entity/Task';
import * as tasksRepo from './task.db.repository';

/**
 * Queries all tasks by boardId from the database and returns them
 * @param id - The board id
 * @returns Promise object represents the array of all task's oblects in the board
 */
export const getAllByBoardId = (boardId: string): Promise<Task[]> =>
  tasksRepo.getAllByBoardId(boardId);

/**
 * Querie task from the database by taskId and return it
 * @param boardId - The board id
 * @param taskId - The task id
 * @returns Promise object represents the board's oblect
 */
export const getById = (boardId: string, id: string): Promise<Task> =>
  tasksRepo.getById(boardId, id);

/**
 * Creates a task in the database
 * @param task - The task object
 * @returns Promise object represents the created task's oblect
 */
export const create = (task: Task): Promise<Task> => tasksRepo.create(task);

/**
 * Update a task in the database
 * @param task - The object contains some task's data to update task in database
 * @param boardId - The board id
 * @param id - The task id
 * @returns Promise object represents the updated task's object.
 */
export const update = (
  task: Partial<Task>,
  boardId: string,
  id: string
): Promise<Task> => tasksRepo.update(task, boardId, id);

/**
 * Delete the task from the database
 * @param boardId - The board id
 * @param taskId - The task id
 * @returns Promise object represents the deleted task's object.
 */
export const deleteById = (boardId: string, id: string): Promise<Task> =>
  tasksRepo.deleteById(boardId, id);
