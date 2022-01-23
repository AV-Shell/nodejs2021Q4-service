import { Board } from '../../entity/Board';
import * as boardsRepo from './board.db.repository';

/**
 * Queries all boards from the database and returns them
 * @returns Promise object represents the array of all board's oblects
 */
export const getAll = (): Promise<Board[]> => boardsRepo.getAll();

/**
 * Querie board from the database by boardId and return it
 * @param id - The board id
 * @returns Promise object represents the board's oblect
 */
export const getById = (id: string): Promise<Board> => boardsRepo.getById(id);

/**
 * Creates a board in the database
 * @param board - The board object
 * @returns Promise object represents the created board's oblect
 */
export const create = (board: Board): Promise<Board> =>
  boardsRepo.create(board);

/**
 * Update a board in the database
 * @param board - The object contains some board's data to update board in database
 * @param id - The board id
 * @returns Promise object represents the updated board's object.
 */
export const update = (board: Partial<Board>, id: string): Promise<Board> =>
  boardsRepo.update(board, id);

/**
 * Delete board from the database by boardId and return it
 * @param id - The board id
 * @returns Promise object represents the deleted board's object.
 */
export const deleteById = (id: string): Promise<Board> =>
  boardsRepo.deleteById(id);
