const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const create = (user) => usersRepo.create(user);

const update = (user, id) => usersRepo.update(user, id);

const deleteById = (id) => usersRepo.deleteById(id);

module.exports = { getAll, getById, create, update, deleteById };
