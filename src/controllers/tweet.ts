import asyncHandler from './../helpers/asynHandler';
import tweetRepo from './../database/repository/tweetRepo';
import TweetLike from './../database/model/tweet-like';
import { NotFoundError } from './../core/ApiError'
import UserRepo from '../database/repository/userRepo';

const { randomId } = require("./../utils/random");

export const postTweet = asyncHandler(async (req: any, res: any, next) => {
    const tweet = req.body;
    const createdTweet = await tweetRepo.create(tweet, req.userId);
    return res.status(200).json({
        data: createdTweet
    });

});

export const getTweet = asyncHandler(async (req: any, res: any, next) => {
    const tweetId = req.params.tweetId;
    const tweet = await tweetRepo.get(tweetId);
    if (!tweet) {
        throw new NotFoundError("Tweet not found");
    }


    const isLiked = await tweetRepo.isTweetLikedByUser(tweetId, req.userId);

    res.status(200).json({ 
        data: { 
            ...tweet, 
            likedByViewer: isLiked 
        } 
    });
});


export const feed = asyncHandler(async (req: any, res: any, next) => {

    const followerUserIds = await UserRepo.getFollowersOfUser(req.userId);
    console.log(followerUserIds);
    res.sendStatus(200);


});

export const likeTweet = asyncHandler(async (req: any, res: any, next) => {

    const tweetId = req.params.id;
    const userId = req.userId;
    const tweetLike = {
        userId,
        tweetId
    }
    const result = await tweetRepo.like(tweetLike as TweetLike);
    if (result) {
        tweetRepo.increaseLikeCountByOne(tweetId);
    }
    return res.sendStatus(200);

})

export const unlikeTweet = asyncHandler(async (req: any, res: any, next) => {

    const tweetId = req.params.id;
    const userId = req.userId;
    const result = await tweetRepo.unlike(tweetId, userId);
    if (result.deletedCount == 1) {
        tweetRepo.decreaseLikeCountByOne(tweetId);
    }

    return res.sendStatus(200);

})