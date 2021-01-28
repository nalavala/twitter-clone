import Joi from "joi";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

export default {
    userCreateSchema: Joi.object(
        {
            username: Joi.string().min(3).required(),
            email: Joi.string().email({ tlds: { allow: false } }),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            fullname: Joi.string(),
            phone: Joi.number().max(10)
        }
    ),
    loginRequestSchema: Joi.object(
        {
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            email: Joi.string().email({ tlds: { allow: false } }),
        }
    )
}