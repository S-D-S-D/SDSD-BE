import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();// 사실 뭔지 잘 모르겠음 env파일을 불러온다함
const router = express.Router();


router.get('/login/kakao', (req, res) => {
  const redirectUri = `${process.env.HOST}/auth/login/kakao/callback`;
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${redirectUri}&response_type=code&scope=profile_nickname,gender`;
  // 마지막에 scope로 추가 동의 항목을 추가
  res.redirect(kakaoAuthUrl);// kakaoAuthUrl로 redirect하기
});
//
router.get('/login/kakao/callback', async (req, res) => {
  let token: any;
  try {
    const { code } = req.query; // 인증 후 redirect되면 query로 임시 인증코드 포함
    const tokenUrl = 'https://kauth.kakao.com/oauth/token';
    const params: any = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', process.env.REST_API_KEY);
    params.append('redirect_uri', `${process.env.HOST}/auth/login/kakao/callback`);
    params.append('code', code as string);
    // params.append('client_secret', "보안강화를 위한 추가 확인 코드")

    token = await axios({
      method: "POST",
      url: tokenUrl,
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: params
    });

  } catch (error) {
    console.error('Error occurred while obtaining access token:', error);
    res.status(500).send('Internal Server Error');
    return;
  }

  let userInfo: any;
  try {
    userInfo = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${token.access_token}`,// post 요청으로 사용자 access token 값을 받음
      },
    });

    //console.log(userInfo.data);
    //다른 정보도 추가로 가져올 수 있음
    const { id, properties } = userInfo.data;
    const nickname = properties.nickname;

    res.send(`Hello, ${nickname}!`);
  } catch (error) {
    console.error('Error occurred while fetching user information:', error);
    res.status(500).send('Internal Server Error');
  }
});


export { router };
