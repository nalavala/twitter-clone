const { Router } = require("express");
const route = Router();
import { postTweet, likeTweet, getTweet, unlikeTweet, feed } from "./../controllers/tweet";
import { auth } from '../middlewares/auth';
import validator from './../helpers/validator'
import schema from './schema'


route.use('/', auth);
route.post("/", validator.validate(schema.postTweet), postTweet);
route.patch("/:id/like", likeTweet);
route.patch("/:id/unlike", unlikeTweet);
route.get("/feed", feed);
route.get("/:tweetId/", getTweet);

export default route;