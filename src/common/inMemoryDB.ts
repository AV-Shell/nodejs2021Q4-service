import User from '../resources/users/user.model';
import Board from '../resources/boards/board.model';
import { IUser, IBoard, ITask } from '../types/interfaces';

const UserDB: IUser[] = [];

const BoardDB: IBoard[] = [];

const TaskDB: ITask[] = [];

UserDB.push(new User(), new User(), new User());

BoardDB.push(new Board(), new Board());

export const getAllUsers = (): IUser[] => UserDB.map((el) => el);

export const getUserById = (id: string): IUser | null => {
  const user = UserDB.filter((el) => el.id === id);
  if (user[0]) {
    return user[0];
  }
  return null;
};

export const createUser = (user: IUser): IUser => {
  UserDB.push(user);
  return user;
};

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

export const getAllBoards = (): IBoard[] => BoardDB.map((el) => ({ ...el }));

export const getBoardById = (id: string): IBoard | null => {
  return BoardDB.find((el) => el.id === id) || null;
};

export const createBoard = (board: IBoard): IBoard => {
  BoardDB.push({ ...board });
  return { ...board };
};

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

export const getTasksByBoardId = (id: string): ITask[] =>
  TaskDB.filter((el) => el.boardId === id).map((el) => ({ ...el }));

export const createTask = (task: ITask): ITask => {
  TaskDB.push({ ...task });
  return { ...task };
};

export const getTaskById = (_: string, taskId: string): ITask | null => {
  const task = TaskDB.find((el) => el.id === taskId);
  if (task) {
    return { ...task };
  }
  return null;
};

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

export const deleteTaskById = (_: string, taskId: string): ITask | null => {
  const pos: number = TaskDB.findIndex((el) => el.id === taskId);
  if (pos >= 0) {
    return TaskDB.splice(pos, 1)[0] || null;
  }
  return null;
};
