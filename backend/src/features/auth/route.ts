import express from 'express';
import { loginUser, registerUser } from './controller';

export const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
