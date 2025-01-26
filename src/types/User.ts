// src/types/User.ts

// Full User type as retrieved from the database
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Type for creating a new user (no ID or timestamps)
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

// Type for updating a user (all fields optional except ID)
export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
}
