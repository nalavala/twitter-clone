const { Router } = require("express");
const route = Router();
import { login } from "../controllers/auth";
import validator from './../helpers/validator'
import schema from './schema'
route.post("/login", validator.validate(schema.loginRequestSchema), login);
export default route;
