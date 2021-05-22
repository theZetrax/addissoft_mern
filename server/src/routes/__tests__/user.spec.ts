import request from 'supertest';
import { Express } from 'express-serve-static-core';

import db from '../../utils/db';
import { createServer } from '../../utils/server';
import { seedDB } from '../../tests/db_init';
import UserModel, { Gender } from '../../models/user';
import { ReadUserResponse } from '../../services/user';
import { toHtmlDateString } from '../../utils/date';

let server: Express;

beforeAll(async () => {
    await db.open();
    await seedDB();
    server = await createServer();
});

afterAll(async () => {
    await db.close();
});

// Getting User
describe('GET /users', () => {
    it('should return 200 & respond users list of details valid response', async (done) => {
        request(server)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async function (err, res) {
                if (err) return done(err);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.users).toBeInstanceOf(Array);

                if (res.body.users.length > 0) {
                    const responseUser: any = res.body.users[0];
                    const databaseUser = await UserModel.findById(
                        responseUser.userId
                    );

                    expect(databaseUser).not.toBeNull();
                    expect(databaseUser).not.toBeUndefined();

                    if (databaseUser) {
                        const responseExpected = {
                            name: databaseUser.name,
                            birth_date: toHtmlDateString(
                                databaseUser.birth_date
                            ),
                            salary: databaseUser.salary,
                            gender: databaseUser.gender > 0 ? 'Female' : 'Male',
                            userId: databaseUser._id.toString(),
                        };

                        expect(responseExpected).toEqual(responseUser);
                    }
                }

                done();
            });
    });
});

// Creating User
describe('POST /users', () => {
    // Check if post request creates a user. status 201
    it('should return 201 status code & return valid response', async (done) => {
        const data = {
            name: 'Abebe Mola',
            birth_date: '1991-12-12',
            gender: Gender.Male,
            salary: '3000 birr',
        };

        request(server)
            .post('/users')
            .send(data)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(async (err, res) => {
                if (err) return done(err);

                const user = await UserModel.findOne({ name: data.name });
                if (user) {
                    const expected = { userId: user._id.toString() };
                    expect(res.body).toEqual(expected);
                }

                done(); // calling done callback
            });
    });
    // Check if post returns with 400 if parameters not satisfied
    it('should return 400 status code if parameters are incomplete #1', async (done) => {
        request(server)
            .post('/users')
            .send({ name: 'Abebe Biqila' })
            .expect(400)
            .expect('Content-Type', /json/)
            .end(async (err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('should return 400 status code if parameters are incomplete #1', async (done) => {
        request(server)
            .post('/users')
            .send({
                name: 'Abebe Biqila',
                birth_date: '1994-04-04',
                salary: '3000 birr',
            })
            .expect(400)
            .expect('Content-Type', /json/)
            .end(async (err, res) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('GET /users/:id', () => {
    it('should return 200 status code and return user information', async (done) => {
        const user = await UserModel.findOne();

        if (user) {
            request(server)
                .get(`/users/${user._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) return done(err);
                    const resUser: ReadUserResponse = res.body;
                    const expected = {
                        userId: user._id.toString(),
                        name: user.name,
                        birth_date: toHtmlDateString(user.birth_date),
                        gender: user.gender > 0 ? 'Female' : 'Male',
                        salary: user.salary,
                    };

                    expect(resUser).toEqual(expected);
                    done();
                });
        }
    });
});

// Updating User
describe('PUT /users/:id', () => {
    // Return 201 status code and return valid response
    it('should return 201 status code and return user information', async (done) => {
        const user = await UserModel.findOne();

        if (user) {
            const userId = user._id;
            request(server)
                .put(`/users/${userId}`)
                .send({ name: 'NotZablon Dawit' })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(async (err, res) => {
                    if (err) return done(err);
                    const newUser = await UserModel.findOne(user._id);

                    if (newUser) {
                        expect(newUser.name).toEqual('NotZablon Dawit');
                    }

                    done();
                });
        }
    });
    // Return 404 if id of user doesn't exist
    it("should return 404 status code if user doesn't exist", async (done) => {
        const userId = '60a08f93abceffad8b0c';

        request(server)
            .put(`/users/${userId}`)
            .send({ salary: '13000 birr' })
            .expect(404)
            .expect('Content-Type', /json/)
            .end(async (err, res) => {
                if (err) return done(err);
                done();
            });
    });
    // Return 400 if parameter doesn't satisfy atleast one parameter.
    it("should return 400 status code if paramenter doesn't meet minimum requirement", async (done) => {
        const user = await UserModel.findOne();

        if (user) {
            request(server)
                .put(`/users/${user._id}`)
                .send({})
                .expect(400)
                .expect('Content-Type', /json/)
                .end(async (err, res) => {
                    if (err) return done(err);
                    done();
                });
        }
    });
});

// Deleting User
describe('DELETE /users/:id', () => {
    it('should return status code 410 and return deleted user id', async (done) => {
        const user = new UserModel();
        user.name = 'Girma Taddesse';
        user.birth_date = new Date(1993, 2, 3);
        user.gender = Gender.Male;
        user.salary = '3000 birr';

        await user.save();

        request(server)
            .delete(`/users/${user._id}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(async (err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('should return 404 status code if user id does not exist', async (done) => {
        const userId = '60a08f93abceffad8b0c';

        request(server)
            .delete(`/users/${userId}`)
            .expect(404)
            .expect('Content-Type', /json/)
            .end(async (err, res) => {
                if (err) return done(err);
                done();
            });
    });
});
