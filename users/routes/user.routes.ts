var authRouter = require('express').Router();
import joi from 'joi';
import { registerUser, loginUser } from '../controllers/auth.controller';
import { validateWithJoi } from '../../utils';

const schema = {
    body: {
        username: joi.string().required(),
        password: joi.string().required()
    }
}

authRouter
    .post(
        '/register',
        validateWithJoi({ schema }),
        registerUser
    )
    .post(
        '/login',
        validateWithJoi({ schema }),
        loginUser
    )

export default authRouter;
