import express from 'express';
import { router as authRouter } from '../auth/auth';

const router = express.Router();

router.use('/auth', authRouter);

export { router };