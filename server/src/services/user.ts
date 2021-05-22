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

// Service Responses (Type Safety)
export type ErrorResponse = { error: { type: string; message: string } };
export type CreateUserResponse = ErrorResponse | { userId: string };
export type ReadUserResponse =
    | ErrorResponse
    | {
          userId: string;
          name: string;
          birth_date: Date;
          gender: Gender;
          salary: string;
      };
export type UpdateUserResponse = ErrorResponse | ReadUserResponse;
export type ListUserResponse = ErrorResponse | Array<ReadUserResponse>;
export type DeleteUserResposne = ErrorResponse | CreateUserResponse;

/**
 * Service function for creating user.
 *
 * @param {string} name Name of User
 * @param {Date} birth_date Birth Date of User
 * @param {Gender} gender Gender of User
 * @param {string} salary Salary of User
 * @returns {CreateUserResponse | ErrorResponse}
 */
function createUser(
    name: string,
    birth_date: Date,
    gender: Gender,
    salary: string
): Promise<CreateUserResponse> {
    return new Promise(function (resolve, reject) {
        // Instantiating User Object
        const user = new UserModel({
            name: name,
            birth_date: birth_date,
            gender: gender,
            salary: salary,
        });

        // Persisting User Data
        user.save()
            .then((user) => resolve({ userId: user._id.toString() }))
            .catch((err) => {
                console.log(`[error] ${err}`);
                reject(err);
            });
    });
}

/**
 * Updates user informarion.
 *
 * @param id User Id.
 * @param data Updated user information.
 * @returns {Promise<UpdateUserResponse>} Returns promise that updates the user information.
 */
async function updateUser(
    id: string,
    data: { name?: string; birth_date?: Date; gender?: Gender; salary?: string }
): Promise<UpdateUserResponse> {
    try {
        let user = await UserModel.findById(id); // Retrive User

        // If User exists
        if (user) {
            // Update user information
            if (data.name) user.name = data.name;
            if (data.salary) user.salary = data.salary;
            if (data.birth_date) user.birth_date = data.birth_date;
            if (data.gender) user.gender = data.gender;

            await user.save(); // Save Changes

            // Filter User Data for response
            const userResposne: UpdateUserResponse = {
                userId: user._id,
                name: user.name,
                birth_date: user.birth_date,
                gender: user.gender,
                salary: user.salary,
            };

            // Returning user response
            return userResposne;
        }

        return Promise.reject({
            error: { type: 'user_not_defined', message: "user doesn't exist" },
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return Promise.reject({
                error: {
                    type: 'user_not_defined',
                    message: "user doesn't exist",
                },
            });
        }

        return Promise.reject({
            error: {
                type: 'updating_failed',
                message: "User id doesn't exist",
            },
        });
    }
}

async function readUser(id: string): Promise<ReadUserResponse> {
    try {
        let user = await UserModel.findById(id);

        if (user) {
            const filteredUser: ReadUserResponse = {
                userId: user._id,
                name: user.name,
                birth_date: user.birth_date,
                gender: user.gender,
                salary: user.salary,
            };

            return filteredUser;
        }

        return Promise.reject({
            error: {
                type: '[read] user not defined',
                message: "user doesn't exist",
            },
        });
    } catch (err) {
        return Promise.reject({
            error: {
                type: "[read] user doesn't exist",
                message: "User id doesn't exist",
            },
        });
    }
}

async function getUsers(): Promise<ListUserResponse> {
    try {
        const users = await UserModel.find({});

        const filteredUsers = users.map((user) => ({
            userId: user._id,
            name: user.name,
            birth_date: user.birth_date,
            gender: user.gender,
            salary: user.salary,
        }));

        return filteredUsers;
    } catch (err) {
        return Promise.reject({
            error: {
                type: 'reading user details failed',
                message: 'Error retriving users list',
            },
        });
    }
}

async function deleteUser(id: string): Promise<DeleteUserResposne> {
    try {
        await UserModel.findByIdAndDelete(id);
        return { userId: id };
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return Promise.reject({
                error: {
                    type: 'user_not_defined',
                    message: "user doesn't exist",
                },
            });
        }

        return Promise.reject({
            error: {
                type: 'removing_failed',
                message: "User id doesn't exist",
            },
        });
    }
}

export default {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    readUser,
};
