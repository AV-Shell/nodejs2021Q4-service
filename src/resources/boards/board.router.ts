import express from 'express';
import { Board } from '../../entity/Board';
import { responseCode } from '../../common/statusCodes';
import * as boardsService from './board.service';

const { OK, CREATED, NO_CONTENT } = responseCode;

const router = express.Router();

router.route('/').get(async (_, res, next) => {
  try {
    const boards = await boardsService.getAll();
    res.status(OK).json(boards.map(Board.toResponse));
  } catch (error) {
    next(error);
  }
});

router.route('/:boardId').get(async (req, res, next) => {
  try {
    const board = await boardsService.getById(req.params.boardId);
    res.status(OK).json(Board.toResponse(board));
  } catch (error) {
    next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardsService.create(
      new Board({
        title: req.body.title,
        columns: req.body.columns,
      })
    );
    res.status(CREATED).json(Board.toResponse(board));
  } catch (error) {
    next(error);
  }
});

router.route('/:boardId').put(async (req, res, next) => {
  try {
    const board = await boardsService.update(
      new Board({
        title: req.body.title,
        columns: req.body.columns,
      }),
      req.params.boardId
    );
    res.status(OK).json(Board.toResponse(board));
  } catch (error) {
    next(error);
  }
});

router.route('/:boardId').delete(async (req, res, next) => {
  try {
    await boardsService.deleteById(req.params.boardId);
    res.status(NO_CONTENT).send('The board has been deleted');
  } catch (error) {
    next(error);
  }
});

export default router;
