import { hashPassword } from "./../utils/password";
import User, { UserModel } from "./../database/model/user";
import UserRepo from './../database/repository/userRepo';
import { BadRequestError } from './../core/ApiError';
import asyncHandler from './../helpers/asynHandler';
import { NextFunction } from "express";
const { randomId } = require("./../utils/random");

export const createUser = asyncHandler(async (req: any, res: any, next: any) => {

  const { password, email } = req.body;

  const existingUser = await UserRepo.getByEmail(email);
  if (existingUser) throw new BadRequestError('User already registered');
  const encryptedPassword = await hashPassword(password);
  const newUser: User = {
    slug: req.body.email,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    fullName: req.body.fullName,
    hashPassword: encryptedPassword,
  } as User;

  const createdUser = await UserRepo.create(newUser);
  // TODO : sanitize user object before sending to user
  res.status(200).json({
    data: createdUser
  });

});


export const followUser = asyncHandler(async (req: any, res: any, next: NextFunction) => {

  const followed = req.params.userId;
  const follower = req.userId;
  if (followed !== follower) {
    await UserRepo.followUser(followed, follower);
  }
  res.sendStatus(200);
})

export const unfollowUser = asyncHandler(async (req: any, res: any, next: NextFunction) => {

  const followed = req.params.userId;
  const follower = req.userId;
  if (followed !== follower) {
    await UserRepo.unfollowUser(followed, follower);
  }
  res.sendStatus(200);
})


export const testAuth = asyncHandler(async (req: any, res: any, next: any) => {
});