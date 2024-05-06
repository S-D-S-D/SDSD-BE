// src/routes/auth.ts
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/kakao', (req, res) => {
  const redirectUri = `${process.env.HOST}/auth/kakao/callback`;
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${redirectUri}&response_type=code&scope=profile_nickname,gender,account_email`;
  
  res.redirect(kakaoAuthUrl);
});

router.get('/kakao/callback', async (req, res) => {
  let token: any;
  try {
    const { code } = req.query; // 인증 후 redirect되면 query로 임시 인증코드 포함
    if (!code) {
      console.error('인증 코드 누락');
      return res.redirect('/');
    }

    const tokenUrl = 'https://kauth.kakao.com/oauth/token';
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', process.env.REST_API_KEY || '');
    params.append('redirect_uri', `${process.env.HOST}/auth/kakao/callback`);
    params.append('code', code as string);

    const tokenResponse = await axios.post(tokenUrl, params.toString(), {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      },
    });

    token = tokenResponse.data;
    if (!token.access_token) {
      console.error("액세스 토큰 누락");
      return res.redirect('/');
    }

  } catch (error) {
    console.error('토큰 수집 중 오류 발생:', error);
    return res.status(500).send('Internal Server Error');
  }
});

export { router };
