// src/routes/authRoute.ts

import { Router } from 'express';
import { registerController } from '../controllers/registerController';
import { loginController } from '../controllers/loginController';
import { logoutController } from '../controllers/logoutController';
import { registerSchema } from '../validation/registerValidation';
import { loginSchema } from '../validation/loginValidation';
import { validate } from '../middlewares/validate';
import { authRateLimiter } from '../middlewares/ratelimiter';

const router: Router = Router();

router.post(
  '/register',
  authRateLimiter,
  validate(registerSchema),
  registerController
);

router.post('/login', authRateLimiter, validate(loginSchema), loginController);

router.post('/logout', authRateLimiter, logoutController);
// Placeholder for other auth routes
// router.post('/forgot-password', authRateLimiter, forgotPasswordController);

export default router;
