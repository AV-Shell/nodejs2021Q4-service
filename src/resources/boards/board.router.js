const Board = require('./board.model');
const boardsService = require('./board.service');
const Router = require('../../OrientExpress/Router');
const {
  responseCode: { OK, CREATED, NO_CONTENT },
} = require('../../common/statusCodes');

const boardRouter = new Router();

boardRouter.get('/boards', async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse), OK);
});

boardRouter.get('/boards/:boardId', async (req, res) => {
  const board = await boardsService.getById(req.params.boardId);
  res.json(Board.toResponse(board), OK);
});

boardRouter.post('/boards', async (req, res) => {
  const board = await boardsService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns,
    })
  );
  res.json(Board.toResponse(board), CREATED);
});

boardRouter.put('/boards/:boardId', async (req, res) => {
  const board = await boardsService.update(
    new Board({
      title: req.body.title,
      columns: req.body.columns,
    }),
    req.params.boardId
  );
  res.json(Board.toResponse(board), OK);
});

boardRouter.delete('/boards/:boardId', async (req, res) => {
  await boardsService.deleteById(req.params.boardId);
  res.status(NO_CONTENT).end();
});

module.exports = boardRouter;
