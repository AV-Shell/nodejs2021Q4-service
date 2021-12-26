import express from 'express';
import User from './user.model';
import * as usersService from './user.service';
import { responseCode } from '../../common/statusCodes';

const { OK, CREATED, NO_CONTENT } = responseCode;

const router = express.Router();

router.route('/').get(async (_, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(OK).json(users.map(User.toResponse));
  } catch (error) {
    next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.status(OK).json(User.toResponse(user));
  } catch (error) {
    next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.create(
      new User({
        name: req.body.name,
        login: req.body.login,
        password: req.body.password,
      })
    );
    res.status(CREATED).json(User.toResponse(user));
  } catch (error) {
    next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.update(
      new User({
        name: req.body.name,
        login: req.body.login,
        password: req.body.password,
      }),
      req.params.id
    );
    res.status(OK).json(User.toResponse(user));
  } catch (error) {
    next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await usersService.deleteById(req.params.id);
    res.status(NO_CONTENT).send('The user has been deleted');
  } catch (error) {
    next(error);
  }
});

export default router;
