import express from 'express';
import { Task } from '../../entity/Task';
import * as tasksService from './task.service';
import { responseCode } from '../../common/statusCodes';

const { OK, CREATED, NO_CONTENT } = responseCode;

interface IRequestExt extends express.Request {
  params: {
    boardId: string;
  };
}

interface IRequestExt2 extends express.Request {
  params: {
    boardId: string;
    id: string;
  };
}

const router = express.Router({ mergeParams: true });

router.route('/').get(async (req: IRequestExt, res, next) => {
  try {
    const tasks = await tasksService.getAllByBoardId(req.params.boardId);
    res.status(OK).json(tasks.map(Task.toResponse));
  } catch (error) {
    next(error);
  }
});

router.route('/').post(async (req: IRequestExt, res, next) => {
  try {
    const task = await tasksService.create(
      new Task({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params.boardId,
        columnId: req.body.columnId,
      })
    );
    res.status(CREATED).json(Task.toResponse(task));
  } catch (error) {
    next(error);
  }
});

router.route('/:id').get(async (req: IRequestExt2, res, next) => {
  try {
    const task = await tasksService.getById(req.params.boardId, req.params.id);
    res.status(OK).json(Task.toResponse(task));
  } catch (error) {
    next(error);
  }
});

router.route('/:id').put(async (req: IRequestExt2, res, next) => {
  try {
    const task = await tasksService.update(
      new Task({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params.boardId,
        columnId: req.body.columnId,
      }),
      req.params.boardId,
      req.params.id
    );
    res.status(OK).json(Task.toResponse(task));
  } catch (error) {
    next(error);
  }
});

router.route('/:id').delete(async (req: IRequestExt2, res, next) => {
  try {
    await tasksService.deleteById(req.params.boardId, req.params.id);
    res.status(NO_CONTENT).send('The task has been deleted');
  } catch (error) {
    next(error);
  }
});

export default router;
