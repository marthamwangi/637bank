import { Response, Request, NextFunction } from "express";
var authRouter = require("express").Router();
import joi from "joi";
import { registerUser, loginUser } from '../controllers/auth.controller';
import { IError } from "../interfaces/user.interfaces"
//Validate body schema
const schema = {
    body: {
        username: joi.string().required(),
        password: joi.string().required()
    }
}

const validateWithJoi = ({ schema }: any) => (req: Request, res: Response, next: NextFunction) => {
    const options = {
        stripUnknown: true
    }

    if (schema.body) {
        const { error, value } = joi.object().keys(schema.body).validate(req.body, options);
        req.body = value;
        if (error) {
            const message = error.details[0].message;
            const param = error.details[0].path.pop();
            const value = error.details[0].context?.value;
            const validationError: IError = {};
            validationError.message = message;
            validationError.value = value;
            validationError.param = param;
            return next(validationError);

        }
    }
    next();

}
authRouter
    .route('/register')
    .post(
        validateWithJoi({ schema }),
        registerUser
    )

authRouter
    .route('/login')
    .post(
        validateWithJoi({ schema }),
        loginUser)

export default authRouter;
