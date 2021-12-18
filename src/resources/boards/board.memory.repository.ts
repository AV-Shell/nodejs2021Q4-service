import * as DB from '../../common/inMemoryDB';
import { IBoard } from '../../types/interfaces';
import { responseCode } from '../../common/statusCodes';
import { MyCustomError } from '../../common/myCustomError';

const { NOT_FOUND } = responseCode;

export const getAll = async (): Promise<IBoard[]> => DB.getAllBoards();

export const getById = async (id: string): Promise<IBoard> => {
  const board = await DB.getBoardById(id);
  if (!board) {
    throw new MyCustomError(`The board with id ${id} was not found`, NOT_FOUND);
  }
  return board;
};

export const create = async (board: IBoard): Promise<IBoard> =>
  DB.createBoard(board);

export const update = async (
  boardData: Partial<IBoard>,
  id: string
): Promise<IBoard> => {
  const board = await DB.updateBoard(boardData, id);
  if (!board) {
    throw new MyCustomError(`The board with id ${id} was not found`, NOT_FOUND);
  }
  return board;
};

export const deleteById = async (id: string): Promise<IBoard> => {
  const board = await DB.deleteBoardById(id);
  if (!board) {
    throw new MyCustomError(`The board with id ${id} was not found`, NOT_FOUND);
  }
  return board;
};
