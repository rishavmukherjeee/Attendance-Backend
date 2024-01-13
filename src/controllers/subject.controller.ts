import { Request, Response, NextFunction } from 'express';
import Subject, { ISubject } from '../models/subject.model';
import AppError from '../utils/app-error';

export const createSubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject: ISubject = new Subject({ ...req?.body });
        await subject.save();
        res.status(201).json({ subject });
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}

export const getAllSubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjects: ISubject[] = await Subject.find();
        res.status(201).json({ subjects });
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}

export const getSubjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req?.params;
        const subject: ISubject = await Subject.findById(id);
        if (!subject) {
            return next(new AppError("Subject not found", 404));
        }
        res.status(200).json({ subject });
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}

export const editSubjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req?.params;
        const subject: ISubject = await Subject.findByIdAndUpdate(
            id,
            { $set: { ...req?.body } },
            { new: true }
        );
        if (!subject) {
            return next(new AppError("update failed", 404));
        }
        res.status(200).json({ subject });
    } catch (error) {
        next(new AppError(error?.message, 500));
    }
}

export const deleteSubjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req?.params;
        await Subject.deleteOne({ _id: id });
        res.status(200).json({ message: "subject deleted successfully" });
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}