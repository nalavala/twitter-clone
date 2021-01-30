import { model, Schema, Document } from 'mongoose';
import User from './user';
export const DOCUMENT_NAME = 'Tweet';
export const COLLECTION_NAME = 'tweets';

export default interface Tweet extends Document {
    content: string,
    user: User,
    likes: number,
}

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: Schema.Types.Number,
        default: 0
    }
}, { versionKey: false })

export const TweetModel = model<Tweet>(DOCUMENT_NAME, tweetSchema, COLLECTION_NAME);