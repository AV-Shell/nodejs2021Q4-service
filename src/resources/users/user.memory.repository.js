const { MyCustomError } = require('../../common/myCustomError');
const DB = require('../../common/inMemoryDB');
const {
  responseCode: { NOT_FOUND },
} = require('../../common/statusCodes');

const getAll = async () => DB.getAllUsers();

const getById = async (id) => {
  const user = await DB.getUserById(id);
  if (!user) {
    throw new MyCustomError(`The user with id ${id} was not found`, NOT_FOUND);
  }
  return user;
};

const create = async (user) => DB.createUser(user);

const update = async (userData, id) => {
  const user = await DB.updateUser(userData, id);
  if (!user) {
    throw new MyCustomError(`The user with id ${id} was not found`, NOT_FOUND);
  }
  return user;
};

const deleteById = async (id) => {
  const user = await DB.deleteUserById(id);
  if (!user) {
    throw new MyCustomError(`The user with id ${id} was not found`, NOT_FOUND);
  }
  return user;
};

module.exports = { getAll, getById, create, update, deleteById };
