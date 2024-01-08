import { Request, Response, NextFunction } from "express";
import Department, { IDepartment } from "../models/department.model";
import AppError from "../utils/app-error";

const createDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const department: IDepartment = new Department({ ...req.body });
        await department.save();
        res.status(201).json({ department });
    }
    catch (error) {
        next(new AppError(`${error.message}`, 400))
    }
}

const getDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const departments = await Department.find();
        res.status(200).json({ departments });
    }
    catch (error) {
        next(new AppError(`${error.message}`, 400))
    }
}

const getDepartmentsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);
        res.status(200).json({ department });
    }
    catch (error) {
        next(new AppError(`${error.message}`, 400))
    }
}

export { createDepartment, getDepartments, getDepartmentsById }