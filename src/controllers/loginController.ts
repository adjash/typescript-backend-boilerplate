// src/controllers/loginController.ts

import { RequestHandler } from 'express';
import prisma from '../prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Prisma } from '@prisma/client';
import { UserResponse } from '../types/auth';

dotenv.config();

export const loginController: RequestHandler = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // **1. User Retrieval**
    const user = await prisma.user.findFirst({
      where: email ? { email } : { username },
    });

    if (!user) {
      res.status(401).json({
        error: 'Invalid credentials.',
      });
      return;
    }

    // **2. Password Verification**
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        error: 'Invalid credentials.',
      });
      return;
    }

    // **3. JWT Token Generation**
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' } // Token validity
    );

    // **4. Response Handling**
    const userResponse: UserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // res.status(200).json({
    //   user: userResponse,
    //   token,
    //   message: 'Login successful.',
    // });
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        sameSite: 'strict', // or 'lax' based on your needs
        maxAge: 60 * 60 * 1000, // 1 hour (in milliseconds)
      })
      .status(200)
      .json({ user, message: 'Login successful.' });
    return; // Optional: Explicitly end the function
  } catch (error: any) {
    console.error('Login Error:', error);

    // Handle specific Prisma errors if necessary
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Add Prisma-specific error handling if needed
    }

    res.status(500).json({
      error: 'Internal Server Error.',
    });
  }
};
