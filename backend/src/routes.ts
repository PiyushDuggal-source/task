import express from 'express';
import { pingServerRouter, authRouter } from '~/features';

export const router = express.Router();

router.use('/ping', pingServerRouter);
router.use('/auth', authRouter);
