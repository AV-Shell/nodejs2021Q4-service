import { Board } from 'src/boards/board.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    default: 'BigTimeTask',
  })
  title: string;

  @Column({
    type: 'int',
    default: '0',
  })
  order: number;

  @Column({
    type: 'varchar',
    default: 'Very Interesting Task',
  })
  description: string;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: string | null;

  @ManyToOne(() => Board, (board) => board.tasks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'boardId' })
  board: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  userId: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  boardId: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  columnId: string | null;
}
