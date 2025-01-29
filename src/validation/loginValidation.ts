// src/validation/loginValidation.ts

import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address.' }).optional(),
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long.' })
      .optional(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),
  })
  .refine((data) => data.email || data.username, {
    message: 'Either email or username is required for login.',
  });
