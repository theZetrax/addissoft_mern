/**
 * Seed Database.
 * 
 * @author Zablon Dawit
 */
import UserModel, { Gender, User } from '../models/user';

async function clearDB(): Promise<void> {
    await UserModel.deleteMany(); // Clear Database
}

export async function seedDB(): Promise<void> {
    await clearDB(); // Clear Database before seeding.

    // User Data
    let users: Array<User> = [
        {
            name: 'Zablon Dawit',
            birth_date: new Date(1994, 8, 27),
            gender: Gender.Male,
            salary: '1000 birr'
        },
        {
            name: 'Bealul Dawit',
            birth_date: new Date(1995, 10, 3),
            gender: Gender.Female,
            salary: '2000 birr'
        },
        {
            name: 'Hiwote Mola',
            birth_date: new Date(1990, 4, 11),
            gender: Gender.Female,
            salary: '4000 birr'
        },
        {
            name: 'Bisbis Kalsi',
            birth_date: new Date(1992, 3, 3),
            gender: Gender.Male,
            salary: '3000 birr'
        }
    ];

    // Seeding User Data
    await UserModel.create(users);
}