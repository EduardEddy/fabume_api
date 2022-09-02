//import request from 'supertest';
import Server from '../../../../config/server';
//import server from '../../../../app';

import supertest = require('supertest');
import mongoose from 'mongoose';

//const app = express();
//const request: supertest.SuperTest<supertest.Test> = supertest(app);
const server = new Server();
//server.listen();
const request: supertest.SuperTest<supertest.Test> = supertest(server.app);

afterAll( ()=> {
    mongoose.connection.close();
});

describe('[AUTH] Test to api/login', () => {
    it('Invalid credential', async () => {
        const response = await request
            .post('/api/login')
            .send({
                email:'test@test.com',
                password:'123456'
            });
        expect(response.statusCode).toEqual(401);
    });

    it('Login success', async () => {
        const response = await request
            .post('/api/login')
            .send({
                email:'eduard3@mail.com',
                password:'123456'
            });
        expect(response.statusCode).toEqual(200);
        
    });
});
