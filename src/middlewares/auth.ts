import { NextFunction } from 'express';
import JWT, { JwtPayload } from "../utils/JWT";
import { getAccessToken, validateTokenPayload } from "../utils/auth";
import { TokenExpiredError, AuthenticationFailedError } from "../core/ApiError";
import asynHandler from '../helpers/asynHandler';

export const auth = asynHandler(async (req: any, res: any, next: NextFunction) => {
  req.accessToken = getAccessToken(req.headers.authorization);
  try {
    const payload: JwtPayload = await JWT.verify(req.accessToken);
    validateTokenPayload(payload)
    req.userId = payload.sub;
    return next();
  } catch (e) {
    if (e instanceof TokenExpiredError) throw new AuthenticationFailedError(e.message);
    throw e;
  }
});
