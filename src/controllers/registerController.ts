// src/controllers/registerController.ts

import { RequestHandler } from 'express';
import prisma from '../prisma';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { CreateUserDTO, UserResponse } from '../types/auth';

// Define the controller with the RequestHandler type
export const registerController: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, username, password } = req.body;

    // **1. Input Validation**
    if (!email || !password || !username) {
      res.status(400).json({
        error: 'Email, username, and password are required.',
      });
      return;
    }

    // **2. Uniqueness Checks**
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      res.status(409).json({
        error: 'Email or username already in use.',
      });
      return;
    }

    // **3. Password Hashing**
    const saltRounds = 10; // Adjust based on your security requirements
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // **4. User Creation**
    const newUser: CreateUserDTO = {
      name,
      email,
      username,
      password: hashedPassword,
    };

    const createdUser: UserResponse = await prisma.user.create({
      data: newUser,
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // **5. Response Handling**
    res.status(201).json({
      user: createdUser,
      message: 'User registered successfully.',
    });
  } catch (error: any) {
    console.error('Registration Error:', error);

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint failed
      if (error.code === 'P2002') {
        res.status(409).json({
          error: 'Email or username already in use.',
        });
        return;
      }
    }

    res.status(500).json({
      error: 'Internal Server Error.',
    });
  }
};
