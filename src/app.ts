// src/app.ts

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import helloRoute from './routes/helloRoute';
import errorHandler from './middlewares/errorHandler';
import authRoute from './routes/authRoute';
import profileRoute from './routes/profileRoute'; // Import the profile route

import cookieParser from 'cookie-parser'; // Import cookie-parser

const app: Application = express();
//cors
app.use(
  cors({
    origin: 'http://localhost:5173', // your client’s URL
    credentials: true, // Allow cookies (credentials) to be sent
  })
);

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser()); // Use cookie-parser here

// Routes
app.use('/', helloRoute);
app.use('/auth', authRoute);
app.use('/', profileRoute); // Mount the profile route

// Error Handling Middleware (should be last)
app.use(errorHandler);

export default app;
