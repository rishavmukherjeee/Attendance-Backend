import { Request, Response, NextFunction } from "express"
import Session, { ISession } from "../models/session.model";
import AppError from "../utils/app-error";

const createSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session: ISession = new Session({ ...req.body });
        await session.save();
        res.status(201).json({ session });
    }
    catch (error) {
        next(new AppError(`${error.message}`, 400))
    }
}

const getSessionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const session: ISession = await Session.findById(id);
        if (!session) {
            return next(new AppError("session not found", 404));
        }
        res.status(200).json({ session });
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}

const getSessionByDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.dept
        const sessions: ISession[] = await Session.findOne({ stream: id })
        if (!sessions) {
            return next(new AppError("sessions not found", 404));
        }
        res.status(200).json({ sessions });
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}

const getAllSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessions: ISession[] = await Session.find();
        res.status(200).json({ sessions });
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}

export { createSession, getAllSession, getSessionById, getSessionByDepartment }