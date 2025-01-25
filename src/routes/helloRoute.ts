// src/routes/helloRoute.ts
import { Router, Request, Response } from 'express';
import { helloController } from '../controllers/helloController';

const router: Router = Router();

router.get('/', helloController);

export default router;
