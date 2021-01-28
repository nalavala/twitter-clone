import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

// Global was to handle routes and call next() if there is any exception
// This avoids adding try/catch in all handlers
export default (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  execution(req, res, next).catch(next);
};