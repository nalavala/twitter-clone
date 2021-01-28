import { Response } from 'express';
export class ApiResponse {
    protected errorCode: any;
    protected httpStatusCode: any;
    protected message: string;
    protected timestamp: Date;
    constructor(errorCode: any, httpStatusCode: any, message : string) {
        this.errorCode = errorCode;
        this.httpStatusCode = httpStatusCode;
        this.message = message,
            this.timestamp = new Date()
    }

    protected prepare<T extends ApiResponse>(res: Response, response: T): Response {
        return res.status(this.httpStatusCode).json(ApiResponse.sanitize(response));
    }

    public send(res: Response): Response {
        return this.prepare<ApiResponse>(res, this);
    }

    private static sanitize<T extends ApiResponse>(response: T): T {
        const clone: T = {} as T;
        Object.assign(clone, response);
        // @ts-ignore
        delete clone.httpStatusCode;
        for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
        return clone;
    }
}

