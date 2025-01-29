// src/routes/profileRoute.ts

import { Router } from 'express';
import { profileController } from '../controllers/profileController';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const router: Router = Router();

// Protected Profile Route
router.get('/profile', authenticateJWT, profileController);

export default router;
