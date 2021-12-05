const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const UserDB = [];

const BoardDB = [];

const TaskDB = [];

UserDB.push(new User(), new User(), new User());

BoardDB.push(new Board(), new Board());

const getAllUsers = () => UserDB.map((el) => ({ ...el }));

const getUserById = (id) => {
  const user = UserDB.filter((el) => el.id === id);
  if (user.length === 1) {
    return { ...user[0] };
  }
  return null;
};

const createUser = (user) => {
  UserDB.push({ ...user });
  return getUserById(user.id);
};

const updateUser = (user, id) => {
  let pos = null;
  for (let i = 0; i < UserDB.length; i += 1) {
    if (UserDB[i].id === id) {
      pos = i;
      break;
    }
  }
  if (pos !== null) {
    UserDB[pos] = { ...UserDB[pos], ...user, id };
    return { ...UserDB[pos] };
  }
  return null;
};

const deleteUserById = (id) => {
  let pos = null;
  for (let i = 0; i < UserDB.length; i += 1) {
    if (UserDB[i].id === id) {
      pos = i;
      break;
    }
  }
  if (pos !== null) {
    for (let i = 0; i < TaskDB.length; i += 1) {
      if (TaskDB[i].userId === id) {
        TaskDB[i].userId = null;
      }
    }

    return UserDB.splice(pos, 1);
  }
  return null;
};

const getAllBoards = () => BoardDB.map((el) => ({ ...el }));

const getBoardById = (id) => {
  const arr = BoardDB.filter((el) => el.id === id);
  if (arr.length === 1) {
    return { ...BoardDB.filter((el) => el.id === id)[0] };
  }
  return null;
};

const createBoard = (board) => {
  BoardDB.push({ ...board });
  return getBoardById(board.id);
};

const updateBoard = (board, id) => {
  let pos = null;
  for (let i = 0; i < BoardDB.length; i += 1) {
    if (BoardDB[i].id === id) {
      pos = i;
      break;
    }
  }
  if (pos !== null) {
    BoardDB[pos] = { ...BoardDB[pos], ...board, id };
    return { ...BoardDB[pos] };
  }
  return null;
};

const deleteBoardById = (id) => {
  let pos = null;
  for (let i = 0; i < BoardDB.length; i += 1) {
    if (BoardDB[i].id === id) {
      pos = i;
      break;
    }
  }
  if (pos !== null) {
    let i = 0;
    if (TaskDB.length > 0) {
      do {
        if (TaskDB[i].boardId === id) {
          TaskDB.splice(i, 1);
          i -= 1;
        }
        i += 1;
      } while (i < TaskDB.length);
    }
    BoardDB.splice(pos, 1);
    return true;
  }
  return null;
};

const getTasksByBoardId = (id) =>
  TaskDB.filter((el) => el.boardId === id).map((el) => ({ ...el }));

const createTask = (task) => {
  TaskDB.push({ ...task });
  return task;
};

const getTaskById = (boardId, taskId) => {
  const taska = TaskDB.filter((el) => el.id === taskId);
  if (taska.length === 1) {
    return { ...taska[0] };
  }
  return null;
};

const updateTask = (taskdata, boardId, taskId) => {
  let pos = null;
  for (let i = 0; i < TaskDB.length; i += 1) {
    if (TaskDB[i].id === taskId) {
      pos = i;
      break;
    }
  }
  if (pos !== null) {
    TaskDB[pos] = { ...TaskDB[pos], ...taskdata, id: taskId };
    return { ...TaskDB[pos] };
  }
  return null;
};

const deleteTaskById = (boardId, taskId) => {
  let pos = null;
  for (let i = 0; i < TaskDB.length; i += 1) {
    if (TaskDB[i].id === taskId) {
      pos = i;
      break;
    }
  }
  if (pos !== null) {
    return TaskDB.splice(pos, 1);
  }
  return null;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,

  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoardById,

  getTasksByBoardId,
  createTask,
  getTaskById,
  updateTask,
  deleteTaskById,
};
