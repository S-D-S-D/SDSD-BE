// src/services/databaseService.ts
import { MongoClient, ObjectId } from 'mongodb';
import { UserInfo } from './userModel';
import dotenv from 'dotenv';

dotenv.config();
// MongoDB
const mongoDB_url: string =`mongodb+srv://ljm8350:${process.env.PASSWORD}@mongopractice.osgmeti.mongodb.net/?retryWrites=true&w=majority&appName=mongoPractice`;
const databaseName = 'kakao';
const collectionName = 'userData';

export const getUserCollection = async () => {
    const client = new MongoClient(mongoDB_url);
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection<UserInfo>(collectionName);
    return { client, collection };
};

export const findUserByEmail = async (email: string) => {
    const { client, collection } = await getUserCollection();
    try {
        console.log('Finding user with email:', email); // 로그 추가
        const user = await collection.findOne({ email });
        console.log('Found user:', user); // 로그 추가
        return user;
    } catch (error) {
        console.error('Failed to find user by email:', error); // 에러 로그 추가
    } finally {
        await client.close();
    }
};


export const createUser = async (userData: UserInfo) => {
    const { client, collection } = await getUserCollection();
    try {
        console.log('Inserting user data:', userData);
        const result = await collection.insertOne(userData);
        console.log('Insert result:', result);
        if (!result.insertedId) {
            console.error('Failed to insert user: No insertedId');
        }
        return result.insertedId;
    } catch (error) {
        console.error('Failed to insert user:', error); // 에러 로그 추가
        throw error;
    } finally {
        await client.close();
    }
};



