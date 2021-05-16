import request from 'supertest';
import { Express } from 'express-serve-static-core';

import db from '../../utils/db';
import { createServer } from '../../utils/server';
import { seedDB } from '../../tests/db_init';
import UserModel, { Gender } from '../../models/user';

let server: Express;

beforeAll(async () => {
    await db.open();
    await seedDB();
    server = await createServer();
});

afterAll(async () => {
    await db.close();
})

describe('GET /users', () => {
    it ('should return 200 & respond users list of details valid response', async done => {
        request(server)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async function(err, res) {
                if (err) return done(err);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.users).toBeInstanceOf(Array);

                if (res.body.users.Length > 0)
                {
                    const responseUser: any = res.body.users[0];
                    const databaseUser = await UserModel.findById(responseUser.id);

                    expect(databaseUser).not.toBeInstanceOf(null);
                    expect(databaseUser).not.toBeInstanceOf(undefined);

                    if(databaseUser) {
                        expect(databaseUser.name).toEqual(responseUser.name);
                        expect(databaseUser.birth_date).toEqual(responseUser.birth_date);
                        expect(databaseUser.salary).toEqual(responseUser.salary);
                        expect(databaseUser.gender).toEqual(responseUser.gender);
                    }
                }
                
                done();
            });
    });
});

describe('POST /users', () => {
    // Check if post request creates a user. status 201
    it ('should return 201 status code & return valid response', async done => {
        const data = {
            name: 'Abebe Mola',
            birth_date: new Date(1997, 11, 12),
            gender: Gender.Male,
            salary: '3000 birr'
        };

        request(server)
            .post('/users')
            .send(data)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(async (err, res) => {
                if (err) return done(err);

                const user = await UserModel.findOne({ name: data.name });
                if(user) {
                    expect(res.body).toContainEqual({ userId: user._id });
                }
            });
    });
    // Check if post returns with 400 if parameters not satisfied
    it('should return 400 status code if parameters are incomplete', async done => {
        request(server)
            .post('/users')
            .send({ name: 'Abebe Biqila' })
            .expect(400)
            .expect('Content-Type', /json/)
            .end();

        request(server)
            .post('/user')
            .send({ name: 'Abebe Biqila', birth_date: (new Date(1992, 4, 4)), salary: '3000 birr' })
            .expect(400)
            .expect('Content-Type', /json/)
            .end();
    });
});

describe('PUT /users/:id', () => {
    // Return 201 status code and return valid response
    it('should return 201 status code and return user information', async done => {
        const user = await UserModel.findOne();
        
        if(user) {
            request(server)
                .put(`/users/${user._id}`)
                .send({ name: 'NotZablon Dawit' })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(async (err, res) => {
                   const newUser = await UserModel.findOne(user._id);
                   
                   if (newUser) {
                       expect(newUser.name).toEqual('NotZablon Dawit');
                   }
                });
        }
    });
    // Return 404 if id of user doesn't exist
    it('should return 404 status code if user doesn\'t exist', async done => {
        const userId = '60a08f93abceffad8b0c';

        request(server)
            .put(`/users/${userId}`)
            .send({ salary: '13000 birr' })
            .expect(404)
            .expect('Content-Type', /json/)
            .end();
    });
    // Return 400 if parameter doesn't satisfy atleast one parameter.
    it('should return 400 status code if paramenter doesn\'t meet minimum requirement', async done => {
        const user = await UserModel.findOne();

        if(user) {
            request(server)
                .put(`/users/${user._id}`)
                .send({})
                .expect(400)
                .expect('Content-Type', /json/)
                .end();
        }
    });
});

describe('DELETE /users/:id', () => {
    it('should return status code 410 and return deleted user id', async done => {
        const user = new UserModel();
        user.name = 'Girma Taddesse';
        user.birth_date = new Date(1993, 2, 3);
        user.gender = Gender.Male;
        user.salary = '3000 birr';

        await user.save();

        request(server)
            .delete(`/users/${user._id}`)
            .expect(410)
            .expect('Content-Type', /json/)
            .end();
    });

    it('should return 404 status code if user id does not exist', async done => {
        const userId = '60a08f93abceffad8b0c';

        request(server)
            .delete(`/users/${userId}`)
            .expect(404)
            .expect('Content-Type', /json/)
            .end();
    });
})