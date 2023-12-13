import {NextFunction, Request, Response} from "express";

export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.get('x-api-key');
    if (!apiKey || apiKey !== process.env.API_KEY) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        next();
    }
}