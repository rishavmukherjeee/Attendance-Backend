import { Request, Response, NextFunction } from "express"
import Session, { ISession } from "../models/session.model";
import AppError from "../utils/app-error";

const createSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const semester: ISession = new Session({ ...req.body });
        await semester.save();
        res.status(201).json({ semester });
    }
    catch (error) {
        next(new AppError(`${error.message}`, 400))
    }
}

export { createSession }