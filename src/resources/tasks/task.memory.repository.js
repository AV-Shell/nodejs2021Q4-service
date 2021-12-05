const DB = require('../../common/inMemoryDB');

const getAllByBoardId = async id => {
  const tasks = await DB.getTasksByBoardId(id);
  if (tasks.length === 0) {
    throw new Error(`The board with id ${id} was not found`);
  }
  return tasks;
};

const getById = async (boardId, taskId) => {
  const task = await DB.getTaskById(boardId, taskId);
  if (!task) {
    throw new Error(
      `The task with boardId ${boardId} and taskId ${taskId} was not found`
    );
  }
  return task;
};

const create = async task => DB.createTask(task);

const update = async (taskData, boardId, taskId) => {
  const task = await DB.updateTask(taskData, boardId, taskId);
  if (!task) {
    throw new Error(
      `The task with boardId ${boardId} and taskId ${taskId} was not found`
    );
  }
  return task;
};

const deleteById = async (boardId, taskId) => {
  const task = await DB.deleteTaskById(boardId, taskId);
  if (!task) {
    throw new Error(
      `The task with boardId ${boardId} and taskId ${taskId} was not found`
    );
  }
  return task;
};

module.exports = {
  getAllByBoardId,
  create,
  getById,
  update,
  deleteById
};