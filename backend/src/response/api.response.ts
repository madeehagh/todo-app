import { Response } from 'express';

export class ApiResponse {
    private res: Response;

    constructor(res: Response) {
        this.res = res;
    }

    success(data?: any) {
        this.res.status(200).json({
            success: true,
            data,
        });
    }

    error(message: string, statusCode: number = 500) {
        this.res.status(statusCode).json({
            success: false,
            error: message,
        });
    }
}