import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  constructor({
    id = uuidv4(),
    title = 'PrimaryTask',
    order = 0,
    description = 'Do something',
    userId = null,
    boardId = 'boardId',
    columnId = 'columnId',
  }: Partial<Task> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: Task): Task {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}
