const { Router } = require("express");
const route = Router();
import { createUser, followUser , unfollowUser} from "./../controllers/user";
import { auth } from '../middlewares/auth';
import validator from './../helpers/validator'
import schema from './schema'

route.post("/", validator.validate(schema.userCreateSchema), createUser);
route.use('/', auth);
route.put("/:userId/follow", followUser)
route.put("/:userId/unfollow", unfollowUser)

export default route;