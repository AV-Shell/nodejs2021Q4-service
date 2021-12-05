const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  } catch (error) {
    res.status(404).send('User not found');
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(
    new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    })
  );
  res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(
      new User({
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
      }),
      req.params.id
    );
    res.json(User.toResponse(user));
  } catch (error) {
    res.status(404).send('User not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.deleteById(req.params.id);
    res.status(204).send('The user has been deleted');
  } catch (error) {
    res.status(404).send('User not found');
  }
});

module.exports = router;