import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'UserFollow';
export const COLLECTION_NAME = 'user_follows';

export default interface UserFollow extends Document {
    id?: string
    followedUserId: string,
    followedByUserId: string,
}

const userFollowSchema = new Schema({
    followedUserId: {
        type: String,
        required: true,
    },
    followedByUserId: {
        type: String,
        required: true,
    }
}, { versionKey: false })

userFollowSchema.index({ followedUserId: 1, followedByUserId: 1 }, { unique: true });
export const UserFollowModel = model<UserFollow>(DOCUMENT_NAME, userFollowSchema, COLLECTION_NAME);