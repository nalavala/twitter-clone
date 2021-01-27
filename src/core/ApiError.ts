
import { Response } from 'express'
import { ApiResponse } from './ApiResponse';
enum ErrorCodes {
    BAD_TOKEN = 'EBT01',
    TOKEN_EXPIRED = 'ETE01',
    UNAUTHORIZED = 'EUA01',
    ACCESS_TOKEN = 'EAT01',
    INTERNAL = 'EIT01',
    NOT_FOUND = 'ENF01',
    BAD_REQUEST = 'EBR01',
}

enum StatusCodes {

    NOT_FOUND = 404,
    UN_AUTHORIZED = 401,
    INTERNAL_SERVER_ERROR = 501,
    BAD_REQUEST = 400

}

export abstract class ApiError {
    public errorCode: ErrorCodes;
    public statusCode: StatusCodes;
    public message: string
    constructor(public code: ErrorCodes, public statuscode: StatusCodes, message: string) {

        this.message = message;
        this.statusCode = statuscode;
        this.errorCode = code;
    }

    public static handle = (error: ApiError, res: Response) => {
        return new ApiResponse(error.errorCode, error.statusCode, error.message).send(res);
    }
}


abstract class NotExistError extends ApiError {

    constructor(code: ErrorCodes, message: string) {
        super(code, StatusCodes.NOT_FOUND, message);
    }
}

abstract class UnAuthorizedError extends ApiError {
    constructor(code: ErrorCodes, message: string) {
        super(code, StatusCodes.UN_AUTHORIZED, message);
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(ErrorCodes.BAD_REQUEST, StatusCodes.BAD_REQUEST, message);
    }

}

abstract class InternalError extends ApiError {
    constructor(code: ErrorCodes, message: string) {
        super(code, StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}



export class TokenExpiredError extends UnAuthorizedError {
    constructor(message = 'Token is expired') {
        super(ErrorCodes.TOKEN_EXPIRED, message);
    }
}

export class AuthenticationFailedError extends UnAuthorizedError {
    constructor(message = 'Bad credentials') {
        super(ErrorCodes.UNAUTHORIZED, message);
    }
}


export class BadTokenError extends UnAuthorizedError {
    constructor(message = 'Bad token') {
        super(ErrorCodes.TOKEN_EXPIRED, message);
    }
}

export class InternalServerError extends InternalError {
    constructor(message = 'Internal server error') {
        super(ErrorCodes.INTERNAL, message);
    }
}


export class NotFoundError extends NotExistError {
    constructor(message = 'Not Found') {
        super(ErrorCodes.NOT_FOUND, message);
    }
}