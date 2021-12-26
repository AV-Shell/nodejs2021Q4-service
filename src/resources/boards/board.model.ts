import { v4 as uuidv4 } from 'uuid';
import { IColumn, IBoard } from '../../types/interfaces';

/**
 * The class for create Board.
 */
export default class Board implements IBoard {
  id: string;
  title: string;
  columns: IColumn[];

  /**
   * board constructor
   * @param board - an object that contains all or part of the board's record parameters
   * @returns returns created board object
   */
  constructor({
    id = uuidv4(),
    title = 'BigDataBoard',
    columns = [
      {
        id: uuidv4(),
        title: 'FirstColumn',
        order: 0,
      },
    ],
  }: Partial<IBoard> = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Static metod which creates a new object that contains all the fields of the board object
   * @param board - a board object
   * @returns returns new board object
   */
  static toResponse(board: IBoard): IBoard {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
