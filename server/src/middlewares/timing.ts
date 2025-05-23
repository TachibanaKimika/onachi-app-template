import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const timing = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`[${req.method.toUpperCase()} ${req.url}] +${duration}ms`);
  });

  next();
};
