import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import User from '../../models/user.model';
import { UserSchema, UserLoginSchema } from '../../models/validators/user';

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body against our schema
    const validatedData = UserSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: validatedData.email },
        { username: validatedData.username },
      ],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email or username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    // Create a new user
    const newUser = new User({
      ...validatedData,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validatedData = UserLoginSchema.parse(req.body);

    // Find the user
    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Set user session
    req.session.userId = (user._id as string).toString();

    // Send success response
    res.json({
      message: 'Logged in successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};
