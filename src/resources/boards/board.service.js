const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = board => boardsRepo.create(board);

const update = (board, id) => boardsRepo.update(board, id);

const deleteById = id => boardsRepo.deleteById(id);

module.exports = { getAll, getById, create, update, deleteById };