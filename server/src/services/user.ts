import UserModel, { Gender } from '../models/user';

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
export type ListUserResponse = ErrorResponse | Array<ReadUserResponse>;

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
        const user = new UserModel({
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

async function getUsers() {
    return new Promise(async function(resolve, reject) {

        UserModel
            .find({})
            .then(users => {
                console.log(users);
                // let usersResponse: Array<ReadUserResponse> = new Array<ReadUserResponse>();

                // users.forEach(user => {
                //     const filteredResponse: ReadUserResponse = {
                //         userId: user._id,
                //         name: user.name,
                //         birth_date: user.birth_date,
                //         gender: user.gender,
                //         salary: user.salary
                //     };

                //     usersResponse.push(filteredResponse);
                // });

                // resolve(usersResponse);
            });
        // Promise
        //     .resolve(async () => await UserModel.find({}))
        //     .then(users => console.log(users));
        
        // const users = await UserModel.find({});
        // console.log(users);
    });
}

export default {
    createUser: createUser,
    getUsers: getUsers,
    readUser: () => {},
    updateUser: () => {}
};