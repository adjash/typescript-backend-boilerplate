// src/controllers/profileController.ts

import { Response, NextFunction } from 'express';
import prisma from '../prisma';
import { AuthenticatedRequest } from '../types/auth';
import { UserResponse } from '../types/auth';

/**
 * Controller to handle fetching the authenticated user's profile.
 */
export const profileController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(400).json({ error: 'User ID not found in request.' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    res.status(200).json({ user });
    return; // Optional: Explicitly end the function
  } catch (error: any) {
    console.error('Profile Retrieval Error:', error);

    res.status(500).json({ error: 'Internal Server Error.' });
  }
};
