const {
  responseCode: { NOT_FOUND },
} = require('../../common/statusCodes');
const DB = require('../../common/inMemoryDB');
const { MyCustomError } = require('../../common/myCustomError');

const getAll = async () => DB.getAllBoards();

const getById = async (id) => {
  const board = await DB.getBoardById(id);
  if (!board) {
    throw new MyCustomError(`The board with id ${id} was not found`, NOT_FOUND);
  }
  return board;
};

const create = async (board) => DB.createBoard(board);

const update = async (boardData, id) => {
  const board = await DB.updateBoard(boardData, id);
  if (!board) {
    throw new MyCustomError(`The board with id ${id} was not found`, NOT_FOUND);
  }
  return board;
};

const deleteById = async (id) => {
  const board = await DB.deleteBoardById(id);
  if (!board) {
    throw new MyCustomError(`The board with id ${id} was not found`, NOT_FOUND);
  }
  return board;
};

module.exports = { getAll, getById, create, update, deleteById };
