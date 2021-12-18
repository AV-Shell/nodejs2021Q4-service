import * as DB from '../../common/inMemoryDB';
import { IBoard } from '../../types/interfaces';
import { responseCode } from '../../common/statusCodes';
import { MyCustomError } from '../../common/myCustomError';

const { NOT_FOUND } = responseCode;

/**
 * Queries all boards from the database and returns them
 * @returns Promise object represents the array of all board's oblects
 */
export const getAll = async (): Promise<IBoard[]> => DB.getAllBoards();

/**
 * Querie board from the database by boardId and return it
 * @param id - The board id
 * @returns Promise object represents the board's oblect
 *
 * @throws {@link MyCustomError}
 *  Will throw an error if the board not found.
 */
export const getById = async (id: string): Promise<IBoard> => {
  const board = await DB.getBoardById(id);
  if (!board) {
    throw new MyCustomError(`The board with id ${id} was not found`, NOT_FOUND);
  }
  return board;
};

/**
 * Creates a board in the database
 * @param board - The board object
 * @returns Promise object represents the created board's oblect
 */
export const create = async (board: IBoard): Promise<IBoard> =>
  DB.createBoard(board);

/**
 * Update a board in the database
 * @param boardData - The object contains some board's data to update board in database
 * @param id - The board id
 * @returns Promise object represents the updated board's object.
 *
 * @throws {@link MyCustomError}
 * Will throw an error if the board not found.
 */
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

/**
 * Delete board from the database by boardId and return it
 * @param id - The board id
 * @returns Promise object represents the deleted board's object.
 *
 * @throws {@link MyCustomError}
 * Will throw an error if the board not found.
 */
export const deleteById = async (id: string): Promise<IBoard> => {
  const board = await DB.deleteBoardById(id);
  if (!board) {
    throw new MyCustomError(`The board with id ${id} was not found`, NOT_FOUND);
  }
  return board;
};
