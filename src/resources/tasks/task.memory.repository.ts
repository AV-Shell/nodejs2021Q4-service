import * as DB from '../../common/inMemoryDB';
import { ITask } from '../../types/interfaces';
import { responseCode } from '../../common/statusCodes';
import { MyCustomError } from '../../common/myCustomError';

const { NOT_FOUND } = responseCode;

export const getAllByBoardId = async (id: string): Promise<ITask[]> => {
  const tasks = await DB.getTasksByBoardId(id);
  if (tasks.length === 0) {
    throw new MyCustomError(`The board with id ${id} was not found`, NOT_FOUND);
  }
  return tasks;
};

export const getById = async (
  boardId: string,
  taskId: string
): Promise<ITask> => {
  const task = await DB.getTaskById(boardId, taskId);
  if (!task) {
    throw new MyCustomError(
      `The task with boardId ${boardId} and taskId ${taskId} was not found`,
      NOT_FOUND
    );
  }
  return task;
};

export const create = async (task: ITask): Promise<ITask> =>
  DB.createTask(task);

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

export const deleteById = async (
  boardId: string,
  taskId: string
): Promise<ITask> => {
  const task = await DB.deleteTaskById(boardId, taskId);
  if (!task) {
    throw new MyCustomError(
      `The task with boardId ${boardId} and taskId ${taskId} was not found`,
      NOT_FOUND
    );
  }
  return task;
};
