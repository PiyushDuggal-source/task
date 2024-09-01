import { z } from 'zod';

// Define the User schema using Zod
export const UserSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),

  email: z.string().email({ message: 'Invalid email address' }),

  role: z.enum(['user', 'admin']).default('user'),
});

// Schema for user login
export const UserLoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
});
