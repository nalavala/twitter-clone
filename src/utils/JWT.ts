import { promisify } from 'util';
import config from "./../property";
import { sign, verify } from 'jsonwebtoken';
import { InternalServerError, BadTokenError, TokenExpiredError } from './../core/ApiError';

export default class JWT {
    public static async sign(payload: JwtPayload): Promise<string> {
        // @ts-ignore
        return promisify(sign)({ ...payload }, config.jwtSecret);
    }

    public static async verify(token: string): Promise<JwtPayload> {
        try {
            // @ts-ignore
            return (await promisify(verify)(token, config.jwtSecret)) as JwtPayload;
        } catch (e) {
            console.error(e);
            if (e && e.name === 'TokenExpiredError') throw new TokenExpiredError();
            throw new BadTokenError();
        }

    }
}

export class JwtPayload {
    aud: string;
    sub: string;
    iss: string;
    iat: number;
    exp: number;

    constructor(issuer: string, audience: string, subject: string, validity: number) {
        this.iss = issuer;
        this.aud = audience;
        this.sub = subject;
        this.iat = Math.floor(Date.now() / 1000);
        this.exp = this.iat + validity * 24 * 60 * 60;
    }
}