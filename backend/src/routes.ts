import express from 'express';
import { pingServerRouter, authRouter, userRouter } from '~/features';

export const router = express.Router();

router.use('/ping', pingServerRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
