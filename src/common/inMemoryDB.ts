import { IUser, IBoard, ITask } from '../types/interfaces';

const UserDB: IUser[] = [];

const BoardDB: IBoard[] = [];

const TaskDB: ITask[] = [];

/**
 * Returns all users from InMemoryDB
 * @returns returns array of users
 */
export const getAllUsers = (): IUser[] => UserDB.map((el) => el);

/**
 * Return user by id
 * @param id - user id
 * @returns returns the user with the corresponding id, or null, if the user is not found
 */
export const getUserById = (id: string): IUser | null => {
  const user = UserDB.filter((el) => el.id === id);
  if (user[0]) {
    return user[0];
  }
  return null;
};

/**
 * Creates a user record in inmemoryDB
 * @param user - a user object
 * @returns returns created user
 */
export const createUser = (user: IUser): IUser => {
  UserDB.push(user);
  return user;
};

/**
 * Update a user record in inmemoryDB
 * @param user - a user object for update
 * @param id - user id
 * @returns returns updated user with the corresponding id, or null, if the user is not found
 */
export const updateUser = (user: Partial<IUser>, id: string): IUser | null => {
  const res = UserDB.find((el) => {
    if (el.id === id) {
      el.login = user.login ? user.login : el.login;
      el.name = user.name ? user.name : el.name;
      el.password = user.password ? user.password : el.password;
      return true;
    }
    return false;
  });
  if (res) {
    return res;
  }
  return null;
};

/**
 * Delete a user record from inmemoryDB
 * @param id - user id
 * @returns returns deleted user with the corresponding id, or null, if the user is not found
 */
export const deleteUserById = (id: string): IUser | null => {
  const pos: number = UserDB.findIndex((el) => el.id === id);
  if (pos >= 0) {
    TaskDB.forEach((el) => {
      if (el.userId === id) {
        el.userId = null;
      }
    });
    return UserDB.splice(pos, 1)[0] || null;
  }
  return null;
};

/**
 * Returns all boards from InMemoryDB
 * @returns returns array of boards
 */
export const getAllBoards = (): IBoard[] => BoardDB.map((el) => ({ ...el }));

/**
 * Return board by id
 * @param id - board id
 * @returns returns the board with the corresponding id, or null, if the board is not found
 */
export const getBoardById = (id: string): IBoard | null => {
  return BoardDB.find((el) => el.id === id) || null;
};

/**
 * Creates a board record in inmemoryDB
 * @param board - a board object
 * @returns returns created board
 */
export const createBoard = (board: IBoard): IBoard => {
  BoardDB.push({ ...board });
  return { ...board };
};

/**
 * Update a board record in inmemoryDB
 * @param board - a board object for update
 * @param id - board id
 * @returns returns updated board with the corresponding id, or null, if the board is not found
 */
export const updateBoard = (
  board: Partial<IBoard>,
  id: string
): IBoard | null => {
  const res = BoardDB.find((el) => {
    if (el.id === id) {
      el.columns = board.columns ? board.columns : el.columns;
      el.title = board.title ? board.title : el.title;
      return true;
    }
    return false;
  });
  if (res) {
    return res;
  }
  return null;
};

/**
 * Delete a board record from inmemoryDB
 * @param id - board id
 * @returns returns deleted board with the corresponding id, or null, if the board is not found
 */
export const deleteBoardById = (id: string): IBoard | null => {
  const pos: number = BoardDB.findIndex((el) => el.id === id);
  if (pos >= 0) {
    if (TaskDB.length > 0) {
      let t;
      do {
        t = TaskDB.findIndex((el) => el.boardId === id);
        if (t >= 0) {
          TaskDB.splice(t, 1);
        }
      } while (t >= 0);
    }

    return BoardDB.splice(pos, 1)[0] || null;
  }
  return null;
};

/**
 * Return all tasks by board id
 * @param id - board id
 * @returns returns all tasks with the corresponding board id
 */
export const getTasksByBoardId = (id: string): ITask[] =>
  TaskDB.filter((el) => el.boardId === id).map((el) => ({ ...el }));

/**
 * Creates a task record in inmemoryDB
 * @param task - a task object
 * @returns returns created task
 */
export const createTask = (task: ITask): ITask => {
  TaskDB.push({ ...task });
  return { ...task };
};

/**
 * Return task by id
 * @param id - task id
 * @returns returns the task with the corresponding id, or null, if the task is not found
 */
export const getTaskById = (taskId: string): ITask | null => {
  const task = TaskDB.find((el) => el.id === taskId);
  if (task) {
    return { ...task };
  }
  return null;
};

/**
 * Update a task record in inmemoryDB
 * @param taskdata - a task object for update
 * @param taskId - task id
 * @returns returns updated task with the corresponding id, or null, if the task is not found
 */
export const updateTask = (
  taskdata: Partial<ITask>,
  _: string,
  taskId: string
): ITask | null => {
  const res = TaskDB.find((el) => {
    if (el.id === taskId) {
      el.boardId = taskdata.boardId ? taskdata.boardId : el.boardId;
      el.columnId = taskdata.columnId ? taskdata.columnId : el.columnId;
      el.description = taskdata.description
        ? taskdata.description
        : el.description;
      el.order = taskdata.order ? taskdata.order : el.order;
      el.title = taskdata.title ? taskdata.title : el.title;
      el.userId = taskdata.userId ? taskdata.userId : el.userId;
      return true;
    }
    return false;
  });
  if (res) {
    return res;
  }
  return null;
};

/**
 * Delete a task record from inmemoryDB
 * @param id - task id
 * @returns returns deleted task with the corresponding id, or null, if the task is not found
 */
export const deleteTaskById = (taskId: string): ITask | null => {
  const pos: number = TaskDB.findIndex((el) => el.id === taskId);
  if (pos >= 0) {
    return TaskDB.splice(pos, 1)[0] || null;
  }
  return null;
};
