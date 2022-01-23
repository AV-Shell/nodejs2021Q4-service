import { getRepository } from 'typeorm';
import { Task } from '../../entity/Task';
import { MyCustomError } from '../../common/myCustomError';

export const getAllByBoardId = async (boardId: string): Promise<Task[]> => {
  const taskTypeormRepo = getRepository(Task);
  const tasks = await taskTypeormRepo.find({
    where: { boardId },
    loadRelationIds: true,
  });
  if (tasks.length === 0) {
    throw new MyCustomError(`The board with id ${boardId} was not found`, 404);
  }
  return tasks;
};

export const getById = async (boardId: string, id: string): Promise<Task> => {
  const taskTypeormRepo = getRepository(Task);
  const task = await taskTypeormRepo.findOne(id, { loadRelationIds: true });
  if (!task) {
    throw new MyCustomError(
      `The task with boardId ${boardId} and id ${id} was not found`,
      404
    );
  }
  return task;
};

export const create = async (task: Task): Promise<Task> => {
  const taskTypeormRepo = getRepository(Task);
  const newTask = await taskTypeormRepo.create(task);
  return taskTypeormRepo.save(newTask);
};

export const update = async (
  taskData: Partial<Task>,
  boardId: string,
  id: string
): Promise<Task> => {
  const taskTypeormRepo = getRepository(Task);
  const task = await taskTypeormRepo.findOne(id);
  if (!task) {
    throw new MyCustomError(
      `The task with boardId ${boardId} and id ${id} was not found`,
      404
    );
  }
  return taskTypeormRepo.save({ ...task, ...taskData, id, boardId });
};

export const deleteById = async (
  boardId: string,
  id: string
): Promise<Task> => {
  const taskTypeormRepo = getRepository(Task);
  const task = await taskTypeormRepo.findOne(id);
  if (!task) {
    throw new MyCustomError(
      `The task with boardId ${boardId} and id ${id} was not found`,
      404
    );
  }
  await taskTypeormRepo.delete(id);
  return task;
};
