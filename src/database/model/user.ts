import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User extends Document {
    id:string
    fullName?: string,
    image?: string,
    username?:string
    phone?: number
    email: string,
    slug:string,
    hashPassword: string;
}

const userSchema = new Schema(
    {
        _id: {
            type: String,
            alias: "id",
        },
        slug: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            index: { unique: true },
        },
        username: {
            type: String,
            required: true,
        },
        hashPassword: {
            type: String,
            required: true,
        },
        salt: {
            type: String
        },
        fullName: String,
        image: String,
        phone: Number,
    }
);

export const UserModel = model<User>(DOCUMENT_NAME, userSchema, COLLECTION_NAME);