import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IColumn } from '../types/interfaces';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    default: 'BigDataBoard',
  })
  title!: string;

  @Column({
    type: 'json',
  })
  columns!: IColumn[];

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
  }: Partial<Board> = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: Board): Board {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
