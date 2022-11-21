import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

export class Err extends Error {
  statusCode: number;
  message:string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errMiddleware = (error: Err, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.statusCode || 500).json({ message: error.message });
};

export default errMiddleware;
