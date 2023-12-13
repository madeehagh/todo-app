import { Request, Response, NextFunction } from 'express';
import { APILogger } from '../logger/api.logger';

export function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
    const logger = new APILogger();
    logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}