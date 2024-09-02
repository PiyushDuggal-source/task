import express from 'express';
import { isAuth } from '../auth/controller';
import { getUserSettings, updateUserSettings } from './controller';

export const userRouter = express.Router();

userRouter.get(`/settings`, isAuth, getUserSettings);
userRouter.put(`/settings`, isAuth, updateUserSettings);
