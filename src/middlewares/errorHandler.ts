// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';

/**
 * Global error handling middleware.
 */
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Unhandled Error:', err);

  res.status(500).json({
    error: 'Something went wrong!',
  });
};

export default errorHandler;
