// src/app.ts

import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import helloRoute from './routes/helloRoute';
import errorHandler from './middlewares/errorHandler';
import authRoute from './routes/authRoute';
import profileRoute from './routes/profileRoute'; // Import the profile route

const app: Application = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes
app.use('/', helloRoute);
app.use('/auth', authRoute);
app.use('/', profileRoute); // Mount the profile route

// Error Handling Middleware (should be last)
app.use(errorHandler);

export default app;
