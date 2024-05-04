import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();// 사실 뭔지 잘 모르겠음 env파일을 불러온다함
const router = express.Router();

router.get('/logout/kakao/', async (req, res) => {
    let logout: any;
    try {
        const params: any = new URLSearchParams();
        params.append('client_id', process.env.REST_API_KEY),
        params.append('logout_redirect_uri', process.env.host),// 임시로 logoutRedirectURL등록
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
    //unlink할때 router를 따로 나눠야 할까?

    let unlink: any;
    try {
        const params: any = new URLSearchParams();
        params.append('client_id', process.env.REST_API_KEY),
        params.append('logout_redirect_uri', process.env.host),// 임시로 logoutRedirectURL등록
        unlink = await axios({
            method: "POST",
            url: "https://kapi.kakao.com/v1/user/unlink",
            headers: {
                //Authorization: `Bearer ${token.access_token}`, token값 저장하고 받아오는 걸 해야하나? 일단 작성하고 나중에 생각
              },
        });
  
    } catch (error) {
      console.error('Error occurred while obtaining access token:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
  });

  