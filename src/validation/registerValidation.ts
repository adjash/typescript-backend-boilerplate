// src/validation/registerValidation.ts

import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address.' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' }),
});
