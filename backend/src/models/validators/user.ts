import { z } from 'zod';

// Define the User schema using Zod
export const UserSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),

  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 characters long' }),

  email: z.string().email({ message: 'Invalid email address' }),

  role: z.enum(['user', 'admin']).default('user'),
});

// Schema for user login
export const UserLoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
});
