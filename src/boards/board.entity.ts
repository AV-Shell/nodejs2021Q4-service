import { Task } from 'src/tasks/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IColumn } from '../common/Column';

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

  @OneToMany(() => Task, (task) => task.boardId)
  tasks: Task[];
}
