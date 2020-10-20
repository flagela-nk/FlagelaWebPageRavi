import express from 'express';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import { UserLoginResponse, UserRegistrationRequest, UserRegistrationResponse } from '../model/user';
import { environment } from '../../environments/environment';

// const { Client } = require('pg')
const connectionString = 'postgresql://postgres:Password$1234@localhost:5432/FlagelaDev'

import PostgreClient from './postgre-client'


const accessTokenSecret = 'mysecretaccesstokenstring';
const saltRounds = 10;

const EXPIRES_IN_SECONDS = 5000 * 1000 *1000;
const EXPIRES_IN = { expiresIn: EXPIRES_IN_SECONDS.toString() + 's' };


export var routes = express.Router();

export const authenticateJWT = async (req: any, res: any, next: any) => {
    // console.log('authenticateJWT')
    const authHeader = req.headers.authorization;

    var postgreClient = new PostgreClient()
    await postgreClient.connect();

    if (authHeader) {
        var token = authHeader.split(' ')[1];
        // console.log('Authenticating', token);

        let tokenExists = false; //cachedTokens.includes(token);

        if (!tokenExists) {
            var tokens = await postgreClient.getRecords('usertoken', { access_token: token });
            if (tokens && tokens.length > 0) {
                token = tokens[0]['access_token'];
                //cachedTokens.push(token);
            } else {
                return res.sendStatus(403);

            }
        }
        jwt.verify(token, accessTokenSecret, (err: any, data: any) => {
            if (err) {
                console.error(err);
                return res.status(403).json('Forbidden user access token');
            }

            req.user = data;
            // console.log('verified user', req.user);

            next();
        });
    } else {
        res.sendStatus(401);
    }

    await postgreClient.client.end();
    
};



routes.post('/relogin', authenticateJWT, async (req: any, res: any) => {
    throw 'Deprecated'
    const reqUser = req.user;
    // console.log('Auth-ReLogin', reqUser);
/*
    var client = new MongoClient(DATABASE_NAME);
    let user = await client.getRecord('user', { _id: ObjectID(reqUser.userId) });
    console.log('Records User(s): ', user);

    if (user) {

        const accessToken = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            accessTokenSecret,
            EXPIRES_IN);


        const userToken = await client.createRecord('usertoken', {
            userId: user['_id'],
            token: accessToken
        });

        let response = new UserLoginResponse({
            userId: user['_id'],
            email: user['email'],
            token: accessToken,
            role: user['role']
        });
        //  console.log('ReLogin Response', response)
        return res.json(response);

    }
*/
    return res.status(403).json('Forbidden');

});

routes.post('/login', async (req, res) => {

    var { email, password } = req.body;

    if (!email || !password)
        return res.sendStatus(204);

    console.log('Auth-Login');

    var postgreClient = await new PostgreClient()
    await postgreClient.connect();

    let usersResult = await postgreClient.client.query(`SELECT * FROM users WHERE email=$1::text AND password_hash = crypt($2::text, password_hash)`, [email, password]);


    if(usersResult.rows.length == 0)
        return res.status(401).json('User not found, invalid email or password');

    var user=usersResult.rows[0];
    console.log('User: ', user);

    if (user) {
        const accessToken = jwt.sign(
            { 
            userId: user.id, 
            email: user.email, 
            role: user.role 
        }, 
        accessTokenSecret, 
        EXPIRES_IN);

        const userToken = await postgreClient.createRecord('usertoken', {
            // id: user['id'],
            user_id: user['id'], //remove later
            access_token: accessToken
        });

        let response = new UserLoginResponse({
            // id: user['id'],
            userId:user['id'], //remove later
            email, 
            token:accessToken,
            role: user['role']
        });
        console.log('Login Response', response)
        await postgreClient.client.end();
        return res.json(response);
    }
    await postgreClient.client.end();

});

routes.post('/register', async (req, res) => {

    console.log('Auth-Register', req.body);

    var request: any = req.body;
    
    var postgreClient = new PostgreClient()
    await postgreClient.connect();
    var users = await postgreClient.client.query(`SELECT * FROM users WHERE email=$1::text`, [request.email]);
    console.log(users.rows)

    if(users.rows.length > 0)
        return res.status(500).json('User already exists');
    
    var insert_user_query = {
        text: `
        INSERT INTO users (first_name, last_name, email, password_hash, role) 
        VALUES ($1, $2, $3, crypt($4, gen_salt('md5')), $5) 
        RETURNING *
        `,
        values: [
            request.firstName, 
            request.lastName, 
            request.email,
            request.password,
            request.role
        ],
    }
    var create_user_response = await postgreClient.client.query(insert_user_query)
    console.log('create_user_response', create_user_response);

    var insert_vendor_query = {
        text: `
        INSERT INTO vendor (name, owner_id) 
        VALUES ($1, $2) 
        RETURNING *
        `,
        values: [
            request.businessName, 
            create_user_response.rows[0].id
        ],
    };
    var create_vendor_response = await postgreClient.client.query(insert_vendor_query)
    console.log('create_vendor_response', create_vendor_response);

    var insert_nn_user_vendor_query = {
        text: `
        INSERT INTO nn_user_vendor_relationship (user_id, vendor_id, role) 
        VALUES ($1, $2, 'OWNER') 
        RETURNING *
        `,
        values: [
            create_user_response.rows[0].id, 
            create_vendor_response.rows[0].id
        ],
    };
    var create_nn_user_vendor_response = await postgreClient.client.query(insert_nn_user_vendor_query)
    console.log('create_nn_user_vendor_response', create_nn_user_vendor_response);

    await postgreClient.client.end()

    return res.json(create_user_response.rows[0]);

    /*
    let record = await client.getRecord('user', { email: request.email });

    if (record) {
        console.log('Records Retrieved: ', record);
        return res.status(401).json('User already exists');
    } else {
        const user = await client.createRecord('user', request);

        if (user) {
            const accessToken = jwt.sign(
                {
                    userId: user._id,
                    email: request.email,
                    role: request.role
                },
                accessTokenSecret,
                EXPIRES_IN);

            const userToken = await client.createRecord('usertoken', {
                userId: user['_id'],
                token: accessToken
            });

            let response = new UserRegistrationResponse({
                email: request.email,
                role: request.role,
                token: accessToken,
                userId: user['_id'],
                name: request.name
            });
            return res.json(response);
        }
        else
            return res.status(500).json('Unable to create user');
    }
*/
});

routes.post('/change-password', async (req, res) => {
    console.log('Auth-Change-Password');
});

routes.post('/logout', async (req, res) => {
    console.log('Auth-Logout');

    const authHeader = req.headers.authorization;
    if (authHeader) {
        var token = authHeader.split(' ')[1];

        var postgreClient = new PostgreClient()
        await postgreClient.connect();

        var userToken = await postgreClient.getFirstRecord('usertoken', { access_token: token })
        if(userToken)
            await postgreClient.deleteRecordById('usertoken', userToken['id'])
        
            await postgreClient.client.end();
        res.json(true);
    }
    else res.json(false);
});

// gets user by authorization token
routes.get('/profile/:id', authenticateJWT, async (req: any, res: any) => {

    
    var postgreClient = await new PostgreClient()
    await postgreClient.connect();

    let usersResult = await postgreClient.client.query(`SELECT id, email, first_name, last_name, role FROM users WHERE id=$1::uuid`, [req.params.id]);

let userProfile = {
    id : usersResult.rows[0].id,
    firstName : usersResult.rows[0].first_name,
    lastName : usersResult.rows[0].last_name,
    email : usersResult.rows[0].email,
    role: usersResult.rows[0].role
};
    return res.json(userProfile);

});