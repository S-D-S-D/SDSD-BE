import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();// ��� ���� �� �𸣰��� env������ �ҷ��´���
const router = express.Router();


router.get('/login/kakao', (req, res) => {
  const redirectUri = `${process.env.HOST}/auth/login/kakao/callback`;
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${redirectUri}&response_type=code&scope=profile_nickname,gender`;
  // �������� scope�� �߰� ���� �׸��� �߰�
  res.redirect(kakaoAuthUrl);// kakaoAuthUrl�� redirect�ϱ�
});
//
router.get('/login/kakao/callback', async (req, res) => {
  let token: any;
  try {
    const { code } = req.query; // ���� �� redirect�Ǹ� query�� �ӽ� �����ڵ� ����
    const tokenUrl = 'https://kauth.kakao.com/oauth/token';
    const params: any = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', process.env.REST_API_KEY);
    params.append('redirect_uri', `${process.env.HOST}/auth/login/kakao/callback`);
    params.append('code', code as string);
    // params.append('client_secret', "���Ȱ�ȭ�� ���� �߰� Ȯ�� �ڵ�")

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
        Authorization: `Bearer ${token.access_token}`,// post ��û���� ����� access token ���� ����
      },
    });

    //console.log(userInfo.data);
    //�ٸ� ������ �߰��� ������ �� ����
    const { id, properties } = userInfo.data;
    const nickname = properties.nickname;

    res.send(`Hello, ${nickname}!`);
  } catch (error) {
    console.error('Error occurred while fetching user information:', error);
    res.status(500).send('Internal Server Error');
  }
});


export { router };
