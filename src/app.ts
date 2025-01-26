// src/app.ts

import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import helloRoute from './routes/helloRoute';
import errorHandler from './middlewares/errorHandler';
import authRoute from './routes/authRoute';

const app: Application = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes
app.use('/', helloRoute);
app.use('/auth', authRoute);

// Error Handling Middleware (should be last)
app.use(errorHandler);

export default app;
