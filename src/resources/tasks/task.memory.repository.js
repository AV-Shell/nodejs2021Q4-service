const DB = require('../../common/inMemoryDB');
const { MyCustomError } = require('../../common/myCustomError');
const {
  responseCode: { NOT_FOUND },
} = require('../../common/statusCodes');

const getAllByBoardId = async (id) => {
  const tasks = await DB.getTasksByBoardId(id);
  if (tasks.length === 0) {
    throw new MyCustomError(`The board with id ${id} was not found`, NOT_FOUND);
  }
  return tasks;
};

const getById = async (boardId, taskId) => {
  const task = await DB.getTaskById(boardId, taskId);
  if (!task) {
    throw new MyCustomError(
      `The task with boardId ${boardId} and taskId ${taskId} was not found`,
      NOT_FOUND
    );
  }
  return task;
};

const create = async (task) => DB.createTask(task);

const update = async (taskData, boardId, taskId) => {
  const task = await DB.updateTask(taskData, boardId, taskId);
  if (!task) {
    throw new MyCustomError(
      `The task with boardId ${boardId} and taskId ${taskId} was not found`,
      NOT_FOUND
    );
  }
  return task;
};

const deleteById = async (boardId, taskId) => {
  const task = await DB.deleteTaskById(boardId, taskId);
  if (!task) {
    throw new MyCustomError(
      `The task with boardId ${boardId} and taskId ${taskId} was not found`,
      NOT_FOUND
    );
  }
  return task;
};

module.exports = {
  getAllByBoardId,
  create,
  getById,
  update,
  deleteById,
};
