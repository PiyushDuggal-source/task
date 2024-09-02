import express, { Request, Response } from 'express';
import { isAuth, loginUser, logoutUser, registerUser } from './controller';
import { authorize } from '~/utils/authorize';

export const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.get(
  '/me',
  isAuth,
  //   authorize(['admin']),
  (req: Request, res: Response) => {
    res.json({ user: req.user });
  }
);
