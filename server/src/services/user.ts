import User, { Gender } from '../models/user';

/**
 * Here are functionalities, Services
 */

// Service Responses
export type ErrorResponse = { error: { type: string, message: string } };
export type CreateUserResponse = ErrorResponse | {userId: string};

async function createUser(name: string, birth_date: Date, gender: Gender): CreateUserResponse {
    return new Promise(function(resolve, reject) {
        const user = new User({
            name
        })
    })
}