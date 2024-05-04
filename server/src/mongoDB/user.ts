import { MongoClient } from 'mongodb';

// user 스키마 작성 및 가공된 데이터 반환
export const setUser = (userData: any) => {
    return {
        id: userData.kakao_account.id,
        name: userData.kakao_account.name,
        gender: userData.kakao_account.gender,
        email: userData.kakao_account.email
    };
}

interface UserInfo {
    id: number; // 적절한 타입 지정
    name: string;
    gender: string;
    email: string;
}

const run = async (): Promise<void> => {
    const mongoDB_url: any = process.env.MONGO_URL;

    // MongoDB 클라이언트 생성
    const client = new MongoClient(mongoDB_url);

    try {
        // MongoDB 서버에 연결
        await client.connect();
        console.log('서버에 성공적으로 연결되었습니다.');

        // 데이터베이스와 컬렉션 참조 가져오기
        const db = client.db('mongoPractice');
        const collection = db.collection<UserInfo>('kakao');

        // 가공된 사용자 데이터 생성
        const userDataFromKakao = {
            kakao_account: {
                id: 12345,
                name: 'Alice',
                gender: 'female',
                email: 'alice@example.com'
            }
        };

        // 사용자 데이터 생성 및 삽입
        const alice: UserInfo = setUser(userDataFromKakao);// 외부에서 데이터 값을 받아와야 함
        await collection.insertOne(alice);

        console.log('데이터가 성공적으로 삽입되었습니다.');
    } catch (err) {
        console.error('MongoDB 연결 중 오류 발생:', err);
    } finally {
        // MongoDB 연결 종료
        await client.close();
    }
};

run().catch(console.error);