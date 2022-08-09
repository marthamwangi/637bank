import { Response, Request, NextFunction } from 'express';
import joi from 'joi';
import { IError } from '../users/interfaces/user.interfaces'

export const bankAcountGenerate = async function () {
    let accountNumber = '637'; //prefix
    for (let i = 0; i < 8; i++) {
        accountNumber += Math.floor(Math.random() * 10);
    }
    return Number(accountNumber);
}

export const validateWithJoi = ({ schema }: any) => (req: Request, res: Response, next: NextFunction) => {
    const options = { stripUnknown: true }

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
    if (schema.params) {
        const { error, value } = joi.object().keys(schema.params).validate(req.params, options);
        req.params = value;
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
    if (schema.query) {
        const { error, value } = joi.object().keys(schema.query).validate(req.query, options);
        req.query = value;
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