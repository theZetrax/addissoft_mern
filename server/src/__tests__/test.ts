import request from 'supertest';
import { Express } from 'express-serve-static-core';

import { createServer } from '@userapp/utils/server';

let server: Express;

beforeAll(async () => {
    server = await createServer();
});

describe('test', () => {
    it('should be true', async () => {
        const response = true;
        expect(response).toBeTruthy();
    })
});

describe('GET /',  () => {
    it('should return 200 & valid response if response param list is empty', async done => {
        request(server)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200)
            .end((err, res) => {
                if (err) return done;
                // Check if html string contains 'hello' or 'welcome'
                return done()
            })
    });
});