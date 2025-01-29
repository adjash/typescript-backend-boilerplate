// src/types/auth.ts

import { Prisma } from '@prisma/client';
import { Request } from 'express';

// DTO for creating a new user (input)
export type CreateUserDTO = Prisma.UserCreateInput;

// DTO for user registration and login response (excluding password)
export type UserResponse = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    username: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

// Extending Express Request to include user data
export interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}
