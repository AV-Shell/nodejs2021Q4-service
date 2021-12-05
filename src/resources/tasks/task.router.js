const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAllByBoardId(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (error) {
    res.status(404).send('Board not found');
  }
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(
    new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId
    })
  );
  res.status(201).json(Task.toResponse(task));
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.getById(
      req.params.boardId,
      req.params.taskId
    );
    res.json(Task.toResponse(task));
  } catch (error) {
    res.status(404).send('Board not found');
  }
});

router.route('/:taskId').put(async (req, res) => {
  try {
    const task = await tasksService.update(
      new Task({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params.boardId,
        columnId: req.body.columnId
      }),
      req.params.boardId,
      req.params.taskId
    );
    res.json(Task.toResponse(task));
  } catch (error) {
    res.status(404).send('Task not found');
  }
});

router.route('/:taskId').delete(async (req, res) => {
  try {
    await tasksService.deleteById(req.params.boardId, req.params.taskId);
    res.status(204).send('The task has been deleted');
  } catch (error) {
    res.status(404).send('Board not found');
  }
});

module.exports = router;