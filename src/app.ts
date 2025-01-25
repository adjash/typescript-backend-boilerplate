// src/app.ts
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import helloRoute from "./routes/helloRoute";
import errorHandler from "./middlewares/errorHandler";

const app: Application = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Routes
app.use("/", helloRoute);

// Error Handling Middleware
app.use(errorHandler);

export default app;
