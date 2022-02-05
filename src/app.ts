import 'reflect-metadata';
import express from 'express';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { router as loginRouter } from './resources/login/login.router';
import { checkTokenMiddleware } from './common/checkToken';
import { myLoggerReq } from './common/logHandler';
import {
  errorHandler,
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
} from './common/errorHandler';

process.on('uncaughtException', uncaughtExceptionHandler);

process.on('unhandledRejection', unhandledRejectionHandler);

const app = express();

app.use(express.json());

app.use(myLoggerReq);

console.log('task10');

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/doc', (req, res, next) => {
  if (req.originalUrl === '/doc') {
    res.send('Doc is depricated. Route for crosscheck');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use(checkTokenMiddleware);

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

export default app;
