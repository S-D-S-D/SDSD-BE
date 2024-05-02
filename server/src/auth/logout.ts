import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();// ��� ���� �� �𸣰��� env������ �ҷ��´���
const router = express.Router();

router.get('/logout/kakao/', async (req, res) => {
    let logout: any;
    try {
        const params: any = new URLSearchParams();
        params.append('client_id', process.env.REST_API_KEY),
        params.append('logout_redirect_uri', process.env.host),// �ӽ÷� logoutRedirectURL���
        logout = await axios({
            method: "GET",
            url: "https://kauth.kakao.com/oauth/logout",
            data: params
        });
  
    } catch (error) {
      console.error('Error occurred while obtaining access token:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    //unlink�Ҷ� router�� ���� ������ �ұ�?

    let unlink: any;
    try {
        const params: any = new URLSearchParams();
        params.append('client_id', process.env.REST_API_KEY),
        params.append('logout_redirect_uri', process.env.host),// �ӽ÷� logoutRedirectURL���
        unlink = await axios({
            method: "POST",
            url: "https://kapi.kakao.com/v1/user/unlink",
            headers: {
                //Authorization: `Bearer ${token.access_token}`, token�� �����ϰ� �޾ƿ��� �� �ؾ��ϳ�? �ϴ� �ۼ��ϰ� ���߿� ����
              },
        });
  
    } catch (error) {
      console.error('Error occurred while obtaining access token:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
  });

  