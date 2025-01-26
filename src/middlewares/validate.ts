// src/middleware/validate.ts

import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * Middleware to validate request bodies against a Zod schema.
 * @param schema - Zod schema to validate against.
 * @returns Express middleware function.
 */
export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({
        error: error.errors.map((err: any) => err.message).join(', '),
      });
    }
  };
