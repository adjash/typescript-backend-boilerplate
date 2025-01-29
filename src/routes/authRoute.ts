// src/routes/authRoute.ts

import { Router } from 'express';
import { registerController } from '../controllers/registerController';
import { loginController } from '../controllers/loginController';
import { registerSchema } from '../validation/registerValidation';
import { loginSchema } from '../validation/loginValidation';
import { validate } from '../middlewares/validate';
import { authRateLimiter } from '../middlewares/ratelimiter';

const router: Router = Router();

// Register Route with Rate Limiting and Validation Middleware
router.post(
  '/register',
  authRateLimiter,
  validate(registerSchema),
  registerController
);

// Login Route with Rate Limiting and Validation Middleware
router.post('/login', authRateLimiter, validate(loginSchema), loginController);

// Placeholder for other auth routes
// router.post('/logout', authRateLimiter, logoutController);
// router.post('/forgot-password', authRateLimiter, forgotPasswordController);

export default router;
