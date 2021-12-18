import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../../types/interfaces';

/**
 * The class for create Task object.
 */
export default class Task implements ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;

  /**
   * Task constructor
   * @param task - an object that contains all or part of the task's record parameters
   * @returns returns created task object
   */
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

  /**
   * Static metod which creates a new object that contains all the fields of the task object
   * @param task - a board object
   * @returns returns new task object
   */
  static toResponse(task: ITask): ITask {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}
