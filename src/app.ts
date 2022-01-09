import express from 'express';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
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

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

export default app;
