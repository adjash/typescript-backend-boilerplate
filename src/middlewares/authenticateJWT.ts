// src/middleware/authenticateJWT.ts

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import redis from '../redis'; // if using token blacklisting; otherwise, ignore this
import { AuthenticatedRequest } from '../types/auth';
// import logger from '../logger'; // if using logging

dotenv.config();

export const authenticateJWT = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Try to get token from the Authorization header first
  let token = req.headers.authorization?.split(' ')[1];
  console.log('authenticateJWT');
  // If no token found there, try to get it from cookies
  if (!token) {
    token = req.cookies?.token;
  }

  if (!token) {
    res.status(401).json({ error: 'Authorization token missing.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    req.user = { userId: decoded.userId };
    next();
  } catch (err: any) {
    console.error('Authentication Error:', err);
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};
