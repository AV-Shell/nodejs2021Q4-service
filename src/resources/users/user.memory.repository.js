const DB = require('../../common/inMemoryDB');

const getAll = async () => DB.getAllUsers();

const getById = async id => {
  const user = await DB.getUserById(id);
  if (!user) {
    throw new Error(`The user with id ${id} was not found`);
  }
  return user;
};

const create = async user => DB.createUser(user);

const update = async (userData, id) => {
  const user = await DB.updateUser(userData, id);
  if (!user) {
    throw new Error(`The user with id ${id} was not found`);
  }
  return user;
};

const deleteById = async id => {
  const user = await DB.deleteUserById(id);
  if (!user) {
    throw new Error(`The user with id ${id} was not found`);
  }
  return user;
};

module.exports = { getAll, getById, create, update, deleteById };