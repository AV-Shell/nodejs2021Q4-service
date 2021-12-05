const {
  errorHandler,
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
} = require('./common/errorHandler');
const OrientExpress = require('./OrientExpress/OrientExpress');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

const app = new OrientExpress();
app.setErrorHandler(errorHandler);

app.use(OrientExpress.bodyParser);

app.use(userRouter.middleware);
app.use(boardRouter.middleware);
app.use(taskRouter.middleware);

module.exports = app;
