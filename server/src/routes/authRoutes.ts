import express from 'express';
import { kakaoAuth, kakaoAuthCallback } from '../controllers/authController';

const router = express.Router();

router.get('/kakao', kakaoAuth);
router.get('/kakao/callback', kakaoAuthCallback);

export default router;
