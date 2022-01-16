import { DeleteResult, getRepository } from 'typeorm';
import { Task } from '../../entity/Task';
import { MyCustomError } from '../../common/myCustomError';

export const getAllByBoardId = async (boardId: string): Promise<Task[]> => {
  const taskTypeormRepo = getRepository(Task);
  const tasks = await taskTypeormRepo.find({ where: { boardId } });
  if (tasks.length === 0) {
    throw new MyCustomError(`The board with id ${boardId} was not found`, 404);
  }
  return tasks;
};

export const getById = async (boardId: string, id: string): Promise<Task> => {
  const taskTypeormRepo = getRepository(Task);
  const task = await taskTypeormRepo.findOne(id);
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
  // const task = await DB.updateTask(taskData, boardId, id);
  if (!task) {
    throw new MyCustomError(
      `The task with boardId ${boardId} and id ${id} was not found`,
      404
    );
  }
  console.log('task', task);
  console.log('taskData', taskData);
  console.log('id', id);
  console.log('boardId', boardId);
  console.log('resultObj', { ...task, ...taskData, id, boardId });

  const at = await taskTypeormRepo.save({ ...task, ...taskData, id, boardId });
  console.log('at', at);
  return at;
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

export const unassignTaskByUserId = async (userId: string): Promise<Task[]> => {
  const taskTypeormRepo = getRepository(Task);
  const tasks = await taskTypeormRepo.find({ where: { userId } });
  return Promise.all(
    tasks.map((el) => {
      el.userId = null;
      return taskTypeormRepo.save(el);
    })
  );
};

export const deleteTaskByBoardId = async (
  boardId: string
): Promise<DeleteResult[]> => {
  const taskTypeormRepo = getRepository(Task);
  const tasks = await taskTypeormRepo.find({ where: { boardId } });
  return Promise.all(tasks.map((el) => taskTypeormRepo.delete(el)));
};
