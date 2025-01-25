// src/controllers/helloController.ts
import { Request, Response, NextFunction } from "express";

export const helloController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ message: "Hello World" });
  } catch (error) {
    next(error);
  }
};
