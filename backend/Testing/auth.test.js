import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js'; 
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

describe('Auth Routes', () => {
    beforeAll(async () => {
        // Connect to the test database
        const MONGO_URI = 'mongodb+srv://youtube:youtube@cluster0.dhhq1ln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(MONGO_URI);
    });

    afterAll(async () => {
        // Disconnect from the test database
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        // Clear the users collection before each test
        await User.deleteMany({});
    });

    describe('POST /auth/register', () => {
        it('should register a new user', async () => {
            const user = {
                name: 'khan',
                emailid: 'khan@example.com',
                password: '223344',
                confirmpassword: '223344',
                phoneNumber: '9012895634'
            };

            const response = await request(app).post('/auth/register').send(user);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('User registered successfully');
        });

        it('should not register a user with missing fields', async () => {
            const user = {
                name: 'khan',
                emailid: 'khan@example.com',
                password: 'password',
                confirmpassword: 'password'
            };

            const response = await request(app).post('/auth/register').send(user);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('All fields are required');
        });

        it('should not register a user with mismatched passwords', async () => {
            const user = {
                name: 'khan',
                emailid: 'khan@example.com',
                password: 'password',
                confirmpassword: 'wrongpassword',
                phoneNumber: '1234567890'
            };

            const response = await request(app).post('/auth/register').send(user);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Passwords do not match');
        });
    });

    describe('POST /auth/signin', () => {
        it('should login an existing user', async () => {
            const user = new User({
                name: 'khan',
                emailid: 'khan@example.com',
                password: await bcrypt.hash('password', 10),
                phoneNumber: '1234567890',
                confirmpassword: 'password'
            });
            await user.save();

            const loginData = {
                emailid: 'khan@example.com',
                password: 'password'
            };

            const response = await request(app).post('/auth/signin').send(loginData);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Logged in successfully');
            expect(response.body.user).toBe(user._id.toString());
        });

        it('should not login a non-existing user', async () => {
            const loginData = {
                emailid: 'nonexistent@example.com',
                password: 'password'
            };

            const response = await request(app).post('/auth/signin').send(loginData);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User not found!');
        });

        it('should not login with wrong credentials', async () => {
            const user = new User({
                name: 'khan',
                emailid: 'khan@example.com',
                password: await bcrypt.hash('password', 10),
                phoneNumber: '1234567890',
                confirmpassword: 'password'
            });
            await user.save();

            const loginData = {
                emailid: 'khan@example.com',
                password: 'wrongpassword'
            };

            const response = await request(app).post('/auth/signin').send(loginData);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Wrong Credentials!');
        });
    });
});
