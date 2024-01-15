import { Request, Response, NextFunction } from "express";

type AsyncMiddlewareFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export default (fn: AsyncMiddlewareFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            Promise.resolve(fn(req, res, next)).catch(next);
        } catch (e) {
            next();
        }
    };
};