import db from '../../utils/db';
import UserModel, { Gender, User, UserDocument } from '../../models/user';
import UserService from '../../services/user';
import { seedDB } from '../../tests/db_init';

// Start Mongodb Connection
beforeAll(async () => {
    await db.open();
    await seedDB(); // Seeding Database
});

// Close Mongodb Connection
afterAll(async () => {
    await db.close();
});

describe('createUser', () => {
    it('should return valid userId and resolve with true', async () => {
        // Instantiating User Data
        const name = "Dawit Genene";
        const birth_date: Date= new Date(1978, 1, 17);
        const gender: Gender = Gender.Male;
        const salary = '6400.00 Birr';

        // Testing User
        await expect(UserService.createUser(name, birth_date, gender, salary))
            .resolves.toEqual({
                userId: expect.stringMatching(/^[a-f0-9]{24}$/)
            });
    });
});

describe('readUser', () => {
    it('should return users details and resolve with true', async () => {
        const user: UserDocument | null = await UserModel.findOne().where({ name: 'Bealul Dawit' });

        expect(user)
            .not.toBeNull();
        
        expect(UserService.readUser(user?._id))
            .resolves.toEqual({
                name: user?.name,
                birth_date: user?.birth_date,
                gender: user?.gender,
                salary: user?.salary
            });
    });
});