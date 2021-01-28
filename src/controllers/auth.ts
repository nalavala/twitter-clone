import { matchPassword } from "./../utils/password";
import asyncHandler from './../helpers/asynHandler';
import UserRepo from './../database/repository/userRepo';
import { NotFoundError, AuthenticationFailedError } from './../core/ApiError';
import { createToken } from './../utils/auth';

export const login = asyncHandler(async (req, res, next) => {

  const { password, email } = req.body;
  const user = await UserRepo.getByEmail(email);
  if (!user) {
    throw new NotFoundError("No User found");
  }
  
  const match = await matchPassword(user.hashPassword, password);
  if (!match) {
    throw new AuthenticationFailedError("Invalid credentials");
  }

  const token = await createToken(user);
  res.json({
    user: {
      id: user.id,
      token,
      email,
      username: user.username,
      image: user.image,
    },
  });

});
