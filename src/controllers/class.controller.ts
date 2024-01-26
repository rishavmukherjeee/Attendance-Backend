import { Request, Response, NextFunction } from 'express';
import Class, { IClass } from '../models/class.model';
import AppError from '../utils/app-error';

const createClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const time = req.body.time
        const newTime = new Date()
        const [hour, minute, second] = time.split(":")
        newTime.setHours(Number(hour))
        newTime.setMinutes(Number(minute))
        newTime.setSeconds(Number(second))
        const newClass: IClass = new Class({ ...req.body, time: newTime });
        await newClass.save()
        res.status(201).json(newClass)
    } catch (error) {
        next(new AppError(error.message, 403))
    }
}

const getClasses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classes: IClass[] = await Class.find();
        if (classes.length === 0) return next(new AppError("no class is available", 404))
        res.status(200).json({ classes })
    } catch (error) {
        next(new AppError(error.message, 403))
    }
}

const getClassById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classId: string = req.params.id
        const oneClass: IClass[] = await Class.findById(classId)
        if (!oneClass) return next(new AppError("class not found", 404))
        res.status(200).json(oneClass)
    } catch (error) {
        next(new AppError(error.message, 403))
    }
}

export { createClass, getClassById, getClasses }