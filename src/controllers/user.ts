import { hashPassword } from "./../utils/password";
import User, { UserModel } from "./../database/model/user";
import UserRepo from './../database/repository/userRepo';
import { BadRequestError } from './../core/ApiError';
import asyncHandler from './../helpers/asynHandler';
const { randomId } = require("./../utils/random");

export const createUser = asyncHandler(async (req: any, res: any, next: any) => {

  const { password, email } = req.body;

  const existingUser = await UserRepo.getByEmail(email);
  if (existingUser) throw new BadRequestError('User already registered');
  const encryptedPassword = await hashPassword(password);
  const id = randomId();
  const newUser: User = {
    id: id,
    slug: req.body.email + "_" + id,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    fullName: req.body.fullName,
    hashPassword: encryptedPassword,
  } as User;

  const createdUser = await UserRepo.create(newUser);
  createdUser.id = createdUser._id;
  createdUser._id = undefined;
  res.sendStatus(200);

});



export const testAuth = asyncHandler(async (req: any, res: any, next: any) => {
});