import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { createUser, findUserByEmail } from '../mongoDB/databaseService';
import { UserInfo } from '../mongoDB/userModel';

dotenv.config();

export const kakaoAuth = (req: Request, res: Response) => {
    const redirectUri = `${process.env.HOST}/auth/kakao/callback`;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${redirectUri}&response_type=code&scope=profile_nickname,gender,account_email`;
    res.redirect(kakaoAuthUrl);
};

export const kakaoAuthCallback = async (req: Request, res: Response) => {
    let tokenResponse: any;
    let userInfoResponse: any;
    try {
        const { code } = req.query;
        if (!code) {
            console.error('인증 코드 누락');
            return res.redirect('/');
        }

        const tokenUrl = 'https://kauth.kakao.com/oauth/token';
        const params: any = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', process.env.REST_API_KEY);
        params.append('redirect_uri', `${process.env.HOST}/auth/kakao/callback`);
        params.append('code', code as string);

        tokenResponse = await axios({
            method: 'POST',
            url: tokenUrl,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            data: params,
        });

        if (!tokenResponse.data.access_token) {
            console.error('액세스 토큰 누락:', tokenResponse.data);
            return res.redirect('/');
        }

        userInfoResponse = await axios({
            method: 'GET',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                Authorization: `Bearer ${tokenResponse.data.access_token}`,
            },
        });

        const userInfo = userInfoResponse.data;
        let user = await findUserByEmail(userInfo.kakao_account.email);
        if (!user) {
            const userData: UserInfo = {
                name: userInfo.kakao_account.profile.nickname,
                gender: userInfo.kakao_account.gender,
                email: userInfo.kakao_account.email,
            };
            const insertedUserId = await createUser(userData);
            user = { _id: insertedUserId, ...userData };
            console.log('User created with ID:', user._id);
        }

        res.redirect('/dashboard');
    } catch (error: any) {
        console.error('오류 발생:', error.response ? error.response.data : error.message);
        return res.status(500).send('내부 서버 오류');
    }
};
