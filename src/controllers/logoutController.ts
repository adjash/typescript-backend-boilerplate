// src/controllers/logoutController.ts

import { Request, Response, NextFunction } from 'express';

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Clear the token cookie by setting it to empty and expiring it immediately.
    res
      .cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'strict', // Adjust as needed (or 'lax')
        expires: new Date(0),
      })
      .status(200)
      .json({ message: 'Logout successful.' });
  } catch (error: any) {
    console.error('Logout Error:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
};
