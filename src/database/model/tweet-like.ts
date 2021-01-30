import { model, Schema, Document, Types } from 'mongoose';

export const DOCUMENT_NAME = 'TweetLikes';
export const COLLECTION_NAME = 'tweet_likes';

export default interface TweetLike extends Document {
    id?: string
    tweetId: Types.ObjectId,
    userId: Types.ObjectId,
}

const tweetLikesSchema = new Schema({
    tweetId: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { versionKey: false })

tweetLikesSchema.index({ tweetId: 1, userId: 1 }, { unique: true });
export const TweetLikesModel = model<TweetLike>(DOCUMENT_NAME, tweetLikesSchema, COLLECTION_NAME);