import User, { UserModel } from '../model/user';
export default class UserRepo {
    public static async create(user: User): Promise<User> {
        const createdUser = await UserModel.create(user);
        return createdUser;
    }

    public static async getByUsername(username: string): Promise<User> {
        const user = await UserModel.findOne({ username: username });
        if (user) {
            user.id = user._id;
            delete user._id;
        }
        return user;
    }

    public static async getByEmail(email: string): Promise<User> {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            user.id = user._id;
            delete user._id;
        }

        return user;
    }
}

