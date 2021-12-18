import express from 'express';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import {
  errorHandler,
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
} from './common/errorHandler';

process.on('uncaughtException', uncaughtExceptionHandler);

process.on('unhandledRejection', unhandledRejectionHandler);

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);
// app.use(
//   (
//     err: Error,
//     _: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     console.error(err.stack);
//     res.status(500).send('Something wrong!');
//     next();
//   }
// );

export default app;
