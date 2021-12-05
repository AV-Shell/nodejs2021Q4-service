const Task = require('./task.model');
const tasksService = require('./task.service');
const Router = require('../../OrientExpress/Router');
const {
  responseCode: { OK, CREATED, NO_CONTENT },
} = require('../../common/statusCodes');

const taskdRouter = new Router();

taskdRouter.get('/boards/:boardId/tasks', async (req, res) => {
  const tasks = await tasksService.getAllByBoardId(req.params.boardId);
  res.json(tasks.map(Task.toResponse), OK);
});

taskdRouter.post('/boards/:boardId/tasks', async (req, res) => {
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
  res.json(Task.toResponse(task), CREATED);
});

taskdRouter.get('/boards/:boardId/tasks/:taskId', async (req, res) => {
  const task = await tasksService.getById(
    req.params.boardId,
    req.params.taskId
  );
  res.json(Task.toResponse(task), OK);
});

taskdRouter.put('/boards/:boardId/tasks/:taskId', async (req, res) => {
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
    req.params.taskId
  );
  res.json(Task.toResponse(task), OK);
});

taskdRouter.delete('/boards/:boardId/tasks/:taskId', async (req, res) => {
  await tasksService.deleteById(req.params.boardId, req.params.taskId);
  res.status(NO_CONTENT).end();
});

module.exports = taskdRouter;
