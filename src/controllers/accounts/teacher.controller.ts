import { NextFunction, Request, Response } from "express";
import Teacher, { ITeacher } from "../../models/teacher.model";
import AppError from "../../utils/app-error";
import { IToken, generateToken } from "../../utils/auth";

const teacherRegistration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: ITeacher = new Teacher({
            ...req.body
        })
        const result = await user.save()
        res.status(201).send(result)

    } catch (error) {
        next(new AppError(`${error.message}`, 400))
    }
}

const teacherLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const user: ITeacher = await Teacher.findOne({ email })

        if (!user) return next(new AppError("user not found", 404))

        const isValid = await user.isPasswordValid(password)

        if (!isValid) return next(new AppError("password is incorrect", 401))

        const token = generateToken(user)

        return res.status(200).json({ token })

    } catch (error) {
        if (
            error.message === 'user not found' ||
            error.message === 'password is incorrect'
        ) {
            next(new AppError(error.message, 404))
        } else {
            next(new AppError(error.message, 500))
        }
    }
}

const assignedClassToTeacher = async (req: Request & { user: IToken }, res: Response, next: NextFunction) => {
    try {
        const assignedClasses: string[] = req.body.assignedClasses
        const preAssignedClasses = await Teacher.findById(req.user.id).select('assignedClasses -_id').lean()
        const preAssignedClassesArray = preAssignedClasses ? preAssignedClasses.assignedClasses : [];
        const preAssignedClassesStringArray = preAssignedClassesArray.map(String); // Convert to array of strings
        const match = assignedClasses.some((val: string) => preAssignedClassesStringArray.includes(val))
        if (match) return next(new AppError("some classes are already assigned", 403))
        const teacher: ITeacher = await Teacher.findByIdAndUpdate(req.user.id, { $push: { assignedClasses: [...assignedClasses] } }, { new: true }).select('assignedClasses')
        if (!teacher) return next(new AppError("something terrible happened", 500))
        res.status(200).json(teacher)
    } catch (error) {
        next(new AppError(error.message, 400))
    }
}
const unAssignedClassToTeacher = async (req: Request & { user: IToken }, res: Response, next: NextFunction) => {
    try {
        const classToUnAssigned: string[] = req.body.assignedClasses
        const preAssignedClasses = await Teacher.findById(req.user.id).select('assignedClasses -_id').lean()
        const preAssignedClassesArray = preAssignedClasses ? preAssignedClasses.assignedClasses : [];
        const preAssignedClassesStringArray = preAssignedClassesArray.map(String); // Convert to array of strings
        const match = classToUnAssigned.some((val: string) => preAssignedClassesStringArray.includes(val))
        if (!match) return next(new AppError("some classes are not found", 403))
        const teacher: ITeacher = await Teacher.findByIdAndUpdate(req.user.id, { $pullAll: { assignedClasses: [...classToUnAssigned] } }, { new: true }).select('assignedClasses')
        if (!teacher) return next(new AppError("something wrong happened", 500))
        res.status(200).json(teacher)
    } catch (error) {
        next(new AppError(error.message, 400))
    }
}

const getTeacher = async (req: Request & { user: IToken }, res: Response, next: NextFunction) => {
    try {
        const teacher = await Teacher.findById(req.user.id).select("-password -__v -_id -createdAt -updatedAt")
        res.status(200).json(teacher)
    } catch (error) {
        next(new AppError(error.message, 500))
    }
}
const getAllTeacher = async (req: Request & { user: IToken }, res: Response, next: NextFunction) => {
    try {
        const teachers = await Teacher.find().select("-password -__v -createdAt -updatedAt")
        if (!teachers) return next(new AppError('No teachers found', 404))
        res.status(200).json(teachers)
    } catch (error) {
        next(new AppError(error.message, 500))
    }
}

const updateTeacherDetails = async (req: Request & { user: IToken }, res: Response, next: NextFunction) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.user.id, { ...req.body }, { new: true })
        if (!teacher) return next(new AppError('unable to update details', 400))
        res.status(201).json(teacher)
    } catch (error) {

    }
}

export { teacherLogin, teacherRegistration, getTeacher, assignedClassToTeacher, unAssignedClassToTeacher, getAllTeacher }