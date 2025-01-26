// src/routes/authRoute.ts

import { Router } from 'express';
import { registerController } from '../controllers/registerController';
import { registerSchema } from '../validation/registerValidation';
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

// Placeholder for other auth routes
// router.post('/login', authRateLimiter, validate(loginSchema), loginController);
// router.post('/logout', authRateLimiter, logoutController);
// router.post('/forgot-password', authRateLimiter, forgotPasswordController);

export default router;
