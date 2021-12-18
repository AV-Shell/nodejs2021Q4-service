import { v4 as uuidv4 } from 'uuid';
import { IColumn, IBoard } from '../../types/interfaces';

export default class Board implements IBoard {
  id: string;
  title: string;
  columns: IColumn[];

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

  static toResponse(board: IBoard): IBoard {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
