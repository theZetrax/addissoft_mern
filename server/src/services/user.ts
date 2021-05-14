import User, { Gender } from '../models/user';

/**
 * Here are functionalities, Services
 * Services are
 * 
 * 1. Create User
 * 2. Read User Details
 * 3. List Users
 * 4. Update User
 * 5. Delete User
 */

// Service Responses
export type ErrorResponse = { error: { type: string, message: string } };
export type CreateUserResponse = ErrorResponse | {userId: string};
export type ReadUserResponse = ErrorResponse | { userId: string, name: string, birth_date: Date, gender: Gender, salary: string };

/**
 * Service function for creating user.
 * 
 * @param {string} name Name of User
 * @param {Date} birth_date Birth Date of User
 * @param {Gender} gender Gender of User
 * @param {string} salary Salary of User
 * @returns {CreateUserResponse | ErrorResponse}
 */
async function createUser(name: string, birth_date: Date, gender: Gender, salary: string): Promise<CreateUserResponse> {
    return new Promise(function(resolve, reject) {
        // Instantiating User Object
        const user = new User({
            name: name,
            birth_date: birth_date,
            gender: gender,
            salary: salary
        });

        // Persisting User Data
        user.save()
            .then(user => resolve({userId: user._id.toString()}))
            .catch(err => {
                console.log('[error]');
                reject(err);
            })
    });
}


export default {
    createUser: createUser
};