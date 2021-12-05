const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  try {
    const board = await boardsService.getById(req.params.boardId);
    res.json(Board.toResponse(board));
  } catch (error) {
    res.status(404).send('Board not found');
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.status(201).json(Board.toResponse(board));
});

router.route('/:boardId').put(async (req, res) => {
  try {
    const board = await boardsService.update(
      new Board({
        title: req.body.title,
        columns: req.body.columns
      }),
      req.params.boardId
    );
    res.json(Board.toResponse(board));
  } catch (error) {
    res.status(404).send('Bad request');
  }
});

router.route('/:boardId').delete(async (req, res) => {
  try {
    await boardsService.deleteById(req.params.boardId);
    res.status(204).send('The board has been deleted');
  } catch (error) {
    res.status(404).send('Board not found');
  }
});

module.exports = router;