import { MongoClient } from 'mongodb';

// user ��Ű�� �ۼ� �� ������ ������ ��ȯ
export const setUser = (userData: any) => {
    return {
        id: userData.kakao_account.id,
        name: userData.kakao_account.name,
        gender: userData.kakao_account.gender,
        email: userData.kakao_account.email
    };
}

interface UserInfo {
    id: number; // ������ Ÿ�� ����
    name: string;
    gender: string;
    email: string;
}

const run = async (): Promise<void> => {
    const mongoDB_url: any = process.env.MONGO_URL;

    // MongoDB Ŭ���̾�Ʈ ����
    const client = new MongoClient(mongoDB_url);

    try {
        // MongoDB ������ ����
        await client.connect();
        console.log('������ ���������� ����Ǿ����ϴ�.');

        // �����ͺ��̽��� �÷��� ���� ��������
        const db = client.db('mongoPractice');
        const collection = db.collection<UserInfo>('kakao');

        // ������ ����� ������ ����
        const userDataFromKakao = {
            kakao_account: {
                id: 12345,
                name: 'Alice',
                gender: 'female',
                email: 'alice@example.com'
            }
        };

        // ����� ������ ���� �� ����
        const alice: UserInfo = setUser(userDataFromKakao);// �ܺο��� ������ ���� �޾ƿ;� ��
        await collection.insertOne(alice);

        console.log('�����Ͱ� ���������� ���ԵǾ����ϴ�.');
    } catch (err) {
        console.error('MongoDB ���� �� ���� �߻�:', err);
    } finally {
        // MongoDB ���� ����
        await client.close();
    }
};

run().catch(console.error);