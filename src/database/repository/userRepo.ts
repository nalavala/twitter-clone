import User, { UserModel } from '../model/user';
import UserFollow , { UserFollowModel } from '../model/follow';
import { Types } from 'mongoose'
import { BadRequestError } from './../../core/ApiError'
export default class UserRepo {
    public static async create(user: User): Promise<User> {
        try {
            const createdUser = await UserModel.create(user);
            return createdUser;
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                throw new BadRequestError("User already exist with given details")
            }
            throw err;
        }

    }

    public static async getByUsername(username: string): Promise<User> {
        const user = await UserModel.findOne({ username: username });
        if (user) {
            user.id = user._id;
            delete user._id;
        }
        return user;
    }

    public static async getById(userId: Types.ObjectId): Promise<User | null> {
        return await UserModel.findOne({ _id: userId });

    }

    public static async getByEmail(email: string): Promise<User> {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            user.id = user._id;
            delete user._id;
        }

        return user;
    }


    public static async followUser(followedUserId: string, followedByUserId: string): Promise<void> {
        await UserFollowModel.updateOne(
            { followedUserId, followedByUserId },
            { followedUserId, followedByUserId },
            { upsert: true }
        )
    }

    public static async unfollowUser(followedUserId: string, followedByUserId: string): Promise<void> {
        const result = await UserFollowModel.deleteOne({ followedUserId, followedByUserId });
        if (result.deleteCount === 1) {
            //this.decreaseLikeCountByOne(tweetId);
        }
        return result;
        
    }

    public static async getFollowersOfUser(userId : string):Promise<any> {
        const followers = await UserFollowModel.find({followedUserId : userId}) as UserFollow[];
        return followers.map(follower => follower.followedByUserId);
    }
}

