import express, { Request, Response, NextFunction } from 'express';
import * as loginService from './login.service';

export const router = express.Router();

router
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { login, password } = req.body;
      const token = await loginService.getToken({ login, password });
      if (token) {
        res.status(200).send({ token });
      } else {
        res.status(403).send('Something wrong with login/password');
      }
    } catch (err) {
      next(err);
    }
  });
