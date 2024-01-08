import { Request, Response, NextFunction } from "express"
import Semester, { ISemester } from "../models/semester.model";
import AppError from "../utils/app-error";
import Department from "../models/department.model";

const createSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const semester: ISemester = new Semester({ ...req.body });
        await semester.save();
        const department = await Department.findByIdAndUpdate(req.body.department, { $push: { semesters: semester._id } }, { new: true })
        res.status(201).json({ semester });
    }
    catch (error) {
        next(new AppError(`${error.message}`, 400))
    }
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await Semester.deleteOne({ _id: id });
        res.status(200).json({ message: "semester deleted successfully" });
    }
    catch (error) {
        next(new AppError(`${error.message}`, 400))
    }
}

const getAllSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const semesters = await Semester.find();
        res.status(200).json({ semesters });
    }
    catch (error) {
        next(new AppError(`${error.message}`, 400))
    }
}

const getSemesterById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const semester = await Semester.findById(id).populate({ path: 'department', select: "-semesters -_id -__v -createdAt -updatedAt -subjects -faculties" })
        res.status(200).json({ semester });
    }
    catch (error) {
        next(new AppError(`${error.message}`, 400))
    }
}

export { createSemester, deleteById, getAllSemester, getSemesterById }