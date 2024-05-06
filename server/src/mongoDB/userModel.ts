// src/services/userModel.ts
import { ObjectId } from 'mongodb';

export interface UserInfo {
    _id?: ObjectId;
    name: string;
    gender: string;
    email: string;
}