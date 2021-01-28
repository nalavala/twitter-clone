const { Router } = require("express");
const route = Router();
import { createUser } from "./../controllers/user";
import { auth } from '../middlewares/auth';
import validator from './../helpers/validator'
import schema from './schema'

route.post("/", validator.validate(schema.userCreateSchema), createUser);
route.use('/', auth);
route.get('/', (req: any, res: any, next: any) => {
    res.json({ "fasd": "fasd" })
});

export default route;