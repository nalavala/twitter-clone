import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../core/ApiError';
export enum ValidationSource {
    BODY = 'body',
    HEADER = 'headers',
    QUERY = 'query',
    PARAM = 'params',
}
const validate = (schema: Joi.ObjectSchema, param: ValidationSource = ValidationSource.BODY) => {
    return (req: Request, res: Response, next: NextFunction) => {

        try {
            const { error }: Joi.ValidationResult = schema.validate(req[param]);
            if (!error) {
                return next()
            }
            console.log(error);
            console.log(error?.details)
            next(new BadRequestError(error?.details[0].message.replace(/['"]+/g, '') || ""));
        } catch (err) {
            next(err);
        }
    }
}

export default {
    validate
}