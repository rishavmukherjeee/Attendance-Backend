import e, { Request, Response, NextFunction } from 'express';
import Subject, { ISubject } from '../models/subject.model';
import AppError from '../utils/app-error';
import Teacher from '../models/teacher.model';
import { IToken } from '../utils/auth';
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

export const getTeacherSubjects = async (req: Request & { user: IToken }, res: Response, next: NextFunction) => {
    try {
        const subject = (await (await Teacher.findById(req.user.id)).populate({ path: 'subjects', select: "-__v -createdAt -updatedAt" })).subjects
        if (!subject.length)
            return next(new AppError("no subjects found", 404));
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

export const assignandappendSubjectArrayToTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { teacherId, subjectIds } = req?.body;
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return next(new AppError("Teacher not found", 404));
        }
        const uniqueSubjects = subjectIds.filter((val: any) => !teacher.subjects.includes(val));
        teacher.subjects = [...teacher.subjects, ...uniqueSubjects];

        await teacher.save();
        res.status(200).json({ teacher });
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}

export const deleteSubjectArrayFromTeacher = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { teacherId, subjectIds } = req?.body;
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return next(new AppError("Teacher not found", 404));
        }
        const subjectIdss = subjectIds.map(String);
        const subjects = await Subject.find({ _id: { $in: subjectIdss } });
        if (!subjects) {
            return next(new AppError("Subjects not found", 404));
        }

        teacher.subjects = teacher.subjects.filter(subject => !subjectIdss.includes(subject.toString()));

        await teacher.save();
        res.status(200).json({ teacher });
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}

