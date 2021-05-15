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
export type UpdateUserResponse = ErrorResponse | CreateUserResponse;
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
function createUser(name: string, birth_date: Date, gender: Gender, salary: string): Promise<CreateUserResponse> {
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
                console.log(`[error] ${err}`);
                reject(err);
            })
    });
}

async function updateUser(id: string, data: { name?: string, birth_date?: Date, gender?: Gender, salary?: string }): Promise<UpdateUserResponse> {
    try {
        let user = await UserModel.findById(id);

        if (user) {
            if (data.name) user.name = data.name ;
            if (data.salary) user.salary = data.salary;
            if (data.birth_date) user.birth_date = data.birth_date;
            if (data.gender) user.gender = data.gender;

            await user.save();

            const userResposne: UpdateUserResponse = { userId: user._id };

            return userResposne;
        }

        return { error: { type: '[update] user not defined', message: 'user doesn\'t exist' } };
    } catch (err) {
        return Promise.reject({error: { type: '[update] user doesn\'t exist', message: 'User id doesn\'t exist' }});
    }
}

async function readUser(id: string): Promise<ReadUserResponse> {
    try {
        let user = await UserModel.findById(id);

        if(user) {
            const filteredUser: ReadUserResponse = {
                userId: user._id,
                name: user.name,
                birth_date: user.birth_date,
                gender: user.gender,
                salary: user.salary
            };

            return filteredUser;
        }

        return { error: { type: '[read] user not defined', message: 'user doesn\'t exist' } };
    } catch (err) {
        return Promise.reject({ error: { type: '[read] user doesn\'t exist', message: 'User id doesn\'t exist' } });
    }
}

async function getUsers(): Promise<ListUserResponse> {
    try {
        const users = await UserModel.find({});

        const filteredUsers = users.map(user => {
            const filtered: ReadUserResponse = {
                userId: user._id,
                name: user.name,
                birth_date: user.birth_date,
                gender: user.gender,
                salary: user.salary
            };

            return filtered;
        });
        
        return filteredUsers;
    } catch (err) {
        console.log(err);
        return { error: { type: "reading user details failed", message: "Error retriving users list" } };
    }
}

export default {
    createUser: createUser,
    getUsers: getUsers,
    updateUser: updateUser,
    readUser: readUser
};