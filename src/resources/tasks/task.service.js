const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = (id) => tasksRepo.getAllByBoardId(id);

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const create = (task) => tasksRepo.create(task);

const update = (task, boardId, id) => tasksRepo.update(task, boardId, id);

const deleteById = (boardId, taskId) => tasksRepo.deleteById(boardId, taskId);

module.exports = { getAllByBoardId, create, getById, update, deleteById };
