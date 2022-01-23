import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from './config';

const { JWT_SECRET_KEY, PATH_WHITELIST } = config;

export const checkTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (PATH_WHITELIST.includes(req.path)) {
    return next();
  }
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token || !JWT_SECRET_KEY) {
      res.status(401).send("Who you are? I didn't call you! Go fuck");
      return undefined;
    }
    try {
      jwt.verify(token, JWT_SECRET_KEY);
      return next();
    } catch (e) {
      res.status(401).send("Who you are? I didn't call you! Go fuck");
      return undefined;
    }
  }
  res.status(401).send("Who you are? I didn't call you! Go fuck");
  return undefined;
};
