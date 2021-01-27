import { AuthenticationFailedError, } from '../core/ApiError';
import { JwtPayload } from './JWT'
import  config  from "./../property"
import User from './../database/model/user';
import JWT from './JWT'

export const getAccessToken = (authorization?: string) => {
  if (!authorization) throw new AuthenticationFailedError('Invalid Authorization header');
  if (!authorization.startsWith('Bearer ')) throw new AuthenticationFailedError('Invalid Authorization header');
  return authorization.split(' ')[1];
};


export const validateTokenPayload = (payload: JwtPayload): boolean => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    payload.iss !== config.tokenIssuer ||
    payload.aud !== config.tokenAudience
  )
    throw new AuthenticationFailedError('Invalid Access Token');
  return true;
}


export const createToken = async (user: User): Promise<string> => {
  const payload = new JwtPayload(config.tokenIssuer, config.tokenAudience, user.id, 3);
  return await JWT.sign(payload)

}