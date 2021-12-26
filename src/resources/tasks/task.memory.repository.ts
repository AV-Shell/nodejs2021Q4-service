import * as DB from '../../common/inMemoryDB';
import { ITask } from '../../types/interfaces';
import { responseCode } from '../../common/statusCodes';
import { MyCustomError } from '../../common/myCustomError';

const { NOT_FOUND } = responseCode;

/**
 * Queries all tasks by boardId from the database and returns them
 * @param id - The board id
 * @returns Promise object represents the array of all task's objects in the board
 *
 * @throws {@link MyCustomError}
 * Will throw an error if the board not found.
 */
export const getAllByBoardId = async (id: string): Promise<ITask[]> => {
  const tasks = await DB.getTasksByBoardId(id);
  if (tasks.length === 0) {
    throw new MyCustomError(`The board with id ${id} was not found`, NOT_FOUND);
  }
  return tasks;
};

/**
 * Querie task from the database by taskId and return it
 * @param boardId - The board id
 * @param taskId - The task id
 * @returns Promise object represents the task's oblect
 *
 * @throws {@link MyCustomError}
 * Will throw an error if the task not found.
 */
export const getById = async (
  boardId: string,
  taskId: string
): Promise<ITask> => {
  const task = await DB.getTaskById(taskId);
  if (!task) {
    throw new MyCustomError(
      `The task with boardId ${boardId} and taskId ${taskId} was not found`,
      NOT_FOUND
    );
  }
  return task;
};

/**
 * Creates a task in the database
 * @param task - The task object
 * @returns Promise object represents the created task's oblect
 */
export const create = async (task: ITask): Promise<ITask> =>
  DB.createTask(task);

/**
 * Update a task in the database
 * @param taskData - The object contains some task's data to update task in database
 * @param boardId - The board id
 * @param taskId - The task id
 * @returns Promise object represents the updated task's object.
 *
 * @throws {@link MyCustomError}
 * Will throw an error if the task not found.
 */
export const update = async (
  taskData: Partial<ITask>,
  boardId: string,
  taskId: string
): Promise<ITask> => {
  const task = await DB.updateTask(taskData, boardId, taskId);
  if (!task) {
    throw new MyCustomError(
      `The task with boardId ${boardId} and taskId ${taskId} was not found`,
      NOT_FOUND
    );
  }
  return task;
};

/**
 * Delete the task from the database
 * @param boardId - The board id
 * @param taskId - The task id
 * @returns Promise object represents the deleted task's object.
 *
 * @throws {@link MyCustomError}
 * Will throw an error if the task not found.
 */
export const deleteById = async (
  boardId: string,
  taskId: string
): Promise<ITask> => {
  const task = await DB.deleteTaskById(taskId);
  if (!task) {
    throw new MyCustomError(
      `The task with boardId ${boardId} and taskId ${taskId} was not found`,
      NOT_FOUND
    );
  }
  return task;
};
