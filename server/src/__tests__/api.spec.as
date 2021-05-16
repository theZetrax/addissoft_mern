// /**
//  * API tests, Tests if routes are functioning.
//  * 
//  * @author Zablon Dawit
//  */
// import request from 'supertest';
// import { Express } from 'express-serve-static-core';

// import { createServer } from '../utils/server';

// let server: Express;

// beforeAll(async () => {
//     server = await createServer();
// });

// describe('GET /users',  () => {
//     it('should return 200 & valid response if response param list is empty', async done => {
//         request(server)
//             .get('/users')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .end((err, res) => {
//                 if (err) return done(err);
//                 // Check if object matching
//                 expect(res.body).toMatchObject({ message: 'welcome' });
//                 done();
//             });
//     });
// });