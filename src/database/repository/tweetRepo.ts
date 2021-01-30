import Tweet, { TweetModel } from '../model/tweet';
import TweetLike, { TweetLikesModel } from '../model/tweet-like';
import userRepo from './userRepo'
import { Types } from 'mongoose'
import { InternalServerError } from './../../core/ApiError'
export default class TweetRepo {
    private static USER_FIELDS_TO_FETCH = 'email username';
    public static async create(tweet: Tweet, userId: Types.ObjectId): Promise<Tweet> {
        const user = await userRepo.getById(userId);
        if (!user) throw new InternalServerError('user does not exists');
        tweet.user = user._id;
        const createdTweet: Tweet = await TweetModel.create(tweet);
        return createdTweet;
    }

    public static async get(tweetId: string): Promise<Tweet | null> {
        let tweet = await TweetModel.findOne({ "_id": tweetId })
            .select("likes content user")
            .populate("user", this.USER_FIELDS_TO_FETCH);
        return tweet.toObject();
    }

    public static async like(tweetLike: TweetLike): Promise<boolean> {
        try {
            const result = await TweetLikesModel.create(tweetLike);
            return true;
        } catch (e) {
            if (e.code === 11000) {
                return false;;
            }
            throw e;
        }
    }

    public static async unlike(tweetId: Types.ObjectId, userId: Types.ObjectId): Promise<any> {
        const result = await TweetLikesModel.deleteOne({ tweetId, userId });
        if (result.deleteCount === 1) {
            this.decreaseLikeCountByOne(tweetId);
        }
        return result;
    }


    //Move to sync service
    public static async increaseLikeCountByOne(tweetId: Types.ObjectId) {
        await TweetModel.updateOne({ _id: tweetId }, { $inc: { likes: 1 } })
    }

    public static async decreaseLikeCountByOne(tweetId: Types.ObjectId) {
        await TweetModel.updateOne({ _id: tweetId }, { $inc: { likes: -1 } })
    }

    public static async isTweetLikedByUser(tweetId: Types.ObjectId, userId: Types.ObjectId): Promise<boolean> {
        const like = await TweetLikesModel.findOne({ tweetId, userId });
        return like ? true : false;
    }
}



