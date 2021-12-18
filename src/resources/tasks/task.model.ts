import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../../types/interfaces';

export default class Task implements ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;

  constructor({
    id = uuidv4(),
    title = 'PrimaryTask',
    order = 0,
    description = 'Do something',
    userId = null,
    boardId = 'boardId',
    columnId = 'columnId',
  }: Partial<ITask> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: ITask): ITask {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}
