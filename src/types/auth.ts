// src/types/auth.ts

import { Prisma } from '@prisma/client';

// DTO for creating a new user (input)
export type CreateUserDTO = Prisma.UserCreateInput;

// DTO for user registration response (excluding password)
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
