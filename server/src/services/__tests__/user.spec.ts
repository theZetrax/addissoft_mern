import db from '../../utils/db';
import { Gender } from '../../models/user';
import UserService from '../../services/user';

// Start Mongodb Connection
beforeAll(async () => {
    await db.open();
});

// Close Mongodb Connection
afterAll(async () => {
    await db.close();
});

describe('createUser', () => {
    it('should return valid userId and resolve with true', async () => {
        const name = "Zablon Dawit";
        const birth_date: Date= new Date(1997, 8, 27);
        const gender: Gender = Gender.Male;
        const salary = '6400.00 Birr';

        await expect(UserService.createUser(name, birth_date, gender, salary))
            .resolves.toEqual({
                userId: expect.stringMatching(/^[a-f0-9]{24}$/)
            });
    });
});

describe('readUser', () => {
    it('should return users details and resolve with true', async () => {
        // const userId: string;
    });
});