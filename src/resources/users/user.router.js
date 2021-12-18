const Router = require('../../OrientExpress/Router');
const User = require('./user.model');
const usersService = require('./user.service');
const {
  responseCode: { OK, CREATED, NO_CONTENT },
} = require('../../common/statusCodes');

const userRouter = new Router();

userRouter.get('/users', async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse), OK);
});

userRouter.get('/users/:id', async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.json(User.toResponse(user), OK);
});

userRouter.post('/users', async (req, res) => {
  const user = await usersService.create(
    new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password,
    })
  );
  res.json(User.toResponse(user), CREATED);
});

userRouter.put('/users/:id', async (req, res) => {
  const user = await usersService.update(
    new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password,
    }),
    req.params.id
  );
  res.json(User.toResponse(user), OK);
});

userRouter.delete('/users/:id', async (req, res) => {
  await usersService.deleteById(req.params.id);
  res.status(NO_CONTENT).end();
});

module.exports = userRouter;
